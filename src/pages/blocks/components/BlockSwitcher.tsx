import { BlockType, type BlockProps } from "./blocks.types";
import Block from "./blocks/block";
import GithubRepoBlock from "./blocks/GitHubRepoBlock";
import GithubUserBlock from "./blocks/GitHubUserBlock";
import MapBlock from "./blocks/MapBlock";
import PhotoBlock from "./blocks/PhototBlock";
import TextBlock from "./blocks/TextBlock";

export default function BlockSwitcher({
  className,
  children,
  containerRef,
  blockData,
}: BlockProps) {
  switch (blockData.type) {
    case BlockType.TEXT:
      return (
        <TextBlock
          {...blockData}
          children={children}
          className={className}
          containerRef={containerRef}
        />
      );
    case BlockType.PHOTO:
      return (
        <PhotoBlock
          {...blockData}
          className={className}
          containerRef={containerRef}
        />
      );
    case BlockType.MAP:
      return (
        <MapBlock
          {...blockData}
          className={className}
          containerRef={containerRef}
        />
      );
    case BlockType.GITHUBUSER:
      return (
        <GithubUserBlock
          {...blockData}
          className={className}
          containerRef={containerRef}
        />
      );
    case BlockType.GITHUBREPO:
      return (
        <GithubRepoBlock
          {...blockData}
          className={className}
          containerRef={containerRef}
        />
      );
    default:
      return (
        <Block
          className={className}
          children={children}
          containerRef={containerRef}
        />
      );
  }
}
