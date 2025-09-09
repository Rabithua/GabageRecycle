import AnimateText from "@/components/AnimateText";
import moment from "moment";
import { useRef, type JSX } from "react";
import Ollama from "./components/Ollama";

export default function DayThree(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className={`@container size-full [&_div]:selection:bg-black [&_div]:selection:text-white`}
    >
      <div className="size-full space-y-[4cqw] p-[8cqw] bg-white border-black/5 border-[0.3cqw] rounded-[17.5%] overflow-hidden flex flex-col">
        <div className="flex items-start justify-between shrink-0">
          <Ollama className="size-[20cqw]" />
          <p className="text-[6cqw] mt-[6cqw] shrink-0 font-mono text-black/10">
            {moment().format("DD/MM/YYYY")}
          </p>
        </div>
        <div className=" grow relative text-[8cqw] leading-[1.4] font-serif">
          <span className="absolute z-0 -top-[14cqw] -left-[4cqw] text-[40cqw] text-black/2 font-serif select-none pointer-events-none">
            “
          </span>
          <p className="line-clamp-4 z-1 mt-a">
            <AnimateText>
              Nice to meet you! I'm LLaMA, an artificial intelligence language
              model designed to assist and communicate with humans in a helpful
              and polite manner.
            </AnimateText>
          </p>
        </div>
        <div className="shrink-0 text-[6cqw] text-black/10">
          llama-3-8b-instruct
        </div>
      </div>
    </section>
  );
}
