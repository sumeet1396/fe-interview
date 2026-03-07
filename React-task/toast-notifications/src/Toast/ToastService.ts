import { createContext, useContext } from "react";
import type { ToastContextType } from "./types";

const ToastContext = createContext<ToastContextType | null>(null);

const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
};

export { useToast };
export default ToastContext;