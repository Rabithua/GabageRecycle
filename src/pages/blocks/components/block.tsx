import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/all";

gsap.registerPlugin(Draggable);

export default function Block({
  children,
  className,
  containerRef
}: {
  children: React.ReactNode;
  className?: string;
  containerRef?: React.RefObject<HTMLDivElement>;
}) {
  useGSAP(
    () => {
      const draggable = Draggable.create("#block", {
        bounds: containerRef?.current,
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
      id="block"
      className={`rounded-2xl border duration-500 overflow-hidden hover:scale-102 hover:-rotate-1 hover:shadow-2xl shadow-black/5 border-primary/20 bg-white/60 flex items-center justify-center text-primary/70 ${className}`}
    >
      {children}
    </div>
  );
}
