// src/pages/admin/Violations.jsx
import React from "react";
import {
  Box,
  Tabs,
  Tab,
  Paper,
  Typography,
  Grid,
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
  Snackbar,
  Alert,
} from "@mui/material";
import {
  DirectionsBus,
  DriveEta,
  Visibility,
  PlayCircleOutline,
  Close,
  AccessTime,
  Place,
  CalendarToday,
} from "@mui/icons-material";

/* --- (data & helper code same as before) --- */

const timeStr = "02:00 PM";
const todayDate = (() => {
  const d = new Date();
  const opts = { day: "2-digit", month: "short", year: "numeric" };
  return d.toLocaleDateString("en-GB", opts);
})();

const sampleBusViolations = [
  {
    id: "B-102",
    vehicleLabel: "Bus No B-102",
    place: "Kashmere Gate",
    date: todayDate,
    time: timeStr,
    driver: "Ramesh Kumar",
    vehicleNumber: "DL1H-AA-1234",
    image: "/traffic/bus.png",
    videos: [
      "/traffic/bus.mp4",
      "/traffic/bus.mp4",,
    ],
  },
  {
    id: "B-214",
    vehicleLabel: "Bus No B-214",
    place: "Kashmere Gate",
    date: todayDate,
    time: timeStr,
    driver: "Suresh Singh",
    vehicleNumber: "DL4C-BB-5678",
    image: "https://via.placeholder.com/900x560?text=Violation+Snapshot+2",
    videos: [
      "https://www.w3schools.com/html/mov_bbb.mp4",
      "https://www.w3schools.com/html/movie.mp4",
    ],
  },
];

const samplePvtViolations = [
  {
    id: "P-901",
    vehicleLabel: "Pvt Vehicle No P-901",
    place: "Kashmere Gate",
    date: todayDate,
    time: timeStr,
    owner: "Anita Verma",
    vehicleNumber: "DL2C-CC-9876",
    image: "/traffic/car.png",
    videos: [
       "/traffic/car.mp4",,
      "/traffic/car.mp4",,
    ],
  },
  {
    id: "P-332",
    vehicleLabel: "Pvt Vehicle No P-332",
    place: "Kashmere Gate",
    date: todayDate,
    time: timeStr,
    owner: "Rajat Sharma",
    vehicleNumber: "DL5D-DD-3456",
    image: "https://via.placeholder.com/900x560?text=Violation+Snapshot+4",
    videos: [
      "https://www.w3schools.com/html/mov_bbb.mp4",
      "https://www.w3schools.com/html/movie.mp4",
    ],
  },
];

function ViolationCard({ item, onView }) {
  const initials = item.vehicleLabel
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("");

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2.5,
        borderRadius: 2,
        background: "linear-gradient(180deg, #ffffff 0%, #fbfbff 100%)",
        border: "1px solid rgba(75,0,130,0.06)",
      }}
    >
      <Grid container alignItems="center" spacing={2}>
        <Grid item>
          <Avatar
            sx={{
              bgcolor: "#6A0DAD",
              width: 56,
              height: 56,
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            {initials}
          </Avatar>
        </Grid>

        <Grid item xs>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="subtitle1" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>
                {item.vehicleLabel}
              </Typography>
              <Typography variant="body2" sx={{ color: "#576574", mt: 0.3 }}>
                {item.place}
              </Typography>
              <Stack direction="row" spacing={1} sx={{ mt: 1 }} alignItems="center">
                <Chip icon={<CalendarToday />} label={item.date} size="small" />
                <Chip icon={<AccessTime />} label={item.time} size="small" />
              </Stack>
            </Box>

            <Box sx={{ textAlign: "right" }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                {item.vehicleNumber}
              </Typography>
              <Typography variant="caption" sx={{ color: "#7a8696", display: "block", mt: 0.5 }}>
                {item.driver ?? item.owner}
              </Typography>
            </Box>
          </Stack>
        </Grid>

        <Grid item>
          <Stack direction="column" spacing={1} alignItems="flex-end">
            <Button
              variant="contained"
              onClick={() => onView(item)}
              sx={{
                bgcolor: "#4B0082",
                textTransform: "none",
                px: 3,
                py: 0.9,
                boxShadow: "0 8px 24px rgba(75,0,130,0.12)",
                fontWeight: 700,
              }}
            >
              View Details
            </Button>

            <Typography variant="caption" sx={{ color: "#9aa6b2" }}>
              Case ready for challan
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default function Violations() {
  const [tab, setTab] = React.useState("bus"); // default Bus Violation
  const [busList] = React.useState(sampleBusViolations);
  const [pvtList] = React.useState(samplePvtViolations);

  // Details modal
  const [openDetails, setOpenDetails] = React.useState(false);
  const [active, setActive] = React.useState(null);

  // Video modal
  const [openVideo, setOpenVideo] = React.useState(false);
  const [videoUrl, setVideoUrl] = React.useState(null);

  // Snackbar for feedback (Stop Challan)
  const [snack, setSnack] = React.useState({ open: false, message: "", severity: "info" });

  function handleOpenDetails(item) {
    setActive(item);
    setOpenDetails(true);
  }
  function handleCloseDetails() {
    setOpenDetails(false);
    setActive(null);
  }

  function handleOpenVideo(url) {
    setVideoUrl(url);
    setOpenVideo(true);
  }
  function handleCloseVideo() {
    setVideoUrl(null);
    setOpenVideo(false);
  }

  // New: Stop challan handler
  function handleStopChallan() {
    if (!active) return;
    const confirmStop = window.confirm(
      `Are you sure you want to STOP the challan for ${active.vehicleLabel} (${active.vehicleNumber})?`
    );
    if (!confirmStop) return;

    // TODO: Replace with API call to stop/cancel challan on server (e.g. await api.stopChallan(active.id))
    // For now we show feedback and close the details dialog
    setOpenDetails(false);
    setSnack({ open: true, message: `Challan for ${active.vehicleLabel} has been stopped`, severity: "warning" });
    setActive(null);
  }

  return (
    <Box sx={{ p: 4, fontFamily: "'Inter', sans-serif",  minHeight: "100vh" }}>
      <Typography variant="h5" sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, color: "#4B0082", mb: 1 }}>
        Violations Challan Console
      </Typography>
      <Typography variant="body2" sx={{ color: "#596a7a", mb: 3 }}>
        Monitor bus and private vehicle violations, review evidence and issue challans.
      </Typography>

      <Paper
        elevation={0}
        sx={{
          p: 1,
          borderRadius: 2,
          border: "1px solid rgba(10,15,30,0.04)",
          mb: 3,
          background: "white",
        }}
      >
        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          textColor="primary"
          indicatorColor="primary"
          sx={{
            "& .MuiTabs-indicator": { height: 3, borderRadius: 3, bgcolor: "#6A0DAD" },
            px: 2,
          }}
        >
          <Tab
            value="bus"
            icon={<DirectionsBus sx={{ color: "#6A0DAD" }} />}
            label="Bus Violation"
            sx={{ textTransform: "none", fontWeight: 700 }}
          />
          <Tab
            value="pvt"
            icon={<DriveEta sx={{ color: "#6A0DAD" }} />}
            label="Private Vehicle Violation"
            sx={{ textTransform: "none", fontWeight: 700 }}
          />
        </Tabs>
      </Paper>

      <Box>
        {tab === "bus" && (
          <Grid container spacing={3}>
            {busList.map((b) => (
              <Grid item xs={12} md={6} key={b.id}>
                <ViolationCard item={b} onView={handleOpenDetails} />
              </Grid>
            ))}
          </Grid>
        )}

        {tab === "pvt" && (
          <Grid container spacing={3}>
            {pvtList.map((p) => (
              <Grid item xs={12} md={6} key={p.id}>
                <ViolationCard item={p} onView={handleOpenDetails} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* DETAILS DIALOG */}
      <Dialog open={openDetails} onClose={handleCloseDetails} fullWidth maxWidth="md">
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 3 }}>
          <Box>
            <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>
              {active ? active.vehicleLabel : ""}
            </Typography>
            <Typography sx={{ fontSize: 12, color: "#6b6b6b" }}>
              Violation at {active ? active.place : ""} — {active ? active.date : ""} • {active ? active.time : ""}
            </Typography>
          </Box>
          <IconButton onClick={handleCloseDetails}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ px: 3, py: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  borderRadius: 1.5,
                  overflow: "hidden",
                  border: "1px solid rgba(10,15,30,0.04)",
                }}
              >
                <Box
                  component="img"
                  src={active ? active.image : "https://via.placeholder.com/900x560?text=No+image"}
                  alt="violation"
                  sx={{ width: "100%", height: 420, objectFit: "cover", display: "block" }}
                />
              </Paper>

              <Stack direction="row" spacing={2} sx={{ mt: 2, alignItems: "center" }}>
                <Button variant="contained" startIcon={<Visibility />} disabled sx={{ bgcolor: "#e9eaf5", color: "#6a6a6a", textTransform: "none" }}>
                  Image Evidence
                </Button>

                <Stack direction="row" spacing={1}>
                  <IconButton
                    onClick={() => active && handleOpenVideo(active.videos[0])}
                    sx={{ bgcolor: "#ffffff", border: "1px solid rgba(10,15,30,0.06)" }}
                    title="View video 1"
                  >
                    <PlayCircleOutline sx={{ color: "#4B0082" }} />
                  </IconButton>
                  <IconButton
                    onClick={() => active && handleOpenVideo(active.videos[1])}
                    sx={{ bgcolor: "#ffffff", border: "1px solid rgba(10,15,30,0.06)" }}
                    title="View video 2"
                  >
                    <PlayCircleOutline sx={{ color: "#4B0082" }} />
                  </IconButton>
                </Stack>
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 1.5,
                  height: "100%",
                  border: "1px solid rgba(10,15,30,0.04)",
                }}
              >
                <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, mb: 1 }}>Incident Details</Typography>

                <Stack spacing={1.2}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ color: "#6b6b6b" }}>Driver / Owner</Typography>
                    <Typography sx={{ fontWeight: 700 }}>{active ? active.driver ?? active.owner : "-"}</Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ color: "#6b6b6b" }}>Vehicle Number</Typography>
                    <Typography sx={{ fontWeight: 700 }}>{active ? active.vehicleNumber : "-"}</Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ color: "#6b6b6b" }}>Place</Typography>
                    <Typography sx={{ fontWeight: 700 }}>{active ? active.place : "-"}</Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ color: "#6b6b6b" }}>Date & Time</Typography>
                    <Typography sx={{ fontWeight: 700 }}>{active ? `${active.date} • ${active.time}` : "-"}</Typography>
                  </Stack>

                  <Divider sx={{ my: 1.5 }} />

                  <Typography sx={{ color: "#6b6b6b", fontSize: 13 }}>Notes</Typography>
                  <Typography sx={{ fontSize: 13, color: "#404857" }}>
                    Evidence captured by intersection camera — recommend generating challan and sending notification to owner. All data is auditable and stored for compliance.
                  </Typography>

                  <Divider sx={{ my: 1.5 }} />

                  <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                    <Button variant="contained" sx={{ bgcolor: "#4B0082", px: 3, textTransform: "none", fontWeight: 700 }}>
                      Generate Challan
                    </Button>
                    <Button variant="outlined" sx={{ textTransform: "none" }}>
                      Mark Reviewed
                    </Button>
                    <Button variant="text" sx={{ color: "#6b6b6b" }}>
                      Add Note
                    </Button>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </DialogContent>

        {/* <-- UPDATED: Stop Challan button placed here, next to Close --> */}
        <DialogActions sx={{ px: 3 }}>
          <Button
            variant="outlined"
            color="error"
            onClick={handleStopChallan}
            sx={{
              borderColor: "#d32f2f",
              color: "#d32f2f",
              textTransform: "none",
              fontWeight: 700,
            }}
          >
            Stop Challan
          </Button>

          <Button onClick={handleCloseDetails} sx={{ textTransform: "none" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* VIDEO DIALOG */}
      <Dialog open={openVideo} onClose={handleCloseVideo} fullWidth maxWidth="md">
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>Video Evidence</Typography>
          <IconButton onClick={handleCloseVideo}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 2 }}>
          {videoUrl ? (
            <Box sx={{ width: "100%", height: "100%" }}>
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
          <Button onClick={handleCloseVideo}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Stop Challan feedback */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3500}
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
