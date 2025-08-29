import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import Timeline from "./components/Timeline";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

export default function TimelinePage() {
  const containerRef = useRef(null);
  const descRef = useRef(null);

  useGSAP(
    () => {
      const split = new SplitText(descRef.current, {
        type: "chars",
      });

      gsap.from(split.chars, {
        opacity: 0,
        filter: "blur(32px)",
        x: -100,
        stagger: 0.05,
        ease: "ease",
        immediateRender: true,
        duration: 0.5,
        scrollTrigger: {
          trigger: descRef.current,
          toggleActions: "play pause resume reset",
          // markers: true,
        },
      });
    },
    {
      scope: containerRef,
    }
  );

  return (
    <main
      ref={containerRef}
      className="font-serif text-primary bg-primary/2"
    >
      <Timeline />

      <div className="w-dvw h-dvh flex flex-col items-center justify-center">
        <h1
          ref={descRef}
          className="w-4/5 max-w-4xl text-2xl sm:text-5xl font-medium leading-tight"
        >
          GAP
          同时在寻找一生所爱的事业（或者在存款耗尽前找到维持生计的工作）。不想被限定为程序开发，在探索
          UI
          和交互设计，如何成为摄影师或者大厨，同时也在学习如何整理好自己的生活。
        </h1>
      </div>

      <div className="fixed top-0 left-0 w-dvw h-dvh shadow-[inset_0_0_30px_30px_#ffffff] pointer-events-none"></div>
    </main>
  );
}
