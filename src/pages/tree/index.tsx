import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useTranslation } from "react-i18next";

import { useRef } from "react";
import BackgroundText from "../home/components/BackgroudText";
import SliderText from "../home/components/SliderText";

export default function Tree() {
  const { t } = useTranslation("translation", {
    keyPrefix: "page.tree",
  });
  const containerRef = useRef(null);

  useGSAP(
    () => {
      gsap.from(containerRef.current, {
        duration: 1,
        opacity: 0,
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

      <div className="space-y-4 w-4/5 sm:w-3/5 max-w-150 sm:mr-[20%] z-10">
        <h1 className=" font-semibold leading-tight text-5xl pretty-text">
          {t("title")}
        </h1>
        <SliderText className="text-secondary font-extralight">
          {t("subtitle")}
        </SliderText>
      </div>

      <div className="w-dvw h-dvh absolute top-0 left-0 overflow-hidden select-none">
        <img
          src="/pages/tree/tree.svg"
          alt="Tree"
          className="h-dvh absolute right-0 cursor-pointer object-cover scale-110 blur-lg duration-1000 hover:scale-100 hover:blur-none"
        />
      </div>
    </main>
  );
}
