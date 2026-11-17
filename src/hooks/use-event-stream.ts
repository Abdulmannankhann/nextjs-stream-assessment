"use client";

import { useEffect, useState } from "react";

export function useEventStream(eventId: string | null) {
  const [summaryText, setSummaryText] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    if (!eventId) {
      setSummaryText("");
      setIsStreaming(false);
      return;
    }

    const controller = new AbortController();
    let cancelled = false;

    async function stream() {
      setSummaryText("");
      setIsStreaming(true);

      try {
        const res = await fetch(`/api/stream-summary?eventId=${eventId}`, {
          signal: controller.signal,
        });
        if (!res.body) return;

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader.read();
          if (done || cancelled) break;

          const chunk = decoder.decode(value, { stream: true });
          if (!cancelled) {
            setSummaryText((prev) => prev + chunk);
          }
        }
      } catch (err) {
        if ((err as Error).name !== "AbortError") throw err;
      } finally {
        if (!cancelled) setIsStreaming(false);
      }
    }

    stream();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [eventId]);

  return { summaryText, isStreaming };
}
