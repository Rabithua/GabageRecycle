import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(SplitText);

export default function AnimateText({
  children,
  type = "lines",
  vars = {
    opacity: 0,
    duration: 2,
    stagger: 0.1,
    filter: "blur(32px)",
    ease: "expo.out",
    immediateRender: true,
  },
}: {
  children: React.ReactNode;
  type?: "lines" | "words" | "chars";
  vars?: gsap.TweenVars;
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
        ...vars,
      });
    },
    { scope: textRef }
  );

  return <p ref={textRef}>{children}</p>;
}
