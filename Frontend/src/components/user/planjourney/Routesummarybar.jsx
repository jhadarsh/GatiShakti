import React from "react";
import { Clock, Map, TrafficCone, Navigation, Timer } from "lucide-react";

const CONGESTION_LABELS = { low: "Low", medium: "Moderate", high: "Heavy" };
const CONGESTION_COLORS = {
  low:    "text-green-700 bg-green-50 border-green-200",
  medium: "text-amber-700 bg-amber-50 border-amber-200",
  high:   "text-red-700 bg-red-50 border-red-200",
};

const Stat = ({ icon: Icon, label, value, accent }) => (
  <div className="flex items-center gap-2">
    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
      <Icon size={13} className="text-primary" />
    </div>
    <div>
      <p className="text-[9px] text-text-muted uppercase tracking-wider leading-none mb-0.5">{label}</p>
      <p className={`text-xs font-bold ${accent ? "text-primary" : "text-text-primary"} leading-none`}>{value}</p>
    </div>
  </div>
);

const RouteSummaryBar = ({ route, from, to, reachBy }) => {
  if (!route) return null;

  const cong = CONGESTION_COLORS[route.congestion] ?? CONGESTION_COLORS.low;

  return (
    <div className="bg-surface border border-primary/10 rounded-2xl px-4 py-3 flex flex-wrap gap-x-5 gap-y-2.5 items-center shadow-[0_2px_12px_rgba(217,93,3,0.06)]">
      {/* Route name */}
      <div className="flex items-center gap-1.5 mr-1">
        <Navigation size={13} className="text-primary" />
        <span className="text-xs font-bold text-text-primary">{from} → {to}</span>
        <span className="text-[10px] text-text-muted ml-1">· {route.label}</span>
      </div>

      <div className="w-px h-4 bg-primary/10 hidden sm:block" />

      <Stat icon={Clock}       label="Travel time"  value={`${route.durationMin} min`} accent />
      <Stat icon={Map}         label="Distance"     value={`${route.distanceKm} km`} />
      <Stat icon={TrafficCone} label="Signals"      value={`${route.signals} stops`} />

      {/* Congestion inline pill */}
      <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${cong}`}>
        {CONGESTION_LABELS[route.congestion]}
      </span>

      {reachBy && (
        <>
          <div className="w-px h-4 bg-primary/10 hidden sm:block" />
          <Stat icon={Timer} label="Reach by" value={reachBy} accent />
        </>
      )}
    </div>
  );
};

export default RouteSummaryBar;