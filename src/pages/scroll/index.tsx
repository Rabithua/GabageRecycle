import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { useState } from "react";

import Home from "@/pages/home";
import Apple from "@/pages/apple";
import Tree from "@/pages/tree";

gsap.registerPlugin(Observer);

gsap.defaults({
  duration: 2,
  ease: "none",
});

export default function FadingScroll() {
  const pages = [<Home />, <Apple />, <Tree />];
  const [currentPageIndex, setCurrentPageIndex] = useState(0); // This should be managed by your routing logic

  useGSAP(
    () => {
      let isAnimating = false;
      function changePage(type: "up" | "down") {
        if (isAnimating) return;
        isAnimating = true;

        console.log(`Changing page ${type}`);

        if (type === "up") {
          console.log("Changing page up");
          // Add logic to change to the previous page
          setCurrentPageIndex((prevIndex) => {
            const newIndex =
              prevIndex - 1 < 0 ? pages.length - 1 : prevIndex - 1;
            return newIndex;
          });
        } else {
          console.log("Changing page down");
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
      }

      Observer.create({
        target: window, // can be any element (selector text is fine)
        type: "wheel,touch,scroll,pointer", // comma-delimited list of what to listen for
        dragMinimum: 10, // minimum distance before it starts observing
        tolerance: 10, // how far the mouse must move before it starts observing
        preventDefault: false, // prevent default scrolling behavior
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
        // onStop: () => {
        //   console.log("Scrolling stopped");

        //   isAnimating = false;
        // },
        // onStopDelay: 0.5, // delay before the onStop callback is triggered
      });
    },
    { scope: "#scroll-container" }
  );

  return <div id="scroll-container">{pages[currentPageIndex]}</div>;
}
