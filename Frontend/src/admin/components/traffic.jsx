import React from "react";
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
  Alert
} from "@mui/material";
import { CameraAlt, Close, Add } from "@mui/icons-material";
import VideocamIcon from '@mui/icons-material/Videocam';


const initialSignals = [
  {
    id: "S-001",
    name: "Signal 1",
    top: "8%",
    left: "28%",
    status: "red",
    stats: { red: 0.0, yellow: 0, green: 12, vehicles: 4 },
    image: "/traffic/Photo1.jpg",
    updated: "2 mins ago",
    cameraIP: "192.168.10.11",
  },
  {
    id: "S-002",
    name: "Signal 2",
    top: "18%",
    left: "62%",
    status: "green",
    stats: { red: 6.0, yellow: 0, green: 42, vehicles: 14 },
    image: "/traffic/Photo2.jpg",
    updated: "1 min ago",
    cameraIP: "192.168.10.12",
  },
  {
    id: "S-003",
    name: "Signal 3",
    top: "46%",
    left: "50%",
    status: "yellow",
    stats: { red: 21, yellow: 0, green: 21, vehicles: 7 },
    image: "/traffic/photo3.jpg",
    updated: "20 sec ago",
    cameraIP: "192.168.10.13",
  },
  {
    id: "S-004",
    name: "Signal 4",
    top: "66%",
    left: "34%",
    status: "red",
    stats: { red: 10.5, yellow: 0, green: 51, vehicles: 17 },
    image: "/traffic/photo4.jpg",
    updated: "30 sec ago",
    cameraIP: "192.168.10.14",
  },
  {
    id: "S-005",
    name: "Signal 5",
    top: "20%",
    left: "45%",
    status: "green",
    stats: { red: 25.5, yellow: 0, green: 51, vehicles: 17 },
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
    stats: { red: 25.5, yellow: 0, green: 54, vehicles: 18 },
    image: "/traffic/photo6.jpg",
    updated: "45 sec ago",
    cameraIP: "192.168.10.16",
  },
  {
    id: "S-007",
    name: "Signal 7",
    top: "55%",
    left: "40%",
    status: "red",
    stats: { red: 27.0, yellow: 0, green: 36, vehicles: 12 },
    image: "/traffic/photo7.jpg",
    updated: "3 mins ago",
    cameraIP: "192.168.10.17",
  },
  {
    id: "S-008",
    name: "Signal 8",
    top: "70%",
    left: "55%",
    status: "green",
    stats: { red: 18, yellow: 0, green: 36, vehicles: 12 },
    image: "/traffic/photo8.jpg",
    updated: "2 mins ago",
    cameraIP: "192.168.10.18",
  },
  {
    id: "S-009",
    name: "Signal 9",
    top: "30%",
    left: "70%",
    status: "yellow",
    stats: { red: 18, yellow: 0, green: 36, vehicles: 12 },
    image: "/traffic/photo9.jpg",
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
    posX: "", // percent left
    posY: "", // percent top
    cameraIP: "",
    image: "https://via.placeholder.com/800x450?text=New+Signal+Snapshot",
  });
  const [formErrors, setFormErrors] = React.useState({});
  const [snack, setSnack] = React.useState({ open: false, message: "", severity: "success" });

  // Open details modal
  function handleOpenDetails(sig) {
    setActive(sig);
    setOpenDetails(true);
  }
  function handleCloseDetails() {
    setOpenDetails(false);
    setActive(null);
  }

  // Add signal modal logic
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
    // For placement we require posX and posY as percentage so admin can place precisely
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
    <Box sx={{ fontFamily: "'Inter', sans-serif",  minHeight: "100vh", p: 4 }}>
      {/* Small style block for marker/pulse */}
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
      `}</style>

      {/* Header */}
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography variant="h5" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, color: "#4B0082" }}>
            Traffic Signals - Authority Console
          </Typography>
          <Typography variant="body2" sx={{ color: "#566477", mt: 0.5 }}>
            Official traffic signal management — accurate, auditable, and secure.
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
        {/* Background map */}
        <Box
          component="img"
          src="/DelhiMap.png"
          alt="Delhi Map"
          sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "contrast(0.98) saturate(0.98)" }}
        />

        {/* Small overlay header (glassy) */}
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
            <Typography sx={{ fontWeight: 700, fontSize: 13, fontFamily: "'Poppins', sans-serif" }}>Surveillance Map</Typography>
            <Typography sx={{ fontSize: 12, color: "#596a7a" }}>Live camera overlays & signal management</Typography>
          </Box>
        </Box>

        {/* Markers */}
        {signals.map((s) => (
          <Box
            key={s.id}
            className="signal-marker"
            sx={{ top: s.top, left: s.left }}
            onClick={() => handleOpenDetails(s)}
          >
            {/* pulse */}
            <Box className="pulse" sx={{ bgcolor: statusColor[s.status] }} />
            {/* bubble with camera icon */}
            <Tooltip title={`${s.name} — ${s.id}`} placement="top">
              <Box className="signal-bubble" sx={{ width: 62, height: 62, borderRadius: 14 }}>
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

            {/* small label */}
            <Box className="marker-label">
              <Typography sx={{ fontSize: 12, fontWeight: 700 }}>{s.id}</Typography>
            </Box>
          </Box>
        ))}
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
                {active ? `${active.id} • Last update: ${active.updated}` : ""}
              </Typography>
            </Box>
          </Box>

          <IconButton onClick={handleCloseDetails} size="large">
            <Close />
          </IconButton>
        </DialogTitle>

       <DialogContent dividers sx={{ bgcolor: "#fbfcfe", px: 3, py: 3 }}>
  <Grid container spacing={3}>
    {/* Left: camera snapshot */}
    <Box style={{width:}}>
      <Paper elevation={0} sx={{ borderRadius: 2, overflow: "hidden", border: "1px solid rgba(0,0,0,0.04)" }}>
        <Box
          component="img"
          src={active ? active.image : "https://via.placeholder.com/800x450?text=No+image"}
          alt="live snapshot"
          sx={{ width: "100%", height: 360, objectFit: "cover", display: "block" }}
        />
      </Paper>

      <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
        <Button variant="outlined" disabled sx={{ borderColor: "#e6e6e6" }}>
          Camera IP: {active ? active.cameraIP : "-"}
        </Button>
        <Button variant="outlined" disabled sx={{ borderColor: "#e6e6e6" }}>
          Lat: {active ? active.latitude || "-" : "-"} • Lon: {active ? active.longitude || "-" : "-"}
        </Button>
      </Box>
    </Box>

    {/* Right: professional stats card */}
    <Grid item xs={12} md={6}>
      <Paper elevation={0} sx={{ p: 3, borderRadius: 2, border: "1px solid rgba(0,0,0,0.04)", height: "100%" }}>
        <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, mb: 1 }}>Signal Metrics</Typography>
        <Typography sx={{ fontSize: 13, color: "#607083", mb: 2 }}>Counts and current vehicle load</Typography>

        <Stack spacing={2}>
          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: 13 }}>Red Light Count</Typography>
            <Typography sx={{ fontWeight: 700, color: statusColor.red, fontSize: 20 }}>
              {active ? active.stats.red : "-"}
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: 13 }}>Green Light Count</Typography>
            <Typography sx={{ fontWeight: 700, color: statusColor.green, fontSize: 20 }}>
              {active ? active.stats.green : "-"}
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography sx={{ fontWeight: 700, fontSize: 13 }}>Vehicles Present</Typography>
            <Typography sx={{ fontWeight: 700, color: "#222", fontSize: 22 }}>
              {active ? active.stats.vehicles : "-"}
            </Typography>
            <Typography sx={{ fontSize: 12, color: "#6b6b6b", mt: 0.5 }}>
              Congestion: {active ? `${Math.min(100, Math.round((active.stats.vehicles / 300) * 100))}%` : "-"}
            </Typography>
          </Box>
        </Stack>

        <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
          <Button variant="contained" sx={{ bgcolor: "#4B0082" }}>
            Acknowledge
          </Button>
          <Button variant="outlined">Dispatch Patrol</Button>
        </Box>
      </Paper>
    </Grid>
  </Grid>
</DialogContent>


        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleCloseDetails}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* ADD SIGNAL DIALOG */}
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
