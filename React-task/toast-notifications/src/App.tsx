import { AlertCircle, CheckCircle, AlertTriangle, Info } from "react-feather";
import { useToast } from "./Toast/ToastService";
import type { ToastType } from "./Toast/types";
import type { JSX } from "react";

const TOAST_CONFIG: Record<
  ToastType,
  { icon: JSX.Element; bgColor: string; title: string }
> = {
  success: {
    icon: <CheckCircle size={24} />,
    bgColor: "bg-green-500",
    title: "Success",
  },
  warning: {
    icon: <AlertTriangle size={24} />,
    bgColor: "bg-yellow-400",
    title: "Warning",
  },
  error: {
    icon: <AlertCircle size={24} />,
    bgColor: "bg-red-600",
    title: "Error",
  },
  info: {
    icon: <Info size={24} />,
    bgColor: "bg-blue-500",
    title: "Info",
  },
};

function App() {
  const toast = useToast();

  const handleToast = (type: ToastType) => {
    const config = TOAST_CONFIG[type];
    toast.open(
      <div
        className={`${config.bgColor} text-white p-4 rounded-lg shadow-lg min-w-[300px] flex items-center gap-3`}
      >
        {config.icon}
        <div>
          <h3 className="font-semibold">{config.title}</h3>
          <p className="text-sm">This is a {type} message!</p>
        </div>
      </div>,
    );
  };

  return (
    <div className="flex gap-4 ml-8 mt-8 btn-group">
      <button className="bg-green-500" onClick={() => handleToast("success")}>
        Success
      </button>
      <button className="bg-yellow-400" onClick={() => handleToast("warning")}>
        Warning
      </button>
      <button className="bg-red-600" onClick={() => handleToast("error")}>
        Error
      </button>
      <button className="bg-blue-500" onClick={() => handleToast("info")}>
        Info
      </button>
    </div>
  );
}

export default App;
