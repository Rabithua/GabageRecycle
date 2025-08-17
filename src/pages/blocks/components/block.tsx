export default function Block({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border overflow-hidden border-primary/20 bg-white/60 flex items-center justify-center text-primary/70 ${className}`}
    >
      {children}
    </div>
  );
}
