import { filterEvents, type SeverityFilter } from "@/lib/mock-data";
import { WorkspaceView } from "@/modules/workspace/ui/views/workspace-view";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    severity?: SeverityFilter;
  }>;
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const search = params.search || "";
  const severity = params.severity || "all";
  const events = filterEvents(search, severity);

  return <WorkspaceView events={events} search={search} severity={severity} />;
}
