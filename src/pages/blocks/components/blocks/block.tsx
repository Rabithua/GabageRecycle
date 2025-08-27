import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/all";
import { Ellipsis } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(Draggable);

interface BlockBaseProps {
  children: React.ReactNode;
  className?: string;
  containerRef: React.RefObject<HTMLDivElement>;
}

export default function Block({
  children,
  className,
  containerRef,
}: BlockBaseProps) {
  const blockRef = useRef<HTMLDivElement>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  const dragTriggerRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<Draggable | null>(null);

  useGSAP(() => {
    let raf: number | null = null;
    const cleanups: Array<() => void> = [];

    const ROW_HEIGHT = 80; // 行高仍固定，可按需再改为动态

    // 动态获取容器 gap（支持 grid/flex 的 columnGap/rowGap）。若未设置则回退 16。
    const getGaps = () => {
      const el = containerRef.current;
      if (!el) return { col: 16, row: 16 };
      const style = getComputedStyle(el);
      // style.gap 可能是 "12px 24px"，但我们更精确使用 columnGap/rowGap
      const col = parseFloat(style.columnGap) || parseFloat(style.gap) || 16;
      const row =
        parseFloat(style.rowGap) ||
        (style.gap.includes(" ") ? parseFloat(style.gap.split(" ")[1]) : col) ||
        16;
      return { col, row };
    };

    const calcColumns = () => {
      const w = window.innerWidth;
      if (w >= 1024) return 12;
      if (w >= 768) return 8;
      return 4;
    };
    const getColumnWidth = () => {
      const rect = containerRef.current!.getBoundingClientRect();
      const { col } = getGaps();
      return (rect.width - col * (calcColumns() - 1)) / calcColumns();
    };
    const snapX = (endValue: number) => {
      const cw = getColumnWidth();
      const { col } = getGaps();
      return Math.round(endValue / (cw + col)) * (cw + col);
    };
    const snapY = (endValue: number) => {
      const { row } = getGaps();
      return Math.round(endValue / (ROW_HEIGHT + row)) * (ROW_HEIGHT + row);
    };

    const ensureContainer = (cb: () => void) => {
      if (containerRef.current) cb();
      else raf = requestAnimationFrame(() => ensureContainer(cb));
    };

    ensureContainer(() => {
      const el = blockRef.current;
      if (!el) return;
      const placeholder = placeholderRef.current;

      const drag = Draggable.create(el, {
        bounds: containerRef.current,
        inertia: false,
        edgeResistance: 0.9,
        trigger: dragTriggerRef.current || el,
        onPress() {
          gsap.to(el, {
            scale: 1.02,
            rotate: -1,
            boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
            duration: 0.35,
            overwrite: true,
            zIndex: 20,
          });
          gsap.set(placeholder, { opacity: 1, delay: 0.35, zIndex: 15 });
          this.applyBounds(containerRef.current!);
        },
        onDrag() {
          gsap.set(placeholder, { x: snapX(this.x), y: snapY(this.y) });
        },
        onRelease() {
          const finalX = snapX(this.x);
          const finalY = snapY(this.y);

          gsap
            .timeline({ defaults: { overwrite: true } })
            .to(el, {
              x: finalX,
              y: finalY,
              scale: 1,
              rotate: 0,
              boxShadow: "0 0 0 rgba(0,0,0,0.04)",
              duration: 0.25,
              ease: "power2.out",
            })
            .to(placeholder, { opacity: 0, duration: 0.2 }, "<");
        },
        onDragEnd() {
          gsap.to(placeholder, {
            opacity: 0,
            duration: 0.2,
          });
          gsap.set(placeholder, {
            clearProps: "opacity,duration,zIndex",
          });
          gsap.set(el, {
            clearProps: "zIndex",
          });
        },
      })[0];

      dragRef.current = drag;

      // 布局稳定后一帧再校准 bounds
      requestAnimationFrame(() => drag?.applyBounds(containerRef.current!));

      gsap.set(placeholder, {
        clearProps: "all",
      });

      // 节流 resize / observer 更新
      let ticking = false;
      const updateLayout = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          if (!drag) return;
          drag.applyBounds(containerRef.current!);
          drag.vars.snap = { x: snapX, y: snapY }; // 列数或 gap 可能变化
        });
      };

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
  });

  return (
    <>
      <div
        ref={blockRef}
        role="group"
        className={`group relative w-full z-10 h-full rounded-2xl border duration-100 overflow-hidden shadow-black/5 border-primary/20 bg-white flex items-center justify-center text-primary/70 ${className}`}
      >
        {children}
        <div
          ref={dragTriggerRef}
          className="absolute top-0 left-0 right-0 mx-auto flex justify-center overflow-hidden"
        >
          <Ellipsis className="transform opacity-0 group-hover:opacity-30 transition-all duration-300 ease-out" />
        </div>
      </div>
      <div
        ref={placeholderRef}
        className="absolute top-0 left-0 w-full h-full duration-300 border-2 border-dashed border-primary/40 rounded-2xl pointer-events-none bg-primary/20 backdrop-blur-2xl"
      ></div>
    </>
  );
}
