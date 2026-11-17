"use client";

import { memo } from "react";
import type { Severity, SystemEvent } from "@/lib/mock-data";

interface EventRowProps {
  event: SystemEvent;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const SEVERITY_BG: Record<Severity, string> = {
  critical: "#7f1d1d",
  warning: "#78350f",
  info: "#1e3a8a",
};

export const EventRow = memo(function EventRow({ event, isSelected, onSelect }: EventRowProps) {
  return (
    <div
      onClick={() => onSelect(event.id)}
      style={{
        padding: "12px 16px",
        borderBottom: "1px solid #1e293b",
        cursor: "pointer",
        background: isSelected ? "#1e293b" : "transparent",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <div style={{ fontSize: "14px", fontWeight: 500 }}>{event.title}</div>
        <div style={{ fontSize: "12px", color: "#64748b" }}>
          {event.id} · {event.timestamp}
        </div>
      </div>
      <span
        style={{
          fontSize: "11px",
          padding: "2px 8px",
          borderRadius: "999px",
          background: SEVERITY_BG[event.severity],
          color: "#f8fafc",
        }}
      >
        {event.severity}
      </span>
    </div>
  );
});
