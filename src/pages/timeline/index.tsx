import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import ScrollSmoother from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";

import { useRef } from "react";
import { useTranslation } from "react-i18next";
import Timeline from "./components/Timeline";
import PrimarySpan from "./components/timeline/PrimarySpan";

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function TimelinePage() {
  const containerRef = useRef(null);
  const scrollContentRef = useRef(null);
  const descRef = useRef(null);
  const { t } = useTranslation("translation", {
    keyPrefix: "page.timeline",
  });

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

      ScrollSmoother.create({
        smooth: 1,
        effects: true,
        wrapper: containerRef.current,
        content: scrollContentRef.current,
      });
    },
    {
      scope: containerRef,
    }
  );

  return (
    <main
      ref={containerRef}
      className="font-serif text-primary grid-background"
    >
      <div ref={scrollContentRef} className="pt-24">
        <Timeline t={t} />
        <div className="w-dvw h-dvh flex flex-col items-center justify-center">
          <h1
            ref={descRef}
            className="w-4/5 max-w-4xl text-2xl sm:text-5xl font-medium leading-tight"
          >
            {t("motto")}
            <PrimarySpan>{t("mottoHighlight")}</PrimarySpan>
          </h1>
        </div>
      </div>

      <div className="fixed top-0 left-0 w-dvw h-dvh shadow-[inset_0_0_30px_30px_#ffffff] pointer-events-none"></div>
    </main>
  );
}
