import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import BackgroundText from "../home/components/BackgroudText";
import SliderText from "../home/components/SliderText";
import { useRef } from "react";

export default function Tree() {
  const containerRef = useRef(null); // This should be managed by your routing logic

  useGSAP(
    () => {
      gsap.from(containerRef.current, {
        duration: 1,
        opacity: 0,
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
      <BackgroundText text="Just a tree" />

      <div className="space-y-4 w-4/5 max-w-150  md:mr-[20%] z-10">
        <h1 className=" font-semibold leading-tight text-5xl pretty-text">
          种一棵树最好的时间是十年前， 其次是现在
        </h1>
        <SliderText>达到目的的方法数不胜数，但我只想成为一只猫。</SliderText>
      </div>

      <div className="w-dvw h-dvh absolute top-0 left-0 overflow-hidden select-none">
        <img
          src="/pages/tree/tree.svg"
          alt="Tree"
          className="h-dvh absolute right-0 cursor-pointer object-cover scale-110 blur-lg duration-1000 hover:scale-100 hover:blur-none"
        />
      </div>
    </main>
  );
}
