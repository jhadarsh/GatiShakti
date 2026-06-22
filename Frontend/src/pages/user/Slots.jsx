import React, { useState, useEffect, useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import { Search, X, Loader2 } from "lucide-react";

import ParkingCard from "../../components/user/Slots/Parkingcard";
import ParkingInfoModal from "../../components/user/Slots/ParkingInfoModal";
import DateTimeModal from "../../components/user/Slots/DateTimeModal";
import SeatMapModal from "../../components/user/Slots/SeatMapModal";
import VehicleModal from "../../components/user/Slots/VehicleModal";
import MOCK_PARKINGS from "../../Data/Mockparkings.json";


const BACKEND_URL = import.meta.env.VITE_SERVER_BACKEND_URL || "";

export const PARKING_API = `${BACKEND_URL}/api/parking`;

export const BOOKING_API = `${BACKEND_URL}/api/parking-Booking`;

 

// Booking flow steps
// null → "info" → "datetime" → "seatmap" → "vehicle" → done

const Slots = () => {
  const { token, isAuthenticated } = useAuth();

  const [parkings, setParkings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [fetchError, setFetchError] = useState("");
  const [isMock, setIsMock] = useState(false);

  // Modal state
  const [selectedParking, setSelectedParking] = useState(null);
  const [step, setStep] = useState(null); // null | "info" | "datetime" | "seatmap" | "vehicle"

  // Booking form state
  const [bookingDate, setBookingDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [slotNumber, setSlotNumber] = useState(null);

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const fetchParkings = async () => {
    setLoading(true);
    setIsMock(false);
    setFetchError("");
    try {
      const res = await fetch(`${PARKING_API}/all`);
      const data = await res.json();
      if (data.success) {
        setParkings(data.parkings || []);
      } else {
        throw new Error("API returned failure");
      }
    } catch {
      setParkings(MOCK_PARKINGS);
      setIsMock(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchParkings(); }, []);

  const filteredParkings = useMemo(() => {
    if (!searchTerm.trim()) return parkings;
    const term = searchTerm.toLowerCase();
    return parkings.filter(
      (p) =>
        p.name?.toLowerCase().includes(term) ||
        p.location?.toLowerCase().includes(term) ||
        p.landmark?.toLowerCase().includes(term)
    );
  }, [parkings, searchTerm]);

  // Open info modal
  const openParking = (parking) => {
    setSelectedParking(parking);
    setStep("info");
    setBookingError("");
    setBookingSuccess(false);
    setBookingDate(""); setStartTime(""); setEndTime(""); setSlotNumber(null);
  };

  const closeAll = () => {
    setStep(null);
    setSelectedParking(null);
    setBookingError("");
    setBookingSuccess(false);
  };

  // Step transitions
  const handleInfoBook = () => setStep("datetime");

  const handleDateTimeNext = ({ bookingDate: d, startTime: s, endTime: e }) => {
    setBookingDate(d); setStartTime(s); setEndTime(e);
    setStep("seatmap");
  };

  const handleSeatConfirm = (num) => {
    setSlotNumber(num);
    setStep("vehicle");
  };

  const handleVehicleConfirm = async (vehicleNumber) => {
    setBookingError("");
    setSubmitting(true);
    try {
      const res = await fetch(`${BOOKING_API}/book`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          parkingId: selectedParking._id,
          vehicleNumber,
          bookingDate,
          startTime,
          endTime,
          slotNumber,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setBookingSuccess(true);
        setTimeout(() => { closeAll(); fetchParkings(); }, 2000);
      } else {
        setBookingError(data.message || "Could not book. Please try again.");
      }
    } catch {
      setBookingError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-section px-4 sm:px-6 pt-28 pb-14 lg:px-8 relative overflow-hidden">
      {/* Subtle ambient blobs */}
      <div className="pointer-events-none absolute top-16 left-8 w-64 h-64 bg-primary/8 rounded-full blur-3xl animate-pulse" />
      <div className="pointer-events-none absolute bottom-16 right-8 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse" />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-1.5 font-sans">
            Find <span className="text-primary">Parking</span>
          </h1>
          <p className="text-text-secondary text-sm max-w-lg mx-auto">
            Browse spaces near you and book in seconds.
          </p>
        </div>

        {/* Mock data banner */}
        {isMock && (
          <div className="mb-5 flex items-start gap-2.5 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs">
            <span className="text-base leading-none mt-0.5">⚠️</span>
            <div>
              <p className="font-semibold">Server is currently unavailable.</p>
              <p className="text-amber-700 mt-0.5">Displaying sample parking data so you can explore the booking flow.</p>
            </div>
          </div>
        )}

        {fetchError && (
          <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs text-center flex items-center justify-between gap-3">
            <span>{fetchError}</span>
            <button onClick={() => setFetchError("")}><X size={14} /></button>
          </div>
        )}

        {/* Layout: parking grid + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-5">

          {/* Parking grid — 70% */}
          <div className="lg:col-span-7">
            {loading ? (
              <div className="flex justify-center py-20">
                <Loader2 size={28} className="text-primary animate-spin" />
              </div>
            ) : filteredParkings.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-text-secondary text-sm">No parking spaces found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {filteredParkings.map((parking) => (
                  <ParkingCard
                    key={parking._id}
                    parking={parking}
                    onClick={() => openParking(parking)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar — 30% */}
          <div className="lg:col-span-3">
            <div className="bg-surface border border-primary/10 rounded-2xl p-4 sticky top-24">
              <h3 className="text-sm font-bold text-text-primary mb-3">Search</h3>

              <div className="relative mb-4">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Name, location, landmark…"
                  className="
                    w-full pl-9 pr-3 py-2.5 rounded-xl bg-bg border border-primary/10 text-text-primary
                    placeholder:text-text-muted/60 text-sm
                    focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary
                    transition-all duration-300
                  "
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary"
                  >
                    <X size={13} />
                  </button>
                )}
              </div>

              <p className="text-xs text-text-muted">
                <span className="font-semibold text-text-secondary">{filteredParkings.length}</span>{" "}
                space{filteredParkings.length !== 1 ? "s" : ""} found
              </p>
              <p className="text-[11px] text-text-muted/70 mt-1">
                Tap any card to view details and reserve.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Modal flow ── */}

      {step === "info" && selectedParking && (
        <ParkingInfoModal
          parking={selectedParking}
          isAuthenticated={isAuthenticated}
          onBook={handleInfoBook}
          onClose={closeAll}
        />
      )}

      {step === "datetime" && selectedParking && (
        <DateTimeModal
          parkingName={selectedParking.name}
          onNext={handleDateTimeNext}
          onClose={closeAll}
        />
      )}

      {step === "seatmap" && selectedParking && (
        <SeatMapModal
          totalSlots={selectedParking.totalSlots}
          availableSlots={selectedParking.availableSlots}
          onConfirm={handleSeatConfirm}
          onClose={closeAll}
        />
      )}

      {step === "vehicle" && selectedParking && (
        <VehicleModal
          parkingName={selectedParking.name}
          bookingDate={bookingDate}
          startTime={startTime}
          endTime={endTime}
          slotNumber={slotNumber}
          onConfirm={handleVehicleConfirm}
          onClose={closeAll}
          submitting={submitting}
          success={bookingSuccess}
          error={bookingError}
        />
      )}
    </div>
  );
};

export default Slots;