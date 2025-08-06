import { useGSAP } from "@gsap/react";
import BackgroundText from "../home/components/BackgroudText";
import SliderText from "../home/components/SliderText";
import gsap from "gsap";
import { useRef } from "react";

export default function Apple() {
  const containerRef = useRef(null); // This should be managed by your routing logic
  const appleRef = useRef(null);

  useGSAP(
    () => {
      const timeline = gsap.timeline();

      timeline
        .from(containerRef.current, {
          opacity: 0,
          duration: 1,
        })
        .to(appleRef.current, {
          scale: 1.05,
          right: "-15%",
          bottom: "-30%",
          duration: 6,
          ease: "elastic.inOut",
          repeat: -1,
          yoyo: true,
        });
    },
    {
      scope: containerRef,
    }
  );
  return (
    <main
      ref={containerRef}
      className="w-dvw h-dvh flex flex-col items-center justify-center grid-background basic-font"
    >
      <BackgroundText text="Just a Apple" />

      <div className="space-y-4 w-4/5 max-w-150  md:mr-[20%] z-10">
        <h1 className=" font-semibold leading-tight text-5xl pretty-text">
          上帝丢了一个苹果给我，感谢上帝，它很好吃！
        </h1>
        <SliderText>但是下次最好不要砸在我的脑袋上了 😵‍💫</SliderText>
      </div>

      <div className="w-dvw h-dvh absolute top-0 left-0 overflow-hidden select-none">
        <img
          ref={appleRef}
          id="apple"
          src="/pages/apple/apple.svg"
          alt="Apple"
          className="h-dvh absolute -right-1/5 -bottom-2/5 cursor-pointer object-contain"
        />
      </div>
    </main>
  );
}
