export type ToastType = 'success' | 'warning' | 'error' | 'info';

export interface Toast {
  id: string;
  component: React.ReactNode;
}

export interface ToastContextType {
  open: (component: React.ReactNode, timeout?: number) => void;
  close: (id: string) => void;
}
