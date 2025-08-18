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
  containerRef?: React.RefObject<HTMLDivElement>;
}) {
  const blockRef = useRef<HTMLDivElement>(null);
  useGSAP(
    () => {
      const el = blockRef.current;
      const draggable = Draggable.create(el, {
        bounds: containerRef?.current,
        onPress() {
          if (el) {
            gsap.to(el, {
              scale: 1.02,
              rotate: -1,
              duration: 0.2,
              overwrite: true,
            });
          }
        },
        onRelease() {
          if (el) {
            gsap.to(el, {
              scale: 1,
              rotate: 0,
              duration: 0.2,
              overwrite: true,
            });
          }
        },
        onDragEnd() {
          if (el) {
            gsap.to(el, {
              scale: 1,
              rotate: 0,
              duration: 0.2,
              overwrite: true,
            });
          }
        },
      });

      return () => {
        draggable.forEach((d) => d.kill());
      };
    },
    {
      scope: containerRef?.current,
    }
  );

  return (
    <div
      ref={blockRef}
      className={`rounded-2xl border duration-500 overflow-hidden hover:scale-102 hover:-rotate-1 hover:shadow-2xl shadow-black/5 border-primary/20 bg-white/60 flex items-center justify-center text-primary/70 ${className}`}
    >
      {children}
    </div>
  );
}
