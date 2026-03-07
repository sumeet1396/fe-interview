import { useState, ReactNode } from "react";
import ToastContext from "./ToastService";
import { X } from "react-feather";
import { generateUniqueId } from "../helper/helper";
import type { Toast } from "./types";

interface ToastProviderProps {
  children: ReactNode;
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const close = (id: string) =>
    setToasts((toasts) => toasts.filter((toast) => toast?.id !== id));

  const open = (component: ReactNode, timeout = 5000) => {
    const id = generateUniqueId();
    setToasts((toasts) => [...toasts, { id, component }]);
    setTimeout(() => close(id), timeout);
  };

  return (
    <ToastContext.Provider value={{ open, close }}>
      {children}
      <div className="space-y-2 absolute bottom-4 right-4 z-50">
        {toasts.map(({ id, component }) => (
          <div key={id} className="relative">
            <button
              onClick={() => close(id)}
              className="absolute top-2 right-2 p-1 rounded-lg bg-gray-200/20 hover:bg-gray-200/40 text-gray-800/60 z-10 transition-colors"
              aria-label="Close toast"
            >
              <X size={16} />
            </button>
            {component}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
