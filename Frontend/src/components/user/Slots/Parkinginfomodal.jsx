import React from "react";
import { X, MapPin, IndianRupee, Car } from "lucide-react";

/**
 * ParkingInfoModal
 * Shows parking details after clicking a card.
 * "Book This Slot" → triggers onBook, which opens DateTimeModal from parent.
 */
const ParkingInfoModal = ({ parking, isAuthenticated, onBook, onClose }) => {
  const { name, description, location, landmark, slotPrice, availableSlots, totalSlots, images } = parking;
  const imageUrl = Array.isArray(images) ? images[0] : images;
  const isFull = availableSlots <= 0;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md bg-surface border border-primary/10 rounded-2xl shadow-[0_15px_40px_rgba(217,93,3,0.15)] overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Image */}
        <div className="relative w-full h-40 bg-bg">
          {imageUrl ? (
            <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Car size={40} className="text-primary/20" />
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface/90 backdrop-blur flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300"
          >
            <X size={15} className="text-text-secondary" />
          </button>
        </div>

        <div className="px-5 py-5 flex flex-col gap-3">
          {/* Title + availability */}
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-base font-bold text-text-primary leading-tight">{name}</h2>
            <span
              className={`
                text-[11px] font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap flex-shrink-0
                ${isFull ? "bg-red-50 text-red-600 border-red-200" : "bg-green-50 text-green-700 border-green-200"}
              `}
            >
              {isFull ? "Full" : `${availableSlots}/${totalSlots} free`}
            </span>
          </div>

          <div className="flex items-start gap-1.5 text-xs text-text-secondary">
            <MapPin size={13} className="text-primary flex-shrink-0 mt-0.5" />
            <span>{location}{landmark ? ` · Near ${landmark}` : ""}</span>
          </div>

          {description && (
            <p className="text-xs text-text-secondary leading-relaxed">{description}</p>
          )}

          {/* Price */}
          <div className="flex items-center gap-1 font-bold text-text-primary">
            <IndianRupee size={15} className="text-primary" />
            <span className="text-lg">{slotPrice}</span>
            <span className="text-xs text-text-muted font-normal">/ hour</span>
          </div>

          {/* CTA */}
          <button
            onClick={() => {
              if (!isAuthenticated) return;
              if (!isFull) onBook();
            }}
            disabled={isFull || !isAuthenticated}
            title={!isAuthenticated ? "Please login to book" : isFull ? "Parking is full" : ""}
            className="
              w-full py-2.5 rounded-full text-sm font-semibold
              bg-primary hover:bg-primary-hover text-white
              transition-all duration-300
              hover:shadow-[0_8px_20px_rgba(217,93,3,0.25)] hover:scale-[1.02]
              disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
            "
          >
            {!isAuthenticated ? "Login to Book" : isFull ? "Slots Full" : "Book This Slot →"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParkingInfoModal;