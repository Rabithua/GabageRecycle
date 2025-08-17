import { Link } from "lucide-react";
import Block from "./block";

export default function TextBlock({
  children,
  className,
  href,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
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
    <Block className={`relative p-4 ${className || ""}`}>
      <a
        href={href || "#"}
        className={` line-clamp-6 overflow-hidden ${
          isEmojiOnly
            ? "text-3xl text-center text-primary/70"
            : "w-full h-full text-left text-gray-500"
        } ${href ? "cursor-pointer" : "cursor-default select-all"}`}
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 6,
          lineClamp: 6,
        }}
      >
        {href && (
          <Link
            size={16}
            className={`text-primary/70 ${isEmojiOnly ? " absolute top-2 right-2" : "float-right m-1"}`}
          />
        )}
        {children}
      </a>
    </Block>
  );
}
