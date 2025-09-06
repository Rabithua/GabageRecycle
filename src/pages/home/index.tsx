import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import BackgroundText from "./components/BackgroudText";
import SliderText from "./components/SliderText";

gsap.registerPlugin(SplitText);

// 猫咪相关的 emojis
const catEmojis = ["🐟", "🐾", "🐈", "😻", "🐠", "🧶", "🪴", "🐭"];

export default function Home() {
  const { t } = useTranslation("translation", {
    keyPrefix: "page.home",
  });
  const containerRef = useRef(null); // This should be managed by your routing logic

  const { contextSafe } = useGSAP(
    () => {
      const timeline = gsap.timeline();

      timeline.from(containerRef.current, {
        duration: 1,
        opacity: 0,
      });
    },
    { scope: containerRef }
  );

  const spawnTreat = contextSafe(() => {
    // 随机选择一个 emoji
    const randomEmoji = catEmojis[(Math.random() * catEmojis.length) | 0];

    // 生成一个 treat 元素
    const treat = document.createElement("span");
    treat.className = "treat";
    treat.textContent = randomEmoji;
    treat.style.position = "absolute";
    treat.style.fontSize = Math.random() * 4 + 1 + "rem"; // 随机字体大小
    treat.style.pointerEvents = "none"; // 忽略鼠标事件

    // 随机定位
    const startX = Math.random() * window.innerWidth;
    const startY = -50;
    treat.style.left = `${startX}px`;
    treat.style.top = `${startY}px`;

    // Add to the foreground element instead of body
    document.getElementById("foreground")?.appendChild(treat);

    // GSAP 动画
    gsap.to(treat, {
      y: window.innerHeight + 100,
      x: (Math.random() - 0.5) * 200,
      rotation: (Math.random() - 0.5) * 360,
      opacity: 0,
      duration: 3 + Math.random() * 2,
      ease: "power1.in",
      onComplete: () => {
        treat.remove();
      },
    });
  });

  return (
    <main
      ref={containerRef}
      className="w-dvw h-dvh flex flex-col items-center justify-center grid-background font-basic"
    >
      {/* 背景元素 */}
      <BackgroundText text={t("background")} />
      {/* 前景元素，用于放置 treat */}
      <div
        id="foreground"
        className="w-dvw h-dvh absolute top-0 left-0 overflow-hidden z-1"
      />

      <div className="sm:flex flex-row items-center justify-between w-3/4 z-10">
        <div className="space-y-4">
          <h1
            className="font-semibold leading-tight text-5xl pretty-text"
            dangerouslySetInnerHTML={{ __html: t("title") }}
          />
          <SliderText className="text-secondary font-extralight">
            {t("subtitle")}
          </SliderText>
        </div>
        <div
          onClick={spawnTreat}
          className="hover:rotate-5 duration-1000 cursor-pointer"
        >
          <img
            src="/pages/home/cat.png"
            alt="Cat"
            className="w-96 h-96 object-contain"
          />
        </div>
      </div>
    </main>
  );
}
