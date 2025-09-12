import React from "react";
import {
  Box,
  Paper,
  Grid,
  Typography,
  Avatar,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Snackbar,
  Alert,
  Tooltip,
} from "@mui/material";
import {
  DirectionsCar,
  LocalPolice,
  LocationOn,
  PlayCircleOutline,
  Close,
  AccessTime,
  Phone,
  Room,
  ReportProblem,
} from "@mui/icons-material";

/**
 * Breakdown.jsx
 *
 * - Place this file in src/pages/admin/Breakdown.jsx
 * - Requires fonts (Poppins/Inter) included in index.html head (see above).
 * - Replace placeholder image/video URLs with real ones when available.
 */

const now = () => new Date();

// Helper: format date nicely
function formatDate(dt) {
  const opts = { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" };
  return new Date(dt).toLocaleString("en-GB", opts);
}

// Helper: format elapsed hh:mm:ss
function formatElapsed(ms) {
  if (ms < 0) ms = 0;
  const totalSec = Math.floor(ms / 1000);
  const hrs = Math.floor(totalSec / 3600);
  const mins = Math.floor((totalSec % 3600) / 60);
  const secs = totalSec % 60;
  return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// Mock: nearest stations generator (static names + computed pseudo distances)
function getNearbyStations(place) {
  const base = [
    { type: "Traffic", name: "Outer Ring Traffic Post" },
    { type: "Police", name: "Kashmere Gate Police Station" },
    { type: "Traffic", name: "Central Traffic Unit" },
    { type: "Police", name: "City North PS" },
    { type: "Traffic", name: "Metro Traffic HQ" },
  ];
  // Add random distances 0.5 - 5.0 km
  return base.map((b, i) => ({
    id: `${place.replace(/\s+/g, "_")}_${i}`,
    ...b,
    distanceKm: (0.5 + Math.round(Math.random() * 450) / 100).toFixed(2),
    notified: false,
  }));
}

// Create initial breakdowns: incidentTime = now - 2 hours
const initialBreakdowns = (() => {
  const twoHoursAgo = (d) => new Date(d.getTime() - 2 * 60 * 60 * 1000);
  const base = [
    {
      id: "BD-101",
      vehicleNumber: "DL1H-AA-1234",
      place: "Kashmere Gate",
      incidentAt: twoHoursAgo(now()),
      owner: "Ravi Kumar",
      registration: "DL1H-AA-1234",
      contact: "+91 98765 43210",
      snapshot: "/traffic/break.png",
      videos: ["/traffic/Vehicle Breakdown.mp4", " /traffic/Vehicle Breakdown.mp4",],
    },
    {
      id: "BD-202",
      vehicleNumber: "DL4C-BB-5678",
      place: "Kashmere Gate",
      incidentAt: twoHoursAgo(now()),
      owner: "Sunita Devi",
      registration: "DL4C-BB-5678",
      contact: "+91 91234 56789",
      snapshot: "https://via.placeholder.com/900x560?text=Breakdown+Snapshot+2",
      videos: ["https://www.w3schools.com/html/mov_bbb.mp4", "https://www.w3schools.com/html/movie.mp4"],
    },
    {
      id: "BD-303",
      vehicleNumber: "DL2C-CC-9876",
      place: "Kashmere Gate",
      incidentAt: twoHoursAgo(now()),
      owner: "Amit Mehra",
      registration: "DL2C-CC-9876",
      contact: "+91 99887 66554",
      snapshot: "https://via.placeholder.com/900x560?text=Breakdown+Snapshot+3",
      videos: ["https://www.w3schools.com/html/mov_bbb.mp4", "https://www.w3schools.com/html/movie.mp4"],
    },
  ];
  return base;
})();

export default function Breakdown() {
  const [breakdowns] = React.useState(initialBreakdowns);
  const [tick, setTick] = React.useState(Date.now()); 

  // For details modal
  const [openDetails, setOpenDetails] = React.useState(false);
  const [active, setActive] = React.useState(null);

  // Video modal
  const [openVideo, setOpenVideo] = React.useState(false);
  const [videoUrl, setVideoUrl] = React.useState(null);

  // Nearby stations list shown state inside details dialog
  const [nearby, setNearby] = React.useState([]); // array of station objects for active item
  const [showNearby, setShowNearby] = React.useState(false);

  // Snackbar
  const [snack, setSnack] = React.useState({ open: false, message: "", severity: "success" });

  // Tick every second for timers
  React.useEffect(() => {
    const id = setInterval(() => setTick(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  function openDetailsModal(bd) {
    setActive(bd);
    setOpenDetails(true);
    // reset nearby
    setShowNearby(false);
    setNearby(getNearbyStations(bd.place));
  }
  function closeDetailsModal() {
    setOpenDetails(false);
    setActive(null);
    setShowNearby(false);
    setNearby([]);
  }

  function openVideoModal(url) {
    setVideoUrl(url);
    setOpenVideo(true);
  }
  function closeVideoModal() {
    setVideoUrl(null);
    setOpenVideo(false);
  }

  function toggleNotify(stationId) {
    setNearby((prev) =>
      prev.map((s) =>
        s.id === stationId
          ? { ...s, notified: !s.notified }
          : s
      )
    );
    const station = nearby.find((s) => s.id === stationId);
    setSnack({
      open: true,
      message: station && !station.notified ? `Notified ${station.name}` : `Notification cleared for ${station ? station.name : "station"}`,
      severity: "success",
    });
  }

  return (
    <Box sx={{ p: 4, fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}>
      <style>{`
        .blinker {
          display:inline-block;
          width:10px;
          height:10px;
          border-radius:50%;
          margin-right:8px;
          animation: blink 1s infinite;
        }
        @keyframes blink {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.15; transform: scale(0.85); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 20, color: "#4B0082" }}>
            Emergency Vehicle Breakdowns - Response Console
          </Typography>
          <Typography sx={{ color: "#556774", mt: 0.5 }}>
            Live incidents requiring immediate assistance. Click any card to view owner details & dispatch nearby units.
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {breakdowns.map((bd) => {
          const incidentAt = new Date(bd.incidentAt);
          const elapsedMs = Date.now() - incidentAt.getTime();
          return (
            <Grid item xs={12} sm={6} md={4} key={bd.id}>
              <Paper
                elevation={3}
                className="square-card"
                sx={{
                  borderRadius: 3,
                  border: "1px solid rgba(75,0,130,0.06)",
                  background: "linear-gradient(180deg,#ffffff,#fbfbff)",
                  overflow: "visible",
                  p: 2
                }}
              >
                <Box className="square-inner">
                  {/* Top row: small id badge and avatar */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Chip label={bd.id} size="small" sx={{ fontWeight: 700, bgcolor: "#f3e9ff", color: "#4B0082" }} />
                    <Avatar sx={{ bgcolor: "#6A0DAD", width: 46, height: 46 }}>
                      <DirectionsCar />
                    </Avatar>
                  </Stack>

                  {/* Middle: center vehicle number + place */}
                  <Box sx={{ textAlign: "center", mt: 1 }}>
                    <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, letterSpacing: 0.6, fontSize: { xs: 20, md: 22 } }}>
                      {bd.vehicleNumber}
                    </Typography>
                    <Typography sx={{ color: "#667987", mt: 0.6 }}>{bd.place}</Typography>

                    <Box sx={{ mt: 2, display: "flex", justifyContent: "center", alignItems: "center", gap: 2 }}>
                      <Box className="small-blink" />
                      <Typography sx={{ fontWeight: 800, fontSize: { xs: 18, md: 20 } }}>
                        {formatElapsed(elapsedMs)}
                      </Typography>
                    </Box>

                    <Typography sx={{ color: "#8899a8", mt: 1, fontSize: 12 }}>
                      {formatDate(incidentAt)} • Occurred ≈ 2 hrs ago
                    </Typography>
                  </Box>

                  {/* Bottom: actions anchored to bottom */}
                  <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center" mt={2}>
                    <Button
                      variant="contained"
                      size="small"
                      sx={{
                        bgcolor: "#4B0082",
                        textTransform: "none",
                        fontWeight: 700,
                        px: 2.5,
                        py: 0.7,
                        boxShadow: "0 8px 20px rgba(75,0,130,0.12)",
                      }}
                      onClick={() => openDetailsModal(bd)}
                    >
                      View Details
                    </Button>

                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setSnack({ open: true, message: "Dispatch requested.", severity: "info" })}
                        sx={{ textTransform: "none", px: 2 }}
                      >
                        Dispatch
                      </Button>
                      <Tooltip title="Request Tow">
                        <Button
                          variant="text"
                          size="small"
                          onClick={() => setSnack({ open: true, message: "Tow requested.", severity: "info" })}
                          sx={{ color: "#6b6b6b", textTransform: "none" }}
                        >
                          Tow
                        </Button>
                      </Tooltip>
                    </Stack>
                  </Stack>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>

      {/* DETAILS DIALOG */}
      <Dialog open={openDetails} onClose={closeDetailsModal} fullWidth maxWidth="lg">
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>
              {active ? `${active.vehicleNumber} — ${active.place}` : "Incident Details"}
            </Typography>
            <Typography sx={{ color: "#6b6b6b", fontSize: 13 }}>
              {active ? formatDate(active.incidentAt) : ""}
            </Typography>
          </Box>

          <IconButton onClick={closeDetailsModal}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ px: 3, py: 2 }}>
          <Grid container spacing={3}>
            {/* Left: snapshot */}
            <Box sx={{width: '50%'}}>
              <Paper elevation={0} sx={{ borderRadius: 1.5, overflow: "hidden", border: "1px solid rgba(10,15,30,0.04)" }}>
                <Box
                  component="img"
                  src={active ? active.snapshot : "https://via.placeholder.com/900x560?text=No+image"}
                  alt="snapshot"
                  sx={{ width: "100%", height: 420, objectFit: "cover", display: "block" }}
                />
              </Paper>

              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Tooltip title="Video 1">
                  <IconButton onClick={() => active && openVideoModal(active.videos[0])} sx={{ border: "1px solid rgba(10,15,30,0.06)" }}>
                    <PlayCircleOutline sx={{ color: "#4B0082" }} />
                  </IconButton>
                </Tooltip>

                <Tooltip title="Video 2">
                  <IconButton onClick={() => active && openVideoModal(active.videos[1])} sx={{ border: "1px solid rgba(10,15,30,0.06)" }}>
                    <PlayCircleOutline sx={{ color: "#4B0082" }} />
                  </IconButton>
                </Tooltip>

                <Button variant="outlined" startIcon={<ReportProblem />} disabled sx={{ textTransform: "none" }}>
                  Report
                </Button>
              </Stack>
            </Box>

            {/* Right: owner details + actions */}
            <Box >
              <Paper elevation={0} sx={{ p: 3, borderRadius: 1.5, border: "1px solid rgba(10,15,30,0.04)" }}>
                <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, mb: 1 }}>Owner & Incident Info</Typography>

                <Stack spacing={1.2}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ color: "#6b6b6b" }}>Owner Name</Typography>
                    <Typography sx={{ fontWeight: 700 }}>{active ? active.owner : "-"}</Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ color: "#6b6b6b" }}>Vehicle No</Typography>
                    <Typography sx={{ fontWeight: 700 }}>{active ? active.registration : "-"}</Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ color: "#6b6b6b" }}>Contact</Typography>
                    <Typography sx={{ fontWeight: 700 }}>{active ? active.contact : "-"}</Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ color: "#6b6b6b" }}>Place</Typography>
                    <Typography sx={{ fontWeight: 700 }}>{active ? active.place : "-"}</Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ color: "#6b6b6b" }}>Incident At</Typography>
                    <Typography sx={{ fontWeight: 700 }}>{active ? formatDate(active.incidentAt) : "-"}</Typography>
                  </Stack>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: "#4B0082", fontWeight: 700, textTransform: "none" }}
                    onClick={() => {
                      setShowNearby((s) => !s);
                    }}
                  >
                    {showNearby ? "Hide Nearby Stations" : "Nearest Stations"}
                  </Button>

                  <Button
                    variant="outlined"
                    sx={{ textTransform: "none" }}
                    onClick={() => setSnack({ open: true, message: "Assistance dispatched.", severity: "info" })}
                  >
                    Request Tow
                  </Button>

                  <Button
                    variant="text"
                    sx={{ color: "#6b6b6b" }}
                    onClick={() => setSnack({ open: true, message: "Added note.", severity: "info" })}
                  >
                    Add Note
                  </Button>
                </Stack>

                {/* Nearby list */}
                {showNearby && (
                  <Box sx={{ mt: 3 }}>
                    <Typography sx={{ fontWeight: 700, mb: 1 }}>Nearby Units</Typography>
                    <List dense>
                      {nearby.map((st) => (
                        <ListItem key={st.id} sx={{ borderRadius: 1, mb: 1, border: "1px solid rgba(10,15,30,0.04)" }}>
                          <ListItemText
                            primary={
                              <Stack direction="row" spacing={1} alignItems="center">
                                {st.type === "Police" ? <LocalPolice sx={{ color: "#4B0082" }} /> : <DirectionsCar sx={{ color: "#4B0082" }} />}
                                <Typography sx={{ fontWeight: 700 }}>{st.name}</Typography>
                              </Stack>
                            }
                            secondary={`Distance: ${st.distanceKm} km`}
                          />
                          <ListItemSecondaryAction>
                            <Button
                              variant={st.notified ? "contained" : "outlined"}
                              size="small"
                              onClick={() => toggleNotify(st.id)}
                              sx={{
                                mr: 1,
                                minWidth: 110,
                                bgcolor: st.notified ? "#2e7d32" : undefined,
                                color: st.notified ? "white" : undefined,
                                borderColor: st.notified ? "#2e7d32" : undefined,
                                textTransform: "none",
                                fontWeight: 700,
                              }}
                            >
                              {st.notified ? "Notified" : "Notify"}
                            </Button>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </Paper>
            </Box>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ px: 3 }}>
          <Button onClick={closeDetailsModal} sx={{ textTransform: "none" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* VIDEO DIALOG */}
      <Dialog open={openVideo} onClose={closeVideoModal} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>Video Evidence</Typography>
          <IconButton onClick={closeVideoModal}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ p: 2, display: "flex", justifyContent: "center" }}>
          {videoUrl ? (
            <Box sx={{ width: "100%" }}>
              <video
                controls
                style={{ width: "100%", borderRadius: 8, maxHeight: "70vh", background: "#000" }}
                src={videoUrl}
              >
                Your browser does not support HTML5 video.
              </video>
            </Box>
          ) : (
            <Typography>No video selected</Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={closeVideoModal}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
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
