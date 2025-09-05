import "@/i18n/i18n";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";

import DesignConcepts from "./pages/366DesignConcepts/dayOne";
import Apple from "./pages/apple";
import Block from "./pages/blocks";
import Home from "./pages/home";
import Scroll from "./pages/scroll";
import Timeline from "./pages/timeline";
import Tree from "./pages/tree";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Timeline />} />
        <Route path="/scroll" element={<Scroll />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tree" element={<Tree />} />
        <Route path="/apple" element={<Apple />} />
        <Route path="/blocks" element={<Block />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/366designconcepts-dayone" element={<DesignConcepts />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
