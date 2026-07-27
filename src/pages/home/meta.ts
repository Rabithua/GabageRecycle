import type { PageSeo } from "../../seo/types";

export const homeMeta = {
  path: "/home",
  title: "废物回收：猫咪互动实验｜Rabithua",
  titleEn: "Garbage Recycle: Cat Interaction | Rabithua",
  description:
    "一只可以投喂的猫咪与文字动效组成的趣味前端交互实验，来自 Rabithua 的废物回收作品集。",
  descriptionEn:
    "A playful front-end experiment with a treat-catching cat and animated typography from Rabithua's Garbage Recycle portfolio.",
  imageAlt: "废物回收猫咪互动实验",
  imageAltEn: "Garbage Recycle cat interaction experiment",
} as const satisfies PageSeo;
