import { useParams } from "react-router";
import DayOne from "./components/DayOne";

const daysComponents = [<DayOne />];

export default function DesignConcepts() {
  const params = useParams();
  console.log(params);

  return (
    <main className="w-dvw h-dvh flex flex-col items-center justify-center grid-background">
      <div className="w-4/5 max-w-xl aspect-square overflow-hidden">
        {daysComponents[Number(params.day) - 1] || (
          <div className="@container flex items-center justify-center w-full h-full text-primary text-[10cqw] font-mono">
            404
          </div>
        )}
        <div className="fixed bottom-4 right-4 text-[1cqw] text-gray-300 flex flex-col items-end gap-2 font-extralight [&_a]:text-gray-500">
          <div>366DesignConcepts</div>
          <div>
            Made by&nbsp;
            <a
              href="https://x.com/rabithua"
              target="_blank"
              rel="noreferrer noopener"
            >
              @rabithua
            </a>
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
