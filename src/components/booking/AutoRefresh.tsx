"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/** Re-checks the server state while the webhook finalises the reservation (max ~1 min). */
export function AutoRefresh({ every = 4000, max = 15 }: { every?: number; max?: number }) {
  const router = useRouter();
  useEffect(() => {
    let n = 0;
    const id = setInterval(() => {
      n += 1;
      if (n > max) return clearInterval(id);
      router.refresh();
    }, every);
    return () => clearInterval(id);
  }, [router, every, max]);
  return null;
}
