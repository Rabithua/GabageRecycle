import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface GitHubUserBlockProps {
  username: string;
  className?: string;
}

interface GitHubUserData {
  avatar_url: string;
  name: string;
  login: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
  html_url: string;
}

export default function GithubUserBlock({
  username,
  className,
}: GitHubUserBlockProps) {
  const [data, setData] = useState<GitHubUserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // 使用 keyPrefix 作为作用域，避免重复书写 blocks.githubUser 前缀
  const { t } = useTranslation(undefined, { keyPrefix: "blocks.githubUser" });

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetch(`https://api.github.com/users/${username}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        return res.json();
      })
      .then((json: GitHubUserData) => {
        if (!cancelled) {
          setData(json);
          setError(null);
        }
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Load failed");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [username]);

  return (
    <div className={`w-full h-full text-left ${className || ""}`}>
      {loading && (
        <div
          className="w-full h-full flex flex-col gap-4 animate-pulse text-xs text-gray-400"
          aria-label={t("loadingLabel")}
        >
          <div className="flex gap-4 items-center">
            <div className="size-12 rounded-4xl bg-gray-200/60" />
            <div className="flex flex-col gap-2 flex-1">
              <div className="h-3 w-32 bg-gray-200/60 rounded" />
              <div className="h-2 w-20 bg-gray-200/50 rounded" />
            </div>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <div className="h-2 w-full bg-gray-200/50 rounded" />
            <div className="h-2 w-5/6 bg-gray-200/40 rounded" />
            <div className="h-2 w-2/3 bg-gray-200/30 rounded" />
            <div className="mt-auto flex gap-6 pt-2">
              <div className="h-2 w-10 bg-gray-200/40 rounded" />
              <div className="h-2 w-10 bg-gray-200/40 rounded" />
              <div className="h-2 w-10 bg-gray-200/40 rounded" />
            </div>
          </div>
        </div>
      )}
      {!loading && error && (
        <div className="text-sm w-full h-full flex flex-col justify-center items-center">
          {error}
          <div className="text-xs text-gray-200 font-light">
            {t("rateLimited")}
          </div>
        </div>
      )}
      {!loading && !error && data && (
        <div className="flex flex-col gap-2 w-full h-full">
          <div className="flex gap-4 items-center">
            <a
              href={data.html_url}
              target="_blank"
              rel="noreferrer"
              className="shrink-0"
            >
              <img
                src={data.avatar_url}
                alt={data.login}
                className="size-12 rounded-4xl border border-gray-100 object-cover"
              />
            </a>
            <div>
              <a
                href={data.html_url}
                target="_blank"
                rel="noreferrer"
                className="font-bold hover:underline"
              >
                {data.name || data.login}
              </a>
              <div className="text-xs text-gray-500">@{data.login}</div>
            </div>
          </div>

          <div className="flex flex-col grow gap-2 overflow-hidden">
            {data.bio && (
              <p
                className="text-xs text-gray-600 leading-snug line-clamp-4"
                title={data.bio}
              >
                {data.bio}
              </p>
            )}
            <div className="mt-auto flex gap-4 text-[11px] text-gray-500">
              <span>
                <strong className="text-gray-700">{data.followers}</strong>{" "}
                {t("followers")}
              </span>
              <span>
                <strong className="text-gray-700">{data.following}</strong>{" "}
                {t("following")}
              </span>
              <span>
                <strong className="text-gray-700">{data.public_repos}</strong>{" "}
                {t("repos")}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
