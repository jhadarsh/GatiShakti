import { useState, useEffect } from "react";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const ROUTES = {
  "saket-kashmere gate": {
    from: "Saket",
    to: "Kashmere Gate",
    distance: "22 km",
    straight: "18 km",
    modes: [
      {
        id: "car",
        label: "Car",
        icon: "🚗",
        time: "48 min",
        cost: "₹180",
        pollution: "High",
        pollutionLevel: 3,
        color: "#f5a623",
        signals: 14,
        trafficSignals: [
          { name: "Saket Ring Rd",   status: "Heavy",    wait: "3 min"  },
          { name: "INA Junction",    status: "Moderate", wait: "90 sec" },
          { name: "Lodhi Rd",        status: "Clear",    wait: "30 sec" },
          { name: "Pragati Maidan",  status: "Heavy",    wait: "4 min"  },
          { name: "IP Flyover",      status: "Moderate", wait: "2 min"  },
          { name: "Kashmere Gate",   status: "Clear",    wait: "45 sec" },
        ],
        currentTraffic: "Moderate — expect delays near INA & Pragati Maidan",
        route: "Saket → AIIMS Flyover → Lodhi Rd → IP Ext → Kashmere Gate",
      },
      {
        id: "bike",
        label: "Bike",
        icon: "🏍️",
        time: "35 min",
        cost: "₹60",
        pollution: "Medium",
        pollutionLevel: 2,
        color: "#00e5ff",
        signals: 11,
        trafficSignals: [
          { name: "Saket Ring Rd", status: "Moderate", wait: "90 sec" },
          { name: "INA Junction",  status: "Clear",    wait: "30 sec" },
          { name: "Lodhi Rd",      status: "Clear",    wait: "20 sec" },
          { name: "IP Flyover",    status: "Heavy",    wait: "2 min"  },
          { name: "Kashmere Gate", status: "Clear",    wait: "30 sec" },
        ],
        currentTraffic: "Light to Moderate — smooth except IP Ext area",
        route: "Saket → Press Enclave → Lodi Rd → IP Ext → Kashmere Gate",
      },
      {
        id: "bus",
        label: "Public Bus",
        icon: "🚌",
        time: "1 hr 20 min",
        cost: "₹30",
        pollution: "Low",
        pollutionLevel: 1,
        color: "#4ade80",
        signals: 18,
        trafficSignals: [],
        currentTraffic: "Bus 522 & 532 available — medium crowding",
        route: "Saket Terminal → INA → Mandi House → Kashmere Gate ISBT",
      },
      {
        id: "metro",
        label: "Metro",
        icon: "🚇",
        time: "42 min",
        cost: "₹50",
        pollution: "None",
        pollutionLevel: 0,
        color: "#a78bfa",
        signals: 0,
        trafficSignals: [],
        currentTraffic: "Yellow Line — 6 min frequency, low crowd",
        route: "Saket → Hauz Khas → Rajiv Chowk → Kashmere Gate",
      },
    ],
  },
  "rajiv chowk-dwarka": {
    from: "Rajiv Chowk",
    to: "Dwarka",
    distance: "26 km",
    straight: "21 km",
    modes: [
      {
        id: "car",
        label: "Car",
        icon: "🚗",
        time: "55 min",
        cost: "₹220",
        pollution: "High",
        pollutionLevel: 3,
        color: "#f5a623",
        signals: 16,
        trafficSignals: [
          { name: "Connaught Place", status: "Heavy",    wait: "4 min"  },
          { name: "Dhaula Kuan",     status: "Heavy",    wait: "5 min"  },
          { name: "Shankar Vihar",   status: "Moderate", wait: "2 min"  },
          { name: "Palam Flyover",   status: "Clear",    wait: "30 sec" },
          { name: "Dwarka Mor",      status: "Moderate", wait: "2 min"  },
          { name: "Dwarka Sec-9",    status: "Clear",    wait: "45 sec" },
        ],
        currentTraffic: "Heavy near CP & Dhaula Kuan — consider NH-48",
        route: "Rajiv Chowk → NH-48 → Mahipalpur → Dwarka Expressway → Dwarka",
      },
      {
        id: "bike",
        label: "Bike",
        icon: "🏍️",
        time: "40 min",
        cost: "₹80",
        pollution: "Medium",
        pollutionLevel: 2,
        color: "#00e5ff",
        signals: 12,
        trafficSignals: [
          { name: "CP Inner Ring", status: "Clear",    wait: "45 sec" },
          { name: "Dhaula Kuan",   status: "Heavy",    wait: "3 min"  },
          { name: "Palam Flyover", status: "Clear",    wait: "20 sec" },
          { name: "Dwarka Mor",    status: "Moderate", wait: "90 sec" },
        ],
        currentTraffic: "Moderate — Dhaula Kuan is a bottleneck",
        route: "Rajiv Chowk → Shankar Rd → NH-48 → Dwarka Sec-9",
      },
      {
        id: "bus",
        label: "Public Bus",
        icon: "🚌",
        time: "1 hr 45 min",
        cost: "₹35",
        pollution: "Low",
        pollutionLevel: 1,
        color: "#4ade80",
        signals: 20,
        trafficSignals: [],
        currentTraffic: "Bus 764 & 764A — heavy crowd during evening hours",
        route: "Rajiv Chowk → Dhaula Kuan → Palam → Dwarka Sec-9",
      },
      {
        id: "metro",
        label: "Metro",
        icon: "🚇",
        time: "38 min",
        cost: "₹60",
        pollution: "None",
        pollutionLevel: 0,
        color: "#a78bfa",
        signals: 0,
        trafficSignals: [],
        currentTraffic: "Blue Line — 4 min frequency, moderate crowd",
        route: "Rajiv Chowk → Dwarka Sec-21 (direct Blue Line)",
      },
    ],
  },
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function colorAlpha(hex, alpha) {
  const map = {
    "#f5a623": `rgba(245,166,35,${alpha})`,
    "#00e5ff": `rgba(0,229,255,${alpha})`,
    "#4ade80": `rgba(74,222,128,${alpha})`,
    "#a78bfa": `rgba(167,139,250,${alpha})`,
  };
  return map[hex] ?? `rgba(200,200,200,${alpha})`;
}

function PollutionDots({ level }) {
  const colors = ["#4ade80", "#facc15", "#f97316", "#ef4444"];
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: i <= level ? colors[level] : "rgba(255,255,255,0.1)",
            boxShadow: i <= level ? `0 0 6px ${colors[level]}` : "none",
            transition: "all 0.3s",
          }}
        />
      ))}
    </div>
  );
}

function TrafficBadge({ status }) {
  const map = {
    Heavy:    { bg: "rgba(239,68,68,0.15)",   color: "#ef4444", dot: "#ef4444" },
    Moderate: { bg: "rgba(250,204,21,0.15)",  color: "#facc15", dot: "#facc15" },
    Clear:    { bg: "rgba(74,222,128,0.15)",  color: "#4ade80", dot: "#4ade80" },
  };
  const s = map[status] || map.Clear;
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        borderRadius: 999,
        padding: "2px 8px",
        fontSize: 10,
        fontWeight: 600,
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        whiteSpace: "nowrap",
      }}
    >
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot, display: "inline-block" }} />
      {status}
    </span>
  );
}

// ─── CITY MAP ─────────────────────────────────────────────────────────────────
function CityMap({ routeData }) {
  const isSaket = routeData?.from === "Saket";

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        background: "linear-gradient(135deg,#060d1a 0%,#0a1628 60%,#060d1a 100%)",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes gs-dash  { to { stroke-dashoffset: -36; } }
        @keyframes gs-ripple { 0%{r:6;opacity:0.4} 100%{r:22;opacity:0} }
        @keyframes gs-blink  { 0%,100%{opacity:1} 50%{opacity:0.25} }
      `}</style>

      {/* Grid overlay */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.1 }}>
        <defs>
          <pattern id="gs-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00e5ff" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gs-grid)" />
      </svg>

      {/* Roads + route */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 700 460" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="gs-glow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <linearGradient id="gs-route" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00e5ff" />
            <stop offset="100%" stopColor="#f5a623" />
          </linearGradient>
        </defs>

        {/* Static background roads */}
        <line x1="0"   y1="200" x2="700" y2="200" stroke="#1a2a45" strokeWidth="14" />
        <line x1="0"   y1="300" x2="700" y2="300" stroke="#1a2a45" strokeWidth="8"  />
        <line x1="140" y1="0"   x2="140" y2="460" stroke="#1a2a45" strokeWidth="10" />
        <line x1="380" y1="0"   x2="380" y2="460" stroke="#1a2a45" strokeWidth="8"  />
        <line x1="560" y1="0"   x2="560" y2="460" stroke="#1a2a45" strokeWidth="6"  />
        <line x1="0"   y1="80"  x2="700" y2="380" stroke="#1a2a45" strokeWidth="12" />

        {/* Animated route path */}
        {isSaket ? (
          <path
            d="M 80 380 Q 200 280 350 220 Q 480 160 620 90"
            fill="none" stroke="url(#gs-route)" strokeWidth="4"
            strokeDasharray="12 6"
            filter="url(#gs-glow)"
            style={{ animation: "gs-dash 1.8s linear infinite" }}
          />
        ) : (
          <path
            d="M 80 90 Q 220 180 370 240 Q 510 295 630 380"
            fill="none" stroke="url(#gs-route)" strokeWidth="4"
            strokeDasharray="12 6"
            filter="url(#gs-glow)"
            style={{ animation: "gs-dash 1.8s linear infinite" }}
          />
        )}

        {/* Start pin */}
        {isSaket ? (
          <>
            <circle cx="80"  cy="380" r="22" fill="#00e5ff" opacity="0" style={{ animation: "gs-ripple 2s ease-out infinite" }} />
            <circle cx="80"  cy="380" r="7"  fill="#00e5ff" filter="url(#gs-glow)" />
            <circle cx="620" cy="90"  r="22" fill="#f5a623" opacity="0" style={{ animation: "gs-ripple 2s ease-out infinite 0.6s" }} />
            <circle cx="620" cy="90"  r="7"  fill="#f5a623" filter="url(#gs-glow)" />
          </>
        ) : (
          <>
            <circle cx="80"  cy="90"  r="22" fill="#00e5ff" opacity="0" style={{ animation: "gs-ripple 2s ease-out infinite" }} />
            <circle cx="80"  cy="90"  r="7"  fill="#00e5ff" filter="url(#gs-glow)" />
            <circle cx="630" cy="380" r="22" fill="#f5a623" opacity="0" style={{ animation: "gs-ripple 2s ease-out infinite 0.6s" }} />
            <circle cx="630" cy="380" r="7"  fill="#f5a623" filter="url(#gs-glow)" />
          </>
        )}

        {/* Signal dots along route */}
        {(isSaket
          ? [[175, 315], [280, 252], [390, 198], [500, 152]]
          : [[185, 155], [310, 208], [450, 268], [545, 328]]
        ).map(([cx, cy], i) => (
          <g key={i}>
            <circle cx={cx} cy={cy} r="12" fill={i % 2 === 0 ? "#ef4444" : "#22c55e"} opacity="0.12" />
            <circle
              cx={cx} cy={cy} r="5"
              fill={i % 2 === 0 ? "#ef4444" : "#22c55e"}
              filter="url(#gs-glow)"
              style={{ animation: `gs-blink 1.6s ease-in-out infinite ${i * 0.35}s` }}
            />
          </g>
        ))}
      </svg>

      {/* Corner labels */}
      <div style={{ position: "absolute", bottom: 14, left: 14, background: "rgba(6,11,20,.92)", border: "1px solid rgba(0,229,255,.18)", borderRadius: 10, padding: "8px 14px", backdropFilter: "blur(8px)" }}>
        <div style={{ color: "#00e5ff", fontWeight: 700, fontSize: 12, marginBottom: 1 }}>● Start</div>
        <div style={{ fontSize: 11, color: "#6b7fa3" }}>{routeData?.from}</div>
      </div>
      <div style={{ position: "absolute", top: 14, right: 14, background: "rgba(6,11,20,.92)", border: "1px solid rgba(245,166,35,.2)", borderRadius: 10, padding: "8px 14px", backdropFilter: "blur(8px)", textAlign: "right" }}>
        <div style={{ color: "#f5a623", fontWeight: 700, fontSize: 12, marginBottom: 1 }}>● Destination</div>
        <div style={{ fontSize: 11, color: "#6b7fa3" }}>{routeData?.to}</div>
      </div>

      {/* Bottom gradient fade */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 60, background: "linear-gradient(to top, rgba(6,11,20,0.8), transparent)", pointerEvents: "none" }} />
    </div>
  );
}

// ─── MODE CARD ────────────────────────────────────────────────────────────────
function ModeCard({ mode, isSelected, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        flex: "1 1 200px",
        background: isSelected ? colorAlpha(mode.color, 0.08) : "rgba(255,255,255,0.025)",
        border: `1px solid ${isSelected ? colorAlpha(mode.color, 0.4) : "rgba(255,255,255,0.07)"}`,
        borderRadius: 16,
        padding: "18px 20px",
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        transform: isSelected ? "translateY(-3px)" : "translateY(0)",
        boxShadow: isSelected ? `0 10px 36px ${colorAlpha(mode.color, 0.18)}` : "none",
      }}
      onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = colorAlpha(mode.color, 0.25); }}
      onMouseLeave={(e) => { if (!isSelected) { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; } }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
        <div style={{ width: 42, height: 42, borderRadius: 12, background: colorAlpha(mode.color, 0.15), border: `1px solid ${colorAlpha(mode.color, 0.3)}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>
          {mode.icon}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, color: "#e8f0ff" }}>{mode.label}</div>
          {mode.signals > 0 && <div style={{ fontSize: 10, color: "#6b7fa3", marginTop: 1 }}>{mode.signals} signals</div>}
        </div>
        {isSelected && (
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: mode.color, boxShadow: `0 0 10px ${mode.color}` }} />
        )}
      </div>

      {/* Stats grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 14px" }}>
        <div>
          <div style={{ fontSize: 10, color: "#6b7fa3", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>Time</div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15, color: mode.color }}>{mode.time}</div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: "#6b7fa3", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>Cost</div>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15, color: "#e8f0ff" }}>{mode.cost}</div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: "#6b7fa3", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 5 }}>Pollution</div>
          <PollutionDots level={mode.pollutionLevel} />
        </div>
        <div>
          <div style={{ fontSize: 10, color: "#6b7fa3", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>Road load</div>
          <div style={{ fontSize: 11, color: mode.pollutionLevel === 0 ? "#4ade80" : mode.pollutionLevel === 1 ? "#4ade80" : mode.pollutionLevel === 2 ? "#facc15" : "#ef4444" }}>
            {["None", "Low", "Moderate", "Heavy"][mode.pollutionLevel]}
          </div>
        </div>
      </div>

      {/* Expanded signals when selected */}
      {isSelected && mode.trafficSignals.length > 0 && (
        <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.07)" }}>
          <div style={{ fontSize: 10, color: "#6b7fa3", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 8 }}>
            🚦 Signal breakdown
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {mode.trafficSignals.map((sig, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, color: "#a0b0cc" }}>{sig.name}</span>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <TrafficBadge status={sig.status} />
                  <span style={{ fontSize: 10, color: "#6b7fa3" }}>{sig.wait}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isSelected && mode.trafficSignals.length === 0 && (
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.07)", fontSize: 11, color: "#a0b0cc" }}>
          ✅ No road signals on this route.
        </div>
      )}
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function PlanJourney() {
  const [from,        setFrom]        = useState("");
  const [to,          setTo]          = useState("");
  const [vehicle,     setVehicle]     = useState("");
  const [reachBy,     setReachBy]     = useState("");
  const [routeData,   setRouteData]   = useState(null);
  const [selectedMode,setSelectedMode]= useState("car");
  const [loading,     setLoading]     = useState(false);
  const [planned,     setPlanned]     = useState(false);

  const handlePlan = () => {
    if (!from.trim() || !to.trim()) return;
    const key = `${from.toLowerCase().trim()}-${to.toLowerCase().trim()}`;
    const data = ROUTES[key] ?? Object.values(ROUTES)[0]; // fallback to first route
    setLoading(true);
    setPlanned(false);
    setSelectedMode("car");
    setTimeout(() => {
      setRouteData(data);
      setLoading(false);
      setPlanned(true);
    }, 1400);
  };

  const handleKeyDown = (e) => { if (e.key === "Enter") handlePlan(); };

  const quickFill = (f, t) => { setFrom(f); setTo(t); };

  const currentMode = routeData?.modes.find((m) => m.id === selectedMode);

  return (
    <div style={{ minHeight: "100vh", padding: "88px 40px 60px", background: "#060b14", color: "#e8f0ff", fontFamily: "'DM Sans',sans-serif", position: "relative", overflowX: "hidden" , marginTop: "-80px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(0,229,255,0.2); border-radius: 4px; }

        @keyframes pj-fadeUp  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pj-fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes pj-spin    { to{transform:rotate(360deg)} }
        @keyframes pj-pulse   { 0%,100%{box-shadow:0 0 0 0 rgba(0,229,255,.45)} 50%{box-shadow:0 0 0 8px rgba(0,229,255,0)} }

        .pj-input { background:rgba(255,255,255,0.04); border:1px solid rgba(0,229,255,0.15); border-radius:12px; padding:13px 16px; color:#e8f0ff; font-family:'DM Sans',sans-serif; font-size:0.9rem; width:100%; transition:all 0.25s; outline:none; }
        .pj-input::placeholder { color:rgba(107,127,163,0.7); }
        .pj-input:focus { border-color:#00e5ff; box-shadow:0 0 0 3px rgba(0,229,255,0.1); background:rgba(0,229,255,0.04); }

        .pj-fadeUp1  { animation: pj-fadeUp 0.55s ease 0.05s both; }
        .pj-fadeUp2  { animation: pj-fadeUp 0.55s ease 0.12s both; }
        .pj-fadeUp3  { animation: pj-fadeUp 0.55s ease 0.20s both; }
        .pj-fadeUp4  { animation: pj-fadeUp 0.55s ease 0.28s both; }
        .pj-fadeUp5  { animation: pj-fadeUp 0.55s ease 0.36s both; }
        .pj-fadeUp6  { animation: pj-fadeUp 0.55s ease 0.44s both; }
      `}</style>

      {/* Ambient grid */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(0,229,255,0.032) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.032) 1px,transparent 1px)", backgroundSize: "56px 56px", pointerEvents: "none", zIndex: 0 }} />
      {/* Glow blobs */}
      <div style={{ position: "fixed", top: "8%",   left:  "3%", width: 420, height: 420, background: "radial-gradient(circle,rgba(0,229,255,0.055) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "8%", right: "3%", width: 500, height: 500, background: "radial-gradient(circle,rgba(245,166,35,0.045) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      {/* PAGE CONTENT */}
      <div style={{ position: "relative", zIndex: 1, padding: "88px 40px 60px", maxWidth: 1140, margin: "20px 20px 20px 40px"  ,marginTop: "-80px"  }}>

        {/* ── PAGE HEADER ── */}
        <div className="pj-fadeUp1" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: 32 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,229,255,0.07)", border: "1px solid rgba(0,229,255,0.22)", borderRadius: 999, padding: "5px 16px", fontSize: 10.5, letterSpacing: "0.14em", color: "#00e5ff", marginBottom: 20 }}>
            <span style={{ width: 7, height: 7, background: "#00e5ff", borderRadius: "50%", display: "inline-block", animation: "pj-pulse 2s infinite" }} />
            ROUTE PLANNER · LIVE
          </div>

          <h1 className="pj-fadeUp2" style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3.2rem)", lineHeight: 1.1, marginBottom: 12 }}>
            Plan Your <span style={{ color: "#00e5ff" }}>Smart</span> <span style={{ color: "#f5a623" }}>Journey</span>
          </h1>
          <p className="pj-fadeUp2" style={{ color: "#6b7fa3", fontSize: "0.92rem", fontStyle: "italic" }}>
            Real-time routing · Signal intelligence · Multi-modal comparison
          </p>
        </div>

        {/* ── INPUT CARD ── */}
        <div
          className="pj-fadeUp3"
          style={{ background: "rgba(12,21,38,0.88)", border: "1px solid rgba(0,229,255,0.11)", borderRadius: 20, padding: "26px 30px", backdropFilter: "blur(16px)", marginBottom: 28, boxShadow: "0 0 48px rgba(0,229,255,0.06)" }}
        >
          {/* Quick route chips */}
          <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
            <span style={{ fontSize: 10.5, color: "#6b7fa3", letterSpacing: "0.08em" }}>QUICK ROUTES:</span>
            {[["Saket", "Kashmere Gate"], ["Rajiv Chowk", "Dwarka"]].map(([f, t]) => (
              <button
                key={f}
                onClick={() => quickFill(f, t)}
                style={{ background: "rgba(0,229,255,0.06)", border: "1px solid rgba(0,229,255,0.2)", color: "#00e5ff", borderRadius: 999, padding: "4px 14px", fontSize: 11, cursor: "pointer", fontFamily: "'DM Sans',sans-serif", transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,229,255,0.14)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,229,255,0.06)"; }}
              >
                {f} → {t}
              </button>
            ))}
          </div>

          {/* Fields row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr auto", gap: 14, alignItems: "end" }}>
            {[
              { label: "From",           placeholder: "e.g. Saket",          val: from,    set: setFrom,    type: "text" },
              { label: "To",             placeholder: "e.g. Kashmere Gate",  val: to,      set: setTo,      type: "text" },
              { label: "Vehicle Number", placeholder: "e.g. DL 3C AB 1234", val: vehicle, set: setVehicle, type: "text" },
              { label: "Reach By",       placeholder: "--:--",               val: reachBy, set: setReachBy, type: "time" },
            ].map(({ label, placeholder, val, set, type }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                <label style={{ fontSize: 10, letterSpacing: "0.12em", color: "#6b7fa3", textTransform: "uppercase", fontWeight: 500 }}>{label}</label>
                <input
                  type={type}
                  value={val}
                  onChange={(e) => set(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={placeholder}
                  className="pj-input"
                />
              </div>
            ))}

            {/* Plan button */}
            <button
              onClick={handlePlan}
              disabled={loading || !from.trim() || !to.trim()}
              style={{
                background: !from.trim() || !to.trim() ? "rgba(0,229,255,0.18)" : "linear-gradient(135deg,#00e5ff,#008fb0)",
                color: !from.trim() || !to.trim() ? "#4a6a7a" : "#060b14",
                border: "none",
                borderRadius: 12,
                padding: "14px 26px",
                fontFamily: "'Syne',sans-serif",
                fontWeight: 700,
                fontSize: "0.88rem",
                cursor: !from.trim() || !to.trim() ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                whiteSpace: "nowrap",
                transition: "all 0.25s",
                minWidth: 130,
                justifyContent: "center",
              }}
              onMouseEnter={(e) => { if (from.trim() && to.trim()) e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,229,255,0.38)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
            >
              {loading ? (
                <>
                  <span style={{ width: 15, height: 15, border: "2px solid #060b14", borderTopColor: "transparent", borderRadius: "50%", display: "inline-block", animation: "pj-spin 0.75s linear infinite" }} />
                  Routing…
                </>
              ) : (
                <>Plan Route <span style={{ fontSize: "1.05rem" }}>→</span></>
              )}
            </button>
          </div>
        </div>

        {/* ── LOADING STATE ── */}
        {loading && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 360, gap: 22, animation: "pj-fadeIn 0.4s ease both" }}>
            <div style={{ position: "relative", width: 72, height: 72 }}>
              <div style={{ position: "absolute", inset: 0, border: "2px solid rgba(0,229,255,0.12)", borderRadius: "50%" }} />
              <div style={{ position: "absolute", inset: 0, border: "2px solid transparent", borderTopColor: "#00e5ff", borderRadius: "50%", animation: "pj-spin 0.8s linear infinite" }} />
              <div style={{ position: "absolute", inset: 10, border: "2px solid transparent", borderTopColor: "#f5a623", borderRadius: "50%", animation: "pj-spin 1.3s linear infinite reverse" }} />
            </div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#00e5ff" }}>Computing optimal routes…</div>
            <div style={{ fontSize: 12, color: "#6b7fa3" }}>Fetching live signal data · Analysing traffic patterns</div>
          </div>
        )}

        {/* ── EMPTY STATE ── */}
        {!planned && !loading && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 360, gap: 14, animation: "pj-fadeIn 0.7s ease both" }}>
            <div style={{ fontSize: 64, opacity: 0.35 }}>🗺️</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1rem", color: "#4a5a73" }}>Enter your journey details above</div>
            <div style={{ fontSize: 12, color: "#3a4a63" }}>Try: Saket → Kashmere Gate &nbsp;·&nbsp; Rajiv Chowk → Dwarka</div>
          </div>
        )}

        {/* ── RESULTS ── */}
        {planned && routeData && (
          <>
            {/* MAP + ROUTE INTELLIGENCE side by side */}
            <div className="pj-fadeUp4" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginBottom: 22 }}>

              {/* MAP */}
              <div style={{ background: "rgba(12,21,38,0.88)", border: "1px solid rgba(0,229,255,0.11)", borderRadius: 20, overflow: "hidden", height: 460, position: "relative", boxShadow: "0 0 48px rgba(0,229,255,0.07)" }}>
                <CityMap routeData={routeData} />
              </div>

              {/* ROUTE INTELLIGENCE */}
              <div style={{ background: "rgba(12,21,38,0.88)", border: "1px solid rgba(245,166,35,0.14)", borderRadius: 20, padding: 24, height: 460, overflowY: "auto", boxShadow: "0 0 48px rgba(245,166,35,0.06)", display: "flex", flexDirection: "column", gap: 16 }}>

                {/* Panel header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: 16, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                  <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "0.95rem" }}>Route Intelligence</div>
                  <span style={{ background: "rgba(245,166,35,0.1)", border: "1px solid rgba(245,166,35,0.25)", color: "#f5a623", borderRadius: 999, padding: "3px 12px", fontSize: 10.5, fontWeight: 600, letterSpacing: "0.06em" }}>● LIVE</span>
                </div>

                {/* Key stats */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
                  {[
                    { label: "Distance",    val: routeData.distance, color: "#00e5ff" },
                    { label: "Straight",    val: routeData.straight, color: "#e8f0ff" },
                    { label: "Vehicle",     val: vehicle || "—",     color: "#f5a623" },
                  ].map(({ label, val, color }) => (
                    <div key={label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "12px 14px" }}>
                      <div style={{ fontSize: 9.5, color: "#6b7fa3", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{label}</div>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, color }}>{val}</div>
                    </div>
                  ))}
                </div>

                {/* Selected mode detail */}
                {currentMode && (
                  <div style={{ background: colorAlpha(currentMode.color, 0.06), border: `1px solid ${colorAlpha(currentMode.color, 0.2)}`, borderRadius: 14, padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                      <span style={{ fontSize: 20 }}>{currentMode.icon}</span>
                      <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: currentMode.color, fontSize: 14 }}>{currentMode.label} Route</span>
                    </div>
                    <div style={{ fontSize: 12, color: "#a0b0cc", lineHeight: 1.7 }}>📍 {currentMode.route}</div>
                    <div style={{ marginTop: 10, fontSize: 12, color: "#6b7fa3" }}>
                      <span style={{ color: "#facc15" }}>⚡ </span>{currentMode.currentTraffic}
                    </div>
                  </div>
                )}

                {/* Signal table */}
                {currentMode?.trafficSignals.length > 0 && (
                  <div>
                    <div style={{ fontSize: 10, color: "#6b7fa3", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>
                      🚦 Signal Status — {currentMode.signals} total
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {currentMode.trafficSignals.map((sig, i) => (
                        <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(255,255,255,0.02)", borderRadius: 8, padding: "8px 12px" }}>
                          <span style={{ fontSize: 12, color: "#a0b0cc" }}>{sig.name}</span>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <TrafficBadge status={sig.status} />
                            <span style={{ fontSize: 10, color: "#6b7fa3" }}>{sig.wait}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {currentMode?.trafficSignals.length === 0 && (
                  <div style={{ background: "rgba(167,139,250,0.06)", border: "1px solid rgba(167,139,250,0.15)", borderRadius: 12, padding: "14px 16px", fontSize: 12, color: "#a0b0cc" }}>
                    🚇 No road signals — smoothest option. Frequency: {currentMode.currentTraffic}
                  </div>
                )}

                {/* Reach-by target */}
                {reachBy && (
                  <div style={{ marginTop: "auto", background: "rgba(0,229,255,0.05)", border: "1px solid rgba(0,229,255,0.14)", borderRadius: 12, padding: "11px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12, color: "#6b7fa3" }}>Target arrival</span>
                    <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, color: "#00e5ff", fontSize: 14 }}>{reachBy}</span>
                  </div>
                )}
              </div>
            </div>

            {/* ── TRANSPORT COMPARISON CARDS ── */}
            <div className="pj-fadeUp5">
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1rem" }}>Transport Comparison</div>
                <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
                <div style={{ fontSize: 11, color: "#6b7fa3" }}>Click a card to see signal details</div>
              </div>

              <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                {routeData.modes.map((mode) => (
                  <ModeCard
                    key={mode.id}
                    mode={mode}
                    isSelected={selectedMode === mode.id}
                    onClick={() => setSelectedMode(mode.id)}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}