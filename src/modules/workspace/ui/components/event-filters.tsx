"use client";

import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { useQueryParams } from "@/hooks/use-query-params";
import type { SeverityFilter } from "@/lib/mock-data";

interface EventFiltersProps {
  search: string;
  severity: SeverityFilter;
}

export function EventFilters({ search, severity }: EventFiltersProps) {
  const { setQueryParams } = useQueryParams();
  const [draft, setDraft] = useState(search);
  const debouncedSearch = useDebounce(draft.trim());

  // Latest URL values — read inside the debounce effect without re-running on Back/Forward
  const searchRef = useRef(search);
  const severityRef = useRef(severity);
  searchRef.current = search;
  severityRef.current = severity;

  useEffect(() => {
    setDraft(search);
  }, [search]);

  useEffect(() => {
    if (debouncedSearch === searchRef.current) return;

    setQueryParams({
      search: debouncedSearch || undefined,
      severity: severityRef.current === "all" ? undefined : severityRef.current,
    });
  }, [debouncedSearch, setQueryParams]);

  function onSeverityChange(value: string) {
    setQueryParams({
      search: draft.trim() || undefined,
      severity: value === "all" ? undefined : value,
    });
  }

  return (
    <div style={{ padding: "16px", borderBottom: "1px solid #1e293b", display: "flex", gap: "12px", alignItems: "center" }}>
      <input
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Filter by service, title, or ID..."
        style={{
          flex: 1,
          padding: "8px 12px",
          borderRadius: "6px",
          border: "1px solid #334155",
          background: "#1e293b",
          color: "#f8fafc",
        }}
      />
      <select
        value={severity}
        onChange={(e) => onSeverityChange(e.target.value)}
        style={{
          padding: "8px 12px",
          borderRadius: "6px",
          border: "1px solid #334155",
          background: "#1e293b",
          color: "#f8fafc",
        }}
      >
        <option value="all">All Severities</option>
        <option value="info">Info</option>
        <option value="warning">Warning</option>
        <option value="critical">Critical</option>
      </select>
    </div>
  );
}
