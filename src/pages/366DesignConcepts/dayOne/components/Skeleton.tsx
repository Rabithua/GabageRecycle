export default function MusicPlayerSkeleton() {
  return (
    <>
      {" "}
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
    </>
  );
}
