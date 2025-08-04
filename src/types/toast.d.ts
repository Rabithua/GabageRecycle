const ToastPosition = {
  topLeft: "top-10 left-10",
  topRight: "top-10 right-10",
  bottomLeft: "bottom-10 left-10",
  bottomRight: "bottom-10 right-10",
  topCenter: "top-10 left-50",
  bottomCenter: "bottom-10 left-50",
} as const;

type FullToastOptions = {
  duration: number;
  position: keyof typeof ToastPosition;
  status: "new" | "progress" | "done";
};

interface Toast {
  id: number;
  message: string;
  options?: Partial<FullToastOptions>;
}
