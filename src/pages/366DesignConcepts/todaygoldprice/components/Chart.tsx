import { useEffect, useMemo, useRef, useState } from "react";
import Tooltip from "./Tooltip";

export default function Chart({
  data,
}: {
  data: { time: number; value: number }[];
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hover, setHover] = useState<{
    x: number;
    y: number;
    value: number;
    time: number;
    index: number;
  } | null>(null);

  const [animationProgress, setAnimationProgress] = useState(0);

  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 800,
    height: 400,
  });

  // SVG 配置（padding 固定，宽高由容器测量）
  const padding = useMemo(
    () => ({ top: 40, right: 15, bottom: 40, left: 15 }),
    []
  );

  // 自动根据容器大小更新 svg 尺寸
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = (w: number, h: number) =>
      setSize({
        width: Math.max(200, Math.round(w)),
        height: Math.max(120, Math.round(h)),
      });

    // initial
    const rect = el.getBoundingClientRect();
    update(rect.width, rect.height || 400);

    if (typeof ResizeObserver !== "undefined") {
      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const cr = entry.contentRect;
          update(cr.width, cr.height || size.height);
        }
      });
      ro.observe(el);
      return () => ro.disconnect();
    }

    const onResize = () => {
      const r = el.getBoundingClientRect();
      update(r.width, r.height || size.height);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [size.height]);

  // 计算坐标点 — data 是 {time,value}[]
  const points = useMemo(() => {
    const width = size.width;
    const height = size.height;
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const values = data.map((d) => d.value);
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min || 1;

    return data.map((d, index) => ({
      x: padding.left + (index / (data.length - 1)) * chartWidth,
      y: padding.top + ((max - d.value) / range) * chartHeight,
      value: d.value,
      time: d.time,
      index,
    }));
  }, [data, padding, size.width, size.height]);

  // 生成平滑路径
  const linePath = useMemo(() => {
    if (points.length === 0) return "";
    if (points.length === 1) {
      const p = points[0];
      return `M ${p.x} ${p.y}`;
    }

    const getPoint = (i: number) => {
      if (i < 0) return points[0];
      if (i >= points.length) return points[points.length - 1];
      return points[i];
    };

    let line = `M ${points[0].x} ${points[0].y}`;

    for (let i = 0; i < points.length - 1; i++) {
      const p0 = getPoint(i - 1);
      const p1 = getPoint(i);
      const p2 = getPoint(i + 1);
      const p3 = getPoint(i + 2);

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      line += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }

    return line;
  }, [points]);

  // 动画效果
  useEffect(() => {
    const pathEl = pathRef.current;
    if (!pathEl) return;

    const lineLength = pathEl.getTotalLength();

    pathEl.style.strokeDasharray = `${lineLength}`;
    pathEl.style.strokeDashoffset = `${lineLength}`;

    const startTime = Date.now();
    const duration = 2500;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      pathEl.style.strokeDashoffset = `${lineLength * (1 - easeProgress)}`;
      setAnimationProgress(easeProgress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [linePath]);

  // 处理数据点hover
  const handlePointHover = (
    point: (typeof points)[0],
    event: React.MouseEvent
  ) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;

    const svgX = event.clientX - rect.left;
    const svgY = event.clientY - rect.top;

    setHover({
      x: svgX,
      y: svgY,
      value: point.value,
      time: point.time,
      index: point.index,
    });
  };

  const handleMouseLeave = () => {
    setHover(null);
  };

  return (
    <div ref={containerRef} className="size-full relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${size.width} ${size.height}`}
        className="w-full h-full"
        onMouseLeave={handleMouseLeave}
        role="img"
        aria-label="价格趋势图表"
      >
        {/* 主线条 */}
        <path
          ref={pathRef}
          d={linePath}
          fill="none"
          stroke="#9C9996"
          strokeWidth={size.width * 0.01}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 数据点 */}
        {points.map((point, i) => {
          const shouldShow = i / (points.length - 1) <= animationProgress;
          const isHovered = hover?.index === i;

          return (
            <g key={i}>
              <circle
                cx={point.x}
                cy={point.y}
                r={isHovered ? size.width * 0.024 : size.width * 0.016}
                fill="#9C9996"
                stroke="none"
                style={{
                  opacity: shouldShow ? 1 : 0,
                  transition: "opacity 0.3s ease, r 0.2s ease",
                }}
              />
              <circle
                cx={point.x}
                cy={point.y}
                r={isHovered ? size.width * 0.015 : size.width * 0.01}
                fill="#E3E0DB"
                stroke="none"
                onMouseEnter={(e) => handlePointHover(point, e)}
                onMouseLeave={handleMouseLeave}
                style={{
                  opacity: shouldShow ? 1 : 0,
                  transition: "opacity 0.3s ease, r 0.2s ease",
                  cursor: "pointer",
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Tooltip - 只在hover数据点时显示 */}
      {hover && (
        <div
          className="absolute z-10 "
          style={{
            left: hover.x,
            top: `calc(${hover.y}px - 14cqw)`,
            transform: "translateX(-50%)",
          }}
        >
          <Tooltip hover={hover} />
        </div>
      )}
    </div>
  );
}
