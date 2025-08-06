import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function BackgroundText({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from("#tb", {
        y: "10%",
        x: "10%",
        filter: "blur(128px)",
        duration: 5,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      id="background"
      className="w-dvw h-dvh absolute top-0 left-0 overflow-hidden -z-1"
    >
      <div
        id="tb"
        className="text-primary text-[18rem] absolute top-0 w-dvw h-dvh blur-[100px]"
      >
        {text}
      </div>
    </div>
  );
}
