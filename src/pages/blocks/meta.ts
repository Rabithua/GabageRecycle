import type { PageSeo } from "../../seo/types";

export const blocksMeta = {
  path: "/blocks",
  title: "作品与联系方式｜Rabithua",
  titleEn: "Work & Contact | Rabithua",
  description:
    "浏览 Rabithua 的开源项目、个人动态、摄影与交互作品，并通过 GitHub、X 等渠道联系。",
  descriptionEn:
    "Explore Rabithua's open-source projects, updates, photography, and interactive work, with links to get in touch.",
  imageAlt: "Rabithua 的作品与联系方式",
  imageAltEn: "Rabithua's work and contact page",
  schemaType: "CollectionPage",
} as const satisfies PageSeo;
