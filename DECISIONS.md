# Frontend Architecture & Debugging Decisions

Please answer these four questions concisely before submitting your solution.

## 1. Root-Cause Diagnosis
What caused each of the three reported issues in the starter codebase?
- **Stream cross-contamination:** When I clicked a new event, the old stream was still running. There was no way to stop it, so old text kept mixing into the new summary.
- **Duplicate fetches & broken history navigation:** Search and filters were updating the URL and reading from the URL at the same time. That created a loop, so Back/Forward did not work, and every keystroke fired extra API calls. There was also no debounce.
- **Render cascade during streaming:** The streaming text was stored in the main page. So every new word re-rendered the full 500-row list and the heavy formatter, which made the UI feel slow.

## 2. Server vs. Client Component Boundaries
Which parts of the application did you move to Server Components vs. keep as Client Components, and why? What serializable props cross the boundary?

- **Server:** The page loads search/severity from the URL, filters the events, and sends them down as props. This avoids an extra fetch when the page opens.
- **Client:** Filters, event list clicks, and the streaming summary stay on the client because they need user input and live updates.
- **Props:** I pass `events`, `search`, and `severity` — simple data only.

## 3. Stream Cancellation & Race-Condition Strategy
How did you guarantee that rapid clicks across multiple events never interleave chunks or throw unhandled `AbortError` exceptions? What happens if a user selects Event A -> Event B -> Event A quickly?

I moved streaming into its own hook/component. When the event changes, I abort the old request and start a new one. If the request was cancelled on purpose, I ignore that error.

If the user clicks A → B → A quickly: A is stopped, B starts, then B is stopped and A starts fresh. Old chunks never get added to the new summary.

## 4. State Synchronization & Render Performance
- How did you synchronize filter inputs with `useSearchParams` / `router.replace` (or `push`) without creating a `useEffect` feedback loop?
- How did you verify that token updates in the summary panel no longer trigger re-renders in the event table?

The URL is the source of truth. The search box keeps a local draft, waits a short debounce, then updates the URL once. I only push when the URL actually needs to change, so there is no loop. Back/Forward just syncs the input from the URL.

I checked with the render counters: while text is streaming, **List renders** stays the same and **Summary renders** goes up. That means only the summary leaf updates, not the event table.
