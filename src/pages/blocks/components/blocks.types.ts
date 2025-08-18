// Block 相关类型定义，包括 BlockType 枚举、各 Block 数据接口、BlockProps 等
import React from "react";

export enum BlockType {
  NORMAL = "normal",
  TEXT = "text",
  PHOTO = "photo",
  MAP = "map",
  GITHUBUSER = "githubuser",
  GITHUBREPO = "githubrepo",
}

export interface NormalBlockData {
  id: string;
  type: BlockType.NORMAL;
  [key: string]: unknown;
}

export interface TextData {
  id: string;
  type: BlockType.TEXT;
  href?: string;
}

export interface PhotoData {
  id: string;
  type: BlockType.PHOTO;
  src: string;
  href?: string;
}

export interface MapData {
  id: string;
  type: BlockType.MAP;
  zoom: number;
  center: { lat: number; lng: number };
  title?: string;
}

export interface GithubUserData {
  id: string;
  type: BlockType.GITHUBUSER;
  username: string;
}

export interface GithubRepoData {
  id: string;
  type: BlockType.GITHUBREPO;
  owner: string;
  repo: string;
  branch?: string;
}

export type BlockData =
  | NormalBlockData
  | TextData
  | PhotoData
  | MapData
  | GithubUserData
  | GithubRepoData;

export interface BlockProps {
  children?: React.ReactNode;
  className?: string;
  containerRef?: React.RefObject<HTMLDivElement>;
  blockData: BlockData;
}
