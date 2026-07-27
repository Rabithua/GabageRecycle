import {
  getLocaleFromPath,
  localizedPath,
  stripLocalePath,
} from "@/seo/render";
import { useLocation } from "react-router";

export default function LanguageSwitch() {
  const { pathname, search, hash } = useLocation();
  const currentLocale = getLocaleFromPath(pathname);
  const targetLocale = currentLocale === "en" ? "zh" : "en";
  const targetPath = localizedPath(stripLocalePath(pathname), targetLocale);
  const targetUrl = `${targetPath}${search}${hash}`;
  const targetLabel = targetLocale === "zh" ? "中文" : "EN";

  return (
    <a
      href={targetUrl}
      hrefLang={targetLocale === "zh" ? "zh-CN" : "en"}
      rel="alternate"
      aria-label={
        targetLocale === "zh" ? "切换到中文" : "Switch to English"
      }
      className="fixed right-4 top-4 z-50 rounded-full border border-black/5 bg-white/80 px-3 py-1.5 text-xs font-medium text-black shadow-sm backdrop-blur-md transition-colors hover:bg-white"
    >
      {targetLabel}
    </a>
  );
}
