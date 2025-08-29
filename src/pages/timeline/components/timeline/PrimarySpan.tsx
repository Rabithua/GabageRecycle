import type { PropsWithChildren } from "react";

/**
 * 时间线内部强调文本
 */
export default function PrimarySpan({ children }: PropsWithChildren) {
  return (
    <span className="text-black mx-2  underline-offset-4 decoration-primary/20">
      {children}
    </span>
  );
}
