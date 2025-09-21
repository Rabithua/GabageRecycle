import AnimateText from "@/components/AnimateText";
import { useEffect, useRef, useState, type JSX } from "react";
import Chart from "./components/Chart";
import Counter from "./components/Count";
import { type ApiWrapper, type HistoryEntry, type HistoryWrapper } from "./lib";

const HISTORYLIMIT = 20;

// Conversion notes:
// - The gold API returns prices in USD per troy ounce (common market convention).
// - We fetch USD->CNY exchange rate from `https://open.er-api.com/v6/latest/USD` and
//   convert USD/oz -> CNY/oz then -> CNY/gram using the troy ounce gram constant below.
// - If the exchange rate fetch fails, the component will still show USD data internally
//   but CNY conversions will be unavailable until rate is fetched.
// 1 troy ounce = 31.1034768 grams
const GRAMS_PER_TROY_OUNCE = 31.1034768;

export default function TodayGoldPrice(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  // priceUsdOz: USD per troy ounce as returned by API
  const [priceUsdOz, setPriceUsdOz] = useState<number | null>(null);
  // usdToCny rate
  const [usdToCny, setUsdToCny] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  // chart data with timestamps (historic points) - values in USD/oz
  const [chartDataUsdOz, setChartDataUsdOz] =
    useState<{ time: number; value: number }[]>();

  useEffect(() => {
    let mounted = true;

    async function fetchPrice() {
      setError(null);
      try {
        const res = await fetch("https://api.zzfw.cc/api/forex/quote/XAU/USD");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = (await res.json()) as ApiWrapper;

        if (!json || json.status !== "success") {
          throw new Error(json?.message || "API returned non-success status");
        }

        const price = json.data[0].spreadProfilePrices[0].bid;

        if (mounted) {
          setPriceUsdOz(price);
        }
      } catch (e: unknown) {
        if (mounted) {
          const msg = e instanceof Error ? e.message : String(e);
          setError(msg);
        }
      }
    }

    async function fetchHistory() {
      try {
        const res = await fetch(
          `https://api.zzfw.cc/api/forex/history/XAU/USD?limit=${HISTORYLIMIT}`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json = (await res.json()) as HistoryWrapper;

        if (!json || json.status !== "success") {
          throw new Error(json?.message || "API returned non-success status");
        }

        const records: HistoryEntry[] = Array.isArray(json.data?.data)
          ? json.data.data
          : [];

        const points: { time: number; value: number }[] = [];
        for (const r of records) {
          try {
            const p = r.data[0].spreadProfilePrices[0].bid;
            // determine timestamp: prefer HistoryEntry.timestamp (ISO string),
            // fallback to ApiEntry.ts (assumed epoch seconds or ms)
            let time = Date.parse(r.timestamp);
            if (isNaN(time)) {
              const ts = r.data?.[0]?.ts;
              if (typeof ts === "number") {
                // if ts looks like seconds (less than 1e12), convert to ms
                time = ts < 1e12 ? ts * 1000 : ts;
              } else {
                time = Date.now();
              }
            }

            points.push({ time, value: p });
          } catch (err) {
            console.warn("skip history record due to error:", err);
          }
        }

        if (points.length > 0) {
          const ordered = points.slice().reverse();

          console.log("Fetched history points:", ordered);

          setChartDataUsdOz(ordered);
        }
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        console.warn("fetchHistory error:", msg);
      }
    }

    async function fetchUsdToCny() {
      try {
        const res = await fetch("https://open.er-api.com/v6/latest/USD");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        const rate = json?.rates?.CNY;
        if (typeof rate === "number") {
          if (mounted) setUsdToCny(rate);
        } else {
          console.warn("USD->CNY rate not found in exchange response", json);
        }
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : String(e);
        console.warn("fetchUsdToCny error:", msg);
      }
    }

    fetchPrice();
    fetchHistory();
    fetchUsdToCny();

    return () => {
      mounted = false;
    };
  }, []);

  // Helpers to convert USD/oz -> CNY/g
  const usdOzToCnyGram = (usdPerOz: number | null) => {
    if (usdPerOz == null || usdToCny == null) return null;
    const cnyPerOz = usdPerOz * usdToCny;
    const cnyPerGram = cnyPerOz / GRAMS_PER_TROY_OUNCE;
    return cnyPerGram;
  };

  // convert historic USD/oz points -> CNY/gram, preserving timestamps
  const chartDataCnyGram = Array.isArray(chartDataUsdOz)
    ? chartDataUsdOz
        .map((p) => {
          if (usdToCny == null || typeof p.value !== "number") return null;
          const cnyPerGram = (p.value * usdToCny) / GRAMS_PER_TROY_OUNCE;
          return { time: p.time, value: cnyPerGram } as {
            time: number;
            value: number;
          };
        })
        .filter((v): v is { time: number; value: number } => v !== null)
    : undefined;

  const priceCnyGram = usdOzToCnyGram(priceUsdOz);

  const hasData =
    priceUsdOz != null &&
    usdToCny != null &&
    Array.isArray(chartDataCnyGram) &&
    chartDataCnyGram.length > 0;

  return (
    <section
      ref={containerRef}
      className="@container size-full [&_div]:selection:bg-black [&_div]:selection:text-white"
    >
      <div className="size-full p-[12cqw] gap-[12cqw] pb-0 bg-[#E3E0DB] border-black/5 border-[0.3cqw] rounded-[17.5%] overflow-hidden flex flex-col">
        {/** Skeleton when data not ready */}
        {!hasData ? (
          <div className="animate-pulse flex flex-col gap-[2cqw]">
            <div className="h-[4cqw] w-2/3 bg-[#D9D6D1] rounded" />
            <div className="h-[14cqw] w-4/5 bg-[#D9D6D1] rounded mt-[1cqw]" />
            <div className="h-[5cqw] w-1/2 bg-[#D9D6D1] rounded mt-[1cqw]" />
            <div className="grow mt-[2cqw] bg-[#D9D6D1] rounded" />
            {error && (
              <div className="text-red-600 text-[3cqw] mt-[1cqw]">
                Error: {error}
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="flex flex-col">
              <div className="shrink-0 uppercase mb-[4cqw] text-[#9C9996] font-medium text-[4cqw]">
                <AnimateText>RealTime Gold Price</AnimateText>
              </div>

              <div className="shrink-0 text-[#171716] font-semibold text-[14cqw] leading-[12cqw]">
                <Counter value={priceCnyGram!} precision={2} />
                <span className="text-[6cqw] text-[#9C9996]">CNY/G</span>
              </div>

              {/** delta and percent (assume hasData true) */}
              {(() => {
                const last = 800;
                const rawDelta = priceCnyGram! - last!;
                const deltaSign = rawDelta > 0 ? "+" : rawDelta < 0 ? "-" : "";
                const delta = Number(Math.abs(rawDelta));
                const deltaPercent =
                  last !== 0 ? Number((rawDelta / last) * 100) : 0;
                const percentSign =
                  deltaPercent > 0 ? "+" : deltaPercent < 0 ? "-" : "";

                return (
                  <div
                    className={` shrink-0 leading-[5cqw] font-semibold text-[5cqw] ${rawDelta > 0 ? "text-[#41A669]" : "text-red-400"}`}
                  >
                    <span className="mr-1">{deltaSign}</span>
                    <Counter value={delta} precision={2} /> ({percentSign}
                    <Counter value={Math.abs(deltaPercent)} precision={2} />
                    %)
                  </div>
                );
              })()}
            </div>

            <div className="grow">
              <Chart
                data={chartDataCnyGram as { time: number; value: number }[]}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
