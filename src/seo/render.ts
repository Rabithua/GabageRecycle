import type {
  PageSeo,
  ResolvedPageSeo,
  SiteLocale,
} from "./types";

export const SITE_URL = "https://zzfw.cc";
export const SITE_NAME = "Rabithua";
export const DEFAULT_IMAGE_PATH = "/pages/home/cat.png";
export const DEFAULT_ROBOTS =
  "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";
export const SITE_DESCRIPTION =
  "Rabithua（于长野）的个人作品集，记录前端开发、UI 与交互设计、摄影及独立创作实践。";
export const SITE_DESCRIPTION_EN =
  "Rabithua's personal portfolio of front-end development, UI and interaction design, photography, and independent creative experiments.";
export const DEFAULT_LOCALE: SiteLocale = "en";
export const SUPPORTED_LOCALES = ["en", "zh"] as const satisfies readonly SiteLocale[];

export function getLocaleFromPath(pathname: string): SiteLocale {
  const cleanPath = pathname.split(/[?#]/, 1)[0].toLowerCase();
  return cleanPath === "/zh" || cleanPath.startsWith("/zh/") ? "zh" : "en";
}

export function stripLocalePath(pathname: string): string {
  const cleanPath = pathname.split(/[?#]/, 1)[0];
  const locale = getLocaleFromPath(cleanPath);

  if (locale === "en") return cleanPath || "/";

  const pathWithoutLocale = cleanPath.slice(3);
  return pathWithoutLocale || "/";
}

export function localizedPath(path: string, locale: SiteLocale): string {
  if (locale === "en") return path;
  return path === "/" ? "/zh" : `/zh${path}`;
}

export function resolveLocalizedSeo(
  metadata: PageSeo,
  locale: SiteLocale
): ResolvedPageSeo {
  const englishPath = localizedPath(metadata.path, "en");
  const chinesePath = localizedPath(metadata.path, "zh");
  const isChinese = locale === "zh";

  return {
    path: isChinese ? chinesePath : englishPath,
    locale,
    language: isChinese ? "zh-CN" : "en",
    title: isChinese ? metadata.title : metadata.titleEn,
    description: isChinese ? metadata.description : metadata.descriptionEn,
    imagePath: metadata.imagePath,
    imageAlt: isChinese
      ? metadata.imageAlt
      : (metadata.imageAltEn ?? metadata.imageAlt),
    openGraphType: metadata.openGraphType,
    schemaType: metadata.schemaType,
    robots: metadata.robots,
    alternates: [
      { hrefLang: "en", path: englishPath },
      { hrefLang: "zh-CN", path: chinesePath },
      { hrefLang: "x-default", path: englishPath },
    ],
  };
}

export function absoluteUrl(path: string): string {
  if (path.startsWith("https://") || path.startsWith("http://")) {
    return path;
  }

  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}/${path.replace(/^\/+/, "")}`;
}

export function createStructuredData(metadata: ResolvedPageSeo) {
  const canonicalUrl = absoluteUrl(metadata.path);
  const imageUrl = absoluteUrl(metadata.imagePath ?? DEFAULT_IMAGE_PATH);
  const personId = `${SITE_URL}/#person`;
  const websiteUrl = absoluteUrl(localizedPath("/", metadata.locale));
  const websiteId = `${websiteUrl}#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: "于长野",
        alternateName: "Rabithua",
        url: SITE_URL,
        image: imageUrl,
        sameAs: ["https://github.com/rabithua", "https://x.com/rabithua"],
        knowsAbout: [
          "Front-end development",
          "UI design",
          "Interaction design",
          "Photography",
        ],
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: websiteUrl,
        name: SITE_NAME,
        alternateName: "废物回收",
        description:
          metadata.locale === "zh" ? SITE_DESCRIPTION : SITE_DESCRIPTION_EN,
        inLanguage: metadata.language,
        creator: { "@id": personId },
      },
      {
        "@type": metadata.schemaType ?? "WebPage",
        "@id": `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: metadata.title,
        description: metadata.description,
        image: imageUrl,
        isPartOf: { "@id": websiteId },
        author: { "@id": personId },
        inLanguage: metadata.language,
        ...(metadata.schemaType === "ProfilePage"
          ? { mainEntity: { "@id": personId } }
          : {}),
      },
    ],
  };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function escapeXml(value: string): string {
  return escapeHtml(value).replaceAll("'", "&apos;");
}

export function renderSeoHead(metadata: ResolvedPageSeo): string {
  const canonicalUrl = absoluteUrl(metadata.path);
  const imageUrl = absoluteUrl(metadata.imagePath ?? DEFAULT_IMAGE_PATH);
  const robots = metadata.robots ?? DEFAULT_ROBOTS;
  const structuredData = JSON.stringify(createStructuredData(metadata)).replaceAll(
    "<",
    "\\u003c"
  );
  const alternateLinks = metadata.alternates.map(
    ({ hrefLang, path }) =>
      `<link rel="alternate" hreflang="${hrefLang}" href="${absoluteUrl(path)}" data-seo-alternate="true" />`
  );
  const locale = metadata.locale === "zh" ? "zh_CN" : "en_US";
  const alternateLocale = metadata.locale === "zh" ? "en_US" : "zh_CN";
  const keywords =
    metadata.locale === "zh"
      ? "Rabithua, 于长野, 前端开发, UI 设计, 交互设计, 个人作品集, React, TypeScript"
      : "Rabithua, Yu Changye, front-end developer, UI design, interaction design, portfolio, React, TypeScript";

  return [
    `<title>${escapeHtml(metadata.title)}</title>`,
    `<meta name="description" content="${escapeHtml(metadata.description)}" />`,
    `<meta name="author" content="Rabithua" />`,
    `<meta name="keywords" content="${keywords}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<meta name="googlebot" content="${robots}" />`,
    `<link rel="canonical" href="${canonicalUrl}" />`,
    `<meta property="og:type" content="${metadata.openGraphType ?? "website"}" />`,
    `<meta property="og:site_name" content="${SITE_NAME}" />`,
    `<meta property="og:locale" content="${locale}" />`,
    `<meta property="og:locale:alternate" content="${alternateLocale}" />`,
    `<meta property="og:title" content="${escapeHtml(metadata.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(metadata.description)}" />`,
    `<meta property="og:url" content="${canonicalUrl}" />`,
    `<meta property="og:image" content="${imageUrl}" />`,
    `<meta property="og:image:type" content="image/png" />`,
    `<meta property="og:image:width" content="512" />`,
    `<meta property="og:image:height" content="512" />`,
    `<meta property="og:image:alt" content="${escapeHtml(metadata.imageAlt ?? metadata.title)}" />`,
    `<meta name="twitter:card" content="summary" />`,
    `<meta name="twitter:creator" content="@rabithua" />`,
    `<meta name="twitter:title" content="${escapeHtml(metadata.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(metadata.description)}" />`,
    `<meta name="twitter:image" content="${imageUrl}" />`,
    `<meta name="twitter:image:alt" content="${escapeHtml(metadata.imageAlt ?? metadata.title)}" />`,
    ...alternateLinks,
    `<script id="structured-data" type="application/ld+json">${structuredData}</script>`,
  ].join("\n    ");
}

export function renderSeoFallback(metadata: ResolvedPageSeo): string {
  const isChinese = metadata.locale === "zh";

  return [
    "<main>",
    `<h1>${escapeHtml(metadata.title)}</h1>`,
    `<p>${escapeHtml(metadata.description)}</p>`,
    `<nav aria-label="${isChinese ? "主要页面" : "Main pages"}">`,
    `<a href="${localizedPath("/", metadata.locale)}">${isChinese ? "关于 Rabithua" : "About Rabithua"}</a>`,
    `<a href="${localizedPath("/blocks", metadata.locale)}">${isChinese ? "作品与联系方式" : "Work and contact"}</a>`,
    `<a href="${localizedPath("/scroll", metadata.locale)}">${isChinese ? "交互作品导览" : "Interactive work"}</a>`,
    `<a href="${localizedPath("/366designconcepts/0", metadata.locale)}">366 Design Concepts</a>`,
    "</nav>",
    "</main>",
  ].join("");
}

export function renderSitemap(pages: readonly PageSeo[]): string {
  const urls = pages
    .flatMap((page) =>
      SUPPORTED_LOCALES.map((locale) => resolveLocalizedSeo(page, locale))
    )
    .map((metadata) => {
      const alternates = metadata.alternates
        .map(
          ({ hrefLang, path }) =>
            `    <xhtml:link rel="alternate" hreflang="${hrefLang}" href="${escapeXml(absoluteUrl(path))}" />`
        )
        .join("\n");

      return `  <url>\n    <loc>${escapeXml(absoluteUrl(metadata.path))}</loc>\n${alternates}\n  </url>`;
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    urls,
    "</urlset>",
    "",
  ].join("\n");
}
