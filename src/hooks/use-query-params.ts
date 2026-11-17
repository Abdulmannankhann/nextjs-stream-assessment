"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

export function useQueryParams() {
  const router = useRouter();

  const setQueryParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams();

      for (const [key, value] of Object.entries(updates)) {
        if (value) params.set(key, value);
      }

      const href = params.toString() ? `/?${params.toString()}` : "/";
      const current = `${window.location.pathname}${window.location.search}`;

      if (href === current) return;

      router.push(href, { scroll: false });
    },
    [router]
  );

  return { setQueryParams };
}
