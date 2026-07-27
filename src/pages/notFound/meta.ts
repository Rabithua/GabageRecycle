import type { PageSeo } from "../../seo/types";

export const notFoundMeta = {
  path: "/404",
  title: "页面未找到｜Rabithua",
  titleEn: "Page Not Found | Rabithua",
  description: "该页面不存在或已被移动，请返回 Rabithua 的个人作品集首页。",
  descriptionEn:
    "This page does not exist or has moved. Return to Rabithua's portfolio.",
  imageAlt: "Rabithua 的个人作品集",
  imageAltEn: "Rabithua's portfolio",
  robots: "noindex,nofollow",
} as const satisfies PageSeo;
