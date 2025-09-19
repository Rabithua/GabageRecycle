import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

export default function Counter({
  value,
  duration = 1.5,
  precision = 2,
}: {
  value: number;
  duration?: number;
  precision?: number;
}) {
  const numberRef = useRef({ val: 0 });
  const [displayValue, setDisplayValue] = useState(0);

  useGSAP(
    () => {
      const parsedValue = typeof value === "string" ? parseFloat(value) : value;

      if (numberRef.current.val !== parsedValue) {
        gsap.to(numberRef.current, {
          val: parsedValue,
          duration: duration,
          ease: "power2.out",
          onUpdate: () => {
            let formattedValue = numberRef.current.val;
            // 核心改动：判断如果原始值是整数，就不保留小数位
            if (Number.isInteger(parsedValue)) {
              formattedValue = Number(formattedValue.toFixed(0));
            } else {
              formattedValue = Number(formattedValue.toFixed(precision));
            }
            setDisplayValue(parseFloat(formattedValue.toString()));
          },
        });
      }
    },
    { dependencies: [value, precision], revertOnUpdate: true }
  );

  // 展示部分也得跟着改，不然显示出来的数字还是会补零
  const displayOptions = Number.isInteger(
    typeof value === "string" ? parseFloat(value) : value
  )
    ? {}
    : {
        minimumFractionDigits: precision,
        maximumFractionDigits: precision,
      };

  return <span>{displayValue.toLocaleString(undefined, displayOptions)}</span>;
}
