export type SiteLocale = "en" | "zh";

export interface PageSeo {
  path: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  imagePath?: string;
  imageAlt?: string;
  imageAltEn?: string;
  openGraphType?: "website" | "profile";
  schemaType?: "WebPage" | "ProfilePage" | "CollectionPage";
  robots?: string;
}

export interface SeoAlternate {
  hrefLang: "en" | "zh-CN" | "x-default";
  path: string;
}

export interface ResolvedPageSeo {
  path: string;
  locale: SiteLocale;
  language: "en" | "zh-CN";
  title: string;
  description: string;
  imagePath?: string;
  imageAlt?: string;
  openGraphType?: "website" | "profile";
  schemaType?: "WebPage" | "ProfilePage" | "CollectionPage";
  robots?: string;
  alternates: SeoAlternate[];
}
