import { ArrowUpRight } from "lucide-react";
import Block from "./block";

export default function TextBlock({
  children,
  className,
  href,
  containerRef,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  // 提取纯文本（若 children 不是纯字符串则返回 null）
  const extractText = (node: React.ReactNode): string | null => {
    if (typeof node === "string") return node;
    if (Array.isArray(node)) {
      const parts = node.map((n) => (typeof n === "string" ? n : "")).join("");
      return parts.length ? parts : null;
    }
    return null;
  };

  const text = extractText(children)?.trim();
  // 一个较宽松的纯 Emoji 判断（允许 ZWJ、变体选择符与空格换行）
  const isEmojiOnly =
    !!text &&
    /^(?:[\p{Extended_Pictographic}\p{Emoji_Presentation}]|\uFE0F|\u200D|\s)+$/u.test(
      text
    );

  return (
    <Block
      containerRef={containerRef}
      className={`relative p-4 ${className || ""}`}
    >
      {href ? (
        <a
          href={href}
          className={`line-clamp-6 overflow-hidden ${
            isEmojiOnly
              ? "text-3xl text-center text-primary/70"
              : "w-full h-full text-left text-gray-500"
          } cursor-pointer`}
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 6,
            lineClamp: 6,
          }}
          title={text || ""}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          target={href.startsWith("http") ? "_blank" : undefined}
        >
          <ArrowUpRight
            size={24}
            className={`text-primary/40 backdrop-blur-2xl rounded-full border bg-primary/5 border-primary/5 p-1 ${isEmojiOnly ? " absolute top-2 right-2" : "float-right m-1"}`}
          />
          {children}
        </a>
      ) : (
        <div
          className={`line-clamp-6 overflow-hidden ${
            isEmojiOnly
              ? "text-3xl text-center text-primary/70"
              : "w-full h-full text-left text-gray-500"
          } select-all`}
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 6,
            lineClamp: 6,
          }}
          title={text || ""}
        >
          {children}
        </div>
      )}
    </Block>
  );
}
