import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { MapPin } from "lucide-react";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function Dot({
  children,
  length = 6,
}: {
  children: React.ReactNode;
  length?: number;
}) {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex flex-col gap-4 translate-y-3">
        <div className="w-5 h-[2px] shrink-0 bg-red-300"></div>
        {Array.from({ length }).map((_, index) => (
          <div key={index} className="w-3 h-[1px] shrink-0 bg-black/30"></div>
        ))}
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
}

function PrimarySpan({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-black mx-2 underline underline-offset-4 decoration-primary/20">
      {children}
    </span>
  );
}

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollBlockRef = useRef<HTMLDivElement>(null);
  const gridContainer = useRef<HTMLDivElement>(null!);

  useGSAP(
    () => {
      const container = containerRef.current;
      const scroller = scrollBlockRef.current;
      if (!container || !scroller) return;

      // 关闭内部原生滚动条交互，统一由 ScrollTrigger 驱动
      scroller.style.overflow = "hidden"; // 保留视觉上的内层裁剪

      const setup = () => {
        const maxScroll = scroller.scrollHeight - scroller.clientHeight;
        if (maxScroll <= 0) return; // 内容不足无需绑定

        // 若已有实例先销毁
        ScrollTrigger.getById("timeline-scroll-proxy")?.kill();

        ScrollTrigger.create({
          id: "timeline-scroll-proxy",
          trigger: container,
          // pin 住整个组件，使页面滚动的距离用于驱动内部内容 "假滚动"
          pin: true,
          start: "top top",
          end: () => "+=" + maxScroll,
          scrub: true,
          onUpdate: (self) => {
            scroller.scrollTop = self.progress * maxScroll;
          },
        });
      };

      setup();
      // 尺寸或字体变化后重建
      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.getById("timeline-scroll-proxy")?.kill();
        setup();
        ScrollTrigger.refresh();
      });
      resizeObserver.observe(scroller);

      // 图片加载后可能高度变化
      const imgs = Array.from(scroller.querySelectorAll("img"));
      imgs.forEach((img) => {
        if (!img.complete) {
          img.addEventListener("load", () => {
            ScrollTrigger.getById("timeline-scroll-proxy")?.kill();
            setup();
            ScrollTrigger.refresh();
          });
        }
      });

      return () => {
        resizeObserver.disconnect();
        ScrollTrigger.getById("timeline-scroll-proxy")?.kill();
      };
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="w-dvw h-dvh flex flex-col items-center justify-center "
    >
      <div className="flex gap-4 sm:gap-6 items-start justify-center w-4/5 max-w-lg max-h-3/5">
        <img
          src="https://public.zzfw.cc/gabagerecycle/timeline/Rabithua%20Image.jpeg"
          alt="Timeline Demo"
          className="size-10 sm:size-30 object-cover sm:border-4 border-gray-50 rounded-xl -rotate-2 "
        />

        <div className="relative [height:-webkit-fill-available] rounded-2xl text-lg sm:text-xl leading-tight overflow-hidden">
          <div
            ref={scrollBlockRef}
            className="px-5 pr-10 py-10 h-full flex flex-col gap-4"
          >
            <Dot>
              <div>
                Hi, 我是
                <PrimarySpan>于长野</PrimarySpan>
                ，也可以叫我
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
              {/* <div
                ref={gridContainer}
                className="w-full aspect-square grid-cols-2 grid-rows-2 auto-rows-[80px] gap-4 grid-flow-dense pr-2"
              >
                <BlockSwitcher
                  {...{
                    grid: { col: 2, row: 2 },
                    blockData: {
                      id: uuidv4(),
                      type: BlockType.MAP,
                      zoom: 10,
                      title: "Hangzhou,China",
                      center: { lat: 30.2741, lng: 120.1551 },
                    },
                  }}
                  containerRef={gridContainer}
                />
              </div> */}
            </Dot>
            <Dot length={20}>
              <div>
                MBTI: <PrimarySpan>INFJ</PrimarySpan>
              </div>
              <img
                src="https://public.zzfw.cc/gabagerecycle/timeline/infj.svg"
                alt="MBTI: INFJ"
                className=" w-full aspect-square object-cover sm:border-4 border-gray-50 rounded-xl"
              />
            </Dot>
            <Dot>
              <div>非计算机专业，大学期间出于兴趣自学编程和设计</div>
            </Dot>
            <Dot>
              <div>
                毕业后随朋友来到了杭州，艰难探索远程职业，做过一些杂乱的项目，算是勉强维持生计
              </div>
            </Dot>
            <Dot>
              <div>
                2024 年 8 月左右存款告急，Advx 2024 活动结束后加入 Bonjour
              </div>
            </Dot>
          </div>

          <div className="absolute top-0 left-0 w-full h-full shadow-[inset_0_0_30px_30px_#ffffff] pointer-events-none"></div>
        </div>
      </div>
    </div>
  );
}
