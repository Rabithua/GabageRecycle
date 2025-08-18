export default function Block({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border duration-500 overflow-hidden hover:scale-102 hover:-rotate-1 hover:shadow-2xl shadow-black/5 border-primary/20 bg-white/60 flex items-center justify-center text-primary/70 ${className}`}
    >
      {children}
    </div>
  );
}
