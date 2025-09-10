import AnimateText from "@/components/AnimateText";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState, type JSX } from "react";

/**
 * Generates a matrix representation of a month's calendar.
 *
 * The function creates a 2D array where each inner array represents a week.
 * Each cell in the matrix is a Date object. The matrix includes days from
 * the previous and next months to fill out complete weeks.
 *
 * @param date - A Date object representing any day within the target month
 * @returns A 2D array of Date objects organized by weeks
 *
 * @example
 * // Get calendar for January 2023
 * const matrix = getMonthMatrix(new Date(2023, 0, 15));
 * // Result will be a matrix where each row is a week
 * // including appropriate days from previous/next months
 */
function getMonthMatrix(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstOfMonth = new Date(year, month, 1);
  const startDay = firstOfMonth.getDay();

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const totalCells = Math.ceil((startDay + daysInMonth) / 7) * 7;

  const cells: Date[] = [];

  const startDate = new Date(year, month, 1 - startDay);

  for (let i = 0; i < totalCells; i++) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() + i);
    cells.push(d);
  }

  const weeks: Date[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  return weeks;
}

/**
 * A calendar component that displays a full month view with days organized in a grid.
 *
 * Features:
 * - Displays current month days with proper weekday alignment
 * - Highlights the current day with different styling
 * - Distinguishes between current month days and adjacent month days
 * - Provides navigation controls to move between months
 * - Displays the month name and year
 * - Responsive design using container query units (cqw)
 * - Accessible navigation with keyboard support
 *
 * The calendar uses a neon green color scheme (#3CE58A) with text shadow effects
 * for a glowing appearance, and supports animated text rendering for the day numbers.
 *
 * @returns {JSX.Element} A month calendar component
 *
 * @example
 * ```tsx
 * <MonthCalendar />
 * ```
 *
 * @requires getMonthMatrix - A function that generates a matrix of dates for the month
 * @requires AnimateText - A component that animates text characters
 * @requires ChevronLeft - An icon component for the previous month button
 * @requires ChevronRight - An icon component for the next month button
 */
export default function MonthCalendar(): JSX.Element {
  const [cursor, setCursor] = useState(() => new Date());

  const goPrev = () => {
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() - 1, 1));
  };

  const goNext = () => {
    setCursor((c) => new Date(c.getFullYear(), c.getMonth() + 1, 1));
  };

  const weeks = useMemo(() => getMonthMatrix(cursor), [cursor]);

  const today = useMemo(() => {
    const t = new Date();
    return `${t.getFullYear()}-${t.getMonth()}-${t.getDate()}`;
  }, []);

  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

  return (
    <div className="size-full flex flex-col gap-[2cqw] font-mono text-[6cqw]">
      <div className="grid grid-cols-7 text-[#3CE58A] shrink-0">
        {weekdays.map((w, i) => (
          <div key={`${w}-${i}`} className="text-center text-[5cqw] opacity-30">
            {w}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 grow font-semibold">
        {weeks.flat().map((day) => {
          const key = `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`;
          const isToday = key === today;

          const visibleMonth = cursor.getMonth();
          const visibleYear = cursor.getFullYear();
          const isCurrentMonth =
            day.getMonth() === visibleMonth &&
            day.getFullYear() === visibleYear;

          return (
            <div
              key={key}
              className={` flex items-center justify-center cursor-default
            ${isToday ? "bg-[#3CE58A] text-[#030A06] font-semibold" : "hover:bg-[#3CE58A10]"}
            ${isCurrentMonth ? "text-[#3CE58A]" : "text-[#3CE58A60] opacity-40"}`}
              style={{
                textShadow: "0px 0px 4cqw rgba(60, 229, 138, 0.8)",
              }}
            >
              <AnimateText type="chars">{day.getDate()}</AnimateText>
            </div>
          );
        })}
      </div>

      <div className="flex justify-around pt-[4cqw] shrink-0 font-semibold">
        <ChevronLeft
          role="button"
          tabIndex={0}
          aria-label="Previous month"
          onClick={goPrev}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") goPrev();
          }}
          className="w-[10cqw] outline-none h-[10cqw] cursor-pointer"
        />
        <div className="flex flex-col justify-center items-center gap-[2cqw]">
          <div
            className="text-[8cqw] leading-10 tracking-wide"
            style={{
              textShadow: "0px 0px 6cqw rgba(60, 229, 138, 0.8)",
            }}
          >
            {cursor.toLocaleString("en-US", {
              month: "long",
            })}
          </div>
          <div
            className="text-[4cqw] tracking-widest"
            style={{
              textShadow: "0px 0px 4cqw rgba(60, 229, 138, 0.8)",
            }}
          >
            {cursor.getFullYear()}
          </div>
        </div>
        <ChevronRight
          role="button"
          tabIndex={0}
          aria-label="Next month"
          onClick={goNext}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") goNext();
          }}
          className="w-[10cqw] outline-none h-[10cqw] cursor-pointer"
        />
      </div>
    </div>
  );
}
