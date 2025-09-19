import { useEffect, useMemo, useRef, useState } from "react";
import Counter from "./Count";

export default function Chart() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const pathRef = useRef<SVGPathElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hover, setHover] = useState<{
    x: number;
    y: number;
    value: number;
    index: number;
  } | null>(null);

  const [animationProgress, setAnimationProgress] = useState(0);

  const [size, setSize] = useState<{ width: number; height: number }>({
    width: 800,
    height: 400,
  });

  // 示例数据
  const data = useMemo(
    () => [28900, 31200, 33400, 35800, 34200, 36500, 38200],
    []
  );

  // SVG 配置（padding 固定，宽高由容器测量）
  const padding = useMemo(
    () => ({ top: 10, right: 0, bottom: 0, left: 10 }),
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

  // 计算坐标点
  const points = useMemo(() => {
    const width = size.width;
    const height = size.height;
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;

    return data.map((value, index) => ({
      x: padding.left + (index / (data.length - 1)) * chartWidth,
      y: padding.top + ((max - value) / range) * chartHeight,
      value,
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
        <defs>
          {/* 垂直条纹模式 */}
          <pattern
            id="stripes"
            patternUnits="userSpaceOnUse"
            width="60"
            height="100%"
          >
            <rect width="60" height="100%" fill="#D9D6D1" />
          </pattern>
        </defs>

        {/* 分块填充区域 - 只在折线下方 */}
        {points.slice(0, -1).map((point, i) => {
          const nextPoint = points[i + 1];
          const bottomY = size.height - padding.bottom;

          // 创建梯形区域，填充条纹背景
          const blockPath = `
            M ${point.x} ${point.y}
            L ${nextPoint.x} ${nextPoint.y}
            L ${nextPoint.x} ${bottomY}
            L ${point.x} ${bottomY}
            Z
          `;

          const shouldShow = (i + 1) / (points.length - 1) <= animationProgress;

          return (
            <g key={i}>
              {/* 左边描边 */}
              <line
                x1={point.x}
                y1={point.y}
                x2={point.x}
                y2={bottomY}
                stroke="#E3E0DB"
                strokeWidth="5"
                style={{
                  opacity: shouldShow ? 1 : 0,
                  transition: "opacity 0.4s ease",
                }}
              />
              {/* 右边描边 */}
              <line
                x1={nextPoint.x}
                y1={nextPoint.y}
                x2={nextPoint.x}
                y2={bottomY}
                stroke="#E3E0DB"
                strokeWidth="5"
                style={{
                  opacity: shouldShow ? 1 : 0,
                  transition: "opacity 0.4s ease",
                }}
              />
              {/* 填充区域 */}
              <path
                d={blockPath}
                fill="url(#stripes)"
                stroke="none"
                style={{
                  opacity: shouldShow ? 1 : 0,
                  transition: "opacity 0.4s ease",
                }}
              />
            </g>
          );
        })}

        {/* 主线条 */}
        <path
          ref={pathRef}
          d={linePath}
          fill="none"
          stroke="black"
          strokeWidth="4"
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
                r={isHovered ? "12" : "8"}
                fill="#black"
                stroke="none"
                style={{
                  opacity: shouldShow ? 1 : 0,
                  transition: "opacity 0.3s ease, r 0.2s ease",
                }}
              />
              <circle
                cx={point.x}
                cy={point.y}
                r={isHovered ? "8" : "5"}
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
          className="absolute z-10 bg-black text-[#E3E0DB] px-[2cqw] py-[1cqw] rounded-full shadow-lg pointer-events-none text-[4cqw] font-medium"
          style={{
            left: hover.x,
            top: `calc(${hover.y}px - 12cqw)`,
            transform: "translateX(-50%)",
          }}
        >
          $<Counter duration={0.2} value={hover.value} />
          {/* 小尾巴 */}
          <div
            className="absolute left-1/2 top-full w-0 h-0 -translate-x-1/2"
            style={{
              borderLeft: "0.8cqw solid transparent",
              borderRight: "0.8cqw solid transparent",
              borderTop: "0.8cqw solid black",
            }}
          />
        </div>
      )}
    </div>
  );
}
