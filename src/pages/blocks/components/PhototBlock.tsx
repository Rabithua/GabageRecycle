import { Link } from "lucide-react";
import Block from "./block";

export default function PhotoBlock({
  className,
  src,
  href,
}: {
  className?: string;
  src: string;
  href?: string;
}) {
  return (
    <Block className={` ${className || ""}`}>
      <a
        href={href || "#"}
        title="Photo link"
        className={`relative w-full h-full`}
      >
        {href && (
          <Link
            size={16}
            className={`text-primary/70  absolute top-2 right-2`}
          />
        )}
        <img src={src || ""} alt="" className={`w-full h-full object-cover`} />
      </a>
    </Block>
  );
}
