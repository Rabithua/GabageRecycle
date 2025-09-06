import { daysComponents } from "@/pages/366DesignConcepts/constants";
import { useParams } from "react-router";
import SliderText from "../home/components/SliderText";

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
            <SliderText>404</SliderText>
          </div>
        )}
        <div className="fixed bottom-4 right-4 text-[1cqw] text-gray-300 flex flex-col items-end gap-2 font-extralight [&_a]:text-gray-500">
          {isValidDay && (
            <SliderText>
              Day {dayIndex}:&nbsp;
              <a
                href={`/366DesignConcepts/${dayIndex}`}
                target="_blank"
                rel="noreferrer noopener"
              >
                {daysComponents[dayIndex].title}
              </a>
            </SliderText>
          )}
          <SliderText>366DesignConcepts</SliderText>
          {currentAuthor && (
            <SliderText>
              Made by&nbsp;
              {currentAuthor || <span>Unknown</span>}
            </SliderText>
          )}
          <SliderText>
            Inspaired by&nbsp;
            <a
              href="https://x.com/sovpal"
              target="_blank"
              rel="noreferrer noopener"
            >
              @sovpal
            </a>
          </SliderText>
        </div>
      </div>
    </main>
  );
}
