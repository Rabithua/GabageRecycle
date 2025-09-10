import type { RoteAttachment } from "./RecentRote";

interface AttachmentsGridProps {
  attachments: RoteAttachment[];
}

/**
 * AttachmentsGrid - 自适应图片网格 (1-9 张)
 * 规则：
 * - 1 张：自适应宽度，保留原比例，最大 500px
 * - 2 / 4 张：两列正方形
 * - 3 / 6 / 9 张：三列正方形
 * - 5 / 7 / 8 张：前三张一行三列，其余自动换行三列（与 3 列布局一致）
 */
export default function AttachmentsGrid({
  attachments,
}: AttachmentsGridProps) {
  if (!attachments || attachments.length === 0) return null;

  return (
    <div className="my-2 flex w-fit max-w-full flex-wrap gap-1 overflow-hidden rounded-md">
      {attachments.map((file, index) => {
        const src = file.compressUrl || file.url;
        return (
          <img
            key={file.id || `file_${index}`}
            className={`${
              attachments.length % 3 === 0
                ? "aspect-square w-[calc(1/3*100%-4px)]"
                : attachments.length % 2 === 0
                  ? "aspect-square w-[calc(1/2*100%-3px)]"
                  : attachments.length === 1
                    ? "w-full max-w-[500px] rounded-md"
                    : "aspect-square w-[calc(1/3*100%-3px)]"
            } bg-gray-100 grow object-cover`}
            src={src}
            loading="lazy"
            decoding="async"
            alt={`attachment ${index + 1}`}
            referrerPolicy="no-referrer"
            draggable={false}
          />
        );
      })}
    </div>
  );
}
