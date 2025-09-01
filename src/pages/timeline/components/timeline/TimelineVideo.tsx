import { SunDim } from "lucide-react";
import { useRef, useState } from "react";

export interface TimelineVideoProps {
  src: string;
  poster: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
}

/**
 * 时间线中的方形视频播放器，点击切换播放/暂停。
 */
export default function TimelineVideo({
  src,
  poster,
  className = "",
  autoPlay = false,
  loop = false,
  muted = false,
}: TimelineVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [, setPlaying] = useState(false);
  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play();
    } else {
      v.pause();
    }
  };
  const onPlay = () => setPlaying(true);
  const onPause = () => setPlaying(false);
  return (
    <div
      className={`relative w-full cursor-pointer aspect-square sm:border-4 bg-white border-gray-50 rounded-3xl overflow-hidden group ${className}`}
    >
      <SunDim className="absolute top-4 right-4 size-8 text-white z-10 bg-black/30 backdrop-blur-sm p-1 rounded-2xl opacity-60" />
      <video
        ref={ref}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        onClick={toggle}
        onPlay={onPlay}
        onPause={onPause}
        playsInline
        preload="auto"
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        aria-label="点击播放或暂停视频"
      />
    </div>
  );
}
