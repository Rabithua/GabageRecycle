import Block from "@/pages/blocks/components/Block";
import {
  BlockType,
  type BlockProps,
} from "@/pages/blocks/components/blocks.types";
import BackgroundText from "@/pages/home/components/BackgroudText";
import PageMeta from "@/components/PageMeta";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { v4 as uuidv4 } from "uuid";
import { blocksMeta } from "./meta";

export default function Blocks({ withMeta = true }: { withMeta?: boolean }) {
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
      children: t("quote"),
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
          {t("jobRequestLine1")}
          <br />
          {t("jobRequestLine2")}
          <br />
          {t("jobRequestLine3")}
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
      children: <>{t("dragNote")}</>,
      blockData: {
        id: uuidv4(),
        type: BlockType.NORMAL,
      },
    },
  ];

  return (
    <>
      {withMeta ? <PageMeta metadata={blocksMeta} /> : null}
      <main className="w-dvw min-h-dvh flex flex-col items-center lg:justify-center grid-background font-basic py-8">
        <h1 className="sr-only">{t("title")}</h1>
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
    </>
  );
}
