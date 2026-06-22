import React, { useState } from "react";
import { X, Calendar, Clock } from "lucide-react";

const TIME_SLOTS = [
  "06:00 AM", "08:00 AM", "10:00 AM", "12:00 PM",
  "02:00 PM", "04:00 PM", "06:00 PM", "08:00 PM", "10:00 PM",
];

/**
 * DateTimeModal
 * Step 1 of booking: user picks date, start time, end time.
 * Props:
 *   parkingName  - string
 *   onNext({ bookingDate, startTime, endTime }) - proceed to seat map
 *   onClose
 */
const DateTimeModal = ({ parkingName, onNext, onClose }) => {
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");

  const todayStr = new Date().toISOString().split("T")[0];

  const handleNext = () => {
    if (!bookingDate) return setError("Please select a date.");
    if (!startTime) return setError("Please select a start time.");
    if (!endTime) return setError("Please select an end time.");
    if (startTime === endTime) return setError("Start and end time cannot be the same.");
    setError("");
    onNext({ bookingDate, startTime, endTime });
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/45 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-sm bg-surface border border-primary/10 rounded-2xl shadow-[0_15px_40px_rgba(217,93,3,0.15)] overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-primary/10">
          <div>
            <h3 className="text-sm font-bold text-text-primary">Pick Date & Time</h3>
            <p className="text-[11px] text-text-muted mt-0.5 truncate max-w-[200px]">{parkingName}</p>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-primary/10 transition-colors"
          >
            <X size={15} className="text-text-secondary" />
          </button>
        </div>

        <div className="px-5 py-4 flex flex-col gap-4">
          {/* Date */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary mb-1.5">
              <Calendar size={12} className="text-primary" /> Booking Date
            </label>
            <input
              type="date"
              value={bookingDate}
              min={todayStr}
              onChange={(e) => setBookingDate(e.target.value)}
              className="
                w-full px-3 py-2.5 rounded-xl bg-bg border border-primary/10 text-text-primary text-sm
                focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                transition-all duration-300
              "
            />
          </div>

          {/* Start Time */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary mb-1.5">
              <Clock size={12} className="text-primary" /> Start Time
            </label>
            <div className="flex flex-wrap gap-1.5">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={`s-${slot}`}
                  type="button"
                  onClick={() => setStartTime(slot)}
                  className={`
                    px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200
                    ${startTime === slot
                      ? "bg-primary text-white border-primary"
                      : "bg-bg text-text-secondary border-primary/10 hover:border-primary hover:text-primary"
                    }
                  `}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* End Time */}
          <div>
            <label className="flex items-center gap-1.5 text-xs font-semibold text-text-secondary mb-1.5">
              <Clock size={12} className="text-primary" /> End Time
            </label>
            <div className="flex flex-wrap gap-1.5">
              {TIME_SLOTS.map((slot) => (
                <button
                  key={`e-${slot}`}
                  type="button"
                  onClick={() => setEndTime(slot)}
                  className={`
                    px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200
                    ${endTime === slot
                      ? "bg-primary text-white border-primary"
                      : "bg-bg text-text-secondary border-primary/10 hover:border-primary hover:text-primary"
                    }
                  `}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2 text-center">
              {error}
            </p>
          )}

          <button
            onClick={handleNext}
            className="
              w-full py-2.5 rounded-full text-sm font-semibold
              bg-primary hover:bg-primary-hover text-white
              transition-all duration-300
              hover:shadow-[0_8px_20px_rgba(217,93,3,0.25)] hover:scale-[1.02]
            "
          >
            View Available Slots →
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateTimeModal;