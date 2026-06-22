// src/components/Complaint.jsx
import React, { useState, useEffect, useCallback } from "react";
import {
  Box, Grid, Paper, Typography, Chip, Avatar, IconButton,
  Button, TextField, Select, MenuItem, FormControl, InputLabel,
  Dialog, DialogTitle, DialogContent, DialogActions,
  Table, TableBody, TableCell, TableHead, TableRow,
  Tabs, Tab, CircularProgress, Snackbar, Alert,
  InputAdornment, Tooltip, Divider, Stack, Badge,
} from "@mui/material";
import {
  ReportProblem, CheckCircle, HourglassTop, ThumbUp,
  Search, FilterList, Visibility, Delete, PlayArrow,
  DoneAll, Close, LocationOn, Person, CalendarToday,
  TrendingUp, PendingActions, TaskAlt,  ZoomIn,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material";
import mockData from "../../Data/Dashboarddata.json";

// ── tokens ──────────────────────────────────────────────────────
const PURPLE = "#4B0082";
const PURPLE_LIGHT = "#F3EAF9";
const BASE = import.meta.env.VITE_SERVER_BACKEND_URL || "http://localhost:8080";
const token = () => localStorage.getItem("token") || "";

// ── helpers ─────────────────────────────────────────────────────
const STATUS_META = {
  Pending:     { color: "#d97706", bg: "#fef9c3", icon: <HourglassTop sx={{ fontSize: 13 }} /> },
  "In Progress":{ color: "#2563eb", bg: "#dbeafe", icon: <PlayArrow sx={{ fontSize: 13 }} /> },
  Resolved:    { color: "#16a34a", bg: "#dcfce7", icon: <CheckCircle sx={{ fontSize: 13 }} /> },
};
const CAT_COLOR = {
  "Traffic Jam": "#7c3aed", Potholes: "#d97706", "Water Logging": "#2563eb",
  "Broken Signals": "#dc2626", Encroachment: "#db2777", Others: "#6b7280",
};

function StatusChip({ status }) {
  const m = STATUS_META[status] ?? STATUS_META.Pending;
  return (
    <Chip
      icon={m.icon}
      label={status}
      size="small"
      sx={{ bgcolor: m.bg, color: m.color, fontWeight: 600, fontSize: 11, height: 24, "& .MuiChip-icon": { color: m.color } }}
    />
  );
}
function CatChip({ cat }) {
  const c = CAT_COLOR[cat] ?? "#6b7280";
  return (
    <Chip label={cat} size="small"
      sx={{ bgcolor: `${c}18`, color: c, fontWeight: 600, fontSize: 11, height: 22 }} />
  );
}

// ── stat card ───────────────────────────────────────────────────
function StatCard({ icon, value, label, color, bg }) {
  return (
    <Paper sx={{ p: 2.5, borderRadius: "12px", border: "0.5px solid #e5e7eb", boxShadow: "none", bgcolor: "#fafafa" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <Avatar sx={{ bgcolor: bg, color, width: 42, height: 42 }}>{icon}</Avatar>
        <Box>
          <Typography sx={{ fontSize: 22, fontWeight: 700, color: "#1f1f3b", lineHeight: 1 }}>{value}</Typography>
          <Typography sx={{ fontSize: 12, color: "#6b6b6b", mt: 0.3 }}>{label}</Typography>
        </Box>
      </Box>
    </Paper>
  );
}

// ── detail dialog ────────────────────────────────────────────────
function ComplaintDetailDialog({ open, complaint, onClose, onStatusChange, loading }) {
  const [comment, setComment] = useState("");
  const [lightbox, setLightbox] = useState(null); // index of image shown fullscreen

  if (!complaint) return null;

  const images = complaint.images || [];

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth
        PaperProps={{ sx: { borderRadius: "16px", border: "0.5px solid #e5e7eb", boxShadow: "0 20px 60px rgba(0,0,0,0.12)" } }}>
        <DialogTitle sx={{ pb: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Box>
            <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#1f1f3b" }}>Complaint Details</Typography>
            <Typography sx={{ fontSize: 12, color: "#9ca3af" }}>ID: {complaint._id?.slice(-8).toUpperCase()}</Typography>
          </Box>
          <IconButton size="small" onClick={onClose}><Close sx={{ fontSize: 18 }} /></IconButton>
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 2.5 }}>
          <Stack spacing={2}>
            {/* status / category / upvotes */}
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <StatusChip status={complaint.status} />
              <CatChip cat={complaint.category} />
              <Chip
                icon={<ThumbUp sx={{ fontSize: 12 }} />}
                label={`${complaint.upvotes} upvotes`}
                size="small"
                sx={{ bgcolor: "#F3EAF9", color: PURPLE, fontWeight: 600, fontSize: 11, height: 24, "& .MuiChip-icon": { color: PURPLE } }}
              />
            </Box>

            {/* description */}
            <Box>
              <Typography sx={{ fontSize: 12, color: "#9ca3af", mb: 0.5, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Description
              </Typography>
              <Typography sx={{ fontSize: 13, color: "#374151", lineHeight: 1.6 }}>{complaint.description}</Typography>
            </Box>

            {/* location + user + date */}
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
                <LocationOn sx={{ fontSize: 15, color: "#9ca3af" }} />
                <Typography sx={{ fontSize: 13, color: "#374151" }}>{complaint.location}</Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
                <Person sx={{ fontSize: 15, color: "#9ca3af" }} />
                <Typography sx={{ fontSize: 13, color: "#374151" }}>{complaint.user?.name}</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
                <CalendarToday sx={{ fontSize: 14, color: "#9ca3af" }} />
                <Typography sx={{ fontSize: 13, color: "#374151" }}>
                  {new Date(complaint.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </Typography>
              </Box>
            </Box>

            {/* ── images ── */}
            {images.length > 0 && (
              <Box>
                <Typography sx={{ fontSize: 12, color: "#9ca3af", mb: 1, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Attached Images ({images.length})
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {images.map((url, i) => (
                    <Box
                      key={i}
                      onClick={() => setLightbox(i)}
                      sx={{
                        width: 80, height: 80, borderRadius: "10px", overflow: "hidden",
                        border: "0.5px solid #e5e7eb", cursor: "pointer", position: "relative",
                        flexShrink: 0,
                        "&:hover .overlay": { opacity: 1 },
                      }}
                    >
                      <Box
                        component="img" src={url} alt={`img-${i}`}
                        sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                      {/* hover overlay */}
                      <Box className="overlay" sx={{
                        position: "absolute", inset: 0, bgcolor: "rgba(75,0,130,0.45)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        opacity: 0, transition: "opacity 0.15s",
                      }}>
                        <ZoomIn sx={{ color: "#fff", fontSize: 22 }} />
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {/* admin actions */}
            {complaint.status !== "Resolved" && (
              <Box sx={{ bgcolor: "#fafafa", borderRadius: "10px", p: 2, border: "0.5px solid #e5e7eb" }}>
                <Typography sx={{ fontSize: 12, fontWeight: 600, color: "#374151", mb: 1.5 }}>Admin Actions</Typography>
                <Stack spacing={1.5}>
                  {complaint.status === "Pending" && (
                    <Button variant="outlined" size="small" startIcon={<PlayArrow />}
                      onClick={() => onStatusChange("in-progress", complaint._id)}
                      disabled={loading}
                      sx={{ borderColor: "#2563eb", color: "#2563eb", borderRadius: "8px", textTransform: "none", fontWeight: 600, "&:hover": { bgcolor: "#dbeafe", borderColor: "#2563eb" } }}>
                      Mark In Progress
                    </Button>
                  )}
                  <TextField
                    size="small" fullWidth multiline rows={2}
                    placeholder="Add resolution comment..."
                    value={comment} onChange={(e) => setComment(e.target.value)}
                    sx={{ "& .MuiOutlinedInput-root": { borderRadius: "9px", fontSize: 13 } }}
                  />
                  <Button variant="contained" size="small" startIcon={<DoneAll />}
                    onClick={() => onStatusChange("resolve", complaint._id, comment)}
                    disabled={loading || !comment.trim()}
                    sx={{ bgcolor: "#16a34a", borderRadius: "8px", textTransform: "none", fontWeight: 600, "&:hover": { bgcolor: "#15803d" } }}>
                    {loading ? <CircularProgress size={16} color="inherit" /> : "Resolve Complaint"}
                  </Button>
                </Stack>
              </Box>
            )}

            {complaint.status === "Resolved" && (
              <Box sx={{ bgcolor: "#dcfce7", borderRadius: "10px", p: 2, display: "flex", alignItems: "center", gap: 1 }}>
                <TaskAlt sx={{ color: "#16a34a", fontSize: 18 }} />
                <Typography sx={{ fontSize: 13, color: "#15803d", fontWeight: 500 }}>
                  This complaint has been resolved.
                </Typography>
              </Box>
            )}
          </Stack>
        </DialogContent>
      </Dialog>

      {/* ── lightbox ── */}
      {lightbox !== null && (
        <Dialog
          open
          onClose={() => setLightbox(null)}
          maxWidth={false}
          PaperProps={{ sx: { bgcolor: "transparent", boxShadow: "none", overflow: "visible" } }}
          BackdropProps={{ sx: { bgcolor: "rgba(0,0,0,0.88)" } }}
        >
          <Box sx={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* close */}
            <IconButton
              onClick={() => setLightbox(null)}
              sx={{ position: "fixed", top: 16, right: 16, bgcolor: "rgba(255,255,255,0.12)", color: "#fff",
                "&:hover": { bgcolor: "rgba(255,255,255,0.22)" } }}>
              <Close />
            </IconButton>

            {/* prev */}
            {images.length > 1 && (
              <IconButton
                onClick={() => setLightbox((lightbox - 1 + images.length) % images.length)}
                sx={{ position: "fixed", left: 16, top: "50%", transform: "translateY(-50%)",
                  bgcolor: "rgba(255,255,255,0.12)", color: "#fff", "&:hover": { bgcolor: "rgba(255,255,255,0.22)" } }}>
                <ChevronLeft sx={{ fontSize: 30 }} />
              </IconButton>
            )}

            {/* image */}
            <Box
              component="img"
              src={images[lightbox]}
              alt={`complaint-${lightbox}`}
              sx={{ maxHeight: "85vh", maxWidth: "90vw", borderRadius: "12px", objectFit: "contain", display: "block" }}
            />

            {/* next */}
            {images.length > 1 && (
              <IconButton
                onClick={() => setLightbox((lightbox + 1) % images.length)}
                sx={{ position: "fixed", right: 16, top: "50%", transform: "translateY(-50%)",
                  bgcolor: "rgba(255,255,255,0.12)", color: "#fff", "&:hover": { bgcolor: "rgba(255,255,255,0.22)" } }}>
                <ChevronRight sx={{ fontSize: 30 }} />
              </IconButton>
            )}

            {/* counter */}
            {images.length > 1 && (
              <Typography sx={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)",
                color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 500, bgcolor: "rgba(0,0,0,0.4)",
                px: 2, py: 0.5, borderRadius: "20px" }}>
                {lightbox + 1} / {images.length}
              </Typography>
            )}
          </Box>
        </Dialog>
      )}
    </>
  );
}

// ── main component ───────────────────────────────────────────────
export default function Complaint() {
  const [complaints, setComplaints] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [catFilter, setCatFilter] = useState("All");
  const [tab, setTab] = useState(0);
  const [selected, setSelected] = useState(null);
  const [snack, setSnack] = useState({ open: false, msg: "", severity: "success" });

  // fetch
  const fetchComplaints = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/api/complaints/all`);
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setComplaints(data.complaints || []);
    } catch {
      setComplaints(mockData.complaints);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchComplaints(); }, [fetchComplaints]);

  // filter
  useEffect(() => {
    let list = [...complaints];
    if (statusFilter !== "All") list = list.filter((c) => c.status === statusFilter);
    if (catFilter !== "All") list = list.filter((c) => c.category === catFilter);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((c) =>
        c.description?.toLowerCase().includes(q) ||
        c.location?.toLowerCase().includes(q) ||
        c.category?.toLowerCase().includes(q)
      );
    }
    setFiltered(list);
  }, [complaints, statusFilter, catFilter, search]);

  const toast = (msg, severity = "success") => setSnack({ open: true, msg, severity });

  const handleStatusChange = async (action, id, comment = "") => {
    setActionLoading(true);
    try {
      const url = `${BASE}/api/complaints/${action}/${id}`;
      const opts = {
        method: "PUT",
        headers: { Authorization: `Bearer ${token()}`, "Content-Type": "application/json" },
        ...(action === "resolve" ? { body: JSON.stringify({ comment }) } : {}),
      };
      const res = await fetch(url, opts);
      if (!res.ok) throw new Error();
      toast(action === "resolve" ? "Complaint resolved!" : "Status updated!");
      setSelected(null);
      fetchComplaints();
    } catch {
      toast("Action failed. Please try again.", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this complaint?")) return;
    try {
      await fetch(`${BASE}/api/complaints/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token()}` },
      });
      toast("Complaint deleted.");
      fetchComplaints();
    } catch {
      toast("Delete failed.", "error");
    }
  };

  // stats
  const stats = {
    total: complaints.length,
    pending: complaints.filter((c) => c.status === "Pending").length,
    inProgress: complaints.filter((c) => c.status === "In Progress").length,
    resolved: complaints.filter((c) => c.status === "Resolved").length,
  };

  // tab-filtered list
  const tabList = tab === 0 ? filtered
    : tab === 1 ? filtered.filter((c) => c.status === "Pending")
    : tab === 2 ? filtered.filter((c) => c.status === "In Progress")
    : filtered.filter((c) => c.status === "Resolved");

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#fff", minHeight: "100vh" }}>
      {/* header */}
      <Box sx={{ mb: 3, display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 1 }}>
        <Box>
          <Typography sx={{ fontSize: 22, fontWeight: 700, color: PURPLE, fontFamily: "'Poppins', sans-serif" }}>
            Complaint Management
          </Typography>
          <Typography sx={{ fontSize: 13, color: "#6b6b6b" }}>
            Review, action and resolve citizen complaints
          </Typography>
        </Box>
        <Button size="small" startIcon={<TrendingUp />} onClick={fetchComplaints}
          sx={{ bgcolor: PURPLE_LIGHT, color: PURPLE, textTransform: "none", fontWeight: 600, borderRadius: "9px", px: 2, "&:hover": { bgcolor: "#e9d5f9" } }}>
          Refresh
        </Button>
      </Box>

      {/* stat cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6} sm={3}><StatCard icon={<ReportProblem sx={{ fontSize: 20 }} />} value={stats.total} label="Total complaints" color={PURPLE} bg={PURPLE_LIGHT} /></Grid>
        <Grid item xs={6} sm={3}><StatCard icon={<PendingActions sx={{ fontSize: 20 }} />} value={stats.pending} label="Pending" color="#d97706" bg="#fef9c3" /></Grid>
        <Grid item xs={6} sm={3}><StatCard icon={<PlayArrow sx={{ fontSize: 20 }} />} value={stats.inProgress} label="In progress" color="#2563eb" bg="#dbeafe" /></Grid>
        <Grid item xs={6} sm={3}><StatCard icon={<TaskAlt sx={{ fontSize: 20 }} />} value={stats.resolved} label="Resolved" color="#16a34a" bg="#dcfce7" /></Grid>
      </Grid>

      {/* filters */}
      <Paper sx={{ p: 2, borderRadius: "12px", border: "0.5px solid #e5e7eb", boxShadow: "none", mb: 2 }}>
        <Grid container spacing={1.5} alignItems="center">
          <Grid item xs={12} sm={5}>
            <TextField fullWidth size="small" placeholder="Search complaints…"
              value={search} onChange={(e) => setSearch(e.target.value)}
              InputProps={{ startAdornment: (<InputAdornment position="start"><Search sx={{ fontSize: 18, color: "#9ca3af" }} /></InputAdornment>) }}
              sx={{ "& .MuiOutlinedInput-root": { borderRadius: "9px", fontSize: 13 } }} />
          </Grid>
          <Grid item xs={6} sm={3}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ fontSize: 13 }}>Status</InputLabel>
              <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}
                sx={{ borderRadius: "9px", fontSize: 13 }}>
                {["All", "Pending", "In Progress", "Resolved"].map((s) => <MenuItem key={s} value={s} sx={{ fontSize: 13 }}>{s}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} sm={4}>
            <FormControl fullWidth size="small">
              <InputLabel sx={{ fontSize: 13 }}>Category</InputLabel>
              <Select value={catFilter} label="Category" onChange={(e) => setCatFilter(e.target.value)}
                sx={{ borderRadius: "9px", fontSize: 13 }}>
                {["All", "Traffic Jam", "Potholes", "Water Logging", "Broken Signals", "Encroachment", "Others"].map((c) => (
                  <MenuItem key={c} value={c} sx={{ fontSize: 13 }}>{c}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* tabs */}
      <Tabs value={tab} onChange={(_, v) => setTab(v)}
        sx={{ mb: 2, "& .MuiTab-root": { textTransform: "none", fontSize: 13, fontWeight: 500, minHeight: 40 }, "& .Mui-selected": { color: PURPLE, fontWeight: 700 }, "& .MuiTabs-indicator": { bgcolor: PURPLE } }}>
        <Tab label={`All (${filtered.length})`} />
        <Tab label={`Pending (${filtered.filter(c=>c.status==="Pending").length})`} />
        <Tab label={`In Progress (${filtered.filter(c=>c.status==="In Progress").length})`} />
        <Tab label={`Resolved (${filtered.filter(c=>c.status==="Resolved").length})`} />
      </Tabs>

      {/* table */}
      <Paper sx={{ borderRadius: "12px", border: "0.5px solid #e5e7eb", boxShadow: "none", overflow: "hidden" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 6 }}><CircularProgress sx={{ color: PURPLE }} /></Box>
        ) : tabList.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <ReportProblem sx={{ fontSize: 48, color: "#e5e7eb", mb: 1 }} />
            <Typography sx={{ fontSize: 14, color: "#9ca3af" }}>No complaints found</Typography>
          </Box>
        ) : (
          <Box sx={{ overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: "#fafafa" }}>
                  {["ID", "Category", "Description", "Location", "Upvotes", "Status", "Date", "Actions"].map((h) => (
                    <TableCell key={h} sx={{ fontSize: 11, fontWeight: 700, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "0.5px solid #e5e7eb", whiteSpace: "nowrap", py: 1.5 }}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {tabList.map((c) => (
                  <TableRow key={c._id} hover sx={{ "&:hover": { bgcolor: "#fafafa" }, "& td": { borderBottom: "0.5px solid #f5f5f5" } }}>
                    <TableCell sx={{ fontSize: 12, fontFamily: "monospace", color: "#6b6b6b", whiteSpace: "nowrap" }}>
                      #{c._id?.slice(-6).toUpperCase()}
                    </TableCell>
                    <TableCell><CatChip cat={c.category} /></TableCell>
                    <TableCell sx={{ maxWidth: 220 }}>
                      <Typography sx={{ fontSize: 13, color: "#374151", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 200 }}>
                        {c.description}
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ fontSize: 12, color: "#6b6b6b", whiteSpace: "nowrap", maxWidth: 160 }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <LocationOn sx={{ fontSize: 13, color: "#9ca3af", flexShrink: 0 }} />
                        <Typography sx={{ fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 140 }}>{c.location}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <ThumbUp sx={{ fontSize: 13, color: PURPLE }} />
                        <Typography sx={{ fontSize: 13, fontWeight: 600, color: PURPLE }}>{c.upvotes}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell><StatusChip status={c.status} /></TableCell>
                    <TableCell sx={{ fontSize: 12, color: "#9ca3af", whiteSpace: "nowrap" }}>
                      {new Date(c.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex", gap: 0.5 }}>
                        <Tooltip title="View details">
                          <IconButton size="small" onClick={() => setSelected(c)}
                            sx={{ bgcolor: PURPLE_LIGHT, color: PURPLE, "&:hover": { bgcolor: "#e9d5f9" }, borderRadius: "7px", width: 28, height: 28 }}>
                            <Visibility sx={{ fontSize: 14 }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete complaint">
                          <IconButton size="small" onClick={() => handleDelete(c._id)}
                            sx={{ bgcolor: "#fee2e2", color: "#dc2626", "&:hover": { bgcolor: "#fecaca" }, borderRadius: "7px", width: 28, height: 28 }}>
                            <Delete sx={{ fontSize: 14 }} />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </Paper>

      {/* detail dialog */}
      <ComplaintDetailDialog
        open={!!selected} complaint={selected}
        onClose={() => setSelected(null)}
        onStatusChange={handleStatusChange}
        loading={actionLoading}
      />

      {/* snackbar */}
      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity={snack.severity} variant="filled" sx={{ borderRadius: "10px", fontSize: 13 }}>{snack.msg}</Alert>
      </Snackbar>
    </Box>
  );
}