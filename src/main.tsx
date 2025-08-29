import "@/i18n/i18n";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";

import Apple from "./pages/apple";
import Block from "./pages/blocks";
import Home from "./pages/home";
import Scroll from "./pages/scroll";
import Template from "./pages/template";
import Timeline from "./pages/timeline";
import Tree from "./pages/tree";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Scroll />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tree" element={<Tree />} />
        <Route path="/apple" element={<Apple />} />
        <Route path="/blocks" element={<Block />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/template" element={<Template />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
