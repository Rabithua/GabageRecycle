import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(SplitText);

export default function AnimateText({
  children,
  type = "lines",
  duration = 2,
  stagger = 0.5,
  filter,
}: {
  children: React.ReactNode;
  type?: "lines" | "words" | "chars";
  duration?: number;
  stagger?: number;
  filter?: gsap.TweenValue;
}) {
  const textRef = useRef(null);

  useGSAP(
    () => {
      const split = new SplitText(textRef.current, {
        type: "lines, words, chars",
      });

      const target =
        type === "lines"
          ? split.lines
          : type === "words"
            ? split.words
            : split.chars;

      gsap.from(target, {
        duration,
        opacity: 0,
        filter,
        stagger,
        ease: "expo.out",
        immediateRender: true,
      });
    },
    { scope: textRef }
  );

  return <p ref={textRef}>{children}</p>;
}
