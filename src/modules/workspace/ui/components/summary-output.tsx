"use client";

import { useRef } from "react";

interface SummaryOutputProps {
  summaryText: string;
}

export function SummaryOutput({ summaryText }: SummaryOutputProps) {
  const analysisRenders = useRef(0);
  analysisRenders.current += 1;

  return (
    <div
      style={{
        background: "#1e293b",
        padding: "14px",
        borderRadius: "8px",
        border: "1px solid #334155",
        whiteSpace: "pre-wrap",
        lineHeight: 1.55,
        minHeight: "180px",
      }}
    >
      <div suppressHydrationWarning style={{ fontSize: "11px", color: "#64748b", marginBottom: "8px" }}>
        Analysis renders: {analysisRenders.current}
      </div>
      {summaryText || "Select an event to generate an AI incident analysis..."}
    </div>
  );
}
