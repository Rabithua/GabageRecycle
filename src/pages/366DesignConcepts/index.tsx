import AnimateText from "@/components/AnimateText";
import { daysComponents } from "@/pages/366DesignConcepts/constants";
import { useParams } from "react-router";

export default function DesignConcepts() {
  const params = useParams();
  console.log(params);

  const dayIndex = params.day ? Number(params.day) : 0;
  const isValidDay = dayIndex >= 0 && dayIndex < daysComponents.length;

  const currentComponent = isValidDay
    ? daysComponents[dayIndex].component
    : null;

  const currentAuthor = isValidDay ? daysComponents[dayIndex].author : null;

  return (
    <main className="w-dvw h-dvh flex flex-col items-center justify-center grid-background">
      <div className="w-4/5 max-w-xl aspect-square overflow-hidden">
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
        <div className="fixed bottom-4 right-4 text-[1cqw] text-gray-300 flex flex-col items-end gap-2 font-extralight [&_a]:text-gray-500">
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
                href={`/366DesignConcepts/${dayIndex}`}
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
      </div>
    </main>
  );
}
