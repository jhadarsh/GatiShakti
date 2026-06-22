import React from "react";
import { Star, Zap, Clock, AlertTriangle, TrafficCone } from "lucide-react";

const CONGESTION_CONFIG = {
  low:    { label: "Low",      color: "text-green-700",  bg: "bg-green-50",  border: "border-green-200",  dot: "bg-green-500"  },
  medium: { label: "Moderate", color: "text-amber-700",  bg: "bg-amber-50",  border: "border-amber-200",  dot: "bg-amber-500"  },
  high:   { label: "Heavy",    color: "text-red-700",    bg: "bg-red-50",    border: "border-red-200",    dot: "bg-red-500"    },
};

const RouteCard = ({ route, isSelected, isBest, rank, onClick }) => {
  const cong = CONGESTION_CONFIG[route.congestion] ?? CONGESTION_CONFIG.low;

  return (
    <div
      onClick={onClick}
      className={`
        relative cursor-pointer rounded-2xl border p-3.5 transition-all duration-300
        ${isSelected
          ? "bg-primary/8 border-primary/40 shadow-[0_8px_24px_rgba(217,93,3,0.14)] -translate-y-0.5"
          : "bg-surface border-primary/10 hover:border-primary/25 hover:shadow-[0_4px_16px_rgba(217,93,3,0.08)] hover:-translate-y-0.5"
        }
      `}
    >
      {/* Best badge */}
      {isBest && (
        <div className="absolute -top-1 left-3 flex items-center gap-1 bg-primary text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-[0_4px_12px_rgba(217,93,3,0.35)]">
          <Star size={9} fill="white" /> Best Route
        </div>
      )}

      {/* Header row */}
      <div className="flex items-start justify-between gap-2 mt-1 mb-2.5">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-bold text-text-muted">#{rank}</span>
            <h3 className="text-sm font-bold text-text-primary leading-tight">{route.label}</h3>
          </div>
          <p className="text-[11px] text-text-muted mt-0.5">{route.distanceKm} km</p>
        </div>

        {/* Congestion pill */}
        <span className={`flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border flex-shrink-0 ${cong.color} ${cong.bg} ${cong.border}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${cong.dot}`} />
          {cong.label}
        </span>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-2">
        {/* Time */}
        <div className={`flex items-center gap-2 rounded-xl px-2.5 py-2 ${isSelected ? "bg-primary/8" : "bg-bg"}`}>
          <Clock size={13} className="text-primary flex-shrink-0" />
          <div>
            <p className="text-[9px] text-text-muted uppercase tracking-wider">Time</p>
            <p className="text-sm font-bold text-text-primary leading-none">{route.durationMin} <span className="text-[10px] font-normal text-text-muted">min</span></p>
          </div>
        </div>

        {/* Signals */}
        <div className={`flex items-center gap-2 rounded-xl px-2.5 py-2 ${isSelected ? "bg-primary/8" : "bg-bg"}`}>
          <TrafficCone size={13} className="text-primary flex-shrink-0" />
          <div>
            <p className="text-[9px] text-text-muted uppercase tracking-wider">Signals</p>
            <p className="text-sm font-bold text-text-primary leading-none">{route.signals} <span className="text-[10px] font-normal text-text-muted">stops</span></p>
          </div>
        </div>
      </div>

      {/* Selected indicator */}
      {isSelected && (
        <div className="mt-2.5 flex items-center gap-1.5 text-[11px] font-semibold text-primary">
          <Zap size={11} fill="currentColor" /> Showing on map
        </div>
      )}
    </div>
  );
};

export default RouteCard;