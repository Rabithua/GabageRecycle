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

      const split = new SplitText(textRef.current, {
        type: "words, chars",
      });

      gsap.from(split.chars, {
        duration: 2,
        opacity: 0,
        filter: "blur(32px)",
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
