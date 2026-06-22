import React, { useState } from "react";
import { MapPin, Navigation, Clock, Loader2, ArrowRight } from "lucide-react";
import MOCK_ROUTES from "../../../Data/Mockroutes.json";

const QUICK = MOCK_ROUTES.map((r) => ({ from: r.from.label, to: r.to.label }));

const JourneyInput = ({ onPlan, loading }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [reachBy, setReachBy] = useState("");

  const handlePlan = () => {
    if (!from.trim() || !to.trim()) return;
    onPlan({ from: from.trim(), to: to.trim(), reachBy });
  };

  const fill = (f, t) => { setFrom(f); setTo(t); };

  return (
    <div className="bg-surface border border-primary/10 rounded-2xl p-4 shadow-[0_4px_24px_rgba(217,93,3,0.07)]">
      {/* Quick chips */}
      <div className="flex items-center gap-2 flex-wrap mb-3">
        <span className="text-[10px] font-semibold text-text-muted tracking-widest uppercase">Quick:</span>
        {QUICK.map(({ from: f, to: t }) => (
          <button
            key={f}
            onClick={() => fill(f, t)}
            className="text-[11px] px-3 py-1 rounded-full bg-bg border border-primary/15 text-text-secondary hover:border-primary hover:text-primary transition-all duration-200"
          >
            {f} → {t}
          </button>
        ))}
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_1fr_auto_auto] gap-2.5 items-end">
        {/* From */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-semibold text-text-muted tracking-widest uppercase">From</label>
          <div className="relative">
            <Navigation size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handlePlan()}
              placeholder="e.g. Saket"
              className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-bg border border-primary/10 text-text-primary placeholder:text-text-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all duration-200"
            />
          </div>
        </div>

        {/* To */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-semibold text-text-muted tracking-widest uppercase">To</label>
          <div className="relative">
            <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handlePlan()}
              placeholder="e.g. Kashmere Gate"
              className="w-full pl-8 pr-3 py-2.5 rounded-xl bg-bg border border-primary/10 text-text-primary placeholder:text-text-muted/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all duration-200"
            />
          </div>
        </div>

        {/* Reach By */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-semibold text-text-muted tracking-widest uppercase">Reach By</label>
          <div className="relative">
            <Clock size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
            <input
              type="time"
              value={reachBy}
              onChange={(e) => setReachBy(e.target.value)}
              className="pl-8 pr-3 py-2.5 rounded-xl bg-bg border border-primary/10 text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all duration-200"
            />
          </div>
        </div>

        {/* Button */}
        <button
          onClick={handlePlan}
          disabled={loading || !from.trim() || !to.trim()}
          className="flex items-center justify-center gap-2 py-2.5 px-5 rounded-xl bg-primary hover:bg-primary-hover text-white text-sm font-semibold transition-all duration-200 hover:shadow-[0_6px_20px_rgba(217,93,3,0.3)] hover:scale-[1.02] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 whitespace-nowrap"
        >
          {loading ? (
            <Loader2 size={15} className="animate-spin" />
          ) : (
            <>Plan <ArrowRight size={14} /></>
          )}
        </button>
      </div>
    </div>
  );
};

export default JourneyInput;