import { designConceptsMeta } from "../pages/366DesignConcepts/meta";
import { appleMeta } from "../pages/apple/meta";
import { apple2025Meta } from "../pages/apple2025/meta";
import { blocksMeta } from "../pages/blocks/meta";
import { homeMeta } from "../pages/home/meta";
import { notFoundMeta } from "../pages/notFound/meta";
import { scrollMeta } from "../pages/scroll/meta";
import { timelineMeta } from "../pages/timeline/meta";
import { treeMeta } from "../pages/tree/meta";
import {
  getLocaleFromPath,
  resolveLocalizedSeo,
  stripLocalePath,
} from "./render";
import type { PageSeo, ResolvedPageSeo } from "./types";

export const pageSeoRegistry = [
  timelineMeta,
  blocksMeta,
  scrollMeta,
  homeMeta,
  treeMeta,
  appleMeta,
  apple2025Meta,
  ...designConceptsMeta,
] as const satisfies readonly PageSeo[];

export type CanonicalPagePath = (typeof pageSeoRegistry)[number]["path"];

const pageSeoByPath = new Map<string, PageSeo>(
  pageSeoRegistry.map((metadata) => [metadata.path, metadata])
);

if (pageSeoByPath.size !== pageSeoRegistry.length) {
  throw new Error("Every page meta must use a unique canonical path.");
}

function normalizePathname(pathname: string): string {
  const cleanPath = pathname.split(/[?#]/, 1)[0].toLowerCase();
  const withoutIndex = cleanPath === "/index.html" ? "/" : cleanPath;
  const withoutHtml =
    withoutIndex !== "/" && withoutIndex.endsWith(".html")
      ? withoutIndex.slice(0, -5)
      : withoutIndex;

  return withoutHtml.length > 1
    ? withoutHtml.replace(/\/+$/, "")
    : withoutHtml || "/";
}

export function resolvePageSeo(pathname: string): ResolvedPageSeo {
  const locale = getLocaleFromPath(pathname);
  const normalizedPath = normalizePathname(stripLocalePath(pathname));
  const directMatch = pageSeoByPath.get(normalizedPath);

  if (directMatch) return resolveLocalizedSeo(directMatch, locale);
  if (normalizedPath === "/timeline") {
    return resolveLocalizedSeo(timelineMeta, locale);
  }
  if (normalizedPath === "/366designconcepts-dayone") {
    return resolveLocalizedSeo(designConceptsMeta[0], locale);
  }

  const shortDesignPath = normalizedPath.match(/^\/366\/([0-4])$/);
  if (shortDesignPath) {
    return resolveLocalizedSeo(
      designConceptsMeta[Number(shortDesignPath[1])],
      locale
    );
  }

  return resolveLocalizedSeo(notFoundMeta, locale);
}

export { notFoundMeta };
