import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/all";
import { Ellipsis } from "lucide-react";
import { lazy, Suspense, useRef } from "react";
import { BlockType, type BlockProps } from "./blocks.types";

gsap.registerPlugin(Draggable);

// 动态导入：较重组件按需拆分
const BLOCK_COMPONENTS = {
  [BlockType.TEXT]: lazy(() => import("./blocks/TextBlock")),
  [BlockType.PHOTO]: lazy(() => import("./blocks/PhotoBlock")),
  [BlockType.MAP]: lazy(() => import("./blocks/MapBlock")),
  [BlockType.GITHUBUSER]: lazy(() => import("./blocks/GitHubUserBlock")),
  [BlockType.GITHUBREPO]: lazy(() => import("./blocks/GitHubRepoBlock")),
};

// 不同类型默认的外层 padding / 布局 class（原先由各自 Block 包裹）
const TYPE_BASE_CLASS: Record<string, string> = {
  [BlockType.TEXT]: "",
  [BlockType.PHOTO]: "", // 图片铺满
  [BlockType.MAP]: "p-0 overflow-hidden",
  [BlockType.GITHUBUSER]: "p-4 text-left",
  [BlockType.GITHUBREPO]: "p-4 flex flex-col items-start gap-4",
  [BlockType.NORMAL]: "p-4",
};

/**
 * 统一 Block 组件：整合拖拽 + 动态内容选择
 */
export default function Block({
  className,
  grid,
  children,
  containerRef,
  blockData,
}: BlockProps) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const ContentComponent = BLOCK_COMPONENTS[blockData.type];

  const blockRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const dragTriggerRef = useRef<SVGSVGElement>(null);

  useGSAP(
    (_context, contextSafe) => {
      let raf: number | null = null;
      const cleanups: Array<() => void> = [];
      const ROW_HEIGHT = 80;
      // gap 需要在 containerRef 指向真实元素后才能安全读取
      // 使用闭包中的可变变量，并在 ensureContainer / resize 中动态更新
      let gap = 0;

      const updateGap = () => {
        if (!containerRef.current) return;
        try {
          const style = getComputedStyle(containerRef.current);
          // 兼容：有些环境可能使用 columnGap / rowGap
          const g = parseFloat(
            style.gap || style.columnGap || style.rowGap || "0"
          );
          if (!Number.isNaN(g)) gap = g;
        } catch {
          // 忽略：在极少数 SSR / 虚拟环境下 getComputedStyle 不可用
          gap = 0;
        }
      };

      const calcColumns = () => {
        const w = window.innerWidth;
        if (w >= 1024) return 12;
        if (w >= 768) return 8;
        return 4;
      };

      const getColumnWidth = contextSafe!(() => {
        const rect = containerRef.current!.getBoundingClientRect();
        return (rect.width - gap * (calcColumns() - 1)) / calcColumns();
      });

      const snapX = contextSafe!((endValue: number) => {
        const cw = getColumnWidth();
        return Math.round(endValue / (cw + gap)) * (cw + gap);
      });

      const snapY = contextSafe!((endValue: number) => {
        return Math.round(endValue / (ROW_HEIGHT + gap)) * (ROW_HEIGHT + gap);
      });

      const ensureContainer = contextSafe!((cb: () => void) => {
        if (containerRef.current) cb();
        else raf = requestAnimationFrame(() => ensureContainer(cb));
      });

      ensureContainer(() => {
        // container 已经就绪，初始化 gap
        updateGap();

        const drag = Draggable.create(blockRef.current, {
          bounds: containerRef.current,
          inertia: false,
          edgeResistance: 0.9,
          trigger: dragTriggerRef.current,
          onPress() {
            gsap.to(blockRef.current, {
              scale: 1.02,
              rotate: -1,
              boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
              duration: 0.35,
              overwrite: true,
              zIndex: 20,
            });
            gsap.set(placeholderRef.current, {
              opacity: 1,
              delay: 0.35,
              zIndex: 15,
            });
            this.applyBounds(containerRef.current!);
          },
          onDrag() {
            gsap.set(placeholderRef.current, {
              x: snapX(this.x),
              y: snapY(this.y),
            });
          },
          onRelease() {
            const finalX = snapX(this.x);
            const finalY = snapY(this.y);

            gsap
              .timeline({ defaults: { overwrite: true } })
              .to(blockRef.current, {
                x: finalX,
                y: finalY,
                scale: 1,
                rotate: 0,
                boxShadow: "0 0 0 rgba(0,0,0,0.04)",
                duration: 0.25,
                ease: "power2.out",
              })
              .to(placeholderRef.current, { opacity: 0, duration: 0.2 }, "<");
          },
          onDragEnd() {
            gsap.to(placeholderRef.current, {
              opacity: 0,
              duration: 0.2,
            });
            gsap.set(placeholderRef.current, {
              clearProps: "opacity,duration,zIndex",
            });
            gsap.set(blockRef.current, {
              clearProps: "zIndex",
            });
          },
        })[0];

        // 布局稳定后一帧再校准 bounds
        requestAnimationFrame(() => drag?.applyBounds(containerRef.current!));

        gsap.set(placeholderRef.current, {
          clearProps: "all",
        });

        // resize / observer 更新
        let ticking = false;
        const updateLayout = contextSafe!(() => {
          if (ticking) return;
          ticking = true;
          requestAnimationFrame(() => {
            ticking = false;
            if (!drag) return;
            // 每次布局更新尝试重新计算 gap（响应 CSS gap 的媒体查询变更等）
            updateGap();
            drag.applyBounds(containerRef.current!);
            drag.vars.snap = { x: snapX, y: snapY };
          });
        });

        const ro = new ResizeObserver(updateLayout);
        ro.observe(containerRef.current!);
        cleanups.push(() => ro.disconnect());

        window.addEventListener("resize", updateLayout);
        cleanups.push(() => window.removeEventListener("resize", updateLayout));

        cleanups.push(() => drag?.kill());
      });

      return () => {
        if (raf) cancelAnimationFrame(raf);
        cleanups.forEach((fn) => fn());
      };
    },
    {
      scope: blockRef,
    }
  );

  const sizeClass = `col-span-${grid.col} row-span-${grid.row}`;
  const baseTypeClass = TYPE_BASE_CLASS[blockData.type] || "";

  return (
    <div className={`relative ${sizeClass}`}>
      <div
        ref={blockRef}
        role="group"
        className={`group relative w-full z-10 h-full rounded-2xl border duration-100 overflow-hidden shadow-black/5 border-primary/20 bg-white flex items-center justify-center text-primary/70 ${baseTypeClass} ${className || ""}`}
      >
        <Suspense>
          {ContentComponent ? (
            <ContentComponent
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore -- 动态组件的 props 与 union 类型字段对齐
              {...blockData}
              containerRef={containerRef}
              className={className}
            >
              {children}
            </ContentComponent>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              {children || "未知类型"}
            </div>
          )}
        </Suspense>
        <div className="absolute top-0 left-0 right-0 mx-auto flex justify-center overflow-hidden">
          <Ellipsis
            ref={dragTriggerRef}
            className="transform opacity-0 group-hover:opacity-30 transition-all duration-300 ease-out"
          />
        </div>
      </div>
      <div
        ref={placeholderRef}
        className="absolute top-0 left-0 w-full h-full duration-300 border-2 border-dashed border-primary/40 rounded-2xl pointer-events-none bg-primary/20 backdrop-blur-2xl"
      ></div>
    </div>
  );
}
