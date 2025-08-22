import { lazy, Suspense } from "react";
import { BlockType, type BlockProps } from "./blocks.types";
import Block from "./blocks/block";

// 动态导入所有可能的 Block 组件，实现代码分割
const BLOCK_COMPONENTS = {
  [BlockType.TEXT]: lazy(() => import("./blocks/TextBlock")),
  [BlockType.PHOTO]: lazy(() => import("./blocks/PhotoBlock")),
  [BlockType.MAP]: lazy(() => import("./blocks/MapBlock")),
  [BlockType.GITHUBUSER]: lazy(() => import("./blocks/GitHubUserBlock")),
  [BlockType.GITHUBREPO]: lazy(() => import("./blocks/GitHubRepoBlock")),
};

/**
 * 一个动态组件加载器，根据 blockData.type 渲染对应的 Block。
 * 支持代码分割和加载状态管理。
 */
export default function BlockSwitcher({
  className,
  grid,
  children,
  containerRef,
  blockData,
}: BlockProps) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const Component = BLOCK_COMPONENTS[blockData.type];

  // 如果找不到对应的组件，使用默认的 Block 组件
  if (!Component) {
    return (
      <div className={`relative col-span-${grid.col} row-span-${grid.row}`}>
        <Block {...blockData} containerRef={containerRef} className={className}>
          {children}
        </Block>
      </div>
    );
  }

  const sizeClass = `col-span-${grid.col} row-span-${grid.row}`;

  return (
    <div className={`relative ${sizeClass}`}>
      <Suspense
        fallback={
          <div
            className="h-full w-full rounded-2xl border border-primary/20 bg-white p-4 flex flex-col gap-3 animate-pulse select-none"
            aria-busy="true"
            aria-label="内容加载中"
          >
            <div className="h-4 w-1/3 bg-primary/20 rounded" />
            <div className="h-6 w-2/3 bg-primary/20 rounded" />
            <div className="flex-1 w-full bg-primary/10 rounded" />
          </div>
        }
      >
        <Component
          {...blockData}
          containerRef={containerRef}
          className={className}
        >
          {children}
        </Component>
      </Suspense>
    </div>
  );
}
