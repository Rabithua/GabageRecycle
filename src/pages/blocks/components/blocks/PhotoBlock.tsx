import { ArrowUpRight } from "lucide-react";
import Block from "./block";

export default function PhotoBlock({
  className,
  src,
  href,
  containerRef,
}: {
  className?: string;
  src: string;
  href?: string;
  containerRef: React.RefObject<HTMLDivElement>;
}) {
  return (
    <Block containerRef={containerRef} className={` ${className || ""}`}>
      {href ? (
        <a
          href={href}
          title="Photo link"
          className={`relative w-full h-full cursor-pointer`}
          rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
          target={href.startsWith("http") ? "_blank" : undefined}
        >
          <ArrowUpRight
            size={24}
            className={`text-primary/40 backdrop-blur-2xl rounded-full border bg-primary/5 border-primary/5 p-1 absolute top-2 right-2`}
          />
          <img
            src={src || ""}
            alt=""
            className={`w-full h-full object-cover`}
          />
        </a>
      ) : (
        <div className={`relative w-full h-full select-none`}>
          <img
            src={src || ""}
            alt=""
            className={`w-full h-full object-cover`}
          />
        </div>
      )}
    </Block>
  );
}
