import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { useEffect, useRef } from "react";

gsap.registerPlugin(MorphSVGPlugin);

export default function MusicControler({
  isPlaying,
  onToggle,
  className = "",
  onSeek,
  onStartRewind,
  onStopRewind,
  onStartForward,
  onStopForward,
}: {
  isPlaying: boolean;
  onToggle: () => void;
  className?: string;
  onSeek?: (delta: number) => void;
  onStartRewind?: () => void;
  onStopRewind?: () => void;
  onStartForward?: () => void;
  onStopForward?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  // 播放图标路径 (三角形)
  const playPath =
    "M102.606 48.2699C112.616 54.0494 112.616 68.4981 102.606 74.2776L22.5232 120.513C12.5128 126.293 -0.00010391 119.069 -0.000103405 107.51L-9.93626e-05 15.0379C-9.88574e-05 3.47897 12.5128 -3.74538 22.5232 2.0341L102.606 48.2699Z";

  // 暂停图标路径 (两个矩形)
  const pausePath =
    "M11.5106 127.115C7.74391 127.115 4.9063 126.161 2.99782 124.253C1.08933 122.344 0.160205 119.507 0.210428 115.74V11.4766C0.210428 7.76004 1.16467 4.94754 3.07315 3.03905C4.98163 1.13057 7.79413 0.176331 11.5106 0.176331H29.591C33.3075 0.226554 36.12 1.1808 38.0285 3.03905C39.937 4.89731 40.8912 7.70981 40.8912 11.4766V115.74C40.8912 119.507 39.937 122.344 38.0285 124.253C36.12 126.161 33.3075 127.115 29.591 127.115H11.5106ZM70.2718 127.115C66.4548 127.115 63.5921 126.161 61.6836 124.253C59.8254 122.344 58.8963 119.507 58.8963 115.74V11.4766C58.8963 7.76004 59.8505 4.94754 61.759 3.03905C63.6675 1.13057 66.5051 0.176331 70.2718 0.176331H88.2768C92.0436 0.176331 94.8561 1.13057 96.7143 3.03905C98.6228 4.89731 99.577 7.70981 99.577 11.4766V115.74C99.577 119.507 98.6228 122.344 96.7143 124.253C94.8561 126.161 92.0436 127.115 88.2768 127.115H70.2718Z";

  const { contextSafe } = useGSAP(
    () => {
      // 初始化图标状态
      if (pathRef.current) {
        gsap.set(pathRef.current, {
          attr: { d: isPlaying ? pausePath : playPath },
        });
      }
    },
    { scope: containerRef }
  );

  // 当 isPlaying 状态变化时，更新图标
  useEffect(() => {
    if (pathRef.current) {
      const animate = contextSafe(() => {
        gsap.to(pathRef.current, {
          duration: 0.4,
          morphSVG: isPlaying ? pausePath : playPath,
          ease: "power2.inOut",
        });
      });
      animate();
    }
  }, [isPlaying, contextSafe, playPath, pausePath]);

  function handleToggle() {
    console.log("当前播放状态:", isPlaying);
    onToggle();
  }

  // helper to attach pointer handlers to images
  const pointerProps = (start?: () => void, stop?: () => void) => ({
    onMouseDown: start,
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: start,
    onTouchEnd: stop,
  });

  return (
    <div ref={containerRef} className={`flex items-center gap-4 ${className}`}>
      <div
        className="size-[14cqw] cursor-pointer"
        onClick={() => onSeek?.(-5)}
        {...pointerProps(onStartRewind, onStopRewind)}
      >
        <svg
          className="size-full"
          width="102"
          height="87"
          viewBox="0 0 102 87"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M101.426 74.04C101.426 76.9169 100.665 79.0661 99.1415 80.4877C97.6523 81.9092 95.8753 82.62 93.8107 82.62C91.983 82.62 90.1892 82.1123 88.4292 81.0969L33.8524 49.2647C31.7878 48.0801 30.2478 46.8954 29.2324 45.7108C28.217 44.4924 27.7093 43.037 27.7093 41.3447C27.7093 39.6524 28.217 38.2139 29.2324 37.0293C30.2478 35.8109 31.7878 34.6093 33.8524 33.4247L88.4292 1.59247C90.1892 0.577088 91.983 0.069397 93.8107 0.069397C95.8753 0.069397 97.6523 0.780163 99.1415 2.2017C100.665 3.62323 101.426 5.75554 101.426 8.59861V74.04ZM20.3986 82.4169H8.214C5.70939 82.4169 3.81401 81.7569 2.52786 80.4369C1.24171 79.1508 0.598633 77.2554 0.598633 74.7508V7.88784C0.598633 5.34938 1.24171 3.454 2.52786 2.2017C3.81401 0.915547 5.70939 0.272472 8.214 0.272472H20.3986C22.9032 0.272472 24.7986 0.915547 26.0847 2.2017C27.3709 3.48785 28.014 5.38323 28.014 7.88784V74.7508C28.014 77.2554 27.3709 79.1508 26.0847 80.4369C24.8324 81.7569 22.937 82.4169 20.3986 82.4169Z"
            fill="white"
          />
        </svg>
      </div>

      <div className="cursor-pointer" onClick={handleToggle}>
        <svg
          className="size-[16cqw]"
          width="100"
          height="128"
          viewBox="0 0 100 128"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path ref={pathRef} fill="currentColor" />
        </svg>
      </div>

      <div
        className="size-[14cqw] cursor-pointer"
        onClick={() => onSeek?.(5)}
        {...pointerProps(onStartForward, onStopForward)}
      >
        <svg
          className="size-full"
          width="102"
          height="87"
          viewBox="0 0 102 87"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M81.7277 86.1431C79.1892 86.1431 77.2769 85.5 75.9908 84.2138C74.7385 82.9277 74.1123 81.0154 74.1123 78.4769V8.21247C74.1123 5.70786 74.7554 3.81248 76.0415 2.52633C77.3277 1.24018 79.2231 0.597107 81.7277 0.597107H93.9123C96.4507 0.597107 98.3461 1.24018 99.5984 2.52633C100.885 3.77864 101.528 5.67402 101.528 8.21247V78.4769C101.528 81.0154 100.885 82.9277 99.5984 84.2138C98.3461 85.5 96.4507 86.1431 93.9123 86.1431H81.7277ZM9.33092 84.8231C6.9617 84.8231 4.91401 83.9431 3.18786 82.1831C1.46171 80.4569 0.598633 77.9692 0.598633 74.72V11.9694C0.598633 8.72017 1.44478 6.23248 3.13709 4.50633C4.86324 2.74633 6.92785 1.86633 9.33092 1.86633C10.5155 1.86633 11.6325 2.03556 12.6817 2.37403C13.7309 2.71249 14.8478 3.22018 16.0324 3.8971L68.2231 34.5109C70.22 35.6955 71.7431 36.9986 72.7923 38.4201C73.8415 39.8416 74.3662 41.4832 74.3662 43.3447C74.3662 45.2062 73.8246 46.8647 72.7415 48.3201C71.6923 49.7416 70.1862 51.0447 68.2231 52.2293L16.0324 82.7923C14.8817 83.4692 13.7648 83.9769 12.6817 84.3154C11.6325 84.6538 10.5155 84.8231 9.33092 84.8231Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
}
