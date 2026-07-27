import type { JSX } from "react";
import PageMeta from "@/components/PageMeta";
import { useTranslation } from "react-i18next";
import { apple2025Meta } from "./meta";

export default function Apple2025(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "page.apple2025",
  });

  return (
    <>
      <PageMeta metadata={apple2025Meta} />
      <main className="w-dvw h-dvh flex items-center justify-center text-[10cqw] font-mono bg-black">
        <h1 className="sr-only">{t("title")}</h1>
        <div className="relative w-2/5 max-w-xs aspect-square overflow-hidden">
          <video
            className="w-full h-full object-cover"
            src="https://public.zzfw.cc/gabagerecycle/apple2025/apple2025.mp4"
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 mix-blend-color-burn opacity-90"
            style={{ background: "radial-gradient(circle, #ffca27, #1101ff)" }}
          ></div>
        </div>
      </main>
    </>
  );
}
