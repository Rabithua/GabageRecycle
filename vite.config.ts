import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import type { Plugin } from "vite";
import {
  renderSitemap,
  renderSeoFallback,
  renderSeoHead,
  resolveLocalizedSeo,
  SUPPORTED_LOCALES,
} from "./src/seo/render";
import {
  notFoundMeta,
  pageSeoRegistry,
  resolvePageSeo,
} from "./src/seo/registry";
import type { ResolvedPageSeo } from "./src/seo/types";

const SEO_HEAD_PATTERN =
  /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/;
const SEO_FALLBACK_PATTERN =
  /<!-- seo-fallback:start -->[\s\S]*?<!-- seo-fallback:end -->/;

function applySeoMetadata(html: string, metadata: ResolvedPageSeo): string {
  return html
    .replace(
      /<html lang="[^"]*">/,
      `<html lang="${metadata.language}">`
    )
    .replace(
      SEO_HEAD_PATTERN,
      `<!-- seo:start -->\n    ${renderSeoHead(metadata)}\n    <!-- seo:end -->`
    )
    .replace(
      SEO_FALLBACK_PATTERN,
      `<!-- seo-fallback:start -->${renderSeoFallback(metadata)}<!-- seo-fallback:end -->`
    );
}

function seoPagesPlugin(): Plugin {
  return {
    name: "seo-pages",
    enforce: "pre",
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const requestUrl = (request as { url?: string }).url;

        if (requestUrl?.split("?", 1)[0] !== "/sitemap.xml") {
          next();
          return;
        }

        response.statusCode = 200;
        response.setHeader("Content-Type", "application/xml; charset=utf-8");
        response.end(renderSitemap(pageSeoRegistry));
      });
    },
    transformIndexHtml(html, context) {
      return applySeoMetadata(
        html,
        resolvePageSeo(context.originalUrl ?? context.path)
      );
    },
    generateBundle: {
      order: "post",
      handler(_options, bundle) {
        const rootPage = bundle["index.html"];

        if (!rootPage || rootPage.type !== "asset") {
          throw new Error(
            "SEO page generation requires the built index.html asset."
          );
        }

        const rootHtml = rootPage.source.toString();

        for (const pageMetadata of pageSeoRegistry) {
          for (const locale of SUPPORTED_LOCALES) {
            const metadata = resolveLocalizedSeo(pageMetadata, locale);
            if (metadata.path === "/") continue;

            this.emitFile({
              type: "asset",
              fileName: `${metadata.path.slice(1)}.html`,
              source: applySeoMetadata(rootHtml, metadata),
            });
          }
        }

        for (const locale of SUPPORTED_LOCALES) {
          const metadata = resolveLocalizedSeo(notFoundMeta, locale);

          this.emitFile({
            type: "asset",
            fileName:
              locale === "en"
                ? "404.html"
                : `${metadata.path.slice(1)}.html`,
            source: applySeoMetadata(rootHtml, metadata),
          });
        }

        this.emitFile({
          type: "asset",
          fileName: "sitemap.xml",
          source: renderSitemap(pageSeoRegistry),
        });
      },
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), seoPagesPlugin()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
