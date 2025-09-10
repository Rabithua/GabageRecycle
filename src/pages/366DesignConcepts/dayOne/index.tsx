import AnimateText from "@/components/AnimateText";
import MusicControler from "@/pages/366DesignConcepts/dayOne/components/MusicControler";
import { arrayBufferToBase64 } from "@/utils/file";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { AudioLines, InfinityIcon } from "lucide-react";
import type { IAudioMetadata } from "music-metadata";
import * as musicMetadata from "music-metadata";
import { useEffect, useRef, useState, type JSX } from "react";
import MusicPlayerSkeleton from "./components/Skeleton";

/**
 * A music player component styled as a retro audio player with modern UI features.
 *
 * This component displays an audio player with album art (if available),
 * title, artist information, and standard playback controls. It fetches metadata
 * from an audio file URL and provides interactive functionality including:
 *
 * - Play/pause toggle
 * - Forward/rewind (single tap for 5s, long press for continuous seeking)
 * - Progress bar with click-to-seek functionality
 * - Loading state with skeleton UI
 * - Error handling with user-friendly messages
 *
 * The component uses GSAP for animations and is responsive with container queries.
 *
 * @param {Object} props - The component props
 * @param {string} [props.musicUrl="https://public.zzfw.cc/gabagerecycle/366DesignConcepts/dayone/%E6%B5%B7%E5%BA%95%E6%97%B6%E5%85%89%E6%9C%BA%20-%20%E8%A7%A3%E5%86%B3.mp3"] - URL of the audio file to play
 * @returns {JSX.Element} The rendered music player component
 *
 * @requires musicMetadata - For parsing audio file metadata
 * @requires gsap - For animations
 * @requires useGSAP - GSAP React hook
 * @requires MusicPlayerSkeleton - Skeleton loading component
 * @requires SliderText - Text animation component
 * @requires MusicToggle - Play/pause button component
 * @requires arrayBufferToBase64 - Utility function to convert array buffer to base64
 */
export default function DayOne({
  musicUrl = "https://public.zzfw.cc/gabagerecycle/366DesignConcepts/dayone/%E6%B5%B7%E5%BA%95%E6%97%B6%E5%85%89%E6%9C%BA%20-%20%E8%A7%A3%E5%86%B3.mp3",
}: {
  musicUrl?: string;
}): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [metadata, setMetadata] = useState<IAudioMetadata | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const rewindIntervalRef = useRef<number | null>(null);
  const forwardIntervalRef = useRef<number | null>(null);

  // Seek configuration constants
  const SHORT_JUMP = 5; // seconds for single click
  const STEP_DELTA = 2; // seconds per step during long press
  const STEP_MS = 200; // ms between continuous steps

  const toggleLoop = () => {
    setIsLooping((prev) => !prev);
  };

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setLoading(true);
        setError(null);

        try {
          new URL(musicUrl);
        } catch {
          throw new Error("Invalid music file URL format");
        }

        const response = await fetch(musicUrl);

        if (!response.ok) {
          throw new Error(
            `Failed to fetch music file: ${response.status} ${response.statusText}`
          );
        }

        const contentType = response.headers.get("content-type");
        if (contentType && !contentType.startsWith("audio/")) {
          console.warn("File might not be an audio format:", contentType);
        }

        const buffer = await response.arrayBuffer();

        if (!buffer || buffer.byteLength === 0) {
          throw new Error("Music file content is empty");
        }

        const metadata = await musicMetadata.parseBuffer(
          new Uint8Array(buffer),
          { size: buffer.byteLength, mimeType: "audio/mpeg" }
        );

        if (!metadata) {
          throw new Error("Failed to parse music file metadata");
        }

        setMetadata(metadata);
      } catch (err: unknown) {
        console.error("Error fetching music metadata:", err);

        let errorMessage = "An unknown error occurred";

        if (err instanceof TypeError && err.message.includes("fetch")) {
          errorMessage = "Network error, please check your connection";
        } else if (
          err instanceof TypeError &&
          err.message.includes("Failed to fetch")
        ) {
          errorMessage =
            "Failed to access music file, please check if it exists";
        } else if (err instanceof Error && err.name === "AbortError") {
          errorMessage = "The request was aborted";
        } else if (err instanceof Error && err.message.includes("CORS")) {
          errorMessage = "CORS policy blocked the request";
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }

        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if musicUrl is provided
    if (musicUrl) {
      fetchMetadata();
    } else {
      setLoading(false);
      setError("Please provide a valid music file URL");
    }
  }, [musicUrl]);

  // Cleanup timers on component unmount
  useEffect(() => {
    const r = rewindIntervalRef.current;
    const f = forwardIntervalRef.current;

    return () => {
      if (r !== null) {
        clearInterval(r as unknown as number);
      }
      if (f !== null) {
        clearInterval(f as unknown as number);
      }
    };
  }, []);

  // Toggle play/pause
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

  // Generic seek helper: delta in seconds (negative = backward)
  const seekBy = (delta: number) => {
    if (!audioRef.current) return;
    const audio = audioRef.current;
    const target = Math.max(
      0,
      Math.min(audio.currentTime + delta, audio.duration || Infinity)
    );
    audio.currentTime = target;
    setCurrentTime(target);

    if (!isPlaying) {
      audio.play();
      setIsPlaying(true);
    }
  };

  // Unified click handler: pass delta in seconds (negative = rewind)
  const handleSeek = (delta: number) => seekBy(delta);

  // Start a continuous seek on long press. intervalRef is the ref that stores the interval id.
  const startContinuousSeek = (
    intervalRef: React.MutableRefObject<number | null>,
    immediateDelta: number,
    stepDelta: number,
    stepMs = 200
  ) => {
    if (intervalRef.current !== null) return;

    // perform one immediate jump
    seekBy(immediateDelta);

    // then continue stepping
    intervalRef.current = window.setInterval(() => {
      seekBy(stepDelta);
    }, stepMs) as unknown as number;
  };

  const stopContinuousSeek = (
    intervalRef: React.MutableRefObject<number | null>
  ) => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Rewind/forward wrappers using the generic helpers
  const startRewind = () =>
    startContinuousSeek(rewindIntervalRef, -SHORT_JUMP, -STEP_DELTA, STEP_MS);
  const stopRewind = () => stopContinuousSeek(rewindIntervalRef);
  const startForward = () =>
    startContinuousSeek(forwardIntervalRef, SHORT_JUMP, STEP_DELTA, STEP_MS);
  const stopForward = () => stopContinuousSeek(forwardIntervalRef);

  // Update progress bar and time displays
  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  // Set progress on progress bar click
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
      className={`@container size-full bg-black/20 border-white/20 border-[0.2cqw] rounded-[17.5%] overflow-hidden [&_div]:selection:bg-[#ffffff] [&_div]:selection:text-[#000000]`}
    >
      {loading && (
        <div className="relative size-full flex flex-col items-center justify-end px-[12cqw] py-[8cqw] gap-[6cqw]">
          <MusicPlayerSkeleton />
        </div>
      )}
      {error && (
        <div className="size-full relative flex flex-col items-center justify-center gap-[6cqw]">
          <AudioLines className="size-[20cqw] text-white" />
          <p className="text-[4cqw] text-white max-w-[80%] text-center">
            <AnimateText
              vars={{
                duration: 2,
                opacity: 0,
                filter: "blur(32px)",
                x: -100,
                stagger: 0.1,
                ease: "expo.out",
                immediateRender: true,
              }}
            >
              {error}
            </AnimateText>
          </p>
        </div>
      )}
      {metadata && (
        <div className="size-full relative flex flex-col items-center justify-end px-[12cqw] py-[8cqw] gap-[6cqw]">
          {/* Audio element */}
          <audio
            ref={audioRef}
            src={musicUrl}
            onTimeUpdate={updateProgress}
            onLoadedMetadata={updateProgress}
            onEnded={() => {
              if (!isLooping) {
                setIsPlaying(false);
              }
            }}
            loop={isLooping}
          />

          <button
            type="button"
            onClick={toggleLoop}
            title={isLooping ? "Disable Loop" : "Enable Loop"}
            className={`cursor-pointer absolute size-[20cqw] top-[12cqw] right-[12cqw] z-10 rounded-full p-[2cqw] flex justify-center items-center transition-colors backdrop-blur-2xl bg-white/10 ${
              isLooping ? " text-white" : " text-white/40"
            }`}
          >
            <InfinityIcon className="size-[14cqw]" />
          </button>

          {metadata.common.picture && metadata.common.picture.length > 0 && (
            <img
              src={`data:${metadata.common.picture[0].format};base64,${arrayBufferToBase64(
                metadata.common.picture[0].data
              )}`}
              alt="Album Art"
              className="size-full object-cover absolute top-0 left-0 z-0"
            />
          )}

          <div className="flex flex-col items-center text-white z-10 w-full">
            <div className="absolute bottom-0 w-full h-2/3 [mask-image:linear-gradient(0deg,#000000_calc(100%-60%),transparent)] z-5 bg-black/20 backdrop-blur-2xl pointer-events-none"></div>

            <p className="text-[8cqw] font-bold">
              <AnimateText
                vars={{
                  duration: 2,
                  opacity: 0,
                  filter: "blur(32px)",
                  x: -100,
                  stagger: 0.1,
                  ease: "expo.out",
                  immediateRender: true,
                }}
              >
                {metadata.common.title || "Unknown Title"}
              </AnimateText>
            </p>
            <p className="text-[8cqw]">
              <AnimateText
                vars={{
                  duration: 2,
                  opacity: 0,
                  filter: "blur(32px)",
                  x: -100,
                  stagger: 0.1,
                  ease: "expo.out",
                  immediateRender: true,
                }}
              >
                {metadata.common.artist || "Unknown Artist"}
              </AnimateText>
            </p>

            <MusicControler
              className="flex gap-[3cqw] mt-[6cqw] items-center justify-around w-full z-10 opacity-80"
              isPlaying={isPlaying}
              onToggle={togglePlay}
              onSeek={handleSeek}
              onStartRewind={startRewind}
              onStopRewind={stopRewind}
              onStartForward={startForward}
              onStopForward={stopForward}
            />

            <div
              className="w-full h-[2cqw] mt-[6cqw] bg-white/30 rounded-full overflow-hidden cursor-pointer z-10 opacity-80"
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
