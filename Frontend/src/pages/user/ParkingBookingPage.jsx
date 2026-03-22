import { useState } from "react";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const PARKING_DATA = {
  "Kashmere Gate": [
    { id: 1, name: "Kashmere Gate Parking Plaza", location: "Near Metro Gate 3", distance: "0.2 km", occupancy: 65, charge: "₹25/hr", rating: 4.5, totalSlots: 200, availableSlots: 70, features: ["24/7 Security", "Covered", "CCTV"] },
    { id: 2, name: "ISBT Multi-Level Parking",    location: "ISBT Complex",       distance: "0.5 km", occupancy: 45, charge: "₹20/hr", rating: 4.2, totalSlots: 300, availableSlots: 165, features: ["Valet", "EV Charging", "Washroom"] },
    { id: 3, name: "Old Delhi Parking Hub",        location: "Mori Gate Road",     distance: "0.8 km", occupancy: 80, charge: "₹15/hr", rating: 3.8, totalSlots: 150, availableSlots: 30,  features: ["Budget", "Open", "Guard"] },
    { id: 4, name: "Metro Connect Parking",        location: "Gate 1, Kashmere Gate", distance: "0.1 km", occupancy: 55, charge: "₹35/hr", rating: 4.6, totalSlots: 180, availableSlots: 81, features: ["Premium", "Mobile Pay", "Reserved"] },
    { id: 5, name: "City Center Parking",          location: "Kashmere Gate Main Rd", distance: "1.0 km", occupancy: 70, charge: "₹30/hr", rating: 4.3, totalSlots: 250, availableSlots: 75, features: ["Wide Space", "24/7", "Car Wash"] },
  ],
  "GTB Nagar": [
    { id: 6,  name: "GTB Metro Parking",         location: "Metro Station Complex", distance: "0.1 km", occupancy: 60, charge: "₹20/hr", rating: 4.4, totalSlots: 150, availableSlots: 60,  features: ["Student Discount", "Covered", "CCTV"] },
    { id: 7,  name: "University Parking Zone",   location: "Near North Campus",     distance: "0.3 km", occupancy: 75, charge: "₹15/hr", rating: 4.0, totalSlots: 200, availableSlots: 50,  features: ["Student Rates", "Bike Parking", "Security"] },
    { id: 8,  name: "GTB Market Parking",        location: "Main Market Road",      distance: "0.5 km", occupancy: 85, charge: "₹25/hr", rating: 3.9, totalSlots: 100, availableSlots: 15,  features: ["Central", "Short Term", "Easy Access"] },
    { id: 9,  name: "North Campus Parking Hub",  location: "University Road",       distance: "0.7 km", occupancy: 50, charge: "₹12/hr", rating: 4.2, totalSlots: 250, availableSlots: 125, features: ["Affordable", "Large", "24/7"] },
    { id: 10, name: "GTB Express Parking",       location: "Ring Road Junction",    distance: "1.2 km", occupancy: 40, charge: "₹30/hr", rating: 4.5, totalSlots: 180, availableSlots: 108, features: ["Quick Access", "EV Charging", "Rest Area"] },
  ],
  "Saket": [
    { id: 11, name: "Select City Walk Parking",      location: "Select City Mall",        distance: "0.1 km", occupancy: 90, charge: "₹45/hr", rating: 4.7, totalSlots: 500, availableSlots: 50,  features: ["Valet", "Premium", "Mall Access"] },
    { id: 12, name: "Saket Metro Parking",           location: "Metro Station Gate 2",    distance: "0.2 km", occupancy: 70, charge: "₹35/hr", rating: 4.5, totalSlots: 200, availableSlots: 60,  features: ["Metro Connected", "Covered", "Security"] },
    { id: 13, name: "DLF Place Parking",             location: "DLF Place Mall",          distance: "0.5 km", occupancy: 65, charge: "₹40/hr", rating: 4.6, totalSlots: 300, availableSlots: 105, features: ["Mall Parking", "Food Court", "Premium"] },
    { id: 14, name: "Saket District Centre Parking", location: "District Centre Complex", distance: "0.8 km", occupancy: 55, charge: "₹25/hr", rating: 4.1, totalSlots: 250, availableSlots: 113, features: ["Gov Rates", "Large", "Easy Exit"] },
    { id: 15, name: "MGF Metropolitan Parking",      location: "MGF Mall",                distance: "1.0 km", occupancy: 75, charge: "₹35/hr", rating: 4.3, totalSlots: 350, availableSlots: 88,  features: ["Mall Direct", "Entertainment", "Secure"] },
  ],
};

const SLOT_ROWS = {
  A: [
    { id: 1,  position: 1, isBooked: false, type: "Standard", price: "₹25/hr" },
    { id: 2,  position: 2, isBooked: true,  bookedBy: { name: "Rahul", vehicleNo: "DL01AB1234" }, type: "Standard", price: "₹25/hr" },
    { id: 3,  position: 3, isBooked: false, type: "Standard", price: "₹25/hr" },
    { id: 4,  position: 4, isBooked: false, type: "Premium",  price: "₹40/hr" },
    { id: 5,  position: 5, isBooked: true,  bookedBy: { name: "Priya", vehicleNo: "DL02CD5678" }, type: "Premium", price: "₹40/hr" },
  ],
  B: [
    { id: 6,  position: 1, isBooked: false, type: "Standard", price: "₹25/hr" },
    { id: 7,  position: 2, isBooked: false, type: "Standard", price: "₹25/hr" },
    { id: 8,  position: 3, isBooked: true,  bookedBy: { name: "Amit", vehicleNo: "DL03EF9012" }, type: "Premium", price: "₹40/hr" },
    { id: 9,  position: 4, isBooked: false, type: "Premium",  price: "₹40/hr" },
    { id: 10, position: 5, isBooked: false, type: "VIP",      price: "₹65/hr" },
  ],
  C: [
    { id: 11, position: 1, isBooked: false, type: "Standard", price: "₹25/hr" },
    { id: 12, position: 2, isBooked: true,  bookedBy: { name: "Neha", vehicleNo: "DL04GH3456" }, type: "Standard", price: "₹25/hr" },
    { id: 13, position: 3, isBooked: false, type: "Premium",  price: "₹40/hr" },
    { id: 14, position: 4, isBooked: false, type: "VIP",      price: "₹65/hr" },
    { id: 15, position: 5, isBooked: false, type: "VIP",      price: "₹65/hr" },
  ],
};

// ─── SLOT TYPE CONFIG ─────────────────────────────────────────────────────────
const SLOT_STYLE = {
  Standard: { color: "#00e5ff",  bg: "rgba(0,229,255,0.08)",  border: "rgba(0,229,255,0.25)",  label: "STD" },
  Premium:  { color: "#f5a623",  bg: "rgba(245,166,35,0.08)", border: "rgba(245,166,35,0.25)", label: "PRE" },
  VIP:      { color: "#a78bfa",  bg: "rgba(167,139,250,0.1)", border: "rgba(167,139,250,0.3)", label: "VIP" },
};

// ─── STAR RATING ──────────────────────────────────────────────────────────────
function Stars({ rating }) {
  return (
    <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ fontSize: 10, color: i <= Math.floor(rating) ? "#f5a623" : "rgba(255,255,255,0.15)" }}>★</span>
      ))}
      <span style={{ fontSize: 10, color: "#6b7fa3", marginLeft: 2 }}>({rating})</span>
    </div>
  );
}

// ─── OCCUPANCY BAR ────────────────────────────────────────────────────────────
function OccupancyBar({ pct }) {
  const color = pct >= 80 ? "#ef4444" : pct >= 60 ? "#f5a623" : "#4ade80";
  return (
    <div style={{ height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 4, overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 4, boxShadow: `0 0 8px ${color}`, transition: "width 1s ease" }} />
    </div>
  );
}

// ─── BOOKING MODAL ────────────────────────────────────────────────────────────
function BookingModal({ slot, station, onClose, onBooked }) {
  const [name, setName]         = useState("");
  const [phone, setPhone]       = useState("");
  const [license, setLicense]   = useState("");
  const [vehicle, setVehicle]   = useState("");
  const [loading, setLoading]   = useState(false);
  const [success, setSuccess]   = useState(false);

  const s = SLOT_STYLE[slot.type];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => { onBooked(); onClose(); }, 1200);
    }, 1500);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 200, padding: 20 }}>
      <div style={{ background: "#0c1526", border: "1px solid rgba(0,229,255,0.18)", borderRadius: 20, width: "100%", maxWidth: 420, boxShadow: "0 0 80px rgba(0,229,255,0.12)", animation: "bs-slideUp 0.35s ease both", overflow: "hidden" }}>

        {/* Header */}
        <div style={{ padding: "20px 24px 18px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 16, color: "#e8f0ff" }}>Confirm Booking</div>
            <div style={{ fontSize: 11, color: "#6b7fa3", marginTop: 2 }}>{station.name}</div>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "#6b7fa3", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
        </div>

        {/* Slot badge */}
        <div style={{ padding: "14px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: s.bg, border: `1px solid ${s.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>🚗</div>
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, color: s.color }}>{slot.type} — Gate {slot.gate}, P{slot.position}</div>
            <div style={{ fontSize: 12, color: "#6b7fa3", marginTop: 2 }}>{slot.price}</div>
          </div>
        </div>

        {success ? (
          <div style={{ padding: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(74,222,128,0.1)", border: "2px solid #4ade80", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>✓</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15, color: "#4ade80" }}>Booking Confirmed!</div>
            <div style={{ fontSize: 12, color: "#6b7fa3" }}>Receipt sent to your phone</div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { label: "Driver Name",     val: name,    set: setName,    placeholder: "Enter full name",         type: "text" },
              { label: "Phone Number",    val: phone,   set: setPhone,   placeholder: "Enter phone number",      type: "tel"  },
              { label: "License Number",  val: license, set: setLicense, placeholder: "e.g. DL-1420110012345",   type: "text" },
              { label: "Vehicle Number",  val: vehicle, set: setVehicle, placeholder: "e.g. DL 3C AB 1234",     type: "text" },
            ].map(({ label, val, set, placeholder, type }) => (
              <div key={label} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 10, color: "#6b7fa3", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 500 }}>{label}</label>
                <input
                  type={type} value={val} required
                  onChange={(e) => set(e.target.value)}
                  placeholder={placeholder}
                  className="bs-input"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 10, padding: "11px 14px", color: "#e8f0ff", fontFamily: "'DM Sans',sans-serif", fontSize: 13, outline: "none", width: "100%", transition: "all 0.2s" }}
                  onFocus={(e) => { e.target.style.borderColor = "#00e5ff"; e.target.style.boxShadow = "0 0 0 3px rgba(0,229,255,0.1)"; }}
                  onBlur={(e)  => { e.target.style.borderColor = "rgba(0,229,255,0.15)"; e.target.style.boxShadow = "none"; }}
                />
              </div>
            ))}

            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
              <button type="button" onClick={onClose} style={{ flex: 1, padding: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "#a0b0cc", fontFamily: "'Syne',sans-serif", fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.09)"}
                onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}>
                Cancel
              </button>
              <button type="submit" disabled={loading} style={{ flex: 1, padding: "12px", background: loading ? "rgba(0,229,255,0.2)" : "linear-gradient(135deg,#00e5ff,#008fb0)", border: "none", borderRadius: 10, color: loading ? "#4a6a7a" : "#060b14", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13, cursor: loading ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.2s" }}>
                {loading ? (
                  <><span style={{ width: 14, height: 14, border: "2px solid #060b14", borderTopColor: "transparent", borderRadius: "50%", display: "inline-block", animation: "bs-spin 0.7s linear infinite" }} /> Booking…</>
                ) : "Confirm Booking →"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// ─── SLOTS MODAL ──────────────────────────────────────────────────────────────
function SlotsModal({ station, onClose, onSlotSelect }) {
  const [hoveredSlot, setHoveredSlot] = useState(null);

  const total    = Object.values(SLOT_ROWS).flat().length;
  const booked   = Object.values(SLOT_ROWS).flat().filter((s) => s.isBooked).length;
  const free     = total - booked;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 150, padding: 20 }}>
      <div style={{ background: "#0c1526", border: "1px solid rgba(0,229,255,0.15)", borderRadius: 24, width: "100%", maxWidth: 780, maxHeight: "90vh", overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 0 100px rgba(0,229,255,0.1)", animation: "bs-slideUp 0.35s ease both" }}>

        {/* Header */}
        <div style={{ padding: "22px 28px", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 18, color: "#e8f0ff" }}>{station.name}</div>
            <div style={{ fontSize: 12, color: "#6b7fa3", marginTop: 3 }}>📍 {station.location}</div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ display: "flex", gap: 10 }}>
              {[{ label: `${free} Free`, color: "#4ade80" }, { label: `${booked} Occupied`, color: "#ef4444" }].map(({ label, color }) => (
                <div key={label} style={{ background: `${color}18`, border: `1px solid ${color}33`, borderRadius: 999, padding: "4px 12px", fontSize: 11, color, fontWeight: 600 }}>{label}</div>
              ))}
            </div>
            <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#6b7fa3", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
          </div>
        </div>

        {/* Body */}
        <div style={{ padding: "24px 28px", overflowY: "auto", flex: 1 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {Object.entries(SLOT_ROWS).map(([gate, slots]) => (
              <div key={gate} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "18px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div style={{ background: "rgba(0,229,255,0.08)", border: "1px solid rgba(0,229,255,0.2)", borderRadius: 999, padding: "3px 14px", fontSize: 11, color: "#00e5ff", fontFamily: "'Syne',sans-serif", fontWeight: 700, letterSpacing: "0.08em" }}>GATE {gate}</div>
                  <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.05)" }} />
                  <div style={{ fontSize: 11, color: "#6b7fa3" }}>{slots.filter(s => !s.isBooked).length} available</div>
                </div>

                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {slots.map((slot) => {
                    const s = SLOT_STYLE[slot.type];
                    const isHovered = hoveredSlot === slot.id;
                    return (
                      <div
                        key={slot.id}
                        onClick={() => !slot.isBooked && onSlotSelect({ ...slot, gate })}
                        onMouseEnter={() => !slot.isBooked && setHoveredSlot(slot.id)}
                        onMouseLeave={() => setHoveredSlot(null)}
                        style={{
                          width: 90, cursor: slot.isBooked ? "not-allowed" : "pointer",
                          background: slot.isBooked ? "rgba(239,68,68,0.07)" : isHovered ? s.bg : "rgba(255,255,255,0.03)",
                          border: `1px solid ${slot.isBooked ? "rgba(239,68,68,0.25)" : isHovered ? s.border : "rgba(255,255,255,0.08)"}`,
                          borderRadius: 12,
                          padding: "12px 10px",
                          display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                          transition: "all 0.2s",
                          transform: isHovered && !slot.isBooked ? "translateY(-3px)" : "none",
                          boxShadow: isHovered && !slot.isBooked ? `0 8px 24px ${s.color}22` : "none",
                        }}
                      >
                        {/* Car icon */}
                        <div style={{ fontSize: 22 }}>{slot.isBooked ? "🚗" : "🅿️"}</div>
                        <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 12, color: slot.isBooked ? "#ef4444" : s.color }}>P{slot.position}</div>
                        <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: "0.08em", color: slot.isBooked ? "rgba(239,68,68,0.7)" : s.color, background: slot.isBooked ? "rgba(239,68,68,0.1)" : s.bg, border: `1px solid ${slot.isBooked ? "rgba(239,68,68,0.2)" : s.border}`, borderRadius: 4, padding: "1px 5px" }}>{slot.isBooked ? "TAKEN" : s.label}</div>
                        {!slot.isBooked && <div style={{ fontSize: 9, color: "#6b7fa3" }}>{slot.price}</div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div style={{ marginTop: 20, background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "14px 18px" }}>
            <div style={{ fontSize: 10, color: "#6b7fa3", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 10 }}>Legend</div>
            <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
              {[
                { label: "Standard", color: "#00e5ff" },
                { label: "Premium",  color: "#f5a623" },
                { label: "VIP",      color: "#a78bfa" },
                { label: "Occupied", color: "#ef4444" },
              ].map(({ label, color }) => (
                <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ width: 10, height: 10, borderRadius: 3, background: `${color}25`, border: `1px solid ${color}55` }} />
                  <span style={{ fontSize: 11, color: "#a0b0cc" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── STATION CARD ─────────────────────────────────────────────────────────────
function StationCard({ station, index, visible, onClick }) {
  const [hovered, setHovered] = useState(false);
  const occColor = station.occupancy >= 80 ? "#ef4444" : station.occupancy >= 60 ? "#f5a623" : "#4ade80";

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(0,229,255,0.05)" : "rgba(12,21,38,0.88)",
        border: `1px solid ${hovered ? "rgba(0,229,255,0.28)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 18,
        padding: "20px",
        cursor: "pointer",
        transition: "all 0.32s cubic-bezier(0.4,0,0.2,1)",
        transform: visible ? (hovered ? "translateY(-4px)" : "translateY(0)") : "translateY(20px)",
        opacity: visible ? 1 : 0,
        boxShadow: hovered ? "0 12px 40px rgba(0,229,255,0.1)" : "none",
        display: "flex", flexDirection: "column", gap: 14,
      }}
    >
      {/* Top row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ flex: 1, marginRight: 12 }}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 14, color: "#e8f0ff", lineHeight: 1.3, marginBottom: 5 }}>{station.name}</div>
          <Stars rating={station.rating} />
          <div style={{ fontSize: 11, color: "#6b7fa3", marginTop: 4 }}>📍 {station.location}</div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: 16, color: "#4ade80" }}>{station.charge}</div>
          <div style={{ fontSize: 10, color: "#6b7fa3", marginTop: 2 }}>{station.distance} away</div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        {[
          { label: "Available", val: station.availableSlots, icon: "🅿️", color: "#4ade80"  },
          { label: "Occupancy", val: `${station.occupancy}%`, icon: "📊", color: occColor   },
          { label: "Total",     val: station.totalSlots,     icon: "🏢", color: "#00e5ff"  },
        ].map(({ label, val, icon, color }) => (
          <div key={label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
            <div style={{ fontSize: 14, marginBottom: 3 }}>{icon}</div>
            <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13, color }}>{val}</div>
            <div style={{ fontSize: 9, color: "#6b7fa3", marginTop: 1 }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Occupancy bar */}
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
          <span style={{ fontSize: 10, color: "#6b7fa3", textTransform: "uppercase", letterSpacing: "0.08em" }}>Capacity</span>
          <span style={{ fontSize: 10, color: occColor, fontWeight: 600 }}>{station.occupancy}% filled</span>
        </div>
        <OccupancyBar pct={station.occupancy} />
      </div>

      {/* Feature chips */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {station.features.map((f) => (
          <div key={f} style={{ fontSize: 10, color: "#a0b0cc", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 999, padding: "2px 10px" }}>{f}</div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ background: hovered ? "linear-gradient(135deg,#00e5ff,#008fb0)" : "rgba(0,229,255,0.08)", border: `1px solid ${hovered ? "transparent" : "rgba(0,229,255,0.2)"}`, borderRadius: 10, padding: "10px", textAlign: "center", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 12, color: hovered ? "#060b14" : "#00e5ff", transition: "all 0.25s" }}>
        View & Book Slots →
      </div>
    </div>
  );
}

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────
export default function BookSlot() {
  const [destination, setDestination] = useState("");
  const [date,        setDate]        = useState("");
  const [time,        setTime]        = useState("");
  const [results,     setResults]     = useState([]);
  const [visibleCards,setVisibleCards]= useState([]);
  const [loading,     setLoading]     = useState(false);
  const [searched,    setSearched]    = useState(false);

  const [selectedStation, setSelectedStation] = useState(null);
  const [showSlots,       setShowSlots]       = useState(false);
  const [selectedSlot,    setSelectedSlot]    = useState(null);
  const [showBooking,     setShowBooking]     = useState(false);

  const handleSearch = () => {
    if (!destination || !date || !time) return;
    setLoading(true);
    setResults([]);
    setVisibleCards([]);
    setSearched(false);
    setTimeout(() => {
      const data = PARKING_DATA[destination] || [];
      setResults(data);
      setLoading(false);
      setSearched(true);
      data.forEach((_, i) => setTimeout(() => setVisibleCards((p) => [...p, i]), i * 100));
    }, 1200);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setShowSlots(false);
    setShowBooking(true);
  };

  const handleBooked = () => {
    setShowBooking(false);
    setSelectedSlot(null);
    handleSearch(); // refresh
  };

  return (
    <div style={{ minHeight: "100vh", background: "#060b14", color: "#e8f0ff", fontFamily: "'DM Sans',sans-serif", position: "relative", overflowX: "hidden", marginTop:"-80px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(0,229,255,0.2); border-radius: 4px; }

        @keyframes bs-fadeUp  { from{opacity:0;transform:translateY(22px)} to{opacity:1;transform:translateY(0)} }
        @keyframes bs-fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes bs-spin    { to{transform:rotate(360deg)} }
        @keyframes bs-pulse   { 0%,100%{box-shadow:0 0 0 0 rgba(0,229,255,.45)} 50%{box-shadow:0 0 0 8px rgba(0,229,255,0)} }
        @keyframes bs-slideUp { from{opacity:0;transform:translateY(30px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes bs-floatCar { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

        .bs-select { background:rgba(255,255,255,0.04); border:1px solid rgba(0,229,255,0.15); border-radius:12px; padding:13px 16px; color:#e8f0ff; font-family:'DM Sans',sans-serif; font-size:0.88rem; width:100%; outline:none; transition:all 0.25s; cursor:pointer; appearance:none; -webkit-appearance:none; }
        .bs-select:focus { border-color:#00e5ff; box-shadow:0 0 0 3px rgba(0,229,255,0.1); background:rgba(0,229,255,0.04); }
        .bs-select option { background:#0c1526; color:#e8f0ff; }
        .bs-date  { background:rgba(255,255,255,0.04); border:1px solid rgba(0,229,255,0.15); border-radius:12px; padding:13px 16px; color:#e8f0ff; font-family:'DM Sans',sans-serif; font-size:0.88rem; width:100%; outline:none; transition:all 0.25s; color-scheme: dark; }
        .bs-date:focus { border-color:#00e5ff; box-shadow:0 0 0 3px rgba(0,229,255,0.1); background:rgba(0,229,255,0.04); }
      `}</style>

      {/* Ambient grid */}
      <div style={{ position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(0,229,255,0.032) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.032) 1px,transparent 1px)", backgroundSize: "56px 56px", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", top: "8%",   left:  "2%", width: 400, height: 400, background: "radial-gradient(circle,rgba(0,229,255,0.05) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "fixed", bottom: "8%", right: "2%", width: 480, height: 480, background: "radial-gradient(circle,rgba(245,166,35,0.04) 0%,transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      <div style={{ position: "relative", zIndex: 1, display: "flex", minHeight: "100vh" }}>

        {/* ── LEFT SIDEBAR ── */}
        <div style={{ width: 320, flexShrink: 0, position: "sticky", top: 0, height: "100vh", background: "rgba(10,17,30,0.95)", borderRight: "1px solid rgba(0,229,255,0.1)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", padding: "88px 28px 32px", gap: 0, animation: "bs-fadeUp 0.5s ease both", overflowY: "auto" }}>

          {/* Sidebar header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,229,255,0.07)", border: "1px solid rgba(0,229,255,0.22)", borderRadius: 999, padding: "5px 14px", fontSize: 10, letterSpacing: "0.14em", color: "#00e5ff", marginBottom: 16 }}>
              <span style={{ width: 6, height: 6, background: "#00e5ff", borderRadius: "50%", display: "inline-block", animation: "bs-pulse 2s infinite" }} />
              PARKING FINDER · LIVE
            </div>
            <h1 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.6rem", lineHeight: 1.15, marginBottom: 8 }}>
              Book Your <span style={{ color: "#00e5ff" }}>Parking</span> <span style={{ color: "#f5a623" }}>Slot</span>
            </h1>
            <p style={{ fontSize: 12, color: "#6b7fa3", fontStyle: "italic", lineHeight: 1.6 }}>Find available slots near metro stations in real-time</p>
          </div>

          {/* Search form card */}
          <div style={{ background: "rgba(12,21,38,0.9)", border: "1px solid rgba(0,229,255,0.11)", borderRadius: 18, padding: "22px 20px", boxShadow: "0 0 40px rgba(0,229,255,0.06)", display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>

            {/* Station select */}
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <label style={{ fontSize: 10, color: "#6b7fa3", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 500 }}>Metro Station</label>
              <div style={{ position: "relative" }}>
                <select value={destination} onChange={(e) => setDestination(e.target.value)} className="bs-select">
                  <option value="">Select station…</option>
                  <option value="Kashmere Gate">Kashmere Gate</option>
                  <option value="GTB Nagar">GTB Nagar</option>
                  <option value="Saket">Saket</option>
                </select>
                <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "#6b7fa3", pointerEvents: "none", fontSize: 10 }}>▼</span>
              </div>
            </div>

            {/* Date */}
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <label style={{ fontSize: 10, color: "#6b7fa3", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 500 }}>Date</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="bs-date" />
            </div>

            {/* Time */}
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <label style={{ fontSize: 10, color: "#6b7fa3", textTransform: "uppercase", letterSpacing: "0.12em", fontWeight: 500 }}>Arrival Time</label>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="bs-date" />
            </div>

            {/* Search btn */}
            <button
              onClick={handleSearch}
              disabled={!destination || !date || !time || loading}
              style={{ background: (!destination || !date || !time) ? "rgba(0,229,255,0.15)" : "linear-gradient(135deg,#00e5ff,#008fb0)", color: (!destination || !date || !time) ? "#4a6a7a" : "#060b14", border: "none", borderRadius: 12, padding: "13px", fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13, cursor: (!destination || !date || !time) ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.25s", marginTop: 4 }}
              onMouseEnter={(e) => { if (destination && date && time) e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,229,255,0.35)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
            >
              {loading ? (
                <><span style={{ width: 15, height: 15, border: "2px solid #060b14", borderTopColor: "transparent", borderRadius: "50%", display: "inline-block", animation: "bs-spin 0.75s linear infinite" }} />Searching…</>
              ) : <>🔍 Search Parking</>}
            </button>
          </div>

          {/* Floating car illustration */}
          <div style={{ marginTop: "auto", textAlign: "center", paddingTop: 16 }}>
            <div style={{ fontSize: 72, animation: "bs-floatCar 3s ease-in-out infinite", display: "block" }}>🚗</div>
            <div style={{ fontSize: 11, color: "#4a5a73", marginTop: 8, lineHeight: 1.6 }}>Find the best spot<br/>near your station</div>
          </div>
        </div>

        {/* ── RIGHT CONTENT ── */}
        <div style={{ flex: 1, padding: "88px 36px 48px", overflowY: "auto" }}>

          {/* Loading */}
          {loading && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 360, gap: 20, animation: "bs-fadeIn 0.4s ease both" }}>
              <div style={{ position: "relative", width: 72, height: 72 }}>
                <div style={{ position: "absolute", inset: 0, border: "2px solid rgba(0,229,255,0.1)", borderRadius: "50%" }} />
                <div style={{ position: "absolute", inset: 0, border: "2px solid transparent", borderTopColor: "#00e5ff", borderRadius: "50%", animation: "bs-spin 0.8s linear infinite" }} />
                <div style={{ position: "absolute", inset: 10, border: "2px solid transparent", borderTopColor: "#f5a623", borderRadius: "50%", animation: "bs-spin 1.3s linear infinite reverse" }} />
              </div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#00e5ff" }}>Finding parking slots…</div>
              <div style={{ fontSize: 12, color: "#6b7fa3" }}>Checking availability near {destination}</div>
            </div>
          )}

          {/* Empty state */}
          {!searched && !loading && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 400, gap: 16, animation: "bs-fadeIn 0.7s ease both" }}>
              <div style={{ fontSize: 72, opacity: 0.2 }}>🏢</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: "1rem", color: "#4a5a73" }}>Select a metro station to begin</div>
              <div style={{ fontSize: 12, color: "#3a4a63" }}>Try: Kashmere Gate · GTB Nagar · Saket</div>
            </div>
          )}

          {/* Results */}
          {searched && !loading && (
            <div style={{ animation: "bs-fadeUp 0.5s ease both" }}>
              {/* Results header */}
              <div style={{ marginBottom: 28 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,229,255,0.07)", border: "1px solid rgba(0,229,255,0.2)", borderRadius: 999, padding: "4px 14px", fontSize: 10, letterSpacing: "0.12em", color: "#00e5ff" }}>
                    <span style={{ width: 6, height: 6, background: "#00e5ff", borderRadius: "50%", animation: "bs-pulse 2s infinite", display: "inline-block" }} />
                    LIVE RESULTS
                  </div>
                </div>
                <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "1.8rem", lineHeight: 1.1 }}>
                  Parking near <span style={{ color: "#00e5ff" }}>{destination}</span>
                </h2>
                <p style={{ color: "#6b7fa3", fontSize: 13, marginTop: 6, fontStyle: "italic" }}>
                  {results.length} stations found · {date} · {time}
                </p>
              </div>

              {/* Cards grid */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 18 }}>
                {results.map((station, i) => (
                  <StationCard
                    key={station.id}
                    station={station}
                    index={i}
                    visible={visibleCards.includes(i)}
                    onClick={() => { setSelectedStation(station); setShowSlots(true); }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── MODALS ── */}
      {showSlots && selectedStation && (
        <SlotsModal
          station={selectedStation}
          onClose={() => setShowSlots(false)}
          onSlotSelect={handleSlotSelect}
        />
      )}

      {showBooking && selectedSlot && selectedStation && (
        <BookingModal
          slot={selectedSlot}
          station={selectedStation}
          onClose={() => setShowBooking(false)}
          onBooked={handleBooked}
        />
      )}
    </div>
  );
}