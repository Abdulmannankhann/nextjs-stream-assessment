"use client";

import { memo, useRef } from "react";
import type { SystemEvent } from "@/lib/mock-data";
import { EventRow } from "@/modules/workspace/ui/components/event-row";

interface EventListProps {
  events: SystemEvent[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export const EventList = memo(function EventList({ events, selectedId, onSelect }: EventListProps) {
  const eventListRenders = useRef(0);
  eventListRenders.current += 1;

  return (
    <>
      <div style={{ padding: "8px 16px", fontSize: "12px", color: "#64748b", borderBottom: "1px solid #1e293b" }}>
        <span suppressHydrationWarning>Event list renders: {eventListRenders.current}</span>
      </div>
      <div style={{ overflowY: "auto", flex: 1 }}>
        {events.map((evt) => (
          <EventRow
            key={evt.id}
            event={evt}
            isSelected={selectedId === evt.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    </>
  );
});
