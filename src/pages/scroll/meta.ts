import type { PageSeo } from "../../seo/types";

export const scrollMeta = {
  path: "/scroll",
  title: "交互作品导览｜Rabithua",
  titleEn: "Interactive Work Gallery | Rabithua",
  description:
    "通过滚动浏览 Rabithua 的猫咪、苹果、树与个人作品卡片等前端动效和交互设计实验。",
  descriptionEn:
    "Scroll through Rabithua's front-end motion and interaction experiments featuring a cat, an apple, a tree, and project cards.",
  imageAlt: "Rabithua 的交互作品导览",
  imageAltEn: "Rabithua's interactive work gallery",
  schemaType: "CollectionPage",
} as const satisfies PageSeo;
