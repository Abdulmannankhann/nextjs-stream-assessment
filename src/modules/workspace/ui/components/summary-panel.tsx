"use client";

import type { SystemEvent } from "@/lib/mock-data";
import { useEventStream } from "@/hooks/use-event-stream";
import { HeavyPayloadFormatter } from "@/modules/workspace/ui/components/heavy-payload-formatter";
import { SummaryOutput } from "@/modules/workspace/ui/components/summary-output";

interface SummaryPanelProps {
  event: SystemEvent | null;
}

export function SummaryPanel({ event }: SummaryPanelProps) {
  const { summaryText, isStreaming } = useEventStream(event?.id ?? null);

  return (
    <div style={{ padding: "20px", overflowY: "auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h2 style={{ margin: 0, fontSize: "18px" }}>
          {event ? `Analysis: ${event.id}` : "Incident Summary"}
        </h2>
        {isStreaming && <span style={{ fontSize: "12px", color: "#38bdf8" }}>Streaming tokens...</span>}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <SummaryOutput summaryText={summaryText} />
        <HeavyPayloadFormatter rawPayload={event?.rawPayload || "{}"} />
      </div>
    </div>
  );
}
