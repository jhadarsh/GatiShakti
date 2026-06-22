import React from "react";
import { MapPin, IndianRupee, Car } from "lucide-react";

const ParkingCard = ({ parking, onClick }) => {
  const { name, location, landmark, slotPrice, availableSlots, totalSlots, images } = parking;
  const imageUrl = Array.isArray(images) ? images[0] : images;
  const isFull = availableSlots <= 0;
  const fillPct = totalSlots ? Math.round((availableSlots / totalSlots) * 100) : 0;

  return (
    <div
      onClick={onClick}
      className="
        bg-surface border border-primary/10 rounded-2xl overflow-hidden
        cursor-pointer transition-all duration-300
        hover:shadow-[0_12px_30px_rgba(217,93,3,0.13)]
        hover:-translate-y-0.5
      "
    >
      {/* Image */}
      <div className="w-full h-32 bg-bg overflow-hidden relative">
        {imageUrl ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Car size={32} className="text-primary/20" />
          </div>
        )}
        {/* Availability pill */}
        <span
          className={`
            absolute top-2 right-2 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border
            ${isFull
              ? "bg-red-50 text-red-600 border-red-200"
              : "bg-green-50 text-green-700 border-green-200"
            }
          `}
        >
          {isFull ? "Full" : `${availableSlots} free`}
        </span>
      </div>

      {/* Content */}
      <div className="p-3">
        <h3 className="text-sm font-bold text-text-primary mb-0.5 truncate">{name}</h3>

        <div className="flex items-center gap-1 text-text-secondary text-xs mb-2">
          <MapPin size={11} className="text-primary flex-shrink-0" />
          <span className="truncate">{location}{landmark ? ` · ${landmark}` : ""}</span>
        </div>

        {/* Slot fill bar */}
        <div className="w-full h-1.5 bg-bg rounded-full mb-2 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${isFull ? "bg-red-400" : "bg-primary"}`}
            style={{ width: `${100 - fillPct}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-0.5 text-text-primary font-semibold text-sm">
            <IndianRupee size={13} className="text-primary" />
            {slotPrice}
            <span className="text-[11px] text-text-muted font-normal">/hr</span>
          </div>
          <span className="text-[11px] text-text-muted">{totalSlots} total</span>
        </div>
      </div>
    </div>
  );
};

export default ParkingCard;