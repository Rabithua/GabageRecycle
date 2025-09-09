import type { JSX } from "react";

export default function Apple2025(): JSX.Element {
  return (
    <div className="w-dvw h-dvh flex items-center justify-center text-[10cqw] font-mono bg-black">
      <div className="relative w-4/5 max-w-xl aspect-square overflow-hidden">
        <video
          className="w-full h-full object-cover"
          src="https://public.zzfw.cc/gabagerecycle/apple2025/apple2025.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div
          className="absolute inset-0 mix-blend-color-burn"
          style={{ background: "radial-gradient(circle, #ffca27, #1101ff)" }}
        ></div>
      </div>
    </div>
  );
}
