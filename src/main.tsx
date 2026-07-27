import "@/i18n/i18n";
import type { JSX } from "react";
import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";

import LanguageSwitch from "./components/LanguageSwitch";
import LoadingFallback from "./components/LoadingFallback";
import LocaleSync from "./components/LocaleSync";
import NotFound from "./pages/notFound";
import {
  localizedPath,
  SUPPORTED_LOCALES,
} from "./seo/render";
import {
  pageSeoRegistry,
  type CanonicalPagePath,
} from "./seo/registry";

const DesignConcepts = lazy(() => import("./pages/366DesignConcepts"));
const Apple = lazy(() => import("./pages/apple"));
const Apple2025 = lazy(() => import("./pages/apple2025"));
const Block = lazy(() => import("./pages/blocks"));
const Home = lazy(() => import("./pages/home"));
const Scroll = lazy(() => import("./pages/scroll"));
const Timeline = lazy(() => import("./pages/timeline"));
const Tree = lazy(() => import("./pages/tree"));

const canonicalPageRenderers: Record<
  CanonicalPagePath,
  () => JSX.Element
> = {
  "/": () => <Timeline />,
  "/blocks": () => <Block />,
  "/scroll": () => <Scroll />,
  "/home": () => <Home />,
  "/tree": () => <Tree />,
  "/apple": () => <Apple />,
  "/apple2025": () => <Apple2025 />,
  "/366designconcepts/0": () => <DesignConcepts day={0} />,
  "/366designconcepts/1": () => <DesignConcepts day={1} />,
  "/366designconcepts/2": () => <DesignConcepts day={2} />,
  "/366designconcepts/3": () => <DesignConcepts day={3} />,
  "/366designconcepts/4": () => <DesignConcepts day={4} />,
};

const routeAliases = [
  { path: "/timeline", render: () => <Timeline /> },
  {
    path: "/366designconcepts-dayone",
    render: () => <DesignConcepts day={0} />,
  },
  { path: "/366designconcepts/:day", render: () => <DesignConcepts /> },
  { path: "/366/:day", render: () => <DesignConcepts /> },
] as const;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <LocaleSync />
      <LanguageSwitch />
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {SUPPORTED_LOCALES.flatMap((locale) => [
            ...pageSeoRegistry.map((metadata) => (
              <Route
                key={`${locale}:${metadata.path}`}
                path={localizedPath(metadata.path, locale)}
                element={canonicalPageRenderers[metadata.path]()}
              />
            )),
            ...routeAliases.map((alias) => (
              <Route
                key={`${locale}:${alias.path}`}
                path={localizedPath(alias.path, locale)}
                element={alias.render()}
              />
            )),
          ])}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>
);
