import { ArrowUpRight } from "lucide-react";

export default function PhotoBlock({
  className,
  src,
  href,
}: {
  className?: string;
  src: string;
  href?: string;
}) {
  return href ? (
    <a
      href={href}
      title="Photo link"
      className={`relative w-full h-full cursor-pointer ${className || ""}`}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      target={href.startsWith("http") ? "_blank" : undefined}
    >
      <ArrowUpRight
        size={24}
        className={`text-primary/40 backdrop-blur-2xl rounded-full border bg-primary/5 border-primary/5 p-1 absolute top-2 right-2`}
      />
      <img src={src || ""} alt="" className={`w-full h-full object-cover`} />
    </a>
  ) : (
    <div className={`relative w-full h-full select-none ${className || ""}`}>
      <img src={src || ""} alt="" className={`w-full h-full object-cover`} />
    </div>
  );
}
