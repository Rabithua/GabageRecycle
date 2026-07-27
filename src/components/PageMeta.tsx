import {
  absoluteUrl,
  createStructuredData,
  DEFAULT_IMAGE_PATH,
  DEFAULT_ROBOTS,
  resolveLocalizedSeo,
  SITE_NAME,
} from "@/seo/render";
import type {
  PageSeo,
  SeoAlternate,
  SiteLocale,
} from "@/seo/types";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

type MetaAttribute = "name" | "property";

function setMeta(
  attribute: MetaAttribute,
  key: string,
  content: string
): void {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
}

function setCanonical(href: string): void {
  let element =
    document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }

  element.href = href;
}

function setStructuredData(data: ReturnType<typeof createStructuredData>): void {
  let element = document.head.querySelector<HTMLScriptElement>(
    'script[type="application/ld+json"]#structured-data'
  );

  if (!element) {
    element = document.createElement("script");
    element.id = "structured-data";
    element.type = "application/ld+json";
    document.head.appendChild(element);
  }

  element.textContent = JSON.stringify(data);
}

function setAlternateLinks(alternates: SeoAlternate[]): void {
  document.head
    .querySelectorAll('link[data-seo-alternate="true"]')
    .forEach((element) => element.remove());

  for (const alternate of alternates) {
    const element = document.createElement("link");
    element.rel = "alternate";
    element.hreflang = alternate.hrefLang;
    element.href = absoluteUrl(alternate.path);
    element.dataset.seoAlternate = "true";
    document.head.appendChild(element);
  }
}

export default function PageMeta({ metadata }: { metadata: PageSeo }) {
  const { i18n } = useTranslation();
  const language = i18n.resolvedLanguage ?? i18n.language ?? "en";

  useEffect(() => {
    const locale: SiteLocale = language.toLowerCase().startsWith("zh")
      ? "zh"
      : "en";
    const localizedMetadata = resolveLocalizedSeo(metadata, locale);
    const canonicalUrl = absoluteUrl(localizedMetadata.path);
    const imageUrl = absoluteUrl(
      localizedMetadata.imagePath ?? DEFAULT_IMAGE_PATH
    );
    const robots = localizedMetadata.robots ?? DEFAULT_ROBOTS;
    const isChinese = language.toLowerCase().startsWith("zh");

    document.documentElement.lang = isChinese ? "zh-CN" : "en";
    document.title = localizedMetadata.title;

    setMeta("name", "description", localizedMetadata.description);
    setMeta("name", "author", "Rabithua");
    setMeta(
      "name",
      "keywords",
      isChinese
        ? "Rabithua, 于长野, 前端开发, UI 设计, 交互设计, 个人作品集, React, TypeScript"
        : "Rabithua, Yu Changye, front-end developer, UI design, interaction design, portfolio, React, TypeScript"
    );
    setMeta("name", "robots", robots);
    setMeta("name", "googlebot", robots);
    setMeta(
      "property",
      "og:type",
      localizedMetadata.openGraphType ?? "website"
    );
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:locale", isChinese ? "zh_CN" : "en_US");
    setMeta(
      "property",
      "og:locale:alternate",
      isChinese ? "en_US" : "zh_CN"
    );
    setMeta("property", "og:title", localizedMetadata.title);
    setMeta("property", "og:description", localizedMetadata.description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:image", imageUrl);
    setMeta("property", "og:image:type", "image/png");
    setMeta("property", "og:image:width", "512");
    setMeta("property", "og:image:height", "512");
    setMeta(
      "property",
      "og:image:alt",
      localizedMetadata.imageAlt ?? localizedMetadata.title
    );
    setMeta("name", "twitter:card", "summary");
    setMeta("name", "twitter:creator", "@rabithua");
    setMeta("name", "twitter:title", localizedMetadata.title);
    setMeta("name", "twitter:description", localizedMetadata.description);
    setMeta("name", "twitter:image", imageUrl);
    setMeta(
      "name",
      "twitter:image:alt",
      localizedMetadata.imageAlt ?? localizedMetadata.title
    );

    setCanonical(canonicalUrl);
    setAlternateLinks(localizedMetadata.alternates);
    setStructuredData(createStructuredData(localizedMetadata));
  }, [language, metadata]);

  return null;
}
