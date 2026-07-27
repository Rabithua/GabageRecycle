import PageMeta from "@/components/PageMeta";
import { localizedPath } from "@/seo/render";
import { useTranslation } from "react-i18next";
import { notFoundMeta } from "./meta";

export default function NotFound() {
  const { t, i18n } = useTranslation("translation", {
    keyPrefix: "page.notFound",
  });
  const locale = i18n.resolvedLanguage?.startsWith("zh") ? "zh" : "en";

  return (
    <>
      <PageMeta metadata={notFoundMeta} />
      <main className="w-dvw min-h-dvh flex flex-col items-center justify-center gap-4 px-6 text-center font-basic grid-background">
        <h1 className="text-7xl font-semibold text-primary">404</h1>
        <p className="text-lg text-gray-500">{t("message")}</p>
        <a
          href={localizedPath("/", locale)}
          className="relative z-10 rounded-full bg-primary px-5 py-2 text-white transition-opacity hover:opacity-80"
        >
          {t("backHome")}
        </a>
      </main>
    </>
  );
}
