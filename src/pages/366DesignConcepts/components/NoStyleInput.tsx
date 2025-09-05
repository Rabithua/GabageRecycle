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
      tabIndex={0}
      role="button"
      aria-label="No Style Input Display"
      className={`cursor-pointer truncate ${className}`}
      onClick={() => setEditing(true)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
          setEditing(true);
        }
      }}
    >
      {value || placeholder || ""}
    </span>
  );
}
