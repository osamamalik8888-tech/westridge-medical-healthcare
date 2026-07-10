"use client";

import { useEffect } from "react";

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    if (process.env.NODE_ENV !== "production") return;

    // Register after load so it never competes with the page's own
    // first-load performance budget.
    const register = () => {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Offline support is a progressive enhancement — a failed
        // registration shouldn't surface as an error to the visitor.
      });
    };

    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register, { once: true });
      return () => window.removeEventListener("load", register);
    }
  }, []);

  return null;
}
