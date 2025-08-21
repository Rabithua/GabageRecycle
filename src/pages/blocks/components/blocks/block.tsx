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
  const placeholderRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let raf: number | null = null;
    const cleanups: Array<() => void> = [];

    const init = () => {
      if (!containerRef.current) {
        raf = requestAnimationFrame(init);
        return;
      }
      const el = blockRef.current;
      if (!el) return;
      const placeholder = placeholderRef.current;

      const GAP = 16;
      const ROW_HEIGHT = 80;
      const calcColumns = () => {
        const w = window.innerWidth;
        if (w >= 1024) return 12;
        if (w >= 768) return 8;
        return 4;
      };
      const getColumnWidth = () => {
        const rect = containerRef.current!.getBoundingClientRect();
        const cols = calcColumns();
        return (rect.width - GAP * (cols - 1)) / cols;
      };
      const snapX = (endValue: number) => {
        const cw = getColumnWidth();
        return Math.round(endValue / (cw + GAP)) * (cw + GAP);
      };
      const snapY = (endValue: number) =>
        Math.round(endValue / (ROW_HEIGHT + GAP)) * (ROW_HEIGHT + GAP);
      const getGridSnapPosition = (x: number, y: number) => ({
        x: snapX(x),
        y: snapY(y),
      });

      const draggable = Draggable.create(el, {
        bounds: containerRef.current,
        inertia: false,
        snap: { x: snapX, y: snapY },
        onPress() {
          if (!placeholder) return;
          gsap.set(placeholder, { opacity: 1 });
          gsap.to(el, {
            scale: 1.02,
            rotate: -1,
            boxShadow: "0 4px 16px rgba(0,0,0,0.05)",
            duration: 0.4,
            overwrite: true,
          });
          draggable[0].applyBounds(containerRef.current!);
        },
        onDrag() {
          if (!placeholder) return;
          const snapPos = getGridSnapPosition(this.x, this.y);
          gsap.set(placeholder, { x: snapPos.x, y: snapPos.y });
        },
        onRelease() {
          if (!placeholder) return;
          gsap.to(el, {
            scale: 1,
            rotate: 0,
            boxShadow: "0 0 0 rgba(0,0,0,0.05)",
            duration: 0.25,
            ease: "power2.out",
            overwrite: true,
          });
          gsap.to(placeholder, { opacity: 0, duration: 0.25 });
        },
        onDragEnd() {
          if (!placeholder) return;
          gsap.to(placeholder, { opacity: 0, duration: 0.25 });
        },
      });

      // next frame ensure bounds after layout
      requestAnimationFrame(() => {
        if (draggable[0]) draggable[0].applyBounds(containerRef.current!);
      });

      if (placeholder) gsap.set(placeholder, { opacity: 0 });

      const ro = new ResizeObserver(() => {
        if (!draggable[0]) return;
        draggable[0].applyBounds(containerRef.current!);
        draggable[0].vars.snap = { x: snapX, y: snapY };
      });
      ro.observe(containerRef.current!);
      cleanups.push(() => ro.disconnect());

      const handleResize = () => {
        if (!draggable[0]) return;
        draggable[0].applyBounds(containerRef.current!);
        draggable[0].vars.snap = { x: snapX, y: snapY };
      };
      window.addEventListener("resize", handleResize);
      cleanups.push(() => window.removeEventListener("resize", handleResize));

      cleanups.push(() => draggable.forEach((d) => d.kill()));
    };

    init();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      cleanups.forEach((fn) => fn());
    };
  });

  return (
    <>
      <div
        ref={blockRef}
        className={`w-full z-10 h-full rounded-2xl border duration-100 overflow-hidden shadow-black/5 border-primary/20 bg-white flex items-center justify-center text-primary/70 ${className}`}
      >
        {children}
      </div>
      <div
        ref={placeholderRef}
        className="absolute top-0 left-0 w-full h-full border-2 border-dashed border-primary/40 rounded-2xl pointer-events-none z-5"
      ></div>
    </>
  );
}
