import React, { useState, useEffect, useCallback } from "react";
import JourneyInput    from "../../components/user/planjourney/Journeyinput";
import RouteMap        from "../../components/user/planjourney/Routemap";
import RouteCard       from "../../components/user/planjourney/Routecard";
import RouteSummaryBar from "../../components/user/planjourney/Routesummarybar";
import MOCK_ROUTES     from "../../Data/Mockroutes.json";

// OSRM public demo server — replace with self-hosted for production
const OSRM_BASE = "https://router.project-osrm.org/route/v1/driving";

/**
 * Fetch a real road path from OSRM for a single route.
 * Falls back to mock waypoints if OSRM is unreachable.
 */
async function fetchOSRMPath(from, to) {
  try {
    const url = `${OSRM_BASE}/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson&steps=false`;
    const res  = await fetch(url, { signal: AbortSignal.timeout(5000) });
    const data = await res.json();
    if (data.code === "Ok" && data.routes?.[0]) {
      // GeoJSON coords are [lng, lat] — flip to [lat, lng] for Leaflet
      return data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
    }
  } catch {
    // OSRM unreachable — use mock waypoints silently
  }
  return null;
}

/** Pick best route: lowest durationMin, breaking ties by fewest signals */
function pickBestRoute(routes) {
  if (!routes?.length) return null;
  return routes.reduce((best, r) =>
    r.durationMin < best.durationMin ||
    (r.durationMin === best.durationMin && r.signals < best.signals)
      ? r : best
  );
}

/** Fuzzy match user input to a mock route entry */
function findMockEntry(fromStr, toStr) {
  const norm  = (s) => s.toLowerCase().trim();
  const fromN = norm(fromStr);
  const toN   = norm(toStr);

  return (
    MOCK_ROUTES.find(
      (r) =>
        norm(r.from.label).includes(fromN) &&
        norm(r.to.label).includes(toN)
    ) ??
    MOCK_ROUTES.find(
      (r) =>
        norm(r.from.label).includes(fromN) ||
        norm(r.to.label).includes(toN)
    ) ??
    MOCK_ROUTES[0]
  );
}

const PlanJourney = () => {
  const [journeyMeta, setJourneyMeta] = useState(null); // { from, to, reachBy }
  const [entry,       setEntry]       = useState(null); // matched mock entry
  const [selectedId,  setSelectedId]  = useState(null);
  const [osrmPaths,   setOsrmPaths]   = useState({});   // { routeId: [[lat,lng]] }
  const [loading,     setLoading]     = useState(false);
  const [osrmStatus,  setOsrmStatus]  = useState(null); // "live" | "mock"

  const handlePlan = useCallback(async ({ from, to, reachBy }) => {
    setLoading(true);
    setOsrmPaths({});
    setOsrmStatus(null);

    const matched = findMockEntry(from, to);
    setEntry(matched);
    setJourneyMeta({ from: matched.from.label, to: matched.to.label, reachBy });
    setSelectedId(pickBestRoute(matched.routes)?.id ?? matched.routes[0].id);

    // Try to fetch OSRM path for the main (best) route
    const best = pickBestRoute(matched.routes);
    const path  = await fetchOSRMPath(matched.from, matched.to);

    if (path) {
      // Use real OSRM path for selected; mock waypoints for others
      const paths = {};
      matched.routes.forEach((r) => { paths[r.id] = r.waypoints; });
      paths[best.id] = path;
      setOsrmPaths(paths);
      setOsrmStatus("live");
    } else {
      setOsrmStatus("mock");
    }

    setLoading(false);
  }, []);

  // When selected route changes, try fetching its OSRM path if not cached
  useEffect(() => {
    if (!entry || !selectedId || osrmPaths[selectedId]) return;
    const route = entry.routes.find((r) => r.id === selectedId);
    if (!route) return;

    fetchOSRMPath(entry.from, entry.to).then((path) => {
      if (path) {
        setOsrmPaths((prev) => ({ ...prev, [selectedId]: path }));
      }
    });
  }, [selectedId, entry, osrmPaths]);

  const selectedRoute = entry?.routes.find((r) => r.id === selectedId) ?? null;
  const bestRoute     = entry ? pickBestRoute(entry.routes) : null;

  return (
    <div className="min-h-screen bg-section px-4 sm:px-6 lg:px-8 pt-28 pb-14 relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="pointer-events-none absolute top-20 left-0 w-96 h-96 bg-primary/6 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 right-0 w-80 h-80 bg-primary/4 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col gap-4">

        {/* ── HEADER ── */}
        <div className="text-center">
          <p className="text-[10px] font-bold tracking-[0.2em] text-primary uppercase mb-1.5">Route Planner</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary font-sans">
            Plan Your <span className="text-primary">Journey</span>
          </h1>
          <p className="text-xs text-text-muted mt-1">
            Real road routing · Live congestion · Multi-route comparison
          </p>
        </div>

        {/* ── INPUT CARD ── */}
        <JourneyInput onPlan={handlePlan} loading={loading} />

        {/* ── OSRM status pill ── */}
        {osrmStatus && (
          <div className={`self-start text-[10px] font-semibold px-3 py-1 rounded-full border ${
            osrmStatus === "live"
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-amber-50 text-amber-700 border-amber-200"
          }`}>
            {osrmStatus === "live" ? "✓ Live road data via OSRM" : "⚠ OSRM unavailable · showing estimated paths"}
          </div>
        )}

        {/* ── LOADING ── */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 border-2 border-primary/20 rounded-full" />
              <div className="absolute inset-0 border-2 border-transparent border-t-primary rounded-full animate-spin" />
              <div className="absolute inset-2 border-2 border-transparent border-t-primary/50 rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.3s" }} />
            </div>
            <p className="text-sm font-semibold text-text-secondary">Computing routes…</p>
            <p className="text-[11px] text-text-muted">Fetching road data · Analysing congestion</p>
          </div>
        )}

        {/* ── EMPTY STATE ── */}
        {!loading && !entry && (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
            <span className="text-5xl opacity-30">🗺️</span>
            <p className="text-sm font-semibold text-text-secondary">Enter origin and destination above</p>
            <p className="text-[11px] text-text-muted">Try: Saket → Kashmere Gate · Connaught Place → Noida Sec 18</p>
          </div>
        )}

        {/* ── RESULTS ── */}
        {!loading && entry && (
          <>
            {/* Summary bar */}
            <RouteSummaryBar
              route={selectedRoute}
              from={journeyMeta.from}
              to={journeyMeta.to}
              reachBy={journeyMeta.reachBy}
            />

            {/* Map (left) + Route cards (right) */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4">

              {/* ── MAP ── */}
              <div className="h-[340px] sm:h-[420px] lg:h-[500px] bg-surface border border-primary/10 rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(217,93,3,0.07)]">
                <RouteMap
                  from={entry.from}
                  to={entry.to}
                  routes={entry.routes}
                  selectedId={selectedId}
                  osrmPaths={osrmPaths}
                />
              </div>

              {/* ── ROUTE CARDS ── */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-xs font-bold text-text-primary uppercase tracking-wider">Routes</h2>
                  <span className="text-[10px] text-text-muted">{entry.routes.length} options</span>
                </div>

                {/* Cards — scrollable on mobile, column on desktop */}
                <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pt-4 pb-1 lg:pb-0 lg:overflow-y-auto lg:max-h-[460px] scrollbar-thin">
                  {entry.routes
                    .slice()
                    .sort((a, b) => a.durationMin - b.durationMin)
                    .map((route, i) => (
                      <div key={route.id} className="flex-shrink-0 w-[240px] lg:w-auto">
                        <RouteCard
                          route={route}
                          rank={i + 1}
                          isSelected={selectedId === route.id}
                          isBest={bestRoute?.id === route.id}
                          onClick={() => setSelectedId(route.id)}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PlanJourney;