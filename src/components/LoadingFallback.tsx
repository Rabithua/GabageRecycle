import { useTranslation } from "react-i18next";

export default function LoadingFallback() {
  const { i18n } = useTranslation();
  const message = i18n.resolvedLanguage?.startsWith("zh")
    ? "正在加载…"
    : "Loading…";

  return (
    <div
      role="status"
      className="w-dvw h-dvh flex items-center justify-center font-basic text-primary"
    >
      {message}
    </div>
  );
}
