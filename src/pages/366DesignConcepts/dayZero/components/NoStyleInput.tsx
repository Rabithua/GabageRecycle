import AnimateText from "@/components/AnimateText";
import { useLayoutEffect, useRef, useState } from "react";

export default function NoStyleInput({
  value,
  onChange,
  onKeyDown,
  placeholder,
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [editing, setEditing] = useState(false);

  useLayoutEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  // ...existing code...

  return editing ? (
    <input
      ref={inputRef}
      aria-label="No Style Input"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={onKeyDown}
      onBlur={() => setEditing(false)}
      placeholder={placeholder}
      className={`bg-transparent outline-none ${className}`}
      style={{ minWidth: "1ch" }}
    />
  ) : (
    <span
      role="button"
      aria-label="No Style Input Display"
      className={`cursor-pointer ${className}`}
      onClick={() => setEditing(true)}
      title={value || placeholder || "Click to edit"}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
          setEditing(true);
        }
      }}
    >
      <AnimateText
        type="chars"
        vars={{
          opacity: 0,
          duration: 1,
          stagger: 0.1,
          filter: "blur(1cqw)",
          ease: "ease",
        }}
      >
        {value || placeholder || "Click to edit"}
      </AnimateText>
    </span>
  );
}
