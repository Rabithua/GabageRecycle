import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export default function Tooltip({
  hover,
}: {
  hover: {
    x: number;
    y: number;
    value: number;
    time: number;
    index: number;
  };
}) {
  const tooltipRef = useRef(null);

  useGSAP(() => {
    // 创建一个时间线
    const tl = gsap.timeline();

    // Step 2: 入场后，开始一次性左右摇摆
    tl.to(tooltipRef.current, {
      scale: 1,
      rotation: -10,
      transformOrigin: "50% 120%",
      duration: 0.2,
      ease: "power1.in",
    })
      .to(tooltipRef.current, {
        rotation: 5,
        transformOrigin: "50% 120%",
        duration: 0.2,
      })
      .to(tooltipRef.current, {
        rotation: 0,
        transformOrigin: "50% 120%",
        duration: 0.5,
      });
  }, []);

  return (
    <div
      ref={tooltipRef}
      className="bg-[#515151] text-[#E3E0DB] px-[2cqw] py-[1cqw] rounded-[3cqw] shadow-lg pointer-events-none text-[4cqw] font-medium scale-0"
    >
      <div className="whitespace-nowrap text-[1.5cqw] font-bold">
        {new Date(hover.time).toLocaleString()}
      </div>
      <div>¥{hover.value.toFixed(2)}</div>
      <div
        className="absolute left-1/2 top-full w-0 h-0 -translate-x-1/2"
        style={{
          borderLeft: "0.8cqw solid transparent",
          borderRight: "0.8cqw solid transparent",
          borderTop: "0.8cqw solid #515151",
        }}
      />
    </div>
  );
}
