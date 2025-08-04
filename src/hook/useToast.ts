import { useState } from "react";

export const ToastPosition = {
  topLeft: "top-10 left-10",
  topRight: "top-10 right-10",
  bottomLeft: "bottom-10 left-10",
  bottomRight: "bottom-10 right-10",
  topCenter: "top-10 left-50",
  bottomCenter: "bottom-10 left-50",
} as const;

function useToast() {
  const [total, setTotal] = useState(0);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [options, setOptions] = useState<FullToastOptions>({
    duration: 3000,
    position: "topRight",
  });

  const addNormalToast = (props: Toast) => {
    const newToast = {
      id: total,
      message: props.message,
      options: props.options || options,
    };

    setTotal((prevTotal) => prevTotal + 1);
    setToasts((prevToasts) => [...prevToasts, newToast]);

    return newToast.id;
  };

  return {
    toasts,
    addNormalToast,
    setOptions,
  };
}

export { useToast };
