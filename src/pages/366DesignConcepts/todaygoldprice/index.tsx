import { useRef, type JSX } from "react";
import Chart from "./components/Chart";
import Counter from "./components/Count";

export default function TodayGoldPrice(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const goldPrice = 32345;
  const change = 1323;
  const changePercent = ((change / (goldPrice - change)) * 100).toFixed(
    2
  ) as unknown as number;

  return (
    <section
      ref={containerRef}
      className="@container size-full [&_div]:selection:bg-black [&_div]:selection:text-white"
    >
      <div className="size-full pt-[12cqw] pb-0 bg-[#E3E0DB] border-black/5 border-[0.3cqw] rounded-[17.5%] overflow-hidden flex flex-col">
        <div className="flex flex-col px-[12cqw] gap-[2cqw]">
          <div className="shrink-0 uppercase text-[#9C9996] font-medium text-[4cqw]">
            investments
          </div>
          <div className="shrink-0 uppercase text-[#171716] font-semibold text-[14cqw] leading-[14cqw] flex">
            $<Counter value={goldPrice} />
          </div>
          <div className="shrink-0 uppercase text-[#41A669] font-semibold text-[5cqw]">
            +$
            <Counter value={change} /> (+
            <Counter value={changePercent} />
            %)
          </div>
        </div>
        <div className="grow">
          <Chart />
        </div>
      </div>
    </section>
  );
}
