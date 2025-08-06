import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

gsap.registerPlugin(SplitText);

// 猫咪相关的 emojis
const catEmojis = ["🐟", "🐾", "🐈", "😻", "🐠", "🧶", "🪴", "🐭"];

const spawnTreat = () => {
  // 随机选择一个 emoji
  const randomEmoji = catEmojis[(Math.random() * catEmojis.length) | 0];

  // 生成一个 treat 元素
  const treat = document.createElement("span");
  treat.className = "treat";
  treat.textContent = randomEmoji;
  treat.style.position = "absolute";
  treat.style.fontSize = "4rem";
  treat.style.pointerEvents = "none"; // 忽略鼠标事件

  // 随机定位
  const startX = Math.random() * window.innerWidth;
  const startY = -50;
  treat.style.left = `${startX}px`;
  treat.style.top = `${startY}px`;

  document.body.appendChild(treat);

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
};

export default function Home() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(
    () => {
      gsap.from("#tb", {
        y: "10%",
        x: "10%",
        filter: "blur(128px)",
        duration: 5,
        ease: "power2.inOut",
        repeat: -1,
        yoyo: true,
      });

      const split = new SplitText(textRef.current, {
        type: "lines",
        linesClass: "line",
      });

      gsap.from(split.lines, {
        duration: 2,
        opacity: 0,
        x: -100,
        stagger: 0.1,
        ease: "expo.out",
        immediateRender: true,
      });
    },
    { scope: containerRef }
  );

  return (
    <main
      ref={containerRef}
      className="w-dvw h-dvh flex flex-col items-center justify-center grid-background "
    >
      <div className="w-dvw h-dvh absolute top-0 left-0 overflow-hidden -z-1">
        <div
          id="tb"
          className="text-primary font-['Playwrite_AU_QLD'] text-[18rem] absolute top-0 w-dvw h-dvh blur-[100px]"
        >
          Just a cat
        </div>
      </div>
      <div className="md:flex flex-row items-center justify-between w-3/4 z-10">
        <div className="space-y-4">
          <h1 className="font-mono font-bold leading-tight text-5xl pretty-text">
            GARBAGE BE LIKE... <br></br> JUST LIKE...
          </h1>
          <p ref={textRef} className="text-[#C4E0C6] font-extralight">
            请不要为难我，我只是一个小猫咪！
          </p>
        </div>
        <div
          onClick={spawnTreat}
          className="hover:rotate-5 duration-1000 cursor-pointer"
        >
          <img src="/cat.png" alt="Cat" className="w-96 h-96 object-contain" />
        </div>
      </div>
    </main>
  );
}
