"use client";

import { memo } from "react";

interface RawPayloadProps {
  rawPayload: string;
}

export const RawPayload = memo(function RawPayload({ rawPayload }: RawPayloadProps) {
  // Simulate ~12ms of synchronous formatting work per render
  const start = performance.now();
  let checksum = 0;
  while (performance.now() - start < 12) {
    checksum = (checksum + 1) % 1000;
  }
  void checksum;

  return (
    <details open>
      <summary style={{ cursor: "pointer", color: "#94a3b8", fontSize: "13px" }}>Raw Telemetry Payload</summary>
      <pre
        style={{
          background: "#020617",
          padding: "12px",
          borderRadius: "6px",
          fontSize: "12px",
          overflowX: "auto",
        }}
      >
        {rawPayload}
      </pre>
    </details>
  );
});
