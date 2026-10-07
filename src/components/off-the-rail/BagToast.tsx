"use client";

import { useEffect } from "react";

export interface Toast {
  id: number;
  message: string;
  action?: { label: string; onClick: () => void };
}

export function BagToast({ toast, onDone }: { toast: Toast | null; onDone: () => void }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onDone, 3600);
    return () => clearTimeout(t);
  }, [toast, onDone]);

  if (!toast) return null;

  return (
    <div className="otr-toast" role="status" aria-live="polite" key={toast.id}>
      <span>{toast.message}</span>
      {toast.action && (
        <button type="button" className="otr-toast__action otr-ui" onClick={toast.action.onClick}>
          {toast.action.label}
        </button>
      )}
    </div>
  );
}
