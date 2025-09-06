import { daysComponents } from "@/pages/366DesignConcepts/constants";
import { useParams } from "react-router";
import AnimateText from "./dayOne/components/AnimateText";

export default function DesignConcepts() {
  const params = useParams();
  console.log(params);

  // 安全地计算当前日的索引，并检查是否有效
  const dayIndex = params.day ? Number(params.day) - 1 : 0;
  const isValidDay = dayIndex >= 0 && dayIndex < daysComponents.length;

  // 安全地获取当前日的组件和作者信息
  const currentComponent = isValidDay
    ? daysComponents[dayIndex].component
    : null;
  const currentAuthor = isValidDay ? daysComponents[dayIndex].author : null;

  return (
    <main className="w-dvw h-dvh flex flex-col items-center justify-center grid-background">
      <div className="w-4/5 max-w-xl aspect-square overflow-hidden">
        {currentComponent || (
          <div className="@container flex items-center justify-center w-full h-full text-[10cqw] font-mono">
            <AnimateText>404</AnimateText>
          </div>
        )}
        <div className="fixed bottom-4 right-4 text-[1cqw] text-gray-300 flex flex-col items-end gap-2 font-extralight [&_a]:text-gray-500">
          <div>366DesignConcepts</div>
          <div>
            Made by&nbsp;
            {currentAuthor || <span>Unknown</span>}
          </div>
          <div>
            Inspaired by&nbsp;
            <a
              href="https://x.com/sovpal"
              target="_blank"
              rel="noreferrer noopener"
            >
              @sovpal
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
