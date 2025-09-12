import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Car,
  ParkingCircle,
  MapPin,
  X,
  Train,
  Activity,
  Clock,
} from "lucide-react";

const MetroStationDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGate, setSelectedGate] = useState(null);

  // Sample data - you can replace with your actual data
  const metroStations = [
    {
      id: 1,
      name: "Kashmiri Gate",
      gates: [
        {
          id: "KG-1",
          name: "Gate 1",
          vehicles: 1,
          vacantSpaces: 12,
          image:
            "/traffic/p1.png",
        },
        {
          id: "KG-2",
          name: "Gate 2",
          vehicles: 6,
          vacantSpaces: 12,
          image:
            "/traffic/p2.png",
        },
        {
          id: "KG-3",
          name: "Gate 3",
          vehicles: 4,
          vacantSpaces: 12,
          image:
            "/traffic/p3.png",
        },
        {
          id: "KG-4",
          name: "Gate 4",
          vehicles: 7,
          vacantSpaces: 12,
          image:
            "/traffic/p4.png",
        },
        {
          id: "KG-5",
          name: "Gate 5",
          vehicles: 41,
          vacantSpaces: 19,
          image:
            "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop",
        },
        {
          id: "KG-6",
          name: "Gate 6",
          vehicles: 35,
          vacantSpaces: 25,
          image:
            "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
        },
        {
          id: "KG-7",
          name: "Gate 7",
          vehicles: 47,
          vacantSpaces: 13,
          image:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        },
        {
          id: "KG-8",
          name: "Gate 8",
          vehicles: 33,
          vacantSpaces: 27,
          image:
            "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop",
        },
      ],
    },
   
  ];

  // Filter stations based on search query - this filters properly
  const filteredStations = useMemo(() => {
    if (!searchQuery.trim()) return metroStations;
    return metroStations.filter((station) =>
      station.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
    );
  }, [searchQuery]);

  const handleGateClick = (gate, stationName) => {
    setSelectedGate({ ...gate, stationName });
  };

  const closeModal = () => {
    setSelectedGate(null);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-10 -right-10 w-32 h-32 bg-white bg-opacity-10 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-8 -left-8 w-24 h-24 bg-white bg-opacity-10 rounded-full"
            />

            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex items-center mb-4"
              >
                <Train className="w-10 h-10 mr-4 text-white" />
                <h1 className="text-4xl font-bold text-white">
                  Metro Station Dashboard
                </h1>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-xl text-white opacity-90 mb-6"
              >
                Real-time parking monitoring across Delhi Metro stations
              </motion.p>

              {/* Stats Cards in Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4"
              >
                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center">
                    <Activity className="w-6 h-6 mr-3 text-black" />
                    <div>
                      <div className="text-2xl font-bold text-black">
                        {metroStations.reduce(
                          (acc, station) => acc + station.gates.length,
                          0
                        )}
                      </div>
                      <div className="text-sm text-black opacity-90">
                        Total Gates
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center">
                    <Car className="w-6 h-6 mr-3 text-black" />
                    <div>
                      <div className="text-2xl font-bold text-black">
                        {metroStations.reduce(
                          (acc, station) =>
                            acc +
                            station.gates.reduce(
                              (gateAcc, gate) => gateAcc + gate.vehicles,
                              0
                            ),
                          0
                        )}
                      </div>
                      <div className="text-sm text-black opacity-90">
                        Parked Vehicles
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4">
                  <div className="flex items-center">
                    <ParkingCircle className="w-6 h-6 mr-3 text-black" />
                    <div>
                      <div className="text-2xl font-bold text-black">
                        {metroStations.reduce(
                          (acc, station) =>
                            acc +
                            station.gates.reduce(
                              (gateAcc, gate) => gateAcc + gate.vacantSpaces,
                              0
                            ),
                          0
                        )}
                      </div>
                      <div className="text-sm text-black opacity-90">
                        Available Spaces
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="relative max-w-md"
          >
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              placeholder="Search metro stations (e.g., Rajiv Chowk, Kashmiri Gate)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:shadow-xl transition-all duration-300 bg-white text-gray-800"
            />
          </motion.div>

          {/* Search Results Info */}
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-sm text-gray-600"
            >
              {filteredStations.length > 0 ? (
                <span>
                  Found {filteredStations.length} station
                  {filteredStations.length !== 1 ? "s" : ""} matching "
                  {searchQuery}"
                </span>
              ) : (
                <span>No stations found matching "{searchQuery}"</span>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Stations Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          <AnimatePresence mode="wait">
            {filteredStations.map((station, stationIndex) => (
              <motion.div
                key={station.id}
                variants={itemVariants}
                layout
                className="bg-gray-50 rounded-3xl shadow-xl p-8 border border-gray-200 hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
              >
                {/* Station Header */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: stationIndex * 0.1 }}
                  className="flex items-center mb-8"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-1">
                      {station.name}
                    </h2>
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        delay: stationIndex * 0.1 + 0.2,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full text-sm font-semibold shadow-sm"
                    >
                      <Clock className="w-4 h-4 mr-2" />
                      {station.gates.length} Gates Available
                    </motion.span>
                  </div>
                </motion.div>

                {/* Gates Grid */}
                <motion.div
                  variants={containerVariants}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                  {station.gates.map((gate, gateIndex) => {
                    const occupancyRate =
                      (gate.vehicles / (gate.vehicles + gate.vacantSpaces)) *
                      100;
                    const getOccupancyColor = (rate) => {
                      if (rate >= 80) return "from-red-500 to-orange-500";
                      if (rate >= 60) return "from-yellow-500 to-orange-500";
                      return "from-green-500 to-emerald-500";
                    };

                    return (
                      <motion.div
                        key={gate.id}
                        variants={cardVariants}
                        whileHover={{
                          y: -8,
                          scale: 1.02,
                          boxShadow:
                            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                        }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-white rounded-2xl p-6 shadow-lg cursor-pointer border border-gray-200 relative overflow-hidden"
                      >
                        {/* Animated background gradient */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5"
                          animate={{ opacity: [0.5, 0.8, 0.5] }}
                          transition={{ duration: 3, repeat: Infinity }}
                        />

                        <div className="relative z-10">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-bold text-gray-800">
                              {gate.name}
                            </h3>
                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                              {gate.id}
                            </span>
                          </div>

                          <div className="space-y-3 mb-6">
                            <motion.div
                              whileHover={{ x: 5 }}
                              className="flex items-center text-sm"
                            >
                              <Car className="w-5 h-5 text-blue-600 mr-3" />
                              <span className="text-gray-600">Vehicles: </span>
                              <span className="font-bold text-gray-800 ml-1">
                                {gate.vehicles}
                              </span>
                            </motion.div>
                            <motion.div
                              whileHover={{ x: 5 }}
                              className="flex items-center text-sm"
                            >
                              <ParkingCircle className="w-5 h-5 text-green-600 mr-3" />
                              <span className="text-gray-600">Vacant: </span>
                              <span className="font-bold text-gray-800 ml-1">
                                {gate.vacantSpaces}
                              </span>
                            </motion.div>
                          </div>

                          {/* Occupancy Bar */}
                          <div className="mb-4">
                            <div className="flex justify-between text-xs text-gray-600 mb-1">
                              <span>Occupancy</span>
                              <span>{Math.round(occupancyRate)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <motion.div
                                className={`bg-gradient-to-r ${getOccupancyColor(
                                  occupancyRate
                                )} h-2 rounded-full`}
                                initial={{ width: 0 }}
                                animate={{ width: `${occupancyRate}%` }}
                                transition={{
                                  duration: 1,
                                  delay: stationIndex * 0.1 + gateIndex * 0.05,
                                }}
                              />
                            </div>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleGateClick(gate, station.name)}
                            className="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-200"
                          >
                            View Details
                          </motion.button>
                        </div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        <AnimatePresence>
          {filteredStations.length === 0 && searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-gray-400 mb-6"
              >
                <Search className="w-20 h-20 mx-auto mb-4" />
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-700 mb-3">
                No stations found
              </h3>
              <p className="text-gray-500 text-lg">
                Try searching for "Rajiv Chowk", "Kashmiri Gate", "New Delhi",
                or "Saket"
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSearchQuery("")}
                className="mt-4 px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium"
              >
                Clear Search
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated Modal Popup */}
  <AnimatePresence>
  {selectedGate && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-white bg-opacity-50 backdrop-blur-sm flex items-start justify-center p-4 z-50"
      onClick={closeModal}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl max-w-lg w-full mx-4 shadow-2xl overflow-hidden mt-[80px]"
      >
        {/* Modal Header */}
        <div className="relative p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={closeModal}
            className="absolute right-4 top-4 text-black hover:text-gray-200 transition-colors p-1.5 rounded-full bg-white bg-opacity-20"
          >
            <X className="w-5 h-5" />
          </motion.button>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-bold text-white pr-10"
          >
            {selectedGate.stationName} - {selectedGate.name}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-blue-100 mt-1 text-sm"
          >
            Gate ID: {selectedGate.id}
          </motion.p>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <img
              src={selectedGate.image}
              alt={`${selectedGate.stationName} ${selectedGate.name}`}
              className="w-full h-40 object-cover rounded-xl shadow-md"
            />
          </motion.div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 gap-4 mb-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center shadow"
            >
              <Car className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-800 mb-1">
                {selectedGate.vehicles}
              </div>
              <div className="text-xs text-blue-600 font-medium">
                Vehicles Parked
              </div>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center shadow"
            >
              <ParkingCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-800 mb-1">
                {selectedGate.vacantSpaces}
              </div>
              <div className="text-xs text-green-600 font-medium">
                Available Spaces
              </div>
            </motion.div>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <div className="flex justify-between text-xs text-gray-700 mb-2">
              <span className="font-medium">Occupancy Rate</span>
              <span className="font-bold">
                {Math.round(
                  (selectedGate.vehicles /
                    (selectedGate.vehicles + selectedGate.vacantSpaces)) *
                    100
                )}
                %
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 shadow-inner">
              <motion.div
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full shadow-sm"
                initial={{ width: 0 }}
                animate={{
                  width: `${
                    (selectedGate.vehicles /
                      (selectedGate.vehicles + selectedGate.vacantSpaces)) *
                    100
                  }%`,
                }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </motion.div>

          {/* Action Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={closeModal}
            className="w-full py-3 px-5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold text-base shadow hover:shadow-lg transition-all duration-200"
          >
            Close Details
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      </div>
    </div>
  );
};

export default MetroStationDashboard;
