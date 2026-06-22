import React, { useState } from "react";
import { X, Car } from "lucide-react";

/**
 * SeatMapModal
 * Shows a cinema-style grid of parking slots.
 * Props:
 *   totalSlots     - number
 *   availableSlots - number
 *   onConfirm(slotNumber) - callback with chosen slot number
 *   onClose        - callback
 */
const SeatMapModal = ({ totalSlots, availableSlots, onConfirm, onClose }) => {
  const [selected, setSelected] = useState(null);

  // First N slots are occupied, rest are free (simple heuristic for display)
  const occupied = totalSlots - availableSlots;
  const COLS = Math.min(8, totalSlots);

  const getStatus = (i) => {
    if (i < occupied) return "occupied";
    return "free";
  };

  const rows = Math.ceil(totalSlots / COLS);

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md bg-surface border border-primary/10 rounded-2xl shadow-[0_15px_40px_rgba(217,93,3,0.18)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-primary/10">
          <div>
            <h3 className="text-sm font-bold text-text-primary">Choose a Slot</h3>
            <p className="text-[11px] text-text-muted mt-0.5">{availableSlots} of {totalSlots} available</p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors"
          >
            <X size={15} className="text-text-secondary" />
          </button>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 px-5 pt-3 pb-1">
          {[
            { color: "bg-green-100 border-green-400", label: "Available" },
            { color: "bg-section border-primary/10", label: "Occupied" },
            { color: "bg-primary border-primary", label: "Selected" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className={`w-4 h-4 rounded-sm border ${color}`} />
              <span className="text-[11px] text-text-muted">{label}</span>
            </div>
          ))}
        </div>

        {/* Entry/road indicator */}
        <div className="mx-5 mt-3 mb-2 h-6 rounded-lg bg-bg border border-primary/10 flex items-center justify-center">
          <span className="text-[10px] font-semibold tracking-widest text-text-muted uppercase">Entry / Road</span>
        </div>

        {/* Grid */}
        <div className="px-5 pb-5">
          <div
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: totalSlots }, (_, i) => {
              const status = getStatus(i);
              const slotNum = i + 1;
              const isSelected = selected === slotNum;

              return (
                <button
                  key={slotNum}
                  disabled={status === "occupied"}
                  onClick={() => status === "free" && setSelected(slotNum)}
                  className={`
                    relative aspect-[3/4] rounded-md border text-[10px] font-bold
                    flex flex-col items-center justify-center gap-0.5
                    transition-all duration-200
                    ${status === "occupied"
                      ? "bg-section border-primary/10 text-text-muted cursor-not-allowed"
                      : isSelected
                      ? "bg-primary border-primary text-white shadow-[0_4px_12px_rgba(217,93,3,0.35)] scale-105"
                      : "bg-green-50 border-green-300 text-green-800 hover:bg-green-100 hover:border-green-500 hover:scale-105 cursor-pointer"
                    }
                  `}
                >
                  <Car size={10} className={status === "occupied" ? "text-text-muted/40" : isSelected ? "text-white" : "text-green-600"} />
                  {slotNum}
                </button>
              );
            })}
          </div>
        </div>

        {/* Confirm */}
        <div className="px-5 pb-5">
          <button
            disabled={!selected}
            onClick={() => selected && onConfirm(selected)}
            className="
              w-full py-2.5 rounded-full text-sm font-semibold
              bg-primary hover:bg-primary-hover text-white
              transition-all duration-300
              hover:shadow-[0_8px_20px_rgba(217,93,3,0.25)] hover:scale-[1.02]
              disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100
            "
          >
            {selected ? `Confirm Slot #${selected}` : "Select a slot"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SeatMapModal;