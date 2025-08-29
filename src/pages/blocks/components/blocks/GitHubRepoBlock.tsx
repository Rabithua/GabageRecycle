import { useEffect, useState } from "react";

interface GitHubRepoBlockProps {
  owner: string;
  repo: string;
  branch?: string; // branch to show latest commit
  className?: string;
}

interface RepoData {
  full_name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues: number;
  watchers_count: number;
  language: string | null;
  html_url: string;
  updated_at: string;
  default_branch: string;
}

interface BranchCommitData {
  name: string;
  commit: {
    sha: string;
    commit: { message: string; author: { name: string; date: string } };
    html_url?: string;
    url: string;
  };
}

interface CommitData {
  sha: string;
  html_url: string;
  commit: {
    message: string;
    author: { name: string; date: string };
  };
  author: { login: string } | null;
}

export default function GithubRepoBlock({
  owner,
  repo,
  branch,
  className,
}: GitHubRepoBlockProps) {
  const [repoData, setRepoData] = useState<RepoData | null>(null);
  const [branchData, setBranchData] = useState<BranchCommitData | null>(null);
  const [commits, setCommits] = useState<CommitData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    async function load() {
      try {
        const repoRes = await fetch(
          `https://api.github.com/repos/${owner}/${repo}`
        );
        if (!repoRes.ok) throw new Error(`Repo ${repoRes.status}`);
        const repoJson: RepoData = await repoRes.json();
        if (cancelled) return;
        setRepoData(repoJson);

        const targetBranch = branch || repoJson.default_branch;
        // basic branch info (HEAD commit)
        const branchRes = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/branches/${targetBranch}`
        );
        if (branchRes.ok) {
          const branchJson: BranchCommitData = await branchRes.json();
          if (!cancelled) setBranchData(branchJson);
        }
        // fetch last two commits
        const commitsRes = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/commits?sha=${targetBranch}&per_page=8`
        );
        if (commitsRes.ok) {
          const commitsJson: CommitData[] = await commitsRes.json();
          if (!cancelled) setCommits(commitsJson);
        }
      } catch (e) {
        if (!cancelled)
          setError(e instanceof Error ? e.message : "Load failed");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [owner, repo, branch]);

  return (
    <div
      className={`w-full h-full flex flex-col items-start gap-4 ${className || ""}`}
    >
      {loading && (
        <div className="w-full h-full flex flex-col gap-3 animate-pulse text-xs text-gray-400">
          <div className="h-5 w-40 bg-gray-200/60 rounded" />
          <div className="h-3 w-full bg-gray-200/50 rounded" />
          <div className="h-3 w-5/6 bg-gray-200/50 rounded" />
          <div className="mt-auto flex gap-4 w-full">
            <div className="h-3 w-16 bg-gray-200/50 rounded" />
            <div className="h-3 w-16 bg-gray-200/50 rounded" />
            <div className="h-3 w-16 bg-gray-200/50 rounded" />
          </div>
        </div>
      )}
      {!loading && error && (
        <div className="text-sm w-full text-primary text-center">{error}</div>
      )}
      {!loading && !error && repoData && (
        <div className="flex flex-col w-full h-full">
          <div className="flex flex-col w-full shrink-0 mb-2">
            <a
              href={repoData.html_url}
              target="_blank"
              rel="noreferrer"
              className="font-bold text-lg hover:underline break-all"
            >
              {repoData.full_name}
            </a>
            {repoData.description && (
              <p className="text-xs text-gray-400 leading-snug line-clamp-4">
                {repoData.description}
              </p>
            )}
          </div>
          {(branchData || commits.length > 0) && (
            <div className="relative w-full mb-1 text-[11px] text-gray-500 space-y-2 grow min-h-0 overflow-y-scroll">
              {/* {branchData && (
                <div>
                  Branch:{" "}
                  <span className="text-gray-700 font-medium">
                    {branchData.name}
                  </span>
                </div>
              )} */}
              <div className="space-y-1">
                {commits.map((c) => (
                  <div key={c.sha} className="leading-snug">
                    <a
                      href={c.html_url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-700 hover:underline line-clamp-2"
                      title={c.commit.message}
                    >
                      {c.commit.message.split("\n")[0]}
                    </a>
                    <div className="text-gray-400">
                      {(c.author?.login || c.commit.author.name) +
                        " · " +
                        new Date(c.commit.author.date).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
              <div className="h-2 w-full bg-primary/10 blur-xs sticky -bottom-1 "></div>
              <div className="h-2 w-full bg-white blur-sm sticky -bottom-1 "></div>
              <div className="h-2 w-full bg-white blur-sm sticky -bottom-1 "></div>
            </div>
          )}
          <div className="mt-auto shrink-0 flex flex-wrap gap-x-4 gap-y-2 text-[11px] text-gray-500">
            {/* {repoData.language && (
              <span>
                <strong className="text-gray-700">{repoData.language}</strong>
              </span>
            )} */}
            <span>
              <strong className="text-gray-700">
                {repoData.stargazers_count}
              </strong>{" "}
              Stars
            </span>
            <span>
              <strong className="text-gray-700">{repoData.forks_count}</strong>{" "}
              Forks
            </span>
            <span>
              <strong className="text-gray-700">{repoData.open_issues}</strong>{" "}
              Issues
            </span>
            <span> {new Date(repoData.updated_at).toLocaleDateString()}</span>
          </div>
        </div>
      )}
    </div>
  );
}
