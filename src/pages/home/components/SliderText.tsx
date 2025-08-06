import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";
import gsap from "gsap";

gsap.registerPlugin(SplitText);

export default function SliderText({
  children,
}: {
  children: React.ReactNode;
}) {
  const containerRef = useRef(null);
  const textRef = useRef(null);

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

      const split = new SplitText(textRef.current, {
        type: "lines",
        linesClass: "line",
      });

      gsap.from(split.lines, {
        duration: 2,
        opacity: 0,
        x: -100,
        stagger: 0.1,
        ease: "expo.out",
        immediateRender: true,
      });
    },
    { scope: containerRef }
  );

  return (
    <p ref={textRef} className="text-secondary font-extralight">
      {children}
    </p>
  );
}
