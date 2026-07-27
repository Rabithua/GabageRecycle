import type { PageSeo } from "../../seo/types";

export const treeMeta = {
  path: "/tree",
  title: "种一棵树：网页动效实验｜Rabithua",
  titleEn: "Plant a Tree: Web Motion Experiment | Rabithua",
  description:
    "围绕“种一棵树最好的时间”创作的响应式网页插画、文字与悬停动效实验。",
  descriptionEn:
    "A responsive web illustration and hover-motion experiment inspired by the idea that the next best time to plant a tree is now.",
  imageAlt: "种一棵树网页动效实验",
  imageAltEn: "Plant a Tree web motion experiment",
} as const satisfies PageSeo;
