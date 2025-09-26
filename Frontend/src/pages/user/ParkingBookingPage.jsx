import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Car, Users, DollarSign, Navigation, X, Check, Star, Info, Search, Phone, CreditCard, FileText, Loader2 } from 'lucide-react';

// Booking Modal Component
const BookingModal = ({ slot, station, onClose, onBooked }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [licenseNo, setLicenseNo] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [loading, setLoading] = useState(false);

  const generateReceipt = (bookingData) => {
    // In a real app, you'd use jsPDF here
    console.log("Receipt generated:", bookingData);
    alert("Receipt downloaded successfully!");
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const bookingData = {
        stationName: station.name,
        slotDetails: slot,
        name,
        phone,
        licenseNo,
        vehicleNo,
        bookedAt: new Date().toLocaleString(),
      };
      
      generateReceipt(bookingData);
      onBooked();
      onClose();
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
  <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm transform transition-all scale-100 animate-slideUp overflow-hidden">
    {/* Header */}
    <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
      <h2 className="text-lg font-bold text-gray-800">Book Slot</h2>
      <button
        onClick={onClose}
        className="p-2 hover:bg-gray-100 rounded-md transition-colors"
      >
        <X className="w-4 h-4 text-gray-500" />
      </button>
    </div>
    <p className="px-4 py-2 text-xs text-gray-500 border-b border-gray-100">
      {station.name} • {slot.type}
    </p>

    {/* Form */}
    <form
      onSubmit={handleBooking}
      className="p-4 space-y-3 max-h-[70vh] overflow-y-auto"
    >
      {/* Driver Name */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          Driver Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          placeholder="Enter your name"
        />
      </div>

      {/* Phone Number */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          Phone Number
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          placeholder="Enter phone number"
        />
      </div>

      {/* License Number */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          License Number
        </label>
        <input
          type="text"
          value={licenseNo}
          onChange={(e) => setLicenseNo(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          placeholder="Enter license number"
        />
      </div>

      {/* Vehicle Number */}
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          Vehicle Number
        </label>
        <input
          type="text"
          value={vehicleNo}
          onChange={(e) => setVehicleNo(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
          placeholder="Enter vehicle number"
        />
      </div>

      {/* Slot Info */}
      <div className="bg-blue-50 rounded-lg p-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Slot Type:</span>
          <span className="font-medium text-gray-800">{slot.type}</span>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-gray-600">Price:</span>
          <span className="font-medium text-gray-800">{slot.price}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-gray-200 transition-colors font-medium"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Booking...
            </>
          ) : (
            "Confirm"
          )}
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

// Station Slots Modal Component
const StationSlotsModal = ({ station, onClose, onSlotSelect }) => {
  const [slots] = useState({
    rows: {
      A: [
        { id: 1, position: 1, isBooked: false, type: "Standard", price: "$3/hr" },
        { id: 2, position: 2, isBooked: true, bookedBy: { name: "John", vehicleNo: "DL01AB1234" }, type: "Standard", price: "$3/hr" },
        { id: 3, position: 3, isBooked: false, type: "Standard", price: "$3/hr" },
        { id: 4, position: 4, isBooked: false, type: "Premium", price: "$5/hr" },
        { id: 5, position: 5, isBooked: true, bookedBy: { name: "Sarah", vehicleNo: "DL02CD5678" }, type: "Premium", price: "$5/hr" },
      ],
      B: [
        { id: 6, position: 1, isBooked: false, type: "Standard", price: "$3/hr" },
        { id: 7, position: 2, isBooked: false, type: "Standard", price: "$3/hr" },
        { id: 8, position: 3, isBooked: true, bookedBy: { name: "Mike", vehicleNo: "DL03EF9012" }, type: "Premium", price: "$5/hr" },
        { id: 9, position: 4, isBooked: false, type: "Premium", price: "$5/hr" },
        { id: 10, position: 5, isBooked: false, type: "VIP", price: "$8/hr" },
      ],
      C: [
        { id: 11, position: 1, isBooked: false, type: "Standard", price: "$3/hr" },
        { id: 12, position: 2, isBooked: true, bookedBy: { name: "Emma", vehicleNo: "DL04GH3456" }, type: "Standard", price: "$3/hr" },
        { id: 13, position: 3, isBooked: false, type: "Premium", price: "$5/hr" },
        { id: 14, position: 4, isBooked: false, type: "VIP", price: "$8/hr" },
        { id: 15, position: 5, isBooked: false, type: "VIP", price: "$8/hr" },
      ],
    }
  });

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-40 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">{station.name} - Parking Slots</h2>
              <p className="text-sm text-gray-600 mt-1">{station.location}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-8">
            {Object.keys(slots.rows).map((row) => (
              <div key={row} className="bg-gray-50 rounded-xl p-4">
                <div className="mb-4 flex items-center gap-2">
                  <span className="text-sm font-bold text-gray-700 bg-blue-100 px-3 py-1 rounded-full">
                    Gate {row}
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                  {slots.rows[row].map((slot) => (
                    <div key={slot.id} className="flex flex-col items-center">
                      <button
                        onClick={() => !slot.isBooked && onSlotSelect(slot)}
                        disabled={slot.isBooked}
                        className={`relative p-4 rounded-lg transition-all transform hover:scale-105 ${
                          slot.isBooked
                            ? "bg-red-100 cursor-not-allowed"
                            : slot.type === "VIP"
                            ? "bg-gradient-to-br from-yellow-100 to-yellow-200 hover:from-yellow-200 hover:to-yellow-300 shadow-md"
                            : slot.type === "Premium"
                            ? "bg-gradient-to-br from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 shadow-md"
                            : "bg-white hover:bg-gray-100 shadow-md"
                        }`}
                      >
                        <Car
                          className={`text-3xl ${
                            slot.isBooked
                              ? "text-red-400"
                              : slot.type === "VIP"
                              ? "text-yellow-600"
                              : slot.type === "Premium"
                              ? "text-blue-600"
                              : "text-gray-400"
                          }`}
                        />
                        <span className="text-xs font-semibold mt-1 block">
                          P{slot.position}
                        </span>
                        {slot.type === "VIP" && (
                          <Star className="absolute top-1 right-1 w-3 h-3 text-yellow-500 fill-yellow-500" />
                        )}
                      </button>
                      <div className="text-xs mt-2 text-center">
                        {slot.isBooked ? (
                          <span className="text-red-600 font-medium">Occupied</span>
                        ) : (
                          <div>
                            <span className="text-green-600 font-medium">Available</span>
                            <span className="block text-gray-500">{slot.price}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Legend</h3>
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-white rounded shadow-sm"></div>
                <span className="text-gray-600">Standard</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-br from-blue-100 to-blue-200 rounded"></div>
                <span className="text-gray-600">Premium</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded"></div>
                <span className="text-gray-600">VIP</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-100 rounded"></div>
                <span className="text-gray-600">Occupied</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Parking Dashboard Component
const ParkingDashboard = () => {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null);
  const [showSlotsModal, setShowSlotsModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [animatedCards, setAnimatedCards] = useState([]);

  // Destinations with their parking stations
  const parkingData = {
    "Kashmere Gate": [
      {
        id: 1,
        name: "Kashmere Gate Parking Plaza",
        location: "Near Metro Gate 3",
        nearbyPlaces: ["Metro Station", "ISBT", "Red Fort"],
        distance: "0.2 km",
        occupancy: 65,
        charge: "$3/hour",
        rating: 4.5,
        totalSlots: 200,
        availableSlots: 70,
        features: ["24/7 Security", "Covered Parking", "CCTV"]
      },
      {
        id: 2,
        name: "ISBT Multi-Level Parking",
        location: "ISBT Complex",
        nearbyPlaces: ["Bus Terminal", "Food Court", "ATM"],
        distance: "0.5 km",
        occupancy: 45,
        charge: "$2.5/hour",
        rating: 4.2,
        totalSlots: 300,
        availableSlots: 165,
        features: ["Valet Service", "EV Charging", "Washroom"]
      },
      {
        id: 3,
        name: "Old Delhi Parking Hub",
        location: "Mori Gate Road",
        nearbyPlaces: ["Market", "Hospital", "Police Station"],
        distance: "0.8 km",
        occupancy: 80,
        charge: "$2/hour",
        rating: 3.8,
        totalSlots: 150,
        availableSlots: 30,
        features: ["Budget Friendly", "Open Parking", "Security Guard"]
      },
      {
        id: 4,
        name: "Metro Connect Parking",
        location: "Gate 1, Kashmere Gate",
        nearbyPlaces: ["Metro Station", "Shopping Complex", "Bank"],
        distance: "0.1 km",
        occupancy: 55,
        charge: "$4/hour",
        rating: 4.6,
        totalSlots: 180,
        availableSlots: 81,
        features: ["Premium Location", "Mobile Payment", "Reserved Spots"]
      },
      {
        id: 5,
        name: "City Center Parking",
        location: "Kashmere Gate Main Road",
        nearbyPlaces: ["Restaurant", "Cinema", "Mall"],
        distance: "1.0 km",
        occupancy: 70,
        charge: "$3.5/hour",
        rating: 4.3,
        totalSlots: 250,
        availableSlots: 75,
        features: ["Wide Space", "24/7 Access", "Car Wash"]
      }
    ],
    "GTB Nagar": [
      {
        id: 6,
        name: "GTB Metro Parking",
        location: "Metro Station Complex",
        nearbyPlaces: ["Metro Station", "University", "Market"],
        distance: "0.1 km",
        occupancy: 60,
        charge: "$2.5/hour",
        rating: 4.4,
        totalSlots: 150,
        availableSlots: 60,
        features: ["Student Discount", "Covered Parking", "CCTV"]
      },
      {
        id: 7,
        name: "University Parking Zone",
        location: "Near North Campus",
        nearbyPlaces: ["Delhi University", "Library", "Cafeteria"],
        distance: "0.3 km",
        occupancy: 75,
        charge: "$2/hour",
        rating: 4.0,
        totalSlots: 200,
        availableSlots: 50,
        features: ["Student Rates", "Bike Parking", "Security"]
      },
      {
        id: 8,
        name: "GTB Market Parking",
        location: "Main Market Road",
        nearbyPlaces: ["Shopping Area", "Food Street", "Banks"],
        distance: "0.5 km",
        occupancy: 85,
        charge: "$3/hour",
        rating: 3.9,
        totalSlots: 100,
        availableSlots: 15,
        features: ["Central Location", "Short Term", "Easy Access"]
      },
      {
        id: 9,
        name: "North Campus Parking Hub",
        location: "University Road",
        nearbyPlaces: ["Colleges", "Book Stores", "Coaching Centers"],
        distance: "0.7 km",
        occupancy: 50,
        charge: "$1.5/hour",
        rating: 4.2,
        totalSlots: 250,
        availableSlots: 125,
        features: ["Affordable", "Large Space", "24/7"]
      },
      {
        id: 10,
        name: "GTB Express Parking",
        location: "Ring Road Junction",
        nearbyPlaces: ["Highway Access", "Petrol Pump", "Restaurant"],
        distance: "1.2 km",
        occupancy: 40,
        charge: "$3.5/hour",
        rating: 4.5,
        totalSlots: 180,
        availableSlots: 108,
        features: ["Quick Access", "EV Charging", "Rest Area"]
      }
    ],
    "Saket": [
      {
        id: 11,
        name: "Select City Walk Parking",
        location: "Select City Mall",
        nearbyPlaces: ["Shopping Mall", "Cinema", "Food Court"],
        distance: "0.1 km",
        occupancy: 90,
        charge: "$5/hour",
        rating: 4.7,
        totalSlots: 500,
        availableSlots: 50,
        features: ["Valet Service", "Premium", "Mall Direct Access"]
      },
      {
        id: 12,
        name: "Saket Metro Parking",
        location: "Metro Station Gate 2",
        nearbyPlaces: ["Metro Station", "DLF Mall", "Hospital"],
        distance: "0.2 km",
        occupancy: 70,
        charge: "$4/hour",
        rating: 4.5,
        totalSlots: 200,
        availableSlots: 60,
        features: ["Metro Connected", "Covered", "Security"]
      },
      {
        id: 13,
        name: "DLF Place Parking",
        location: "DLF Place Mall",
        nearbyPlaces: ["Mall", "Restaurants", "Office Complex"],
        distance: "0.5 km",
        occupancy: 65,
        charge: "$4.5/hour",
        rating: 4.6,
        totalSlots: 300,
        availableSlots: 105,
        features: ["Mall Parking", "Food Court Access", "Premium"]
      },
      {
        id: 14,
        name: "Saket District Centre Parking",
        location: "District Centre Complex",
        nearbyPlaces: ["Courts", "Banks", "Government Offices"],
        distance: "0.8 km",
        occupancy: 55,
        charge: "$3/hour",
        rating: 4.1,
        totalSlots: 250,
        availableSlots: 113,
        features: ["Government Rates", "Large Space", "Easy Exit"]
      },
      {
        id: 15,
        name: "MGF Metropolitan Parking",
        location: "MGF Mall",
        nearbyPlaces: ["Mall", "Multiplex", "Gym"],
        distance: "1.0 km",
        occupancy: 75,
        charge: "$4/hour",
        rating: 4.3,
        totalSlots: 350,
        availableSlots: 88,
        features: ["Mall Direct", "Entertainment Zone", "Secure"]
      }
    ]
  };

  const handleSearch = () => {
    if (!destination || !date || !time) {
      alert("Please fill all fields");
      return;
    }

    const results = parkingData[destination] || [];
    setSearchResults(results);
    
    // Animate cards
    setAnimatedCards([]);
    results.forEach((_, index) => {
      setTimeout(() => {
        setAnimatedCards(prev => [...prev, index]);
      }, index * 100);
    });
  };

  const openStationSlots = (station) => {
    setSelectedStation(station);
    setShowSlotsModal(true);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setShowSlotsModal(false);
    setShowBookingModal(true);
  };

  const handleBookingComplete = () => {
    setShowBookingModal(false);
    setSelectedSlot(null);
    alert("Booking confirmed! Receipt has been downloaded.");
    // Refresh the search results
    handleSearch();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="flex flex-col lg:flex-row">
        {/* Left Sidebar */}
        <div className="lg:w-[30%] w-full lg:min-h-screen lg:sticky lg:top-0 bg-white shadow-xl p-6 lg:p-8">
          <div className="space-y-6">
            
          

            {/* Search Form */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Search className="w-5 h-5 text-blue-600" />
                Find Parking Near Metro
              </h2>
              
              <div className="space-y-4">
                {/* Destination Select */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    Metro Station
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  >
                    <option value="">Select Station</option>
                    <option value="Kashmere Gate">Kashmere Gate</option>
                    <option value="GTB Nagar">GTB Nagar</option>
                    <option value="Saket">Saket</option>
                  </select>
                </div>

                {/* Date Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>

                {/* Time Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-600" />
                    Time
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all shadow-lg hover:shadow-xl"
                >
                  Search Parking
                </button>
              </div>
            </div>
              {/* Image/Illustration */}
            <div className="hidden lg:block">
              <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8">
                <Car className="w-full h-32 text-blue-600 mb-4" />
                <p className="text-center text-gray-600 text-sm">Find the best parking spot near your metro station</p>
              </div>
            </div>

          
          </div>
        </div>

        {/* Right Content */}
        <div className="lg:w-[70%] w-full p-6 lg:p-8">
          {searchResults.length > 0 ? (
            <>
              <div className="mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                  Parking Near {destination} Metro
                </h2>
                <p className="text-gray-600">Found {searchResults.length} parking stations</p>
              </div>

              {/* Station Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {searchResults.map((station, index) => (
    <div
      key={station.id}
      onClick={() => openStationSlots(station)}
      className={`bg-white rounded-xl shadow-md hover:shadow-xl p-4 cursor-pointer transform transition-all duration-500 hover:scale-[1.02] border border-gray-100
        ${animatedCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
      `}
      style={{
        transitionDelay: `${index * 50}ms`,
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{station.name}</h3>
          <div className="flex items-center gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(station.rating)
                    ? 'text-yellow-500 fill-yellow-500'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-xs text-gray-500 ml-1">({station.rating})</span>
          </div>
          <p className="text-gray-500 text-xs flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {station.location}
          </p>
        </div>
        <div className="text-right">
          <span className="text-base font-bold text-green-600">{station.charge}</span>
          <p className="text-xs text-gray-500">{station.distance} away</p>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center bg-gray-50 rounded-lg p-2">
          <Car className="w-4 h-4 text-blue-600 mx-auto mb-1" />
          <p className="text-sm font-bold text-gray-800">{station.availableSlots}</p>
          <p className="text-xs text-gray-500">Available</p>
        </div>
        <div className="text-center bg-gray-50 rounded-lg p-2">
          <Users className="w-4 h-4 text-orange-600 mx-auto mb-1" />
          <p className="text-sm font-bold text-gray-800">{station.occupancy}%</p>
          <p className="text-xs text-gray-500">Occupancy</p>
        </div>
        <div className="text-center bg-gray-50 rounded-lg p-2">
          <Navigation className="w-4 h-4 text-green-600 mx-auto mb-1" />
          <p className="text-sm font-bold text-gray-800">{station.totalSlots}</p>
          <p className="text-xs text-gray-500">Total</p>
        </div>
      </div>

     

      {/* Action Button */}
      <button className="w-full text-sm py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all">
        View Slots
      </button>
    </div>
  ))}
</div>

            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full min-h-[400px]">
              <Car className="w-24 h-24 text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No Search Results</h3>
              <p className="text-gray-500 text-center">
                Please select a metro station, date, and time to find available parking spots.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showSlotsModal && selectedStation && (
        <StationSlotsModal 
          station={selectedStation}
          onClose={() => setShowSlotsModal(false)}
          onSlotSelect={handleSlotSelect}
        />
      )}

      {showBookingModal && selectedSlot && selectedStation && (
        <BookingModal 
          slot={selectedSlot}
          station={selectedStation}
          onClose={() => setShowBookingModal(false)}
          onBooked={handleBookingComplete}
        />
      )}
    </div>
  );
};

export default ParkingDashboard;
