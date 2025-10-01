import Block from "@/pages/blocks/components/Block";
import {
  BlockType,
  type BlockProps,
} from "@/pages/blocks/components/blocks.types";
import BackgroundText from "@/pages/home/components/BackgroudText";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";

export default function Blocks() {
  const gridContainer = useRef<HTMLDivElement>(null!);
  const { t } = useTranslation("translation", {
    keyPrefix: "page.blocks",
  });

  const grids: Omit<BlockProps, "containerRef">[] = [
    {
      grid: { col: 4, row: 4 },
      blockData: {
        id: uuidv4(),
        type: BlockType.GITHUBREPO,
        owner: "Rabithua",
        repo: "GabageRecycle",
        branch: "main",
      },
    },
    {
      grid: { col: 4, row: 2 },
      blockData: {
        id: uuidv4(),
        type: BlockType.GITHUBUSER,
        username: "rabithua",
      },
    },
    {
      grid: { col: 4, row: 2 },
      blockData: {
        id: uuidv4(),
        type: BlockType.GITHUBREPO,
        owner: "Rabithua",
        repo: "Rote",
        branch: "main",
      },
    },
    {
      grid: { col: 2, row: 2 },
      blockData: {
        id: uuidv4(),
        type: BlockType.PHOTO,
        src: "https://public.zzfw.cc/gabagerecycle/blocks/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_2025-08-16_153510_726.jpg",
      },
    },
    {
      grid: { col: 4, row: 2 },
      children:
        "因为我始终相信人是知善恶、辨是非的，我们不要在白天高举火把，而是应该在黑夜成为明灯，如果天黑那就摸黑生存，如果发出声音危险，那就保持沉默，但是不要因为自己的苟且而洋洋自得，不要对那些勇敢的人不屑一顾，不要因为身处黑暗就为黑暗辩护，我们可以卑微如尘土，但是绝对不可以扭曲如蛆虫！",
      blockData: {
        id: uuidv4(),
        type: BlockType.TEXT,
      },
    },
    {
      grid: { col: 1, row: 1 },
      children: "🍎",
      blockData: {
        id: uuidv4(),
        type: BlockType.TEXT,
        href: "/apple",
      },
    },
    {
      grid: { col: 1, row: 1 },
      children: "🪴",
      blockData: {
        id: uuidv4(),
        type: BlockType.TEXT,
        href: "/tree",
      },
    },
    {
      grid: { col: 2, row: 2 },
      children: "🐱",
      blockData: {
        id: uuidv4(),
        type: BlockType.TEXT,
        href: "/home",
      },
    },
    {
      grid: { col: 2, row: 2 },
      blockData: {
        id: uuidv4(),
        type: BlockType.PHOTO,
        src: "https://cdn.bonjour.bio/cloudstorage/ed9292ca-0568-4332-91e6-4f86fd5f71e0",
        href: "https://deno.com",
      },
    },
    {
      grid: { col: 2, row: 2 },
      blockData: {
        id: uuidv4(),
        type: BlockType.MAP,
        zoom: 10,
        title: "Hangzhou,China",
        center: { lat: 30.2741, lng: 120.1551 },
      },
    },
    {
      grid: { col: 4, row: 2 },
      className: "p-2",
      children: (
        <>
          被生活困住了，哪位好心人能伸出圆手
          <br />
          给我一份工作 🤕
          <br />
          点击左侧图片滴滴我 &gt;&gt;
        </>
      ),
      blockData: {
        id: uuidv4(),
        type: BlockType.NORMAL,
      },
    },
    {
      grid: { col: 2, row: 2 },
      blockData: {
        id: uuidv4(),
        type: BlockType.PHOTO,
        src: "https://public.zzfw.cc/gabagerecycle/blocks/IMG_6679.GIF",
        href: "mailto:rabithua@gmail.com",
      },
    },
    {
      grid: { col: 2, row: 1 },
      className: "p-2",
      children: <>拖拽排序太难了，先摸了 🐟</>,
      blockData: {
        id: uuidv4(),
        type: BlockType.NORMAL,
      },
    },
  ];

  return (
    <main className="w-dvw min-h-dvh flex flex-col items-center lg:justify-center grid-background font-basic py-8">
      <BackgroundText text={t("background")} />

      <div className="w-9/10 max-w-6xl">
        {/* Grid container */}
        <div
          ref={gridContainer}
          className="w-full font-basic h-full grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 auto-rows-[80px] gap-4 grid-flow-dense pr-2"
        >
          {grids.map((grid, index) => {
            return <Block key={index} {...grid} containerRef={gridContainer} />;
          })}
        </div>
      </div>
    </main>
  );
}
