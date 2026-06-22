import React, { useState } from "react";
import { X, Car, Loader2, CheckCircle2 } from "lucide-react";

/**
 * VehicleModal
 * Step 3: user enters vehicle number, confirms booking.
 * Props:
 *   parkingName, bookingDate, startTime, endTime, slotNumber
 *   onConfirm(vehicleNumber) - triggers API call from parent
 *   onClose
 *   submitting, success, error
 */
const VehicleModal = ({
  parkingName, bookingDate, startTime, endTime, slotNumber,
  onConfirm, onClose,
  submitting, success, error: extError,
}) => {
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [localError, setLocalError] = useState("");

  const error = extError || localError;

  const handleSubmit = () => {
    if (!vehicleNumber.trim()) return setLocalError("Please enter your vehicle number.");
    setLocalError("");
    onConfirm(vehicleNumber.toUpperCase());
  };

  if (success) {
    return (
      <div className="fixed inset-0 z-[130] flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
        <div className="relative z-10 w-full max-w-xs bg-surface border border-primary/10 rounded-2xl shadow-[0_15px_40px_rgba(217,93,3,0.18)] p-8 flex flex-col items-center text-center gap-3">
          <CheckCircle2 size={40} className="text-green-500" />
          <h3 className="text-base font-bold text-text-primary">Booking Confirmed!</h3>
          <p className="text-xs text-text-muted">
            Slot #{slotNumber} at <span className="font-semibold text-text-secondary">{parkingName}</span><br />
            {bookingDate} · {startTime} – {endTime}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-sm bg-surface border border-primary/10 rounded-2xl shadow-[0_15px_40px_rgba(217,93,3,0.18)] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-primary/10">
          <div>
            <h3 className="text-sm font-bold text-text-primary">Vehicle Details</h3>
            <p className="text-[11px] text-text-muted mt-0.5">Slot #{slotNumber}</p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors"
          >
            <X size={15} className="text-text-secondary" />
          </button>
        </div>

        <div className="px-5 py-4 flex flex-col gap-4">
          {/* Summary */}
          <div className="bg-bg border border-primary/10 rounded-xl px-4 py-3 text-xs text-text-secondary flex flex-col gap-1">
            <div className="flex justify-between">
              <span className="text-text-muted">Location</span>
              <span className="font-semibold text-text-primary truncate max-w-[160px]">{parkingName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Date</span>
              <span className="font-semibold text-text-primary">{bookingDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Time</span>
              <span className="font-semibold text-text-primary">{startTime} – {endTime}</span>
            </div>
          </div>

          {/* Vehicle input */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary mb-1.5">
              <Car size={12} className="text-primary" /> Vehicle Number
            </label>
            <input
              type="text"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
              placeholder="DL01AB1234"
              maxLength={10}
              className="
                w-full px-4 py-2.5 rounded-xl bg-bg border border-primary/10
                text-text-primary placeholder:text-text-muted/50 text-sm font-semibold tracking-wider uppercase
                focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                transition-all duration-300
              "
            />
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2 text-center">
              {error}
            </p>
          )}

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="
              w-full py-2.5 rounded-full text-sm font-semibold
              bg-primary hover:bg-primary-hover text-white
              flex items-center justify-center gap-2
              transition-all duration-300
              hover:shadow-[0_8px_20px_rgba(217,93,3,0.25)] hover:scale-[1.02]
              disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100
            "
          >
            {submitting && <Loader2 size={15} className="animate-spin" />}
            {submitting ? "Booking..." : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleModal;