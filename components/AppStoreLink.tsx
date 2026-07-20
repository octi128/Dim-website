"use client";

import type { ReactNode } from "react";

const PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=ar.com.dim.portalturnos";
const APP_STORE_URL =
  "https://apps.apple.com/ar/app/dim-salud-turnos-y-resultados/id1627335644";

function redirectToAppStore() {
  const ua = navigator.userAgent || navigator.vendor || "";
  if (/android/i.test(ua)) {
    window.location.href = PLAY_STORE_URL;
  } else if (/iPad|iPhone|iPod/i.test(ua)) {
    window.location.href = APP_STORE_URL;
  } else {
    window.location.href = "https://www.google.com/search?q=descargar+DIM+Salud";
  }
}

export default function AppStoreLink({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <button type="button" onClick={redirectToAppStore} className={className}>
      {children}
    </button>
  );
}
