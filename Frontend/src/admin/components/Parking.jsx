// src/components/Parking.jsx
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Box, Grid, Paper, Typography, Chip, Avatar, IconButton,
  Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions,
  CircularProgress, Snackbar, Alert, Stack, Divider,
  InputAdornment, LinearProgress, Card, CardContent,
  CardActions, Tabs, Tab,
} from "@mui/material";
import {
  LocalParking, Add, Edit, Delete, Close, Search,
  LocationOn, DirectionsCar,
  CheckCircle, Cancel, Refresh, CameraAlt, Image,
} from "@mui/icons-material";
import mockData from "../../Data/Dashboarddata.json";

// ── tokens ──────────────────────────────────────────────────────
const PURPLE = "#4B0082";
const PURPLE_LIGHT = "#F3EAF9";
const BASE = import.meta.env.VITE_SERVER_BACKEND_URL || "http://localhost:8080";
const token = () => localStorage.getItem("token") || "";

// ── helpers ─────────────────────────────────────────────────────
function slotStatus(available, total) {
  const pct = (available / total) * 100;
  if (available === 0) return { label: "Full", color: "#dc2626", bg: "#fee2e2", barColor: "#dc2626" };
  if (pct <= 20) return { label: "Nearly Full", color: "#d97706", bg: "#fef9c3", barColor: "#d97706" };
  return { label: "Available", color: "#16a34a", bg: "#dcfce7", barColor: "#16a34a" };
}

// ── image preview strip ──────────────────────────────────────────
function ImagePreviewStrip({ files, existingUrls, onRemoveFile, onRemoveUrl }) {
  if (!files?.length && !existingUrls?.length) return null;
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
      {existingUrls?.map((url, i) => (
        <Box key={`ex-${i}`} sx={{ position: "relative", width: 72, height: 72 }}>
          <Box component="img" src={url} alt=""
            sx={{ width: 72, height: 72, objectFit: "cover", borderRadius: "8px", border: "0.5px solid #e5e7eb" }} />
          <IconButton size="small" onClick={() => onRemoveUrl(i)}
            sx={{ position: "absolute", top: -6, right: -6, bgcolor: "#fff", border: "0.5px solid #e5e7eb", p: 0.3,
              "&:hover": { bgcolor: "#fee2e2" } }}>
            <Close sx={{ fontSize: 12, color: "#dc2626" }} />
          </IconButton>
        </Box>
      ))}
      {files?.map((file, i) => (
        <Box key={`nw-${i}`} sx={{ position: "relative", width: 72, height: 72 }}>
          <Box component="img" src={URL.createObjectURL(file)} alt=""
            sx={{ width: 72, height: 72, objectFit: "cover", borderRadius: "8px", border: "0.5px solid #e5e7eb" }} />
          <IconButton size="small" onClick={() => onRemoveFile(i)}
            sx={{ position: "absolute", top: -6, right: -6, bgcolor: "#fff", border: "0.5px solid #e5e7eb", p: 0.3,
              "&:hover": { bgcolor: "#fee2e2" } }}>
            <Close sx={{ fontSize: 12, color: "#dc2626" }} />
          </IconButton>
        </Box>
      ))}
    </Box>
  );
}

// ── parking card ────────────────────────────────────────────────
function ParkingCard({ parking, onEdit, onDelete, onUpdateSlots }) {
  const pct = Math.round(((parking.totalSlots - parking.availableSlots) / parking.totalSlots) * 100);
  const ss = slotStatus(parking.availableSlots, parking.totalSlots);
  const [slotsInput, setSlotsInput] = useState("");
  const [editing, setEditing] = useState(false);

  const handleSlotUpdate = () => {
    const v = parseInt(slotsInput, 10);
    if (!isNaN(v) && v >= 0 && v <= parking.totalSlots) {
      onUpdateSlots(parking._id, v);
      setEditing(false);
      setSlotsInput("");
    }
  };

  const firstImage = parking.images?.[0];

  return (
    <Card sx={{ borderRadius: "14px", border: "0.5px solid #e5e7eb", boxShadow: "none", height: "100%", display: "flex",
      flexDirection: "column", transition: "transform 0.18s, box-shadow 0.18s",
      "&:hover": { transform: "translateY(-3px)", boxShadow: "0 8px 24px rgba(75,0,130,0.08)" } }}>
      {/* image or accent bar */}
      {firstImage ? (
        <Box sx={{ position: "relative", height: 130, overflow: "hidden", borderRadius: "14px 14px 0 0" }}>
          <Box component="img" src={firstImage} alt={parking.name}
            sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <Box sx={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.45))" }} />
          {parking.images.length > 1 && (
            <Chip label={`+${parking.images.length - 1} more`} size="small"
              sx={{ position: "absolute", bottom: 8, right: 8, bgcolor: "rgba(0,0,0,0.55)", color: "#fff",
                fontSize: 10, height: 20, fontWeight: 600 }} />
          )}
          <Box sx={{ position: "absolute", top: 8, left: 8 }}>
            <Chip label={ss.label} size="small"
              sx={{ bgcolor: ss.bg, color: ss.color, fontWeight: 700, fontSize: 11, height: 22 }} />
          </Box>
        </Box>
      ) : (
        <Box sx={{ height: 4, bgcolor: ss.barColor, borderRadius: "14px 14px 0 0" }} />
      )}

      <CardContent sx={{ flex: 1, p: 2.5 }}>
        {/* header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1.5 }}>
          <Box sx={{ flex: 1, pr: 1 }}>
            <Typography sx={{ fontSize: 15, fontWeight: 700, color: "#1f1f3b", lineHeight: 1.3, mb: 0.4 }}>
              {parking.name}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <LocationOn sx={{ fontSize: 13, color: "#9ca3af" }} />
              <Typography sx={{ fontSize: 12, color: "#9ca3af" }}>{parking.location}</Typography>
            </Box>
          </Box>
          {!firstImage && (
            <Chip label={ss.label} size="small"
              sx={{ bgcolor: ss.bg, color: ss.color, fontWeight: 700, fontSize: 11, height: 22, flexShrink: 0 }} />
          )}
        </Box>

        {/* description */}
        <Typography sx={{ fontSize: 12.5, color: "#6b6b6b", lineHeight: 1.5, mb: 2,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {parking.description}
        </Typography>

        {/* slot progress */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.7 }}>
            <Typography sx={{ fontSize: 12, color: "#6b6b6b", fontWeight: 500 }}>Occupancy</Typography>
            <Typography sx={{ fontSize: 12, fontWeight: 700, color: ss.color }}>{pct}% filled</Typography>
          </Box>
          <LinearProgress variant="determinate" value={pct}
            sx={{ height: 7, borderRadius: 4, bgcolor: "#f3f4f6",
              "& .MuiLinearProgress-bar": { bgcolor: ss.barColor, borderRadius: 4 } }} />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.7 }}>
            <Typography sx={{ fontSize: 11, color: "#9ca3af" }}>{parking.availableSlots} free</Typography>
            <Typography sx={{ fontSize: 11, color: "#9ca3af" }}>{parking.totalSlots} total</Typography>
          </Box>
        </Box>

        {/* stats row */}
        <Grid container spacing={1}>
          {[
            { value: parking.totalSlots, label: "Total", color: PURPLE },
            { value: parking.availableSlots, label: "Free", color: "#16a34a" },
            { value: `₹${parking.slotPrice}`, label: "/ hr", color: "#1f1f3b" },
          ].map((s) => (
            <Grid item xs={4} key={s.label}>
              <Box sx={{ textAlign: "center", p: 1, bgcolor: "#fafafa", borderRadius: "9px" }}>
                <Typography sx={{ fontSize: 16, fontWeight: 700, color: s.color }}>{s.value}</Typography>
                <Typography sx={{ fontSize: 10, color: "#9ca3af" }}>{s.label}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* landmark */}
        <Box sx={{ mt: 2, p: 1.5, bgcolor: PURPLE_LIGHT, borderRadius: "9px", display: "flex", alignItems: "center", gap: 0.7 }}>
          <DirectionsCar sx={{ fontSize: 14, color: PURPLE }} />
          <Typography sx={{ fontSize: 12, color: PURPLE, fontWeight: 500 }}>{parking.landmark}</Typography>
        </Box>

        {/* quick slot update */}
        {editing ? (
          <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
            <TextField size="small" type="number" placeholder={`0–${parking.totalSlots}`}
              value={slotsInput} onChange={(e) => setSlotsInput(e.target.value)}
              sx={{ flex: 1, "& .MuiOutlinedInput-root": { borderRadius: "8px", fontSize: 13 } }} />
            <Button size="small" variant="contained" onClick={handleSlotUpdate}
              sx={{ bgcolor: PURPLE, borderRadius: "8px", textTransform: "none", fontSize: 12, fontWeight: 600, px: 1.5, minWidth: 0 }}>
              Set
            </Button>
            <IconButton size="small" onClick={() => setEditing(false)}
              sx={{ border: "0.5px solid #e5e7eb", borderRadius: "8px" }}>
              <Close sx={{ fontSize: 15 }} />
            </IconButton>
          </Box>
        ) : (
          <Button size="small" fullWidth variant="outlined" onClick={() => setEditing(true)}
            sx={{ mt: 2, borderColor: "#e5e7eb", color: "#6b6b6b", borderRadius: "9px", textTransform: "none",
              fontSize: 12, fontWeight: 600, "&:hover": { borderColor: PURPLE, color: PURPLE, bgcolor: PURPLE_LIGHT } }}>
            Update Available Slots
          </Button>
        )}
      </CardContent>

      <Divider sx={{ borderColor: "#f5f5f5" }} />
      <CardActions sx={{ px: 2.5, py: 1.5, gap: 1 }}>
        <Button size="small" startIcon={<Edit sx={{ fontSize: 14 }} />} onClick={() => onEdit(parking)}
          sx={{ color: PURPLE, bgcolor: PURPLE_LIGHT, textTransform: "none", fontSize: 12, fontWeight: 600,
            borderRadius: "8px", flex: 1, "&:hover": { bgcolor: "#e9d5f9" } }}>
          Edit
        </Button>
        <Button size="small" startIcon={<Delete sx={{ fontSize: 14 }} />} onClick={() => onDelete(parking._id)}
          sx={{ color: "#dc2626", bgcolor: "#fee2e2", textTransform: "none", fontSize: 12, fontWeight: 600,
            borderRadius: "8px", flex: 1, "&:hover": { bgcolor: "#fecaca" } }}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

// ── form dialog ─────────────────────────────────────────────────
const emptyForm = { name: "", description: "", location: "", landmark: "", totalSlots: "", availableSlots: "", slotPrice: "" };

function ParkingFormDialog({ open, initial, onClose, onSave, loading }) {
  const [form, setForm] = useState(emptyForm);
  // new files picked by user
  const [newFiles, setNewFiles] = useState([]);
  // existing image URLs (edit mode) — user can remove these
  const [existingUrls, setExistingUrls] = useState([]);
  const fileInputRef = useRef(null);
  const isEdit = !!initial?._id;

  useEffect(() => {
    setForm(initial ? {
      name: initial.name || "",
      description: initial.description || "",
      location: initial.location || "",
      landmark: initial.landmark || "",
      totalSlots: initial.totalSlots ?? "",
      availableSlots: initial.availableSlots ?? "",
      slotPrice: initial.slotPrice ?? "",
    } : emptyForm);
    setNewFiles([]);
    setExistingUrls(initial?.images || []);
  }, [initial, open]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const valid = form.name && form.location && form.totalSlots && form.availableSlots && form.slotPrice;

  const handleFileChange = (e) => {
    const picked = Array.from(e.target.files || []);
    setNewFiles((prev) => [...prev, ...picked]);
    e.target.value = "";
  };

  const removeNewFile = (i) => setNewFiles((prev) => prev.filter((_, idx) => idx !== i));
  const removeExistingUrl = (i) => setExistingUrls((prev) => prev.filter((_, idx) => idx !== i));

  const handleSave = () => {
    onSave(form, initial?._id, newFiles, existingUrls);
  };

  const totalImages = existingUrls.length + newFiles.length;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth
      PaperProps={{ sx: { borderRadius: "16px", border: "0.5px solid #e5e7eb", boxShadow: "0 20px 60px rgba(0,0,0,0.12)" } }}>
      <DialogTitle sx={{ pb: 1, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box>
          <Typography sx={{ fontSize: 16, fontWeight: 700, color: "#1f1f3b" }}>
            {isEdit ? "Edit Parking" : "Add New Parking"}
          </Typography>
          <Typography sx={{ fontSize: 12, color: "#9ca3af" }}>
            {isEdit ? "Update parking details" : "Fill in the details below"}
          </Typography>
        </Box>
        <IconButton size="small" onClick={onClose}><Close sx={{ fontSize: 18 }} /></IconButton>
      </DialogTitle>
      <Divider />
      <DialogContent sx={{ pt: 2.5 }}>
        <Stack spacing={2}>
          <TextField label="Parking Name" size="small" fullWidth value={form.name} onChange={set("name")}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "9px" } }} />
          <TextField label="Description" size="small" fullWidth multiline rows={2} value={form.description} onChange={set("description")}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "9px" } }} />
          <Grid container spacing={1.5}>
            <Grid item xs={12} sm={6}>
              <TextField label="Location" size="small" fullWidth value={form.location} onChange={set("location")}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "9px" } }} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="Landmark" size="small" fullWidth value={form.landmark} onChange={set("landmark")}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "9px" } }} />
            </Grid>
          </Grid>
          <Grid container spacing={1.5}>
            <Grid item xs={4}>
              <TextField label="Total Slots" type="number" size="small" fullWidth value={form.totalSlots} onChange={set("totalSlots")}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "9px" } }} />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Available" type="number" size="small" fullWidth value={form.availableSlots} onChange={set("availableSlots")}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "9px" } }} />
            </Grid>
            <Grid item xs={4}>
              <TextField label="Price/hr (₹)" type="number" size="small" fullWidth value={form.slotPrice} onChange={set("slotPrice")}
                InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: "9px" } }} />
            </Grid>
          </Grid>

          {/* image upload */}
          <Box>
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: "#6b6b6b", mb: 1 }}>
              Images {totalImages > 0 && <span style={{ color: PURPLE }}>({totalImages} selected)</span>}
            </Typography>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              style={{ display: "none" }}
              onChange={handleFileChange}
            />
            <Button
              size="small"
              startIcon={<CameraAlt sx={{ fontSize: 15 }} />}
              onClick={() => fileInputRef.current?.click()}
              sx={{ borderColor: "#e5e7eb", color: "#6b6b6b", border: "1px dashed #d1d5db",
                borderRadius: "9px", textTransform: "none", fontSize: 12, fontWeight: 600, px: 2, py: 1,
                width: "100%", "&:hover": { borderColor: PURPLE, color: PURPLE, bgcolor: PURPLE_LIGHT } }}>
              {totalImages > 0 ? "Add More Images" : "Upload Images"}
            </Button>
            <ImagePreviewStrip
              files={newFiles}
              existingUrls={existingUrls}
              onRemoveFile={removeNewFile}
              onRemoveUrl={removeExistingUrl}
            />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5, gap: 1 }}>
        <Button onClick={onClose}
          sx={{ color: "#6b6b6b", textTransform: "none", fontWeight: 600, borderRadius: "9px" }}>
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={!valid || loading} variant="contained"
          sx={{ bgcolor: PURPLE, textTransform: "none", fontWeight: 600, borderRadius: "9px", px: 3,
            "&:hover": { bgcolor: "#3a006f" } }}>
          {loading ? <CircularProgress size={16} color="inherit" /> : isEdit ? "Save Changes" : "Create Parking"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ── main component ───────────────────────────────────────────────
export default function ParkingManagement() {
  const [parkings, setParkings] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState(0);
  const [formOpen, setFormOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);
  const [snack, setSnack] = useState({ open: false, msg: "", severity: "success" });

  const fetchParkings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/api/parking/all`);
      if (!res.ok) throw new Error();
      const data = await res.json();
      setParkings(data.parkings || []);
    } catch {
      setParkings(mockData.parkings);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchParkings(); }, [fetchParkings]);

  useEffect(() => {
    let list = [...parkings];
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter((p) =>
        p.name?.toLowerCase().includes(q) ||
        p.location?.toLowerCase().includes(q) ||
        p.landmark?.toLowerCase().includes(q)
      );
    }
    if (tab === 1) list = list.filter((p) => p.availableSlots === 0);
    if (tab === 2) list = list.filter((p) => p.availableSlots > 0 && p.availableSlots / p.totalSlots <= 0.2);
    setFiltered(list);
  }, [parkings, search, tab]);

  const toast = (msg, severity = "success") => setSnack({ open: true, msg, severity });

  // newFiles: File[] from picker
  // keptUrls: string[] of existing URLs the user didn't remove
  const handleSave = async (form, id, newFiles = [], keptUrls = []) => {
    setActionLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      newFiles.forEach((f) => fd.append("images", f));

      if (id) {
        // ── EDIT: update details first ──────────────────────────
        const res = await fetch(`${BASE}/api/parking/update/${id}`, {
          method: "PUT",
          headers: { Authorization: `Bearer ${token()}` },
          body: fd,
        });
        if (!res.ok) throw new Error();

        // if user added new images, call update-images separately
        if (newFiles.length > 0) {
          const imgFd = new FormData();
          newFiles.forEach((f) => imgFd.append("images", f));
          await fetch(`${BASE}/api/parking/update-images/${id}`, {
            method: "PUT",
            headers: { Authorization: `Bearer ${token()}` },
            body: imgFd,
          });
        }
        toast("Parking updated!");
      } else {
        // ── CREATE ──────────────────────────────────────────────
        const res = await fetch(`${BASE}/api/parking/add`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token()}` },
          body: fd,
        });
        if (!res.ok) throw new Error();
        toast("Parking created!");
      }

      setFormOpen(false);
      setEditTarget(null);
      fetchParkings();
    } catch {
      // local fallback
      if (id) {
        setParkings((prev) => prev.map((p) =>
          p._id === id
            ? { ...p, ...form, totalSlots: +form.totalSlots, availableSlots: +form.availableSlots, slotPrice: +form.slotPrice }
            : p
        ));
        toast("Updated locally (API unavailable).", "warning");
      } else {
        const newP = {
          _id: `pk${Date.now()}`, ...form,
          totalSlots: +form.totalSlots, availableSlots: +form.availableSlots, slotPrice: +form.slotPrice,
          images: newFiles.map((f) => URL.createObjectURL(f)),
          createdAt: new Date().toISOString(),
        };
        setParkings((prev) => [newP, ...prev]);
        toast("Created locally (API unavailable).", "warning");
      }
      setFormOpen(false);
      setEditTarget(null);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this parking?")) return;
    try {
      const res = await fetch(`${BASE}/api/parking/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token()}` },
      });
      if (!res.ok) throw new Error();
      toast("Parking deleted.");
      fetchParkings();
    } catch {
      setParkings((prev) => prev.filter((p) => p._id !== id));
      toast("Deleted locally (API unavailable).", "warning");
    }
  };

  const handleUpdateSlots = async (id, availableSlots) => {
    try {
      const res = await fetch(`${BASE}/api/parking/update-slots/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token()}`, "Content-Type": "application/json" },
        body: JSON.stringify({ availableSlots }),
      });
      if (!res.ok) throw new Error();
      toast("Slots updated!");
      fetchParkings();
    } catch {
      setParkings((prev) => prev.map((p) => p._id === id ? { ...p, availableSlots } : p));
      toast("Updated locally (API unavailable).", "warning");
    }
  };

  const totalSlots = parkings.reduce((a, p) => a + (p.totalSlots || 0), 0);
  const totalFree = parkings.reduce((a, p) => a + (p.availableSlots || 0), 0);
  const fullCount = parkings.filter((p) => p.availableSlots === 0).length;

  return (
    <Box sx={{ p: { xs: 2, md: 4 }, bgcolor: "#fff", minHeight: "100vh" }}>
      {/* header */}
      <Box sx={{ mb: 3, display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography sx={{ fontSize: 22, fontWeight: 700, color: PURPLE, fontFamily: "'Poppins', sans-serif" }}>
            Parking Management
          </Typography>
          <Typography sx={{ fontSize: 13, color: "#6b6b6b" }}>
            Monitor, manage and update city parking facilities
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button size="small" startIcon={<Refresh />} onClick={fetchParkings}
            sx={{ bgcolor: "#fafafa", color: "#6b6b6b", border: "0.5px solid #e5e7eb", textTransform: "none",
              fontWeight: 600, borderRadius: "9px", "&:hover": { bgcolor: "#f3f4f6" } }}>
            Refresh
          </Button>
          <Button size="small" startIcon={<Add />} variant="contained"
            onClick={() => { setEditTarget(null); setFormOpen(true); }}
            sx={{ bgcolor: PURPLE, textTransform: "none", fontWeight: 600, borderRadius: "9px", px: 2,
              "&:hover": { bgcolor: "#3a006f" } }}>
            Add Parking
          </Button>
        </Box>
      </Box>

      {/* stat cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {[
          { icon: <LocalParking sx={{ fontSize: 20 }} />, value: parkings.length, label: "Total locations", color: PURPLE, bg: PURPLE_LIGHT },
          { icon: <DirectionsCar sx={{ fontSize: 20 }} />, value: totalSlots.toLocaleString(), label: "Total slots", color: "#2563eb", bg: "#dbeafe" },
          { icon: <CheckCircle sx={{ fontSize: 20 }} />, value: totalFree.toLocaleString(), label: "Available slots", color: "#16a34a", bg: "#dcfce7" },
          { icon: <Cancel sx={{ fontSize: 20 }} />, value: fullCount, label: "Fully occupied", color: "#dc2626", bg: "#fee2e2" },
        ].map((s) => (
          <Grid item xs={6} sm={3} key={s.label}>
            <Paper sx={{ p: 2.5, borderRadius: "12px", border: "0.5px solid #e5e7eb", boxShadow: "none", bgcolor: "#fafafa" }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Avatar sx={{ bgcolor: s.bg, color: s.color, width: 42, height: 42 }}>{s.icon}</Avatar>
                <Box>
                  <Typography sx={{ fontSize: 22, fontWeight: 700, color: "#1f1f3b", lineHeight: 1 }}>{s.value}</Typography>
                  <Typography sx={{ fontSize: 12, color: "#6b6b6b", mt: 0.3 }}>{s.label}</Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* search + tabs */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2, flexWrap: "wrap" }}>
        <TextField size="small" placeholder="Search by name, location…"
          value={search} onChange={(e) => setSearch(e.target.value)}
          InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ fontSize: 18, color: "#9ca3af" }} /></InputAdornment> }}
          sx={{ width: 280, "& .MuiOutlinedInput-root": { borderRadius: "9px", fontSize: 13 } }} />
        <Tabs value={tab} onChange={(_, v) => setTab(v)}
          sx={{ "& .MuiTab-root": { textTransform: "none", fontSize: 13, fontWeight: 500, minHeight: 36, py: 0 },
            "& .Mui-selected": { color: PURPLE, fontWeight: 700 }, "& .MuiTabs-indicator": { bgcolor: PURPLE } }}>
          <Tab label={`All (${parkings.length})`} />
          <Tab label={`Full (${parkings.filter(p => p.availableSlots === 0).length})`} />
          <Tab label="Nearly Full" />
        </Tabs>
      </Box>

      {/* cards grid */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 8 }}>
          <CircularProgress sx={{ color: PURPLE }} />
        </Box>
      ) : filtered.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 10 }}>
          <LocalParking sx={{ fontSize: 56, color: "#e5e7eb", mb: 1 }} />
          <Typography sx={{ fontSize: 14, color: "#9ca3af" }}>No parking locations found</Typography>
          <Button onClick={() => { setEditTarget(null); setFormOpen(true); }} startIcon={<Add />}
            sx={{ mt: 2, bgcolor: PURPLE_LIGHT, color: PURPLE, textTransform: "none", fontWeight: 600, borderRadius: "9px" }}>
            Add your first parking
          </Button>
        </Box>
      ) : (
        <Grid container spacing={2.5}>
          {filtered.map((p) => (
            <Grid item xs={12} sm={6} lg={4} key={p._id}>
              <ParkingCard
                parking={p}
                onEdit={(pk) => { setEditTarget(pk); setFormOpen(true); }}
                onDelete={handleDelete}
                onUpdateSlots={handleUpdateSlots}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* form dialog */}
      <ParkingFormDialog
        open={formOpen}
        initial={editTarget}
        onClose={() => { setFormOpen(false); setEditTarget(null); }}
        onSave={handleSave}
        loading={actionLoading}
      />

      {/* snackbar */}
      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
        <Alert severity={snack.severity} variant="filled" sx={{ borderRadius: "10px", fontSize: 13 }}>
          {snack.msg}
        </Alert>
      </Snackbar>
    </Box>
  );
}