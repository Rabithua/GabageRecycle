import { useEffect } from "react";
import { useToast, ToastPosition } from "@/hook/useToast";

interface ToastProviderProps {
  options?: Partial<FullToastOptions>;
  children: React.ReactNode;
}

export default function ToastProvider({
  options,
  children,
}: ToastProviderProps) {
  const toastHook = useToast();

  useEffect(() => {
    if (options) {
      toastHook.setOptions((prevOptions) => ({
        ...prevOptions,
        ...options,
      }));
    }
  }, [options, toastHook]);

  const className = options?.position
    ? ` ${ToastPosition[options.position]}`
    : "";

  return (
    <div className={`${className}`} id="toast-provider">
      {children}
    </div>
  );
}
