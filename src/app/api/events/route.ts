import { NextRequest, NextResponse } from "next/server";
import { filterEvents, type SeverityFilter } from "@/lib/mock-data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get("search") || "";
  const severity = (searchParams.get("severity") || "all") as SeverityFilter;

  const delay = 150 + Math.floor(Math.random() * 400);
  await new Promise((r) => setTimeout(r, delay));

  const events = filterEvents(search, severity);

  return NextResponse.json({
    events,
    total: events.length,
  });
}
