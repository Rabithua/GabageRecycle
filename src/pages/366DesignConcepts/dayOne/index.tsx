import MusicToggle from "@/pages/366DesignConcepts/dayOne/components/MusicToggle";
import SliderText from "@/pages/home/components/SliderText";
import { arrayBufferToBase64 } from "@/utils/file";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { AudioLines } from "lucide-react";
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
    return () => {
      if (rewindIntervalRef.current !== null) {
        clearInterval(rewindIntervalRef.current);
      }
      if (forwardIntervalRef.current !== null) {
        clearInterval(forwardIntervalRef.current);
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

  // Rewind by 5 seconds
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

  // Forward by 5 seconds
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

  // Start rewinding on long press
  const startRewind = () => {
    if (rewindIntervalRef.current !== null) return;

    // Rewind once immediately
    handlePrevious();

    // Then set an interval for continuous rewinding
    rewindIntervalRef.current = window.setInterval(() => {
      if (audioRef.current) {
        const newTime = Math.max(audioRef.current.currentTime - 2, 0);
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
      }
    }, 200); // Rewind 2 seconds every 200ms
  };

  // Stop rewinding on release
  const stopRewind = () => {
    if (rewindIntervalRef.current !== null) {
      clearInterval(rewindIntervalRef.current);
      rewindIntervalRef.current = null;
    }
  };

  // Start forwarding on long press
  const startForward = () => {
    if (forwardIntervalRef.current !== null) return;

    // Forward once immediately
    handleNext();

    // Then set an interval for continuous forwarding
    forwardIntervalRef.current = window.setInterval(() => {
      if (audioRef.current) {
        const newTime = Math.min(
          audioRef.current.currentTime + 2,
          audioRef.current.duration
        );
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
      }
    }, 200); // Forward 2 seconds every 200ms
  };

  // Stop forwarding on release
  const stopForward = () => {
    if (forwardIntervalRef.current !== null) {
      clearInterval(forwardIntervalRef.current);
      forwardIntervalRef.current = null;
    }
  };

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
      className={`@container size-full bg-black/20 border-white/20 border-[0.5cqw] rounded-[17.5%] overflow-hidden [&_div]:selection:bg-[#ffffff] [&_div]:selection:text-[#000000]`}
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
            <SliderText>{error}</SliderText>
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
                alt="Rewind 5s, long press to seek"
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
                alt="Forward 5s, long press to seek"
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
