import MusicToggle from "@/pages/366DesignConcepts/dayOne/components/MusicToggle";
import SliderText from "@/pages/home/components/SliderText";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { AudioLines } from "lucide-react";
import type { IAudioMetadata } from "music-metadata";
import * as musicMetadata from "music-metadata";
import { useEffect, useRef, useState } from "react";
import MusicPlayerSkeleton from "./components/Skeleton";
import { arrayBufferToBase64 } from "@/utils/file";

export default function DayOne({
  musicUrl = "https://public.zzfw.cc/gabagerecycle/366DesignConcepts/dayone/%E6%B5%B7%E5%BA%95%E6%97%B6%E5%85%89%E6%9C%BA%20-%20%E8%A7%A3%E5%86%B3.mp3",
}: {
  musicUrl?: string;
}) {
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

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setLoading(true);
        setError(null);

        try {
          new URL(musicUrl);
        } catch {
          throw new Error("音乐文件 URL 格式无效");
        }

        const response = await fetch(musicUrl);

        if (!response.ok) {
          throw new Error(
            `获取音乐文件失败: ${response.status} ${response.statusText}`
          );
        }

        const contentType = response.headers.get("content-type");
        if (contentType && !contentType.startsWith("audio/")) {
          console.warn("文件可能不是音频格式:", contentType);
        }

        const buffer = await response.arrayBuffer();

        if (!buffer || buffer.byteLength === 0) {
          throw new Error("音乐文件内容为空");
        }

        const metadata = await musicMetadata.parseBuffer(
          new Uint8Array(buffer),
          { size: buffer.byteLength, mimeType: "audio/mpeg" }
        );

        if (!metadata) {
          throw new Error("无法解析音乐文件元数据");
        }

        setMetadata(metadata);
      } catch (err: unknown) {
        console.error("获取音乐元数据时发生错误:", err);

        let errorMessage = "未知错误";

        if (err instanceof TypeError && err.message.includes("fetch")) {
          errorMessage = "网络连接错误，请检查网络状态";
        } else if (
          err instanceof TypeError &&
          err.message.includes("Failed to fetch")
        ) {
          errorMessage = "无法访问音乐文件，请检查文件是否存在";
        } else if (err instanceof Error && err.name === "AbortError") {
          errorMessage = "请求被取消";
        } else if (err instanceof Error && err.message.includes("CORS")) {
          errorMessage = "跨域访问被拒绝，请检查文件权限";
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    // 只有当 musicUrl 存在时才执行
    if (musicUrl) {
      fetchMetadata();
    } else {
      setLoading(false);
      setError("请提供有效的音乐文件 URL");
    }
  }, [musicUrl]);

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
          <MusicPlayerSkeleton />
        </div>
      )}
      {error && (
        <div className="size-full relative flex flex-col items-center justify-center gap-[6cqw]">
          <AudioLines className="size-[20cqw] text-white" />
          <p className="text-[4cqw] text-white max-w-[80%] text-center">
            <SliderText>{error}</SliderText>
          </p>
        </div>
      )}
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

          {metadata.common.picture && metadata.common.picture.length > 0 && (
            <img
              src={`data:${metadata.common.picture[0].format};base64,${arrayBufferToBase64(
                metadata.common.picture[0].data
              )}`}
              alt="Album Art"
              className="size-full object-cover absolute top-0 left-0 z-0"
            />
          )}

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
