import { useRef, type JSX } from "react";
import MonthCalendar from "./components/MonthCalendar";

export default function DayFour(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="@container size-full rounded-[17.5%] bg-[#030A06] [&_div]:selection:bg-[#3CE58A] [&_div]:selection:text-[#030A06] border border-[#3CE58A20]"
    >
      <div
        className="size-full space-y-[4cqw] p-[8cqw] rounded-[17.5%] overflow-hidden flex flex-col text-[#3CE58A] [mask-image:radial-gradient(circle,rgba(0,0,0,1)_calc(100%-90%),transparent_calc(100%-10%))]"
        style={{
          backgroundImage: `
        radial-gradient(circle at 0.5cqw 0.5cqw, #3CE58A10 0.3cqw, transparent 0.4cqw)
          `,
          backgroundSize: "1.5cqw 1.5cqw",
        }}
      >
        <MonthCalendar />
      </div>
    </section>
  );
}
