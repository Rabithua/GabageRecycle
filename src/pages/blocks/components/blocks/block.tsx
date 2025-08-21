import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(Draggable);

export default function Block({
  children,
  className,
  containerRef,
}: {
  children: React.ReactNode;
  className?: string;
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  const blockRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = blockRef.current;

      // 计算网格对齐函数
      const getGridSnapFunction = () => {
        return {
          x: (endValue: number) => {
            // 获取网格指标的逻辑保持不变
            const containerRect = containerRef.current?.getBoundingClientRect();
            if (!containerRect) return endValue;
            const gap = 16;
            const screenWidth = window.innerWidth;
            let columns = 4;
            if (screenWidth >= 1024) columns = 12;
            else if (screenWidth >= 768) columns = 8;
            const availableWidth = containerRect.width;
            const columnWidth =
              (availableWidth - gap * (columns - 1)) / columns;

            // 移除 Math.max(0, ...) 和 Math.min(...)
            const gridX =
              Math.round(endValue / (columnWidth + gap)) * (columnWidth + gap);
            return gridX;
          },
          y: (endValue: number) => {
            const gap = 16;
            const rowHeight = 80;

            // 移除 Math.max(0, ...)
            const gridY =
              Math.round(endValue / (rowHeight + gap)) * (rowHeight + gap);
            return gridY;
          },
        };
      };

      const draggable = Draggable.create(el, {
        bounds: containerRef.current,
        liveSnap: true,
        snap: getGridSnapFunction(),
        onPress() {
          if (el) {
            gsap.to(el, {
              scale: 1.02,
              rotate: -1,
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.05)",
              duration: 0.5,
              overwrite: true,
            });
          }
        },
        onRelease() {
          if (el) {
            gsap.to(el, {
              scale: 1,
              rotate: 0,
              boxShadow: "0 0px 0px rgba(0, 0, 0, 0.05)",
              duration: 0.5,
              overwrite: true,
            });
          }
        },
        onDragEnd() {
          if (el) {
            gsap.to(el, {
              scale: 1,
              rotate: 0,
              boxShadow: "0 0px 0px rgba(0, 0, 0, 0.05)",
              duration: 0.5,
              overwrite: true,
            });
          }
        },
      });

      // 监听窗口大小变化，更新网格对齐
      const handleResize = () => {
        if (draggable[0]) {
          draggable[0].vars.snap = getGridSnapFunction();
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        draggable.forEach((d) => d.kill());
        window.removeEventListener("resize", handleResize);
      };
    },
    {
      scope: containerRef?.current,
    }
  );

  return (
    <div
      ref={blockRef}
      className={`rounded-2xl border duration-100 overflow-hidden shadow-black/5 border-primary/20 bg-white flex items-center justify-center text-primary/70 ${className}`}
    >
      {children}
    </div>
  );
}
