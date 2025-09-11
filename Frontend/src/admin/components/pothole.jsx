// src/pages/admin/PotholeDetection.jsx
import React from "react";
import {
  Box,
  Paper,
  Grid,
  Stack,
  Typography,
  Avatar,
  IconButton,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  TextField,
  Snackbar,
  Alert,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Tooltip,
} from "@mui/material";
import {
  ReportProblem,
  Place,
  CalendarToday,
  AccessTime,
  Build,
  CheckCircleOutline,
  Close,
  Search,
  Room,
  InfoOutlined,
} from "@mui/icons-material";

/**
 * PotholeDetection.jsx
 *
 * Premium, distinct UI for pothole reporting & admin actions.
 * - Place at src/pages/admin/PotholeDetection.jsx
 * - Replace placeholder image URLs with real camera / report images when ready.
 *
 * Fonts: include Poppins + Inter in public/index.html head:
 * <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet">
 */

const now = () => new Date();

function formatFull(dt) {
  return new Date(dt).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
function timeAgo(dt) {
  const diff = Date.now() - new Date(dt).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

/* ---------- Mock data ---------- */
const initialReports = [
  {
    id: "PH-1001",
    place: "Ring Road, Near Gate 5",
    lat: "28.6538",
    lon: "77.2275",
    severity: "Critical",
    image: "/Admin/106.jpg",
    reportedAt: new Date(
      new Date().getTime() - 1000 * 60 * 60 * 1.5
    ).toISOString(), // 1.5 hours ago
    reporter: "Road Camera Detection",
    notes: "Automated detection: Large pothole obstructing traffic",
    status: "open",
  },
  {
    id: "PH-1002",
    place: "Main Rd, Opposite Bus Stand",
    lat: "28.6560",
    lon: "77.2100",
    severity: "Major",
    image: "/Admin/11.jpg",
    reportedAt: new Date(
      new Date().getTime() - 1000 * 60 * 60 * 4
    ).toISOString(), // 4 hours ago
    reporter: "Road Camera Detection",
    notes: "Automated detection: Road surface damage detected",
    status: "open",
  },
  {
    id: "PH-1003",
    place: "Service Lane, Sector 12",
    lat: "28.6600",
    lon: "77.2150",
    severity: "Minor",
    image: "/Admin/new.jpeg",
    reportedAt: new Date(
      new Date().getTime() - 1000 * 60 * 60 * 26
    ).toISOString(), // 26 hours ago
    reporter: "Road Camera Detection",
    notes: "Automated detection: Shallow pothole near kerb",
    status: "open",
  },
];


/* ---------- Component ---------- */
export default function PotholeDetection() {
  const [reports, setReports] = React.useState(initialReports);
  const [q, setQ] = React.useState("");
  const [severityFilter, setSeverityFilter] = React.useState("all");

  const [openDetail, setOpenDetail] = React.useState(false);
  const [active, setActive] = React.useState(null);

  const [openDispatchNote, setOpenDispatchNote] = React.useState(false);
  const [dispatchNote, setDispatchNote] = React.useState("");

  const [snack, setSnack] = React.useState({
    open: false,
    msg: "",
    sev: "info",
  });

  // NEW: image modal state
  const [openImageModal, setOpenImageModal] = React.useState(false);
  const [processedImage, setProcessedImage] = React.useState(null);

  async function fetchProcessedImage(filePath) {
    try {
      // Load the original image file from public or uploads
      const response = await fetch(filePath);
      const blob = await response.blob();
      const formData = new FormData();
      formData.append("file", blob, "input.jpg");

      const apiRes = await fetch("http://127.0.0.1:8000/predict/", {
        method: "POST",
        body: formData,
      });

      const data = await apiRes.json();
      console.log(data);
      return "data:image/jpeg;base64," + data.output_image;
    } catch (err) {
      console.error("Error fetching processed image", err);
      return null;
    }
  }

  async function openReportDetail(r) {
    setActive(r);
    setOpenDetail(true);

    // call API for processed version
    const resultImg = await fetchProcessedImage(r.image);
    setProcessedImage(resultImg);
  }

  function closeReportDetail() {
    setOpenDetail(false);
    setActive(null);
    setDispatchNote("");
    setOpenDispatchNote(false);
  }

  function handleResolve() {
    if (!active) return;
    // Mock: mark as resolved
    setReports((prev) =>
      prev.map((p) => (p.id === active.id ? { ...p, status: "resolved" } : p))
    );
    setSnack({
      open: true,
      msg: `Report ${active.id} marked resolved`,
      sev: "success",
    });
    closeReportDetail();
  }

  function handleDispatch() {
    if (!active) return;
    // In real app: call API to dispatch crew with note + coordinates
    // For mock: toggle dispatched flag inside notes
    setReports((prev) =>
      prev.map((p) =>
        p.id === active.id
          ? {
              ...p,
              status: "dispatched",
              notes: `${p.notes} | Dispatch note: ${dispatchNote || "N/A"}`,
            }
          : p
      )
    );
    setSnack({
      open: true,
      msg: `Repair crew dispatched to ${active.id}`,
      sev: "success",
    });
    setOpenDispatchNote(false);
    closeReportDetail();
  }

  // search + filter
  const filtered = reports.filter((r) => {
    if (severityFilter !== "all" && r.severity.toLowerCase() !== severityFilter)
      return false;
    if (!q) return true;
    const s = q.toLowerCase();
    return (
      r.id.toLowerCase().includes(s) ||
      r.place.toLowerCase().includes(s) ||
      (r.reporter && r.reporter.toLowerCase().includes(s))
    );
  });

  return (
    <Box sx={{ p: 4, fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}>
      <style>{`
        .card-left-thumb {
          width: 220px;
          height: 140px;
          border-radius: 12px;
          overflow: hidden;
          flex-shrink: 0;
          box-shadow: 0 8px 24px rgba(12,20,40,0.06);
        }
        .severity-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          padding: 6px 10px;
          border-radius: 10px;
          font-weight: 700;
          box-shadow: 0 8px 20px rgba(75,0,130,0.08);
          color: white;
          font-size: 12px;
        }
        .severity-critical { background: linear-gradient(90deg,#ff5f52,#ff7b4a); }
        .severity-major { background: linear-gradient(90deg,#ffb020,#ff7b00); }
        .severity-minor { background: linear-gradient(90deg,#4caf50,#2e7d32); }
        .pothole-card { transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .pothole-card:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(16,24,40,0.10); }
      `}</style>

      {/* Header */}
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 700,
              color: "#3b0b82",
              fontSize: 22,
            }}
          >
            Pothole Detection By Camera
          </Typography>
          <Typography sx={{ color: "#596a77", mt: 0.5 }}>
           Real-time pothole detection and reporting turning every road scan into actionable safety insights.
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} alignItems="center">
          <FormControl variant="standard" sx={{ minWidth: 150 }}>
            <InputLabel id="sev-filter-label">Severity</InputLabel>
            <Select
              labelId="sev-filter-label"
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              label="Severity"
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="critical">Critical</MenuItem>
              <MenuItem value="major">Major</MenuItem>
              <MenuItem value="minor">Minor</MenuItem>
            </Select>
          </FormControl>
        </Stack>
      </Box>

      {/* List */}
      <Grid container spacing={3}>
        {filtered.map((r) => (
          <Grid item xs={12} key={r.id}>
            <Paper
              elevation={2}
              className="pothole-card"
              sx={{
                p: 2.25,
                borderRadius: 2,
                display: "flex",
                gap: 2,
                alignItems: "center",
                background: "linear-gradient(180deg,#ffffff,#fbfbff)",
              }}
            >
              {/* Thumbnail left */}
              <Box sx={{ position: "relative" }}>
                <Box
                  className="card-left-thumb"
                  component="img"
                  src={r.image}
                  alt={r.id}
                  sx={{
                    objectFit: "cover",
                    display: "block",
                    width: "100%",
                    height: "100%",
                  }}
                />
                <Box
                  className={`severity-badge ${
                    r.severity === "Critical"
                      ? "severity-critical"
                      : r.severity === "Major"
                      ? "severity-major"
                      : "severity-minor"
                  }`}
                >
                  {r.severity}
                </Box>
              </Box>

              {/* Details center */}
              <Box sx={{ flex: 1 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box>
                    <Typography
                      sx={{
                        fontFamily: "'Poppins', sans-serif",
                        fontWeight: 800,
                        fontSize: 16,
                      }}
                    >
                      {r.id}
                    </Typography>
                    <Typography sx={{ color: "#454f5a", fontWeight: 700 }}>
                      {r.place}
                    </Typography>

                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ mt: 1 }}
                      alignItems="center"
                    >
                      <Chip
                        icon={<CalendarToday />}
                        label={formatFull(r.reportedAt)}
                        size="small"
                      />
                      <Chip
                        icon={<AccessTime />}
                        label={timeAgo(r.reportedAt)}
                        size="small"
                      />
                      <Chip
                        icon={<Room />}
                        label={`Lat:${r.lat} Lon:${r.lon}`}
                        size="small"
                      />
                    </Stack>

                    <Typography sx={{ mt: 1, color: "#6b7379" }}>
                      {r.notes}
                    </Typography>
                  </Box>

                  <Box sx={{ textAlign: "right", minWidth: 220 }}>
                    <Stack direction="column" spacing={1} alignItems="flex-end">
                      <Typography
                        sx={{
                          fontWeight: 700,
                          color:
                            r.status === "resolved" ? "#2e7d32" : "#4b0082",
                        }}
                      >
                        {r.status.toUpperCase()}
                      </Typography>

                      <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                        <Button
                          variant="contained"
                          size="small"
                          sx={{
                            bgcolor: "#4B0082",
                            textTransform: "none",
                            fontWeight: 700,
                          }}
                          onClick={() => openReportDetail(r)}
                        >
                          View
                        </Button>
                        <Button
                          variant="text"
                          size="small"
                          onClick={() => {
                            // Mark resolved inline as quick action
                            setReports((prev) =>
                              prev.map((p) =>
                                p.id === r.id ? { ...p, status: "resolved" } : p
                              )
                            );
                            setSnack({
                              open: true,
                              msg: `${r.id} marked resolved`,
                              sev: "success",
                            });
                          }}
                          sx={{ color: "#6b6b6b", textTransform: "none" }}
                        >
                          Resolve
                        </Button>
                      </Stack>
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            </Paper>
          </Grid>
        ))}

        {filtered.length === 0 && (
          <Grid item xs={12}>
            <Paper sx={{ p: 4, textAlign: "center", borderRadius: 2 }}>
              <Typography sx={{ fontWeight: 700 }}>
                No pothole reports match your filter
              </Typography>
              <Typography sx={{ color: "#6b7379", mt: 1 }}>
                Try clearing search or changing severity filter.
              </Typography>
            </Paper>
          </Grid>
        )}
      </Grid>

      {/* ---------------- Detail Modal ---------------- */}
      <Dialog
        open={openDetail}
        onClose={closeReportDetail}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography
              sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}
            >
              {active ? `${active.id} — ${active.place}` : "Report Details"}
            </Typography>
            <Typography sx={{ color: "#6b6b6b", fontSize: 13 }}>
              {active
                ? timeAgo(active.reportedAt) +
                  " • " +
                  formatFull(active.reportedAt)
                : ""}
            </Typography>
          </Box>
          <IconButton onClick={closeReportDetail}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Grid container spacing={3}>
            <Box sx={{ width: "50%" }}>
              <Paper
                elevation={0}
                sx={{
                  position: "relative",
                  borderRadius: 1.5,
                  overflow: "hidden",
                  border: "1px solid rgba(10,15,30,0.04)",
                }}
              >
                <Box
                  component="img"
                    src={processedImage || ""}
          alt="processed"
                  sx={{ width: "100%", height: 480, objectFit: "cover" }}
                />

                {/* INFO BUTTON - opens image modal */}
                <Tooltip title="Open image">
                  <IconButton
                    onClick={() => setOpenImageModal(true)}
                    size="large"
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      bgcolor: "rgba(255,255,255,0.9)",
                      border: "1px solid rgba(0,0,0,0.06)",
                      boxShadow: "0 6px 18px rgba(12,20,40,0.06)",
                    }}
                  >
                    <InfoOutlined />
                  </IconButton>
                </Tooltip>
              </Paper>
            </Box>

            <Box>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 1.5,
                  border: "1px solid rgba(10,15,30,0.04)",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    mb: 1,
                  }}
                >
                  Report Metadata
                </Typography>

                <Stack spacing={1.2}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ color: "#6b6b6b" }}>Report ID</Typography>
                    <Typography sx={{ fontWeight: 700 }}>
                      {active ? active.id : "-"}
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ color: "#6b6b6b" }}>Severity</Typography>
                    <Chip
                      label={active ? active.severity : ""}
                      color="warning"
                      sx={{ fontWeight: 700 }}
                    />
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ color: "#6b6b6b" }}>Location</Typography>
                    <Typography sx={{ fontWeight: 700 }}>
                      {active ? active.place : "-"}
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ color: "#6b6b6b" }}>
                      Coordinates
                    </Typography>
                    <Typography sx={{ fontWeight: 700 }}>
                      {active ? `${active.lat}, ${active.lon}` : "-"}
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ color: "#6b6b6b" }}>
                      Reported By
                    </Typography>
                    <Typography sx={{ fontWeight: 700 }}>
                      {active ? active.reporter : "-"}
                    </Typography>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Typography sx={{ color: "#6b6b6b" }}>
                      Reported At
                    </Typography>
                    <Typography sx={{ fontWeight: 700 }}>
                      {active ? formatFull(active.reportedAt) : "-"}
                    </Typography>
                  </Stack>
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Typography sx={{ color: "#6b6b6b", mb: 1 }}>Notes</Typography>
                <Typography sx={{ mb: 2 }}>
                  {active ? active.notes : "-"}
                </Typography>

                <Stack direction="row" spacing={2} sx={{ mt: 1 }}>
                  <Button
                    variant="contained"
                    sx={{
                      bgcolor: "#4B0082",
                      textTransform: "none",
                      fontWeight: 700,
                    }}
                    onClick={() => {
                      // open dispatch note mini dialog
                      setOpenDispatchNote(true);
                    }}
                  >
                    Dispatch Repair Crew
                  </Button>

                  <Button
                    variant="outlined"
                    sx={{ textTransform: "none" }}
                    onClick={handleResolve}
                  >
                    Mark Resolved
                  </Button>
                </Stack>
              </Paper>
            </Box>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={closeReportDetail} sx={{ textTransform: "none" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Image modal (opened by the 'i' button) */}
      <Dialog
        open={openImageModal}
        onClose={() => setOpenImageModal(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}
          >
            Model Input
          </Typography>
          <IconButton onClick={() => setOpenImageModal(false)}>
            <Close />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Box
            component="img"
            src={processedImage || ""}
            alt="pothole-large"
            sx={{
              width: "100%",
              height: "70vh",
              objectFit: "contain",
              display: "block",
              bgcolor: "black",
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenImageModal(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Dispatch Note Dialog */}
      <Dialog
        open={openDispatchNote}
        onClose={() => setOpenDispatchNote(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Dispatch Repair Crew</DialogTitle>
        <DialogContent dividers>
          <Typography sx={{ color: "#6b6b6b", mb: 2 }}>
            Enter instructions for crew (optional) and confirm dispatch.
          </Typography>
          <TextField
            label="Dispatch Note"
            multiline
            rows={4}
            fullWidth
            value={dispatchNote}
            onChange={(e) => setDispatchNote(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDispatchNote(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              // dispatch action for active or selected via quick dispatch
              if (active) {
                handleDispatch();
              } else {
                // if no active (quick dispatch triggered from list), we find active from state
                setSnack({
                  open: true,
                  msg: "No active report selected",
                  sev: "error",
                });
              }
            }}
            sx={{ bgcolor: "#4B0082", textTransform: "none" }}
          >
            Confirm Dispatch
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={snack.sev}
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
        >
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
