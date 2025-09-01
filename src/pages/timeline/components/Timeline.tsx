import GithubRepoBlock from "@/pages/blocks/components/blocks/GitHubRepoBlock";
import MapBlock from "@/pages/blocks/components/blocks/MapBlock";
import type { TFunction } from "i18next";
import {
  ArrowUpRight,
  ArrowUpRightIcon,
  Dog,
  Github,
  MapPin,
  MessageSquareCodeIcon,
  Twitter,
  UtensilsCrossed,
} from "lucide-react";
import { useRef, type JSX } from "react";
import RabithuaSVG from "./Rabithua";
import Dot from "./timeline/Dot";
import PrimarySpan from "./timeline/PrimarySpan";
import RecentRote from "./timeline/RecentRote";
import TimelineVideo from "./timeline/TimelineVideo";

interface StackIcon {
  name: string;
  src: string;
  url: string;
}

interface SocialMedia {
  name: string;
  icon: JSX.Element;
  url: string;
}

const stacks: StackIcon[] = [
  {
    name: "Arc Browser",
    src: "https://public.zzfw.cc/gabagerecycle/timeline/stacks/Arc%20browser.svg",
    url: "https://arc.net",
  },
  {
    name: "Bun",
    src: "https://public.zzfw.cc/gabagerecycle/timeline/stacks/Bun%20Icons.svg",
    url: "https://bun.sh",
  },
  {
    name: "Cloudflare",
    src: "https://public.zzfw.cc/gabagerecycle/timeline/stacks/Cloudflare%20Icon.svg",
    url: "https://www.cloudflare.com",
  },
  {
    name: "Copilot GitHub",
    src: "https://public.zzfw.cc/gabagerecycle/timeline/stacks/Copilot%20GitHub%20Icon.svg",
    url: "https://github.com/features/copilot",
  },
  {
    name: "Deno",
    src: "https://public.zzfw.cc/gabagerecycle/timeline/stacks/Deno%20Icon.svg",
    url: "https://deno.com",
  },
  {
    name: "Docker",
    src: "https://public.zzfw.cc/gabagerecycle/timeline/stacks/Docker%20Icons.svg",
    url: "https://www.docker.com",
  },
  {
    name: "Figma",
    src: "https://public.zzfw.cc/gabagerecycle/timeline/stacks/Figma%20Icon.svg",
    url: "https://www.figma.com",
  },
  {
    name: "GSAP",
    src: "https://public.zzfw.cc/gabagerecycle/timeline/stacks/GSAP%20Icon.svg",
    url: "https://gsap.com",
  },
  {
    name: "GitHub",
    src: "https://public.zzfw.cc/gabagerecycle/timeline/stacks/GitHub%20Icon.svg",
    url: "https://github.com",
  },
  {
    name: "JavaScript",
    src: "https://public.zzfw.cc/gabagerecycle/timeline/stacks/Javascript%20Icon.svg",
    url: "https://developer.mozilla.org/docs/Web/JavaScript",
  },
  {
    name: "PWA",
    src: "https://public.zzfw.cc/gabagerecycle/timeline/stacks/PWA%20Icon.svg",
    url: "https://web.dev/progressive-web-apps/",
  },
  {
    name: "Photoshop",
    src: "https://public.zzfw.cc/gabagerecycle/timeline/stacks/PhotoShop%20Icons.svg",
    url: "https://www.adobe.com/products/photoshop.html",
  },
  {
    name: "PostgreSQL",
    src: "https://public.zzfw.cc/gabagerecycle/timeline/stacks/PostgreSQL%20Icon.svg",
    url: "https://www.postgresql.org",
  },
  {
    name: "Postman",
    src: "https://public.zzfw.cc/gabagerecycle/timeline/stacks/Postman%20Icon.svg",
    url: "https://www.postman.com",
  },
  {
    name: "Prettier",
    src: "https://public.zzfw.cc/gabagerecycle/timeline/stacks/Prettier%20Icon.svg",
    url: "https://prettier.io",
  },
  {
    name: "Prisma",
    src: "https://public.zzfw.cc/gabagerecycle/timeline/stacks/Prisma%20Icon.svg",
    url: "https://www.prisma.io",
  },
  {
    name: "React",
    src: "https://public.zzfw.cc/gabagerecycle/timeline/stacks/ReactJS%20Icon.svg",
    url: "https://react.dev",
  },
  {
    name: "Tailwind CSS",
    src: "https://public.zzfw.cc/gabagerecycle/timeline/stacks/Tailwind%20CSS%20Icon.svg",
    url: "https://tailwindcss.com",
  },
  {
    name: "TypeScript",
    src: "https://public.zzfw.cc/gabagerecycle/timeline/stacks/TypeScript%20Icon.svg",
    url: "https://www.typescriptlang.org",
  },
  {
    name: "VS Code",
    src: "https://public.zzfw.cc/gabagerecycle/timeline/stacks/VSCode%20Icon.svg",
    url: "https://code.visualstudio.com",
  },
];

const socialMedia: SocialMedia[] = [
  {
    icon: <Github className="w-full h-full hover:text-gray-500 duration-300" />,
    name: "GitHub",
    url: "https://github.com/rabithua",
  },
  {
    icon: (
      <Twitter className="w-full h-full hover:text-gray-500 duration-300" />
    ),
    name: "Twitter",
    url: "https://twitter.com/rabithua",
  },
];

const friends = [
  {
    name: "相白清",
    url: "https://sansuiz.cn",
  },
  {
    name: "Mashiro",
    url: "https://2heng.xin",
  },
  {
    name: "LOGI",
    url: "https://logi.im",
  },
  {
    name: "沐森西",
    url: "https://musenxi.com/",
  },
  {
    name: "ZGGSONG",
    url: "https://zggsong.com",
  },
  {
    name: "小维博客",
    url: "https://blog.isww.cn/",
  },
  {
    name: "CKylin",
    url: "https://www.ckylin.site/",
  },
  {
    name: "Simon He",
    url: "https://simonme.netlify.app/",
  },
  {
    name: "LogDict",
    url: "https://www.logdict.com/",
  },
  {
    name: "Skywt",
    url: "https://skywt.cn/",
  },
  {
    name: "fzf404",
    url: "https://fzf404.art/",
  },
  {
    name: "乙未博客",
    url: "https://yvii.cn",
  },
  {
    name: "桑桑",
    url: "https://libra.wiki/",
  },
];

interface TimelineProps {
  t: TFunction;
}

export default function Timeline({ t }: TimelineProps) {
  const timelineRef = useRef<HTMLDivElement>(null!);
  const avatarRef = useRef<HTMLImageElement>(null);

  return (
    <div
      ref={timelineRef}
      className="relative flex gap-4 mx-auto sm:gap-12 items-start justify-center px-4 max-w-lg"
    >
      <div
        data-speed="clamp(-0.05)"
        ref={avatarRef}
        className="relative size-10 sm:size-40 md:size-60 shrink-0"
      >
        <RabithuaSVG timelineRef={timelineRef} />
      </div>

      <div className="relative text-lg sm:text-xl leading-tight h-full flex flex-col gap-1 ">
        <Dot>
          <div className="text-2xl font-bold text-black">{t("greeting")}</div>
        </Dot>
        <Dot>
          <div>
            {t("iAm")}
            <PrimarySpan>{t("nameZh")}</PrimarySpan>
            <br />
            {t("alsoCallMe")}
            <PrimarySpan>{t("nameAlias")}</PrimarySpan>
          </div>
        </Dot>
        <Dot>
          <div>
            {t("liveIn")}
            <PrimarySpan>
              <MapPin className="inline size-5 mr-1" />
              {t("locationName")}
            </PrimarySpan>
          </div>
          <div className="group flex flex-col gap-2">
            <div className="w-full aspect-square border-4 bg-white border-gray-50 rounded-3xl overflow-hidden">
              <MapBlock
                center={{ lat: 30.36778, lng: 120.02722 }}
                zoom={10}
                title="Hangzhou,China"
              />
            </div>
            <div className="opacity-0 group-hover:opacity-100 duration-300 ml-4 text-sm">
              {t("welcomeVisit")}
            </div>
          </div>
        </Dot>
        <Dot>
          <div>
            MBTI: <PrimarySpan>INFJ</PrimarySpan>
          </div>

          <div className="group flex flex-col gap-2">
            <div className="w-full aspect-square border-4 bg-white border-gray-50 rounded-3xl overflow-hidden">
              <img
                src="https://public.zzfw.cc/gabagerecycle/timeline/infj.svg"
                alt="MBTI: INFJ"
                className=" w-full aspect-square object-cover border-4 bg-white border-gray-50 rounded-3xl"
              />
            </div>
            <div className="opacity-0 group-hover:opacity-100 duration-300 ml-4 text-sm">
              {t("thanksIllustration")}
            </div>
          </div>
        </Dot>
        <Dot>
          <div>{t("nonCs")}</div>
        </Dot>
        <Dot>
          <div className="text-black">{t("favoriteStacks")}</div>
          <div className="w-full aspect-square grid grid-cols-5 grid-rows-4 gap-3 p-3 border-4 bg-white border-gray-50 rounded-3xl">
            {stacks.map((item) => (
              <a
                key={item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full"
                title={item.name}
                aria-label={item.name}
              >
                <img
                  src={item.src}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full"
                />
              </a>
            ))}
          </div>
        </Dot>

        <Dot>
          <div>
            <PrimarySpan>{t("graduate2022")}</PrimarySpan>
            {t("graduateStory")}
          </div>
        </Dot>

        <Dot>
          <div>
            {t("addictedToPhotographyPrefix")}
            <PrimarySpan>{t("photography")}</PrimarySpan>，
            {t("photographyBought")}
            <br />
            <span className="text-base text-gray-300">
              <MapPin className="inline size-4 mr-1" />
              {t("liangzhuPark")}
            </span>
          </div>
          <div className="relative w-full aspect-square border-4 bg-white border-gray-50 rounded-3xl overflow-hidden">
            <a
              href="https://v.douyin.com/3bvCEsvQqOA/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowUpRight
                size={24}
                className="absolute top-4 right-4 size-8 text-white z-10 bg-black/30 backdrop-blur-sm p-1 rounded-2xl opacity-60"
              />
              <img
                src="https://public.zzfw.cc/gabagerecycle/timeline/IMG_0761.jpg"
                className="w-full h-full object-cover"
                alt={t("liangzhuPark")}
              />
            </a>
          </div>
        </Dot>

        <Dot>
          <div>
            {t("likePrefix")}
            <PrimarySpan>{t("cooking")}</PrimarySpan>，{t("chefWish")}
            <br />
            <span className="text-base text-gray-300">
              <UtensilsCrossed className="inline size-4 mr-1" />
              {t("favoriteDish")}
            </span>
          </div>
          <div className="w-full aspect-square border-4 bg-white border-gray-50 rounded-3xl overflow-hidden">
            <img
              src="https://public.zzfw.cc/gabagerecycle/timeline/%E9%85%B8%E8%B1%86%E8%A7%92%E8%82%89%E4%B8%9D%E6%89%93%E5%8D%A4%E9%9D%A2.png"
              className="w-full h-full object-cover"
              alt={t("favoriteDish")}
            />
          </div>
        </Dot>

        <Dot>
          <div>
            {t("likeLandlordDogPrefix")}
            <PrimarySpan>{t("landlordDog")}</PrimarySpan>
            {t("missDogs")}
            <br />
            <span className="text-base text-gray-300">
              <Dog className="inline size-4 mr-1" />
              {t("dogsNames")}
            </span>
          </div>
          <TimelineVideo
            poster="https://public.zzfw.cc/gabagerecycle/timeline/IMG_1793_POSTER.png"
            src="https://public.zzfw.cc/gabagerecycle/timeline/IMG_1793.mov"
          />
        </Dot>

        <Dot>
          <div>
            <PrimarySpan>{t("date202405")}</PrimarySpan>
            <br />
            {t("join")}
            <a
              href="https://adventure-x.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline w-fit"
            >
              <PrimarySpan>
                <img
                  src="https://public.zzfw.cc/gabagerecycle/timeline/AdventureX_Logo.svg"
                  className="size-8 object-cover inline mr-1"
                  alt="AdventureX Logo"
                />
                <span className="font-sans font-semibold">AdventureX</span>
              </PrimarySpan>
            </a>
            <br />
            {t("teamMember")}
          </div>

          <div className="w-full aspect-square border-4 bg-white border-gray-50 rounded-3xl overflow-hidden">
            <img
              src="https://public.zzfw.cc/gabagerecycle/timeline/IMG_2042.jpg"
              className="w-full h-full object-cover"
              alt="AdventureX_2024"
            />
          </div>
        </Dot>

        <Dot>
          <div>
            <PrimarySpan>{t("date202408")}</PrimarySpan>
            <br />
            {t("afterAdvx2024")}
            <br />
            {t("join")}
            <a
              href="https://bonjour.bio"
              target="_blank"
              rel="noopener noreferrer"
              className="inline w-fit"
            >
              <PrimarySpan>
                <img
                  src="https://public.zzfw.cc/gabagerecycle/timeline/Bonjour_Logo.svg"
                  className="size-5 object-cover inline mr-1"
                  alt="Bonjour Logo"
                />
                <span className="font-sans font-semibold">Bonjour!</span>
              </PrimarySpan>
            </a>
            <br />
            <span className="text-base text-gray-300">
              <MessageSquareCodeIcon className="inline size-4 mr-1" />
              {t("meetingRecord")}
            </span>
          </div>

          <TimelineVideo
            poster="https://public.zzfw.cc/gabagerecycle/timeline/IMG_5895_POSTER.png"
            src="https://public.zzfw.cc/gabagerecycle/timeline/IMG_5895.mov"
          />
        </Dot>

        <Dot>
          <div>
            <PrimarySpan>{t("date202507End")}</PrimarySpan>
            <br />
            {t("afterAdvx2025")}
            <PrimarySpan>{t("quitBonjour")}</PrimarySpan>
            <br />
            {t("lifeMess")}
            <br />
            {t("wantImprove")}
            <br />
          </div>
        </Dot>

        <Dot>
          <div className="text-black">{t("recentDoing")}</div>
          <div className="w-full aspect-square border-4 bg-white border-gray-50 rounded-3xl overflow-hidden p-4 font-sans">
            <GithubRepoBlock owner="Rabithua" repo="Rote" branch="develop" />
          </div>
        </Dot>

        <Dot>
          <div className="text-black">{t("latestActivities")}</div>
          <RecentRote skip={3} />
        </Dot>

        <Dot length={2}>
          <div className="flex items-center gap-4">
            <div className=" shrink-0 text-lg text-gray-300">{t("findMe")}</div>
            <div className="grow grid grid-cols-10 grid-rows-1 gap-3 text-gray-300">
              {socialMedia.map((item) => (
                <a
                  key={item.name}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full h-full"
                  title={item.name}
                  aria-label={item.name}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
        </Dot>

        <Dot length={12}>
          <div className=" shrink-0 text-lg text-gray-300">
            {t("friendsTitle")}
          </div>

          <div className="group space-y-4 text-sm font-mono">
            <div className="grid sm:grid-cols-3 grid-cols-2 gap-2">
              {friends.map((friend) => (
                <a
                  href={friend.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" text-left truncate text-gray-300 hover:text-gray-500 duration-300"
                >
                  {friend.name}
                  <ArrowUpRightIcon className="size-3 inline-block ml-1" />
                </a>
              ))}
            </div>
            <div className="opacity-0 group-hover:opacity-100 duration-300 text-xs">
              {t("friendsNote")}
            </div>
          </div>
        </Dot>
      </div>
    </div>
  );
}
