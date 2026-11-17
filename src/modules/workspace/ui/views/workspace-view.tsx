"use client";

import { useCallback, useEffect, useState } from "react";
import type { SeverityFilter, SystemEvent } from "@/lib/mock-data";
import { EventFilters } from "@/modules/workspace/ui/components/event-filters";
import { EventList } from "@/modules/workspace/ui/components/event-list";
import { SummaryPanel } from "@/modules/workspace/ui/components/summary-panel";

interface WorkspaceViewProps {
  events: SystemEvent[];
  search: string;
  severity: SeverityFilter;
}

export function WorkspaceView({ events, search, severity }: WorkspaceViewProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = selectedId ? events.find((evt) => evt.id === selectedId) ?? null : null;
  const onSelect = useCallback((id: string) => setSelectedId(id), []);

  useEffect(() => {
    if (selectedId && !events.some((evt) => evt.id === selectedId)) {
      setSelectedId(null);
    }
  }, [events, selectedId]);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", height: "100vh", overflow: "hidden" }}>
      <div style={{ borderRight: "1px solid #1e293b", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <EventFilters search={search} severity={severity} />
        <EventList events={events} selectedId={selectedId} onSelect={onSelect} />
      </div>

      <SummaryPanel key={`${selectedId ?? "empty"}:${search}:${severity}`} event={selected} />
    </div>
  );
}
