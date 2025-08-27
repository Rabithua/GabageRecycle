import { useGSAP } from "@gsap/react";
import BackgroundText from "../home/components/BackgroudText";
import SliderText from "../home/components/SliderText";
import gsap from "gsap";
import { useRef } from "react";
import { useTranslation } from "react-i18next";

export default function Apple() {
  const { t } = useTranslation("translation", {
    keyPrefix: "page.apple",
  });
  const containerRef = useRef(null); // This should be managed by your routing logic
  const appleRef = useRef(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline();

      timeline
        .from(containerRef.current, {
          opacity: 0,
          duration: 1,
        })
        .to(appleRef.current, {
          scale: 1.05,
          right: "-15%",
          bottom: "-35%",
          duration: 4,
          ease: "elastic.inOut",
          repeat: -1,
          yoyo: true,
        });
    },
    {
      scope: containerRef,
    }
  );
  return (
    <main
      ref={containerRef}
      className="w-dvw h-dvh flex flex-col items-center justify-center grid-background font-basic"
    >
      <BackgroundText text={t("background")} />

      <div className="space-y-4 w-3/5 max-w-150  md:mr-[20%] z-10">
        <h1 className=" font-semibold leading-tight text-5xl pretty-text">
          {t("title")}
        </h1>
        <SliderText>{t("subtitle")}</SliderText>
      </div>

      <div className="w-dvw h-dvh absolute top-0 left-0 overflow-hidden select-none">
        <img
          ref={appleRef}
          id="apple"
          src="/pages/apple/apple.svg"
          alt="Apple"
          className="h-dvh absolute -right-1/5 -bottom-2/5 cursor-pointer object-contain"
        />
      </div>
    </main>
  );
}
