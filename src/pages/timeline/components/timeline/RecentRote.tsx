import moment from "moment";
import { useEffect, useRef, useState } from "react";
import AttachmentsGrid from "./AttachmentsGrid";

// 基础类型
export interface RoteAttachment {
  id: string;
  url: string;
  compressUrl?: string;
}
interface RoteAuthor {
  username: string;
  nickname: string;
  avatar: string;
}
interface RoteItem {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  tags: string[];
  author: RoteAuthor;
  attachments: RoteAttachment[];
}

export interface RecentRoteProps {
  username?: string;
  skip?: number;
  limit?: number;
  className?: string;
  api?: string;
  baseUrl?: string;
}

export default function RecentRote({
  username = "rabithua",
  skip = 0,
  limit = 1,
  className = "",
  api,
  baseUrl = "https://rote.ink",
}: RecentRoteProps) {
  const [data, setData] = useState<RoteItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const url =
      api ||
      `https://api.rote.ink/v2/api/notes/users/${username}?limit=${limit}&skip=${skip}`;
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setLoading(true);
    setError(null);
    fetch(url, { signal: controller.signal })
      .then(async (res) => {
        if (!res.ok) throw new Error(res.status + " " + res.statusText);
        const json = await res.json();
        if (json.code !== 0) throw new Error(json.message || "接口错误");
        setData(json.data?.[0] || null);
      })
      .catch((e: unknown) => {
        if (e instanceof DOMException && e.name === "AbortError") return;
        if (e instanceof Error) setError(e.message);
        else setError("加载失败");
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [username, skip, limit, api]);

  return (
    <div
      className={`relative w-full h-full aspect-square text-black border-4 bg-white border-gray-50 rounded-3xl overflow-hidden group cursor-pointer ${className}`}
    >
      {loading && (
        <div
          className="absolute inset-0 p-3 flex flex-col gap-2 animate-pulse bg-gradient-to-br from-gray-50 to-gray-100"
          aria-busy="true"
          aria-label="内容加载中"
        >
          <div className="flex items-center gap-2">
            <div className="size-10 rounded-md bg-gray-300/70" />
            <div className="flex flex-col gap-1 flex-1">
              <div className="h-4 bg-gray-300/70 rounded w-24" />
              <div className="h-3 bg-gray-200/70 rounded w-32" />
            </div>
          </div>

          <div className="flex flex-col gap-1 py-1">
            <div className="h-3 bg-gray-200/70 rounded w-full" />
            <div className="h-3 bg-gray-200/60 rounded w-5/6" />
            <div className="h-3 bg-gray-200/50 rounded w-2/3" />
          </div>
          <div className="flex gap-1 flex-wrap mt-auto">
            <div className="h-5 bg-gray-200/70 rounded px-4 w-12" />
            <div className="h-5 bg-gray-200/60 rounded px-4 w-10" />
            <div className="h-5 bg-gray-200/50 rounded px-4 w-14" />
          </div>
        </div>
      )}

      {!loading && error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-red-500 text-xs p-4 text-center">
          <span>加载失败</span>
          <span className="opacity-70 line-clamp-2">{error}</span>
        </div>
      )}

      {!loading && !error && !data && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-sm">
          暂无数据
        </div>
      )}

      {!loading && data && (
        <div className="h-full flex flex-col gap-2 p-4">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`${baseUrl}/${data.author.username}`}
            className="flex items-center gap-2 min-w-0 shrink-0"
          >
            <img
              src={data.author.avatar}
              alt={data.author.nickname}
              className="size-10 rounded-md object-cover border border-white/40 shadow-sm"
              loading="lazy"
            />
            <div className="flex flex-col">
              <div className="font-medium text-base truncate">
                {data.author.nickname}
                <span className="font-medium text-sm text-gray-300 truncate">
                  @{data.author.username}
                </span>
              </div>
              <div className="font-medium text-sm text-gray-300 truncate">
                {moment(data.createdAt).fromNow()}
              </div>
            </div>
          </a>

          <a
            target="_blank"
            rel="noopener noreferrer"
            href={`${baseUrl}/rote/${data.id}`}
            className="relative overflow-scroll grow flex flex-col gap-2"
          >
            <div className=" grow overflow-hidden">
              <p className="text-base leading-snug opacity-90 break-words whitespace-pre-wrap">
                {data.content}
              </p>

              <div className="h-2 w-full bg-white blur-xs sticky -bottom-1 "></div>
              <div className="h-2 w-full bg-white blur-sm sticky -bottom-1 "></div>
              <div className="h-2 w-full bg-white blur-sm sticky -bottom-1 "></div>
            </div>

            {data.attachments && data.attachments.length > 0 && (
              <AttachmentsGrid attachments={data.attachments} />
            )}

            {data.tags.length > 0 && (
              <div className="mt-a flex gap-1 shrink-0 flex-wrap">
                {data.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-1 rounded-sm bg-black/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </a>
        </div>
      )}
    </div>
  );
}
