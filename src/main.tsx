import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/home";
import Tree from "./pages/tree";
import Apple from "./pages/apple";
import Scroll from "./pages/scroll";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Scroll />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tree" element={<Tree />} />
        <Route path="/apple" element={<Apple />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
