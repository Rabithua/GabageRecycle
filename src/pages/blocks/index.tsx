import { useGSAP } from "@gsap/react";
import BackgroundText from "../home/components/BackgroudText";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import Block from "./components/block";
import GitHubUserBlock from "./components/GitHubUserBlock";
import GitHubRepoBlock from "./components/GitHubRepoBlock";
import TextBlock from "./components/TextBlock";
import PhotoBlock from "./components/PhototBlock";
import MapBlock from "./components/MapBlock";

export default function Blocks() {
  const { t } = useTranslation("translation", {
    keyPrefix: "page.blocks",
  });
  const containerRef = useRef(null); // This should be managed by your routing logic

  useGSAP(() => {}, {
    scope: containerRef,
  });

  return (
    <main
      ref={containerRef}
      className="w-dvw h-dvh flex flex-col items-center justify-center grid-background font-basic"
    >
      <BackgroundText text={t("background")} />

      <div className="w-9/10 max-w-6xl overflow-hidden">
        {/* Grid container */}
        <div className="w-full font-['Noto_Serif_SC'] h-full grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 auto-rows-[80px] gap-4 grid-flow-dense overflow-auto pr-2">
          {/* Large feature block: Repo info */}
          <GitHubRepoBlock
            owner="Rabithua"
            repo="GabageRecycle"
            branch="main"
            className="col-span-4 row-span-4"
          />

          {/* GitHub User Block */}
          <GitHubUserBlock
            username="rabithua"
            className="col-span-4 row-span-2"
          />

          <GitHubRepoBlock
            owner="Rabithua"
            repo="Rote"
            branch="main"
            className="col-span-4 row-span-2 "
          />

          {/* Tall block */}
          <PhotoBlock
            src="https://public.zzfw.cc/gabagerecycle/blocks/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2025-08-16_153510_726.jpg"
            className="col-span-2 row-span-2 "
          />

          {/* Wide block */}
          <TextBlock className="col-span-4 row-span-2 ">
            因为我始终相信人是知善恶、辨是非的，我们不要在白天高举火把，而是应该在黑夜成为明灯，如果天黑那就摸黑生存，如果发出声音危险，那就保持沉默，但是不要因为自己的苟且而洋洋自得，不要对那些勇敢的人不屑一顾，不要因为身处黑暗就为黑暗辩护，我们可以卑微如尘土，但是绝对不可以扭曲如蛆虫！
          </TextBlock>

          {/* Small squares */}
          <TextBlock href="/apple" className="col-span-1 row-span-1 ">
            🍎
          </TextBlock>
          <TextBlock href="/tree" className="col-span-1 row-span-1 ">
            🪴
          </TextBlock>
          <TextBlock href="/home" className="col-span-2 row-span-2 ">
            🐱
          </TextBlock>
          <PhotoBlock
            href="https://deno.com/"
            src="https://cdn.bonjour.bio/cloudstorage/ed9292ca-0568-4332-91e6-4f86fd5f71e0"
            className="col-span-2 row-span-2 "
          />
          <MapBlock
            zoom={10}
            title="Hangzhou,China"
            className="col-span-2 row-span-2"
          />

          <Block className="col-span-2 row-span-1 ">O</Block>
          <Block className="col-span-2 row-span-1 ">O</Block>

          <PhotoBlock
            src="https://public.zzfw.cc/gabagerecycle/blocks/IMG_6679.GIF"
            className="col-span-2 row-span-2 "
          />
          <Block className="col-span-4 row-span-1 ">V</Block>
          <Block className="col-span-2 row-span-1 ">求职ING</Block>
        </div>
      </div>
    </main>
  );
}
