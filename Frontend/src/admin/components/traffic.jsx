import React from "react";
import { motion } from 'framer-motion';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Avatar,
  Grid,
  Stack,
  IconButton,
  Paper,
  TextField,
  Divider,
  Tooltip,
  Badge,
  FormHelperText,
  Snackbar,
  Alert,
  Chip
} from "@mui/material";
import { CameraAlt, Close, Add, History } from "@mui/icons-material";
import VideocamIcon from '@mui/icons-material/Videocam';

const initialSignals = [
  {
    id: "S-001",
    name: "Signal 1",
    top: "8%",
    left: "28%",
    status: "red",
    currentIndex: 0,
    lastUpdateTime: Date.now(),
    greenInterval: 15000, // 15 seconds for demo (adjust as needed)
    dataHistory: [
      {
        stats: { red: 0.0, yellow: 7, green: 12, vehicles: 4 },
        image: "/traffic/Photo1.jpg",
        updated: "2 mins ago",
        timestamp: "10:56 PM"
      },
      {
        stats: { red: 6, yellow: 15, green: 42, vehicles: 14 },
        image: "/traffic/Photo2.jpg", 
        updated: "5 mins ago",
        timestamp: "10:53 PM"
      },
      {
        stats: { red: 21, yellow: 10, green: 21, vehicles: 7 },
        image: "/traffic/Photo3.jpg",
        updated: "8 mins ago", 
        timestamp: "10:50 PM"
      },
      {
        stats: { red: 10, yellow: 20, green: 51, vehicles: 17 },
        image: "/traffic/Photo4.jpg",
        updated: "11 mins ago",
        timestamp: "10:47 PM"
      }
    ],
    cameraIP: "192.168.10.11",
  },
  {
    id: "S-002",
    name: "Signal 2", 
    top: "18%",
    left: "62%",
    status: "green",
    currentIndex: 0,
    lastUpdateTime: Date.now(),
    greenInterval: 12000, // 12 seconds for demo
    dataHistory: [
      {
        stats: { red: 25, yellow: 20, green: 51, vehicles: 17 },
        image: "/traffic/Photo5.jpg",
        updated: "1 min ago",
        timestamp: "10:57 PM"
      },
      {
        stats: { red: 25, yellow: 22, green: 54, vehicles: 18 },
        image: "/traffic/Photo6.jpg",
        updated: "4 mins ago", 
        timestamp: "10:54 PM"
      },
      {
        stats: { red: 27, yellow: 15, green: 36, vehicles: 12 },
        image: "/traffic/Photo7.jpg",
        updated: "7 mins ago",
        timestamp: "10:51 PM"
      },
      {
        stats: { red: 18, yellow: 12, green: 36, vehicles: 12 },
        image: "/traffic/Photo8.jpg",
        updated: "10 mins ago",
        timestamp: "10:48 PM"
      }
    ],
    cameraIP: "192.168.10.12",
  },
  // Rest of the signals remain as original structure
  {
    id: "S-003",
    name: "Signal 3",
    top: "46%",
    left: "50%",
    status: "yellow",
    stats: { red: 21, yellow:10, green: 21, vehicles: 7 },
    image: "/traffic/Photo9.jpg",
    updated: "20 sec ago",
    cameraIP: "192.168.10.13",
  },
  {
    id: "S-004",
    name: "Signal 4",
    top: "66%",
    left: "34%",
    status: "red",
    stats: { red: 10.5, yellow: 13, green: 51, vehicles: 17 },
    image: "/traffic/Photo9.jpg",
    updated: "30 sec ago",
    cameraIP: "192.168.10.14",
  },
  {
    id: "S-005",
    name: "Signal 5",
    top: "20%",
    left: "45%",
    status: "green",
    stats: { red: 25.5, yellow: 23, green: 51, vehicles: 17 },
    image: "/traffic/photo5.jpg",
    updated: "1 min ago",
    cameraIP: "192.168.10.15",
  },
  {
    id: "S-006",
    name: "Signal 6",
    top: "38%",
    left: "65%",
    status: "yellow",
    stats: { red: 25.5, yellow: 20, green: 54, vehicles: 18 },
    image: "/traffic/Photo9.jpg",
    updated: "45 sec ago",
    cameraIP: "192.168.10.16",
  },
  {
    id: "S-007",
    name: "Signal 7",
    top: "55%",
    left: "40%",
    status: "red",
    stats: { red: 27.0, yellow: 15, green: 36, vehicles: 12 },
    image: "/traffic/Photo9.jpg",
    updated: "3 mins ago",
    cameraIP: "192.168.10.17",
  },
  {
    id: "S-008",
    name: "Signal 8",
    top: "70%",
    left: "55%",
    status: "green",
    stats: { red: 18, yellow: 15, green: 36, vehicles: 12 },
    image: "/traffic/Photo9.jpg",
    updated: "2 mins ago",
    cameraIP: "192.168.10.18",
  },
  {
    id: "S-009",
    name: "Signal 9",
    top: "30%",
    left: "70%",
    status: "yellow",
    stats: { red: 18, yellow: 14, green: 36, vehicles: 12 },
    image: "/traffic/Photo9.jpg",
    updated: "1 min ago",
    cameraIP: "192.168.10.19",
  },
];

const statusColor = {
  red: "#d32f2f",
  yellow: "#f9a825",
  green: "#2e7d32",
};

export default function TrafficSignals() {
  const [signals, setSignals] = React.useState(initialSignals);
  const [openDetails, setOpenDetails] = React.useState(false);
  const [active, setActive] = React.useState(null);
  const [openAdd, setOpenAdd] = React.useState(false);
  const [form, setForm] = React.useState({
    name: "",
    id: "",
    latitude: "",
    longitude: "",
    posX: "",
    posY: "",
    cameraIP: "",
    image: "https://via.placeholder.com/800x450?text=New+Signal+Snapshot",
  });
  const [formErrors, setFormErrors] = React.useState({});
  const [snack, setSnack] = React.useState({ open: false, message: "", severity: "success" });

  // Auto-update functionality for signals with dataHistory
  React.useEffect(() => {
    const interval = setInterval(() => {
      setSignals(prevSignals => {
        return prevSignals.map(signal => {
          // Only auto-update signals that have dataHistory (first 2 signals)
          if (signal.dataHistory && signal.greenInterval) {
            const now = Date.now();
            const timeSinceLastUpdate = now - signal.lastUpdateTime;
            
            if (timeSinceLastUpdate >= signal.greenInterval) {
              const nextIndex = (signal.currentIndex + 1) % signal.dataHistory.length;
              return {
                ...signal,
                currentIndex: nextIndex,
                lastUpdateTime: now
              };
            }
          }
          return signal;
        });
      });
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, []);

  // Helper functions for signals with dataHistory
  function hasDataHistory(signal) {
    return signal && signal.dataHistory && signal.dataHistory.length > 0;
  }

  function getCurrentData(signal) {
    if (!hasDataHistory(signal)) {
      return {
        stats: signal.stats || {},
        image: signal.image || "",
        updated: signal.updated || "",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
    }
    return signal.dataHistory[signal.currentIndex];
  }

  function getDisplayData(signal) {
    return getCurrentData(signal); // Show current data
  }

  // Modified function to handle manual cycling
  function handleOpenDetails(sig) {
    if (hasDataHistory(sig)) {
      // Manual cycle for signals with history
      const updatedSignals = signals.map(signal => {
        if (signal.id === sig.id) {
          const nextIndex = (signal.currentIndex + 1) % signal.dataHistory.length;
          return { 
            ...signal, 
            currentIndex: nextIndex,
            lastUpdateTime: Date.now() // Reset timer on manual click
          };
        }
        return signal;
      });
      
      setSignals(updatedSignals);
      const updatedSignal = updatedSignals.find(s => s.id === sig.id);
      setActive(updatedSignal);
    } else {
      // Regular signals without history
      setActive(sig);
    }
    setOpenDetails(true);
  }

  function handleCloseDetails() {
    setOpenDetails(false);
    setActive(null);
  }

  // Rest of your existing functions remain the same
  function handleOpenAdd() {
    setForm({
      name: "",
      id: `S-${Math.floor(100 + Math.random() * 900)}`,
      latitude: "",
      longitude: "",
      posX: "",
      posY: "",
      cameraIP: "",
      image: "https://via.placeholder.com/800x450?text=New+Signal+Snapshot",
    });
    setFormErrors({});
    setOpenAdd(true);
  }

  function handleCloseAdd() {
    setOpenAdd(false);
    setFormErrors({});
  }

  function validateForm() {
    const e = {};
    if (!form.name) e.name = "Name required";
    if (!form.cameraIP) e.cameraIP = "Camera IP required";
    if (!form.posX || isNaN(Number(form.posX)) || Number(form.posX) < 0 || Number(form.posX) > 100)
      e.posX = "Position (left %) required between 0 and 100";
    if (!form.posY || isNaN(Number(form.posY)) || Number(form.posY) < 0 || Number(form.posY) > 100)
      e.posY = "Position (top %) required between 0 and 100";
    setFormErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleAddActivate() {
    if (!validateForm()) return;

    const newSignal = {
      id: form.id,
      name: form.name,
      top: `${form.posY}%`,
      left: `${form.posX}%`,
      status: "green",
      stats: { red: 0, yellow: 0, green: 0, vehicles: 0 },
      image: form.image,
      updated: "just now",
      cameraIP: form.cameraIP,
      latitude: form.latitude,
      longitude: form.longitude,
    };

    setSignals((s) => [newSignal, ...s]);
    setOpenAdd(false);
    setSnack({ open: true, message: "Signal activated and added to map", severity: "success" });
  }

  return (
    <Box sx={{ fontFamily: "'Inter', sans-serif", minHeight: "100vh", p: 4 }}>
      {/* Styles remain the same */}
      <style>{`
        .map-container { border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(16,24,40,0.08); background: white; border: 1px solid rgba(15,23,42,0.04); }
        .signal-marker { position: absolute; transform: translate(-50%, -50%); cursor: pointer; display:flex; align-items:center; justify-content:center; }
        .signal-bubble { width:56px; height:56px; border-radius:12px; display:flex; align-items:center; justify-content:center; background: white; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 8px 22px rgba(11,15,30,0.06); }
        .pulse { position:absolute; width:64px; height:64px; border-radius:50%; opacity:0.12; animation: pulse 1.8s infinite; transform: translate(-50%, -50%); }
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(0.95); opacity:0.14; }
          70% { transform: translate(-50%, -50%) scale(1.6); opacity:0.02; }
          100% { transform: translate(-50%, -50%) scale(1.9); opacity:0; }
        }
        .marker-label { position: absolute; transform: translate(-50%, 70%); background: rgba(255,255,255,0.95); padding:6px 10px; border-radius:10px; font-size:12px; box-shadow: 0 8px 20px rgba(10,15,30,0.06); border: 1px solid rgba(0,0,0,0.04);}
        .auto-cycling { animation: glow 2s ease-in-out infinite alternate; }
        @keyframes glow {
          from { box-shadow: 0 8px 22px rgba(11,15,30,0.06); }
          to { box-shadow: 0 8px 22px rgba(75,0,130,0.3); }
        }
      `}</style>

      {/* Header */}
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="h5" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, color: "#4B0082" }}>
            Traffic Signals - Authority Console
          </Typography>
          <Typography variant="body2" sx={{ color: "#566477", mt: 0.5 }}>
            Official traffic signal management — S-001 & S-002 auto-cycle every green interval
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            startIcon={<Add />}
            onClick={handleOpenAdd}
            variant="contained"
            sx={{
              bgcolor: "#4B0082",
              px: 3,
              py: 1.05,
              boxShadow: "0 8px 30px rgba(75,0,130,0.12)",
              fontWeight: 600,
            }}
          >
            Add Signal
          </Button>
        </Stack>
      </Box>

      {/* Map Card */}
      <Paper className="map-container" elevation={0} sx={{ position: "relative", width: "100%", height: { xs: 520, md: 760 } }}>
        <Box
          component="img"
          src="/DelhiMap.png"
          alt="Delhi Map"
          sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "contrast(0.98) saturate(0.98)" }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 18,
            left: 18,
            bgcolor: "rgba(255,255,255,0.9)",
            borderRadius: 10,
            p: 1.25,
            display: "flex",
            gap: 2,
            alignItems: "center",
            boxShadow: "0 8px 24px rgba(12,20,40,0.06)",
            border: "1px solid rgba(0,0,0,0.04)",
          }}
        >
          <Avatar sx={{ bgcolor: "#4B0082", width: 38, height: 38 }}>
            <VideocamIcon />
          </Avatar>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: 13, fontFamily: "'Poppins', sans-serif" }}>Smart Surveillance</Typography>
            <Typography sx={{ fontSize: 12, color: "#596a7a" }}>Auto-cycling data • Click for manual control</Typography>
          </Box>
        </Box>

        {/* Markers */}
        {signals.map((s) => {
          const displayData = getDisplayData(s);
          const isAutoCycling = hasDataHistory(s);
          
          return (
            <Box
              key={s.id}
              className="signal-marker"
              sx={{ top: s.top, left: s.left }}
              onClick={() => handleOpenDetails(s)}
            >
              <Box className="pulse" sx={{ bgcolor: statusColor[s.status] }} />
              <Tooltip 
                title={`${s.name} — ${s.id} ${isAutoCycling ? '(Auto-cycling every ' + (s.greenInterval/1000) + 's)' : ''}`} 
                placement="top"
              >
                <Box 
                  className={`signal-bubble ${isAutoCycling ? 'auto-cycling' : ''}`} 
                  sx={{ width: 62, height: 62, borderRadius: 14 }}
                >
                  <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    badgeContent={<Box sx={{ width: 12, height: 12, bgcolor: statusColor[s.status], borderRadius: "50%", border: "2px solid white" }} />}
                  >
                    <Avatar sx={{ bgcolor: "#fff", color: "#333", width: 46, height: 46, border: "1px solid rgba(0,0,0,0.04)" }}>
                      <VideocamIcon sx={{ fontSize: 20, color: "#333" }} />
                    </Avatar>
                  </Badge>
                </Box>
              </Tooltip>
              <Box className="marker-label">
                <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
                  {s.id}
                  {isAutoCycling && <span style={{ color: '#4B0082' }}> ●</span>}
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Paper>

      {/* DETAILS DIALOG */}
      <Dialog open={openDetails} onClose={handleCloseDetails} fullWidth maxWidth="md">
        <DialogTitle sx={{ bgcolor: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", px: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ bgcolor: active ? statusColor[active.status] : "#4B0082" }}>
              <VideocamIcon />
            </Avatar>
            <Box>
              <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16 }}>
                {active ? active.name : ""}
              </Typography>
              <Typography sx={{ fontSize: 12, color: "#6b6b6b" }}>
                {active && hasDataHistory(active) 
                  ? `${active.id} • Data Set ${active.currentIndex + 1} of ${active.dataHistory.length} • Auto-cycling`
                  : active ? `${active.id} • Static data` : ""
                }
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
         
            <IconButton onClick={handleCloseDetails} size="large">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>

    <DialogContent dividers sx={{ bgcolor: "#fbfcfe", px: 3, py: 3 }}>
  <div className="flex gap-6 h-96">
    {/* Left side - Image (70%) */}
    <motion.div 
      className="w-[70%] relative"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative h-80 rounded-xl overflow-hidden border border-gray-200 shadow-lg">
        <img
          src={active ? getCurrentData(active).image || "https://via.placeholder.com/800x450?text=No+image" : "https://via.placeholder.com/800x450?text=No+image"}
          alt="traffic snapshot"
          className="w-full h-full object-cover"
        />
        
        {/* Image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>
      
      {/* Camera info below image */}
      <motion.div
        className="mt-3 flex gap-2 flex-wrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-700 border">
          Camera IP: {active?.cameraIP || "-"}
        </div>
        <div className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-700 border">
          {active && hasDataHistory(active) 
            ? `Timestamp: ${getCurrentData(active).timestamp}`
            : `Lat: ${active?.latitude || "-"} • Lon: ${active?.longitude || "-"}`
          }
        </div>
      </motion.div>
    </motion.div>

    {/* Right side - Traffic Lights and Stats (30%) */}
    <motion.div 
      className="w-[30%] h-80 flex flex-col justify-between"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      {/* Header */}
      <div className="mb-3">
        <h3 className="font-bold text-sm text-gray-800 font-['Poppins']">
          Signal Metrics
        </h3>
       
      </div>

      {/* Traffic Lights */}
      {active && (
        <div className="flex-1 flex flex-col justify-center items-center space-y-4">
          {/* Red Light */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          >
            <motion.div
              className="w-12 h-12 rounded-full border-3 border-gray-800 bg-red-500 relative overflow-hidden shadow-lg"
              animate={{
                opacity: [1, 0.4, 1],
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 15px rgba(239, 68, 68, 0.5)",
                  "0 0 25px rgba(239, 68, 68, 0.8)",
                  "0 0 15px rgba(239, 68, 68, 0.5)"
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {/* Inner shine effect */}
              <motion.div
                className="absolute inset-1.5 rounded-full bg-white opacity-30"
                animate={{
                  scale: [0.8, 1, 0.8],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            <span className="mt-1 text-lg font-bold text-red-600">
              {getCurrentData(active).stats.red}
            </span>
          </motion.div>

          {/* Yellow Light */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
          >
            <motion.div
              className="w-12 h-12 rounded-full border-3 border-gray-800 bg-yellow-400 relative overflow-hidden shadow-lg"
              animate={{
                opacity: [1, 0.4, 1],
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 15px rgba(251, 191, 36, 0.5)",
                  "0 0 25px rgba(251, 191, 36, 0.8)",
                  "0 0 15px rgba(251, 191, 36, 0.5)"
                ]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3
              }}
            >
              {/* Inner shine effect */}
              <motion.div
                className="absolute inset-1.5 rounded-full bg-white opacity-30"
                animate={{
                  scale: [0.8, 1, 0.8],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            <span className="mt-1 text-lg font-bold text-yellow-600">
              {getCurrentData(active).stats.yellow || 0}
            </span>
          </motion.div>

          {/* Green Light */}
          <motion.div
            className="flex flex-col items-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
          >
            <motion.div
              className="w-12 h-12 rounded-full border-3 border-gray-800 bg-green-500 relative overflow-hidden shadow-lg"
              animate={{
                opacity: [1, 0.4, 1],
                scale: [1, 1.05, 1],
                boxShadow: [
                  "0 0 15px rgba(34, 197, 94, 0.5)",
                  "0 0 25px rgba(34, 197, 94, 0.8)",
                  "0 0 15px rgba(34, 197, 94, 0.5)"
                ]
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.6
              }}
            >
              {/* Inner shine effect */}
              <motion.div
                className="absolute inset-1.5 rounded-full bg-white opacity-30"
                animate={{
                  scale: [0.8, 1, 0.8],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            <span className="mt-1 text-lg font-bold text-green-600">
              {getCurrentData(active).stats.green}
            </span>
          </motion.div>
        </div>
      )}

      {/* Vehicle Count at Bottom */}
      {active && (
        <motion.div
          className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-center">
            <h4 className="font-bold text-xs text-gray-700 mb-1">Vehicles Present</h4>
            <motion.span 
              className="text-2xl font-bold text-gray-800"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {getCurrentData(active).stats.vehicles}
            </motion.span>
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                <span>Congestion</span>
                <span>{Math.min(100, Math.round((getCurrentData(active).stats.vehicles / 300) * 100))}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <motion.div
                  className="bg-gradient-to-r from-green-400 to-red-500 h-1.5 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${Math.min(100, Math.round((getCurrentData(active).stats.vehicles / 300) * 100))}%` 
                  }}
                  transition={{ duration: 1, delay: 1 }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  </div>
</DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
           
                  {active && hasDataHistory(active) ? (
                    <Button 
                      variant="contained" 
                      sx={{ bgcolor: "#4B0082" }}
                      onClick={() => handleOpenDetails(active)}
                    >
                      Manual Cycle
                    </Button>
                  ) : (
                    <Button variant="contained" sx={{ bgcolor: "#4B0082" }}>
                      Acknowledge
                    </Button>
                  )}
                  <Button variant="outlined">Export Data</Button>
                
          <Button onClick={handleCloseDetails}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* ADD SIGNAL DIALOG - Same as before */}
      <Dialog open={openAdd} onClose={handleCloseAdd} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>Add / Activate Signal</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Signal Name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              fullWidth
              error={!!formErrors.name}
              helperText={formErrors.name}
            />
            <TextField
              label="Signal ID"
              value={form.id}
              onChange={(e) => setForm((f) => ({ ...f, id: e.target.value }))}
              fullWidth
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Latitude (optional)"
                  value={form.latitude}
                  onChange={(e) => setForm((f) => ({ ...f, latitude: e.target.value }))}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Longitude (optional)"
                  value={form.longitude}
                  onChange={(e) => setForm((f) => ({ ...f, longitude: e.target.value }))}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Map left (X%)"
                  value={form.posX}
                  onChange={(e) => setForm((f) => ({ ...f, posX: e.target.value }))}
                  fullWidth
                  error={!!formErrors.posX}
                  helperText={formErrors.posX || "Enter value 0-100 (left percentage on map)"}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Map top (Y%)"
                  value={form.posY}
                  onChange={(e) => setForm((f) => ({ ...f, posY: e.target.value }))}
                  fullWidth
                  error={!!formErrors.posY}
                  helperText={formErrors.posY || "Enter value 0-100 (top percentage on map)"}
                />
              </Grid>
            </Grid>

            <TextField
              label="Camera IP"
              value={form.cameraIP}
              onChange={(e) => setForm((f) => ({ ...f, cameraIP: e.target.value }))}
              fullWidth
              error={!!formErrors.cameraIP}
              helperText={formErrors.cameraIP}
            />
            <FormHelperText sx={{ color: "#6b6b6b" }}>
              Provide map percentage coordinates so admin can place marker precisely. (Latitude/Longitude are recorded but map placement requires X/Y%)
            </FormHelperText>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ pr: 3, pb: 2 }}>
          <Button onClick={handleCloseAdd}>Cancel</Button>
          <Button variant="contained" onClick={handleAddActivate} sx={{ bgcolor: "#4B0082" }}>
            Activate
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity={snack.severity} onClose={() => setSnack((s) => ({ ...s, open: false }))}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
