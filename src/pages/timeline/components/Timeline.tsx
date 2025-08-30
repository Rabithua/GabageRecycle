import GithubRepoBlock from "@/pages/blocks/components/blocks/GitHubRepoBlock";
import MapBlock from "@/pages/blocks/components/blocks/MapBlock";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {
  ArrowUpRight,
  Dog,
  MapPin,
  MessageSquareCodeIcon,
  UtensilsCrossed,
} from "lucide-react";
import { useRef } from "react";
import Dot from "./timeline/Dot";
import PrimarySpan from "./timeline/PrimarySpan";
import RecentRote from "./timeline/RecentRote";
import TimelineVideo from "./timeline/TimelineVideo";

gsap.registerPlugin(ScrollTrigger);

// 技术 / 工具栈图标（远程静态资源）
interface StackIcon {
  name: string;
  src: string;
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

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {}, {
    scope: containerRef,
  });

  return (
    <div
      ref={containerRef}
      className="w-dvw pt-40 flex flex-col items-center justify-center "
    >
      <div
        ref={timelineRef}
        className="relative flex gap-4 overflow-hidden sm:gap-12 items-start justify-center w-4/5 max-w-lg"
      >
        <img
          data-speed="clamp(-0.1)"
          src="https://public.zzfw.cc/gabagerecycle/timeline/Rabithua%20Image.jpeg"
          alt="Timeline Demo"
          className="size-10 sm:size-30 object-cover sm:border-4 bg-white border-gray-50 rounded-xl -rotate-2 "
        />

        <div className="relative text-lg sm:text-xl leading-tight h-full flex flex-col gap-1">
          <Dot>
            <div className="text-2xl font-bold text-black">
              欸，你怎么来了！
            </div>
          </Dot>
          <Dot>
            <div>
              我是
              <PrimarySpan>于长野</PrimarySpan>
              <br />
              也可以叫我
              <PrimarySpan>rabithua</PrimarySpan>
            </div>
          </Dot>
          <Dot>
            <div>
              现居
              <PrimarySpan>
                <MapPin className="inline size-5 mr-1" />
                杭州良渚
              </PrimarySpan>
            </div>
            <div className="group flex flex-col gap-2">
              <div className="w-full aspect-square sm:border-4 bg-white border-gray-50 rounded-3xl overflow-hidden">
                <MapBlock
                  center={{ lat: 30.36778, lng: 120.02722 }}
                  zoom={10}
                  title="Hangzhou,China"
                />
              </div>
              <div className="opacity-0 group-hover:opacity-100 duration-300 ml-4 text-sm">
                欢迎来串门～ 🤓
              </div>
            </div>
          </Dot>
          <Dot>
            <div>
              MBTI: <PrimarySpan>INFJ</PrimarySpan>
            </div>
            <img
              src="https://public.zzfw.cc/gabagerecycle/timeline/infj.svg"
              alt="MBTI: INFJ"
              className=" w-full aspect-square object-cover sm:border-4 bg-white border-gray-50 rounded-3xl"
            />
          </Dot>
          <Dot>
            <div>非计算机专业，大学期间出于兴趣自学编程和设计</div>
          </Dot>
          <Dot>
            <div className="text-black">爱用的技术栈和工具：</div>
            <div className="w-full aspect-square grid grid-cols-5 grid-rows-4 gap-3 p-3 sm:border-4 bg-white border-gray-50 rounded-3xl">
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
              <PrimarySpan>2022 年毕业</PrimarySpan>
              随小弟来到杭州，艰难探索远程职业，做过一些杂乱的项目，算是勉强维持生计
            </div>
          </Dot>

          <Dot>
            <div>
              期间染上了<PrimarySpan>摄影</PrimarySpan>，买了台 Nikon
              Z5，下面是一组很喜欢的小清新调色
              <br />
              <span className="text-base text-gray-300">
                <MapPin className="inline size-4 mr-1" />
                良渚遗址公园
              </span>
            </div>
            <div className="relative w-full aspect-square sm:border-4 bg-white border-gray-50 rounded-3xl overflow-hidden">
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
                  alt="良渚遗址公园"
                />
              </a>
            </div>
          </Dot>

          <Dot>
            <div>
              喜欢<PrimarySpan>做饭</PrimarySpan>，偶尔希望成为一名大厨
              <br />
              <span className="text-base text-gray-300">
                <UtensilsCrossed className="inline size-4 mr-1" />
                最爱的酸豆角肉丝浇面
              </span>
            </div>
            <div className="w-full aspect-square sm:border-4 bg-white border-gray-50 rounded-3xl overflow-hidden">
              <img
                src="https://public.zzfw.cc/gabagerecycle/timeline/%E9%85%B8%E8%B1%86%E8%A7%92%E8%82%89%E4%B8%9D%E6%89%93%E5%8D%A4%E9%9D%A2.png"
                className="w-full h-full object-cover"
                alt="最爱的酸豆角肉丝浇面"
              />
            </div>
          </Dot>

          <Dot>
            <div>
              很喜欢<PrimarySpan>房东的狗</PrimarySpan>
              ，搬走后很久没有见到他们了
              <br />
              <span className="text-base text-gray-300">
                <Dog className="inline size-4 mr-1" />
                小光（黑白色）和表表（咖啡色）
              </span>
            </div>
            <TimelineVideo src="https://public.zzfw.cc/gabagerecycle/timeline/IMG_1793.mov" />
          </Dot>

          <Dot>
            <div>
              <PrimarySpan>2024 年 5 月</PrimarySpan>
              <br />
              加入
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
              成为了构建团队的一员
            </div>

            <div className="w-full aspect-square sm:border-4 bg-white border-gray-50 rounded-3xl overflow-hidden">
              <img
                src="https://public.zzfw.cc/gabagerecycle/timeline/IMG_2042.jpg"
                className="w-full h-full object-cover"
                alt="AdventureX_2024"
              />
            </div>
          </Dot>

          <Dot>
            <div>
              <PrimarySpan>2024 年 8 月</PrimarySpan>
              <br />
              Advx2024 活动结束后
              <br />
              加入
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
                某次开会实况
              </span>
            </div>

            <TimelineVideo src="https://public.zzfw.cc/gabagerecycle/timeline/IMG_5895.mov" />
          </Dot>

          <Dot>
            <div>
              <PrimarySpan>2025 年 7 月末</PrimarySpan>
              <br />
              Advx2025 活动结束后，<PrimarySpan>退出了 Bonjour</PrimarySpan>
              <br />
              加上一个月前结束了一年的恋爱，愈发感觉自己的生活像一团乱麻
              <br />
              希望能好好整理一下自己，学习点新东西，减少焦虑
              <br />
            </div>

            <div className="w-full aspect-square sm:border-4 bg-white border-gray-50 rounded-3xl overflow-hidden">
              <img
                src="https://public.zzfw.cc/gabagerecycle/timeline/IMG_6371.GIF"
                className="w-full h-full object-cover"
                alt="EveDayOneCat"
              />
            </div>
          </Dot>

          <Dot>
            <div className="text-black">最近在做：</div>
            <div className="w-full aspect-square sm:border-4 bg-white border-gray-50 rounded-3xl overflow-hidden p-4 font-sans">
              <GithubRepoBlock owner="Rabithua" repo="Rote" branch="develop" />
            </div>
          </Dot>

          <Dot>
            <div className="text-black">这里有我的最新动态：</div>
            <RecentRote skip={3} />
          </Dot>
        </div>
      </div>
    </div>
  );
}
