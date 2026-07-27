import type { PageSeo } from "../../seo/types";

export const appleMeta = {
  path: "/apple",
  title: "一颗苹果：网页动效实验｜Rabithua",
  titleEn: "Just an Apple: Web Motion Experiment | Rabithua",
  description:
    "以苹果插画、弹性动画和幽默文案构成的响应式网页交互设计实验。",
  descriptionEn:
    "A responsive interaction design experiment combining an apple illustration, elastic motion, and playful copy.",
  imageAlt: "一颗苹果网页动效实验",
  imageAltEn: "Just an Apple web motion experiment",
} as const satisfies PageSeo;
