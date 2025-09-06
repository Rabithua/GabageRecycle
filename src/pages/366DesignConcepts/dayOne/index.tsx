import SliderText from "@/pages/home/components/SliderText";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import type { IAudioMetadata } from "music-metadata";
import * as musicMetadata from "music-metadata";
import { useEffect, useRef, useState } from "react";
import MusicToggle from "./components/MusicToggle";

// 将 Uint8Array 转换为 Base64 字符串的辅助函数
function arrayBufferToBase64(buffer: Uint8Array): string {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export default function DayOne() {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [metadata, setMetadata] = useState<IAudioMetadata | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const rewindIntervalRef = useRef<number | null>(null);
  const forwardIntervalRef = useRef<number | null>(null);
  const musicUrl =
    "https://public.zzfw.cc/gabagerecycle/366DesignConcepts/dayone/%E6%B5%B7%E5%BA%95%E6%97%B6%E5%85%89%E6%9C%BA%20-%20%E8%A7%A3%E5%86%B3.mp3";

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setLoading(true);

        // 获取音乐文件
        const response = await fetch(musicUrl);
        const buffer = await response.arrayBuffer();

        // 解析元数据
        const metadata = await musicMetadata.parseBuffer(
          new Uint8Array(buffer),
          { size: buffer.byteLength, mimeType: "audio/mpeg" }
        );

        console.log("音乐元数据：", metadata);
        setMetadata(metadata);
      } catch (err) {
        console.error("解析音乐元数据时出错:", err);
        setError(err instanceof Error ? err.message : "未知错误");
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, []);

  // 清理定时器
  useEffect(() => {
    return () => {
      if (rewindIntervalRef.current !== null) {
        clearInterval(rewindIntervalRef.current);
      }
      if (forwardIntervalRef.current !== null) {
        clearInterval(forwardIntervalRef.current);
      }
    };
  }, []);

  // 音频播放控制
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // 快退5秒
  const handlePrevious = () => {
    if (audioRef.current) {
      const newTime = Math.max(audioRef.current.currentTime - 5, 0);
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);

      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // 快进5秒
  const handleNext = () => {
    if (audioRef.current) {
      const newTime = Math.min(
        audioRef.current.currentTime + 5,
        audioRef.current.duration
      );
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);

      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  // 开始长按快退
  const startRewind = () => {
    if (rewindIntervalRef.current !== null) return;

    // 先执行一次快退
    handlePrevious();

    // 然后设置间隔持续快退
    rewindIntervalRef.current = window.setInterval(() => {
      if (audioRef.current) {
        const newTime = Math.max(audioRef.current.currentTime - 2, 0);
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
      }
    }, 200); // 每200毫秒快退2秒
  };

  // 结束长按快退
  const stopRewind = () => {
    if (rewindIntervalRef.current !== null) {
      clearInterval(rewindIntervalRef.current);
      rewindIntervalRef.current = null;
    }
  };

  // 开始长按快进
  const startForward = () => {
    if (forwardIntervalRef.current !== null) return;

    // 先执行一次快进
    handleNext();

    // 然后设置间隔持续快进
    forwardIntervalRef.current = window.setInterval(() => {
      if (audioRef.current) {
        const newTime = Math.min(
          audioRef.current.currentTime + 2,
          audioRef.current.duration
        );
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
      }
    }, 200); // 每200毫秒快进2秒
  };

  // 结束长按快进
  const stopForward = () => {
    if (forwardIntervalRef.current !== null) {
      clearInterval(forwardIntervalRef.current);
      forwardIntervalRef.current = null;
    }
  };

  // 更新进度条
  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  // 设置进度
  const setProgress = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const progressBar = e.currentTarget;
      const clickPosition =
        (e.clientX - progressBar.getBoundingClientRect().left) /
        progressBar.offsetWidth;
      audioRef.current.currentTime = clickPosition * audioRef.current.duration;
    }
  };

  useGSAP(
    () => {
      gsap.set(containerRef.current, { autoAlpha: 1 });
    },
    {
      scope: containerRef,
    }
  );

  return (
    <section
      ref={containerRef}
      className={`@container size-full bg-black/20 border-white/20 border-[0.5cqw] rounded-[17.5%] overflow-hidden [&_div]:selection:bg-[#ffffff] [&_div]:selection:text-[#000000]`}
    >
      {loading && (
        <div className="size-full flex flex-col items-center justify-end px-[12cqw] py-[8cqw] gap-[6cqw]">
          {/* 骨架屏 - 专辑封面 */}
          <div className="size-full absolute top-0 left-0 z-0 bg-gradient-to-b from-gray-200 to-gray-300 animate-pulse"></div>

          {/* 骨架屏 - 渐变遮罩 */}
          <div className="absolute bottom-0 w-full h-2/3 [mask-image:linear-gradient(0deg,#000_calc(100%-40%),transparent)] z-5 bg-black/20 backdrop-blur-2xl"></div>

          <div className="flex flex-col items-center z-10 w-full">
            {/* 骨架屏 - 歌曲标题 */}
            <div className="w-3/4 h-[8cqw] bg-white/30 rounded-full animate-pulse mb-2"></div>

            {/* 骨架屏 - 歌手名 */}
            <div className="w-1/2 h-[8cqw] bg-white/20 rounded-full animate-pulse"></div>

            {/* 骨架屏 - 控制按钮 */}
            <div className="flex gap-[3cqw] mt-[4cqw] items-center justify-around w-full">
              <div className="size-[14cqw] rounded-full bg-white/30 animate-pulse"></div>
              <div className="size-[16cqw] rounded-full bg-white/30 animate-pulse"></div>
              <div className="size-[14cqw] rounded-full bg-white/30 animate-pulse"></div>
            </div>

            {/* 骨架屏 - 进度条 */}
            <div className="w-full h-[2cqw] mt-[6cqw] bg-white/10 rounded-full overflow-hidden">
              <div className="h-full w-1/3 bg-white/30 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}
      {error && <p className="text-red-500">错误: {error}</p>}
      {metadata && (
        <div className="size-full relative flex flex-col items-center justify-end px-[12cqw] py-[8cqw] gap-[6cqw]">
          {/* 音频元素 */}
          <audio
            ref={audioRef}
            src={musicUrl}
            onTimeUpdate={updateProgress}
            onLoadedMetadata={updateProgress}
            onEnded={() => setIsPlaying(false)}
          />

          {
            /* 显示专辑封面，如果有的话 */
            metadata.common.picture && metadata.common.picture.length > 0 && (
              <img
                src={`data:${metadata.common.picture[0].format};base64,${arrayBufferToBase64(
                  metadata.common.picture[0].data
                )}`}
                alt="Album Art"
                className="size-full object-cover absolute top-0 left-0 z-0"
              />
            )
          }

          <div className="absolute bottom-0 w-full h-2/3 [mask-image:linear-gradient(0deg,#000_calc(100%-40%),transparent)] z-5 bg-black/20 backdrop-blur-2xl"></div>

          <div className="flex flex-col items-center text-white z-10 w-full">
            <p className="text-[8cqw] font-bold">
              <SliderText>
                {metadata.common.title || "Unknown Title"}
              </SliderText>
            </p>
            <p className="text-[8cqw] opacity-80">
              <SliderText>
                {metadata.common.artist || "Unknown Artist"}
              </SliderText>
            </p>

            <div className="flex gap-[3cqw] mt-[4cqw] items-center justify-around w-full">
              <img
                alt="快退5秒，长按连续快退"
                src="https://public.zzfw.cc/gabagerecycle/366DesignConcepts/dayone/Previous.svg"
                className="size-[14cqw] cursor-pointer"
                onClick={handlePrevious}
                onMouseDown={startRewind}
                onMouseUp={stopRewind}
                onMouseLeave={stopRewind}
                onTouchStart={startRewind}
                onTouchEnd={stopRewind}
              />
              <MusicToggle
                className="size-[16cqw]"
                isPlaying={isPlaying}
                onToggle={togglePlay}
              />
              <img
                alt="快进5秒，长按连续快进"
                src="https://public.zzfw.cc/gabagerecycle/366DesignConcepts/dayone/Next.svg"
                className="size-[14cqw] cursor-pointer"
                onClick={handleNext}
                onMouseDown={startForward}
                onMouseUp={stopForward}
                onMouseLeave={stopForward}
                onTouchStart={startForward}
                onTouchEnd={stopForward}
              />
            </div>

            <div
              className="w-full h-[2cqw] mt-[6cqw] bg-white/30 rounded-full overflow-hidden cursor-pointer"
              onClick={setProgress}
            >
              <div
                className="h-full bg-white rounded-full"
                style={{ width: `${(currentTime / duration) * 100 || 0}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
