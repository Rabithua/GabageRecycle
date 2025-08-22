/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { BlockType, type BlockProps } from "./blocks.types";
import Block from "./blocks/block";
import GithubRepoBlock from "./blocks/GitHubRepoBlock";
import GithubUserBlock from "./blocks/GitHubUserBlock";
import MapBlock from "./blocks/MapBlock";
import PhotoBlock from "./blocks/PhototBlock";
import TextBlock from "./blocks/TextBlock";

const BLOCK_COMPONENTS: Partial<Record<BlockType, React.ComponentType<any>>> = {
  [BlockType.TEXT]: TextBlock,
  [BlockType.PHOTO]: PhotoBlock,
  [BlockType.MAP]: MapBlock,
  [BlockType.GITHUBUSER]: GithubUserBlock,
  [BlockType.GITHUBREPO]: GithubRepoBlock,
};

export default function BlockSwitcher({
  className,
  grid,
  children,
  containerRef,
  blockData,
}: BlockProps) {
  const Component = BLOCK_COMPONENTS[blockData.type] || Block;

  const sizeClass = `col-span-${grid.col} row-span-${grid.row}`;

  return (
    <div className={`relative ${sizeClass}`}>
      <Component
        {...blockData}
        containerRef={containerRef}
        className={className}
      >
        {children}
      </Component>
    </div>
  );
}
