import React from "react";

// Block类型枚举，这个没问题
enum BlockType {
  NORMAL = "normal",
  TEXT = "text",
  PHOTO = "photo",
  MAP = "map",
  GITHUBUSER = "githubuser",
  GITHUBREPO = "githubrepo",
}

interface NormalBlockData {
  id: string;
  type: BlockType.NORMAL;
  [key: string]: unknown; // 允许其他任意属性
}

interface TextData {
  id: string;
  type: BlockType.TEXT;
  href?: string;
}

interface PhotoData {
  id: string;
  type: BlockType.PHOTO;
  src: string;
  href?: string;
}

interface MapData {
  id: string;
  type: BlockType.MAP;
  zoom: number;
  center: { lat: number; lng: number };
  title?: string;
}

interface GithubUserData {
  id: string;
  type: BlockType.GITHUBUSER;
  username: string;
}

interface GithubRepoData {
  id: string;
  type: BlockType.GITHUBREPO;
  owner: string;
  repo: string;
  branch?: string;
}

// 联合类型，包含所有可能的数据类型
type BlockData =
  | NormalBlockData
  | TextData
  | PhotoData
  | MapData
  | GithubUserData
  | GithubRepoData;

// BlockProps 接口，将 blockData 设为上面定义的联合类型
interface BlockProps {
  children?: React.ReactNode;
  className?: string; // 针对block容器的额外样式类
  containerRef?: React.RefObject<HTMLDivElement>;
  blockData: BlockData; // 使用联合类型，更安全
}
