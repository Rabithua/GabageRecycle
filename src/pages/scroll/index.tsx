import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import Apple from "@/pages/apple";
import Home from "@/pages/home";
import Tree from "@/pages/tree";
import { ChevronsUp } from "lucide-react";
import Blocks from "../blocks";

gsap.registerPlugin(Observer);

const pages = [<Home />, <Apple />, <Tree />, <Blocks />];

export default function FadingScroll() {
  const { t } = useTranslation("translation", {
    keyPrefix: "page.scroll",
  });

  const containerRef = useRef(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  useGSAP(
    (_context, contextSafe) => {
      let isAnimating = false;
      const changePage = contextSafe!((type: "up" | "down") => {
        if (isAnimating) return;
        isAnimating = true;

        if (type === "up") {
          // Add logic to change to the previous page
          setCurrentPageIndex((prevIndex) => {
            const newIndex =
              prevIndex - 1 < 0 ? pages.length - 1 : prevIndex - 1;
            return newIndex;
          });
        } else {
          // Add logic to change to the next page
          setCurrentPageIndex((prevIndex) => {
            const newIndex = prevIndex + 1 >= pages.length ? 0 : prevIndex + 1;
            return newIndex;
          });
        }

        // default animation duration 500
        setTimeout(() => {
          isAnimating = false;
        }, 1000);
      });

      Observer.create({
        target: window,
        type: "wheel,touch,scroll,pointer",
        dragMinimum: 10,
        tolerance: 10,
        preventDefault: false,
        onUp: (self) => {
          if (self.deltaY < -50) {
            console.log("Scrolling up detected");

            changePage("up");
          }
        },
        onDown: (self) => {
          if (self.deltaY > 50) {
            console.log("Scrolling down detected");

            changePage("down");
          }
        },
        // onStop 来控制滚动 isAnimating 不太好用，感觉卡卡的，注释了
        // onStop: () => {
        //   console.log("Scrolling stopped");

        //   isAnimating = false;
        // },
        // onStopDelay: 0.5, // delay before the onStop callback is triggered
      });

      gsap.from("#tip", {
        duration: 1,
        opacity: 0.2,
        ease: "Sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className=" font-basic">
      {pages[currentPageIndex]}

      <div
        id="tip"
        className={
          "flex gap-2 items-center font-light text-sm text-primary justify-center fixed bottom-4 left-1/2 transform -translate-x-1/2 z-10 opacity-60"
        }
      >
        <ChevronsUp className="size-4" /> {t("scrollTip")}
      </div>
    </div>
  );
}
