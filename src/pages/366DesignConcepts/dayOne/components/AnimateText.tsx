import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(SplitText);

export default function AnimateText({
  children,
}: {
  children: React.ReactNode;
}) {
  const textRef = useRef(null);

  useGSAP(
    () => {
      const split = new SplitText(textRef.current, {
        type: "words, chars",
      });

      gsap.from(split.chars, {
        duration: 2,
        opacity: 0,
        filter: "blur(2px)",
        stagger: 0.1,
        ease: "expo.out",
        immediateRender: true,
      });
    },
    { scope: textRef }
  );

  return <p ref={textRef}>{children}</p>;
}
