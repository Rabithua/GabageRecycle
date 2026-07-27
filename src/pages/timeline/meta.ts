import type { PageSeo } from "../../seo/types";

export const timelineMeta = {
  path: "/",
  title: "Rabithua｜前端开发、UI 与交互设计作品集",
  titleEn: "Rabithua | Front-end, UI & Interaction Design Portfolio",
  description:
    "Rabithua（于长野）的个人作品集，记录前端开发、UI 与交互设计、摄影及独立创作实践。",
  descriptionEn:
    "Rabithua's personal portfolio of front-end development, UI and interaction design, photography, and independent creative experiments.",
  imageAlt: "Rabithua 的废物回收个人作品集",
  imageAltEn: "Rabithua's Garbage Recycle portfolio",
  openGraphType: "profile",
  schemaType: "ProfilePage",
} as const satisfies PageSeo;
