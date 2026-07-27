import i18n from "@/i18n/i18n";
import { getLocaleFromPath } from "@/seo/render";
import { useEffect } from "react";
import { useLocation } from "react-router";

export default function LocaleSync() {
  const { pathname } = useLocation();

  useEffect(() => {
    const locale = getLocaleFromPath(pathname);
    if (i18n.resolvedLanguage !== locale) {
      void i18n.changeLanguage(locale);
    }
  }, [pathname]);

  return null;
}
