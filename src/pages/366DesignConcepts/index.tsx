import AnimateText from "@/components/AnimateText";
import PageMeta from "@/components/PageMeta";
import { daysComponents } from "@/pages/366DesignConcepts/constants";
import {
  getLocaleFromPath,
  localizedPath,
} from "@/seo/render";
import { useLocation, useParams } from "react-router";
import { notFoundMeta } from "../notFound/meta";
import { designConceptsMeta } from "./meta";

export default function DesignConcepts({ day }: { day?: number }) {
  const params = useParams();
  const { pathname } = useLocation();
  const locale = getLocaleFromPath(pathname);

  const parameterDay =
    params.day === undefined ? undefined : Number(params.day);
  const dayIndex = day ?? parameterDay ?? 0;
  const isValidDay =
    Number.isInteger(dayIndex) &&
    dayIndex >= 0 &&
    dayIndex < daysComponents.length;

  const currentComponent = isValidDay
    ? daysComponents[dayIndex].component
    : null;

  const currentAuthor = isValidDay ? daysComponents[dayIndex].author : null;

  return (
    <main
      className={`w-dvw h-dvh flex flex-col items-center justify-center grid-background`}
    >
      <PageMeta
        metadata={
          isValidDay ? designConceptsMeta[dayIndex] : notFoundMeta
        }
      />
      <h1 className="sr-only">
        {isValidDay
          ? `366 Design Concepts Day ${dayIndex}: ${daysComponents[dayIndex].title}`
          : "366 Design Concepts 页面未找到"}
      </h1>
      {daysComponents[dayIndex]?.slot}
      <div className="w-4/5 max-w-xl aspect-square z-1">
        {currentComponent || (
          <div className="@container flex items-center justify-center w-full h-full text-[10cqw] font-mono">
            <AnimateText
              type="chars"
              vars={{
                duration: 2,
                opacity: 0,
                filter: "blur(32px)",
                x: -100,
                stagger: 0.1,
                ease: "expo.out",
                immediateRender: true,
              }}
            >
              404
            </AnimateText>
          </div>
        )}
      </div>

      <div className="fixed bottom-4 right-4 text-xs text-gray-300 flex flex-col items-end gap-2 font-extralight [&_a]:text-gray-500">
        {isValidDay && (
          <AnimateText
            type="chars"
            vars={{
              duration: 2,
              opacity: 0,
              filter: "blur(32px)",
              x: -100,
              stagger: 0.1,
              ease: "expo.out",
              immediateRender: true,
            }}
          >
            Day {dayIndex}:&nbsp;
            <a
              href={localizedPath(
                `/366designconcepts/${dayIndex}`,
                locale
              )}
              target="_blank"
              rel="noreferrer noopener"
            >
              {daysComponents[dayIndex].title}
            </a>
          </AnimateText>
        )}
        <AnimateText
          type="chars"
          vars={{
            duration: 2,
            opacity: 0,
            filter: "blur(32px)",
            x: -100,
            stagger: 0.1,
            ease: "expo.out",
            immediateRender: true,
          }}
        >
          366DesignConcepts
        </AnimateText>
        {currentAuthor && (
          <AnimateText
            type="chars"
            vars={{
              duration: 2,
              opacity: 0,
              filter: "blur(32px)",
              x: -100,
              stagger: 0.1,
              ease: "expo.out",
              immediateRender: true,
            }}
          >
            Made by&nbsp;
            {currentAuthor || <span>Unknown</span>}
          </AnimateText>
        )}
        <AnimateText
          type="chars"
          vars={{
            duration: 2,
            opacity: 0,
            filter: "blur(32px)",
            x: -100,
            stagger: 0.1,
            ease: "expo.out",
            immediateRender: true,
          }}
        >
          Inspaired by&nbsp;
          <a
            href="https://x.com/sovpal"
            target="_blank"
            rel="noreferrer noopener"
          >
            @sovpal
          </a>
        </AnimateText>
      </div>
    </main>
  );
}
