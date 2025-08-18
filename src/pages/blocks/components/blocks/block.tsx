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
      className={`rounded-2xl border overflow-hidden shadow-black/5 border-primary/20 bg-white flex items-center justify-center text-primary/70 ${className}`}
    >
      {children}
    </div>
  );
}
