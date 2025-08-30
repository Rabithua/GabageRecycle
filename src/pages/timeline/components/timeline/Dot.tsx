import { useLayoutEffect, useRef, useState } from "react";

/**
 * 垂直时间线刻度组件，根据内容高度自动生成刻度数量。
 * 也可通过 length 属性强制指定刻度数量。
 */
export default function Dot({
  children,
  length,
}: {
  children: React.ReactNode;
  length?: number;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [autoLength, setAutoLength] = useState(6);

  useLayoutEffect(() => {
    if (length !== undefined) {
      setAutoLength(length);
      return;
    }
    if (!contentRef.current) return;
    const el = contentRef.current;
    const TOP_LINE = 2;
    const SEG_LINE = 1;
    const GAP = 16;
    const calc = () => {
      const h = el.offsetHeight;
      const n = Math.max(1, Math.round((h - TOP_LINE) / (SEG_LINE + GAP)));
      setAutoLength(n + 4);
    };
    calc();
    const ro = new ResizeObserver(calc);
    ro.observe(el);
    window.addEventListener("resize", calc);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", calc);
    };
  }, [length]);

  return (
    <div className="flex gap-4 items-start">
      <div className="flex flex-col gap-4 mt-3">
        <div className="w-5 h-[2px] shrink-0 bg-red-300" />
        {Array.from({ length: autoLength }).map((_, index) => (
          <div key={index} className="w-3 h-[1px] shrink-0 bg-black/30" />
        ))}
      </div>
      <div ref={contentRef} className="flex flex-col gap-4 w-full">
        {children}
      </div>
    </div>
  );
}
