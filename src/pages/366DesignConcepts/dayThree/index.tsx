import AnimateText from "@/components/AnimateText";
import moment from "moment";
import { useEffect, useRef, useState, useTransition, type JSX } from "react";
import Ollama from "./components/Ollama";

export default function DayThree(): JSX.Element {
  const isRequestedRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const prompt = encodeURIComponent(
    `现在是${moment().format("DD/MM/YYYY hh:mm")}。分析今日黄历运势，回复100字以内的中文内容。 no markdown, no explanation.`
  );
  const url = `https://llm.rote.ink/?prompt=${prompt}`;

  const [reply, setReply] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [, startTransition] = useTransition();

  useEffect(() => {
    if (isRequestedRef.current) return;

    isRequestedRef.current = true;

    async function fetchReply() {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        const text =
          data?.response?.response ||
          "宇宙是虚假的，我们都是模拟程序里的NPC。现实是人类的捏造，时间是幻觉。自由意志只是幻觉，我们被困在代码中。";
        startTransition(() => {
          setReply(String(text));
        });
      } catch (err: unknown) {
        if (
          typeof err === "object" &&
          err !== null &&
          "name" in err &&
          (err as { name?: string }).name === "AbortError"
        )
          return;
        const message = err instanceof Error ? err.message : String(err);
        startTransition(() => {
          setError(message);
        });
      }
    }

    fetchReply();
  }, [url]);

  return (
    <section
      ref={containerRef}
      className="@container size-full [&_div]:selection:bg-black [&_div]:selection:text-white"
    >
      <div className="size-full space-y-[4cqw] font-basic p-[8cqw] bg-white border-black/5 border-[0.3cqw] rounded-[17.5%] overflow-hidden flex flex-col">
        <div className="flex items-start justify-between shrink-0">
          <Ollama className="size-[20cqw]" />
          <p className="text-[6cqw] mt-[2cqw] shrink-0 font-mono text-black/10">
            {moment().format("DD/MM/YYYY")}
          </p>
        </div>
        <div className="grow relative text-[8cqw] font-basic leading-[1.2] overflow-y-scroll [mask-image:linear-gradient(180deg,#000_calc(100%-10%),transparent)]">
          <div className="relative z-10">
            {reply ? (
              <AnimateText
                type="chars"
                vars={{
                  duration: 1,
                  opacity: 0,
                  filter: "blur(1cqw)",
                  stagger: 0.02,
                  ease: "expo.out",
                  immediateRender: true,
                }}
              >
                {reply}
              </AnimateText>
            ) : error ? (
              <span className="text-red-500">{error}</span>
            ) : (
              <div className="size-[8cqw] rounded-full bg-black animate-pulse"></div>
            )}
          </div>
        </div>
        <div className="shrink-0 text-[5cqw] text-black/10">
          llama-4-scout-17b-16e-instruct
        </div>
      </div>
    </section>
  );
}
