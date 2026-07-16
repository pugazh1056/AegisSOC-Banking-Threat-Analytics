import React, { useEffect } from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "success" | "info" | "error";
  onClose: () => void;
}

export default function NotificationToast({ message, type = "success", onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const colors = {
    success: {
      bg: "bg-[#090e17] border-emerald-500/30",
      text: "text-emerald-400",
      icon: <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />,
      label: "SUCCESS HANDSHAKE"
    },
    info: {
      bg: "bg-[#090e17] border-[#00e5ff]/30",
      text: "text-[#00e5ff]",
      icon: <Info className="h-5 w-5 text-[#00e5ff] shrink-0" />,
      label: "SOC COMPLIANCE TELEMETRY"
    },
    error: {
      bg: "bg-[#090e17] border-red-500/30",
      text: "text-red-400",
      icon: <AlertCircle className="h-5 w-5 text-red-400 shrink-0" />,
      label: "CRITICAL BREACH BLOCKED"
    }
  };

  const current = colors[type];

  return (
    <div className={`fixed bottom-6 right-6 z-[99999] p-4 rounded-2xl border shadow-2xl flex gap-3 max-w-sm animate-bounce-short text-xs font-sans ${current.bg}`}>
      {current.icon}
      <div className="space-y-0.5 flex-1 pr-4">
        <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-on-surface-variant block">
          {current.label}
        </span>
        <p className="text-on-surface text-[11px] leading-snug">{message}</p>
      </div>
      <button 
        onClick={onClose}
        className="text-on-surface-variant hover:text-on-surface absolute top-2.5 right-2.5 p-1 rounded hover:bg-white/[0.04] cursor-pointer"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}
