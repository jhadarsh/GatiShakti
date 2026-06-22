// src/pages/AdminLayout.jsx
import * as React from "react";
import {
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  AppBar, Toolbar, Typography, Box, CssBaseline, Avatar, Divider,
  IconButton, Chip, useMediaQuery, useTheme, Switch, Tooltip,
} from "@mui/material";
import {
  Dashboard, Traffic, ReportProblem, DirectionsCar, Construction,
  Menu as MenuIcon, NotificationsNone, BoltOutlined, LocalParking,
  FilterList,
} from "@mui/icons-material";
import LocationSearchingIcon from "@mui/icons-material/LocationSearching";
import MessageIcon from "@mui/icons-material/Message";

import TrafficSignals     from "../components/traffic";
import Violation          from "../components/voilation";
import Breakdown          from "../components/breakdown";
import PotholeDetection   from "../components/pothole";
import AdminDashboard     from "../components/Dashboard";
import AdminSlots         from "../components/Slots";
import Complaint          from "../components/Complaint";
import AnalyticsDashboard from "../components/sewage";
import ParkingManagement  from "../components/Parking";

// ── tokens ──────────────────────────────────────────────────────
const PURPLE       = "#4B0082";
const PURPLE_LIGHT = "#F3EAF9";
const DRAWER_WIDTH = 248;

// ── nav config ───────────────────────────────────────────────────
const ALL_NAV_SECTIONS = [
  {
    label: "Main",
    items: [
      { text: "Dashboard",         icon: <Dashboard sx={{ fontSize: 20 }} /> },
      { text: "Traffic Signal",    icon: <Traffic sx={{ fontSize: 20 }} /> },
      { text: "Violation",         icon: <ReportProblem sx={{ fontSize: 20 }} /> },
      { text: "Vehicle Breakdown", icon: <DirectionsCar sx={{ fontSize: 20 }} /> },
    ],
  },
  {
    label: "Detection",
    items: [
      { text: "Pothole Detection", icon: <LocationSearchingIcon sx={{ fontSize: 20 }} /> },
      { text: "Sewage System",     icon: <Construction sx={{ fontSize: 20 }} /> },
    ],
  },
  {
    label: "City Services",
    items: [
      { text: "Complaints", icon: <MessageIcon sx={{ fontSize: 20 }} /> },
      { text: "Parking",    icon: <LocalParking sx={{ fontSize: 20 }} /> },
    ],
  },
];

// Focused view — only the 3 city-services items
const FOCUSED_NAV_SECTIONS = [
  {
    label: "City Services",
    items: [
      { text: "Dashboard",  icon: <Dashboard sx={{ fontSize: 20 }} /> },
      { text: "Complaints", icon: <MessageIcon sx={{ fontSize: 20 }} /> },
      { text: "Parking",    icon: <LocalParking sx={{ fontSize: 20 }} /> },
    ],
  },
];

const PAGE_TITLES = {
  Dashboard:           "Dashboard Overview",
  "Traffic Signal":    "Traffic Signals",
  Violation:           "Violations",
  "Vehicle Breakdown": "Vehicle Breakdowns",
  "Pothole Detection": "Pothole Detection",
  "Sewage System":     "Sewage System",
  Complaints:          "Complaint Management",
  Parking:             "Parking Management",
};

// ── sidebar ──────────────────────────────────────────────────────
function SidebarContent({ selectedTab, setSelectedTab, onClose, focusedMode, setFocusedMode }) {
  const sections = focusedMode ? FOCUSED_NAV_SECTIONS : ALL_NAV_SECTIONS;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Logo */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 2.5, py: 2.5, borderBottom: "0.5px solid #e5e7eb" }}>
        <Box sx={{ width: 34, height: 34, borderRadius: "10px", bgcolor: PURPLE, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <BoltOutlined sx={{ color: "#fff", fontSize: 18 }} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: 14, fontWeight: 700, color: "#1f1f3b", lineHeight: 1.2, fontFamily: "'Poppins', sans-serif" }}>
            GatiShakti
          </Typography>
          <Typography sx={{ fontSize: 11, color: "#9ca3af" }}>Admin Portal</Typography>
        </Box>
      </Box>

      {/* Nav */}
      <Box sx={{ flex: 1, overflowY: "auto", px: 1.5, pt: 2, pb: 1 }}>
        {sections.map((section) => (
          <Box key={section.label} sx={{ mb: 2 }}>
            <Typography sx={{ fontSize: 10, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em", px: 1, mb: 0.5 }}>
              {section.label}
            </Typography>
            <List disablePadding>
              {section.items.map((item) => {
                const active = selectedTab === item.text;
                return (
                  <ListItem key={item.text} disablePadding sx={{ mb: 0.3 }}>
                    <ListItemButton
                      onClick={() => { setSelectedTab(item.text); if (onClose) onClose(); }}
                      sx={{
                        borderRadius: "9px", py: 1, px: 1.5,
                        bgcolor: active ? PURPLE : "transparent",
                        "&:hover": { bgcolor: active ? PURPLE : PURPLE_LIGHT },
                        transition: "background 0.15s",
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36, color: active ? "#fff" : "#6b6b6b" }}>
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{ fontSize: 13, fontWeight: active ? 600 : 500, fontFamily: "'Inter', sans-serif", color: active ? "#fff" : "#374151" }}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        ))}
      </Box>

      {/* ── Focus mode toggle ── */}
      <Divider sx={{ borderColor: "#e5e7eb" }} />
      <Tooltip
        title={focusedMode ? "Switch to full admin view" : "Focus on City Services only"}
        placement="top"
        arrow
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2.5,
            py: 1.5,
            cursor: "pointer",
            "&:hover": { bgcolor: PURPLE_LIGHT },
            transition: "background 0.15s",
          }}
          onClick={() => setFocusedMode((p) => !p)}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <FilterList sx={{ fontSize: 16, color: focusedMode ? PURPLE : "#9ca3af" }} />
            <Typography sx={{ fontSize: 12, fontWeight: 600, color: focusedMode ? PURPLE : "#6b6b6b", fontFamily: "'Inter', sans-serif" }}>
              City Services Only
            </Typography>
          </Box>
          <Switch
            checked={focusedMode}
            onChange={(e) => { e.stopPropagation(); setFocusedMode((p) => !p); }}
            size="small"
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": { color: PURPLE },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": { bgcolor: PURPLE },
            }}
          />
        </Box>
      </Tooltip>

      {/* Footer */}
      <Divider sx={{ borderColor: "#e5e7eb" }} />
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, px: 2.5, py: 2 }}>
        <Avatar sx={{ bgcolor: PURPLE, width: 32, height: 32, fontSize: 13, fontWeight: 600 }}>A</Avatar>
        <Box>
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#1f1f3b" }}>Admin</Typography>
          <Typography sx={{ fontSize: 11, color: "#9ca3af" }}>Super Admin</Typography>
        </Box>
      </Box>
    </Box>
  );
}

// ── layout ────────────────────────────────────────────────────────
export default function AdminLayout() {
  const [selectedTab,  setSelectedTab]  = React.useState("Dashboard");
  const [mobileOpen,   setMobileOpen]   = React.useState(false);
  // focusedMode ON by default → shows only Dashboard, Complaints, Parking
  const [focusedMode,  setFocusedMode]  = React.useState(true);
  const theme    = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // When switching to focused mode, redirect away from tabs that won't be visible
  React.useEffect(() => {
    const focusedTabs = ["Dashboard", "Complaints", "Parking"];
    if (focusedMode && !focusedTabs.includes(selectedTab)) {
      setSelectedTab("Dashboard");
    }
  }, [focusedMode]);

  return (
    <Box sx={{ display: "flex", bgcolor: "#fff", minHeight: "100vh" }}>
      <CssBaseline />

      {/* Top bar */}
      <AppBar position="fixed" elevation={0}
        sx={{ zIndex: (t) => t.zIndex.drawer + 1, bgcolor: "#fff", borderBottom: "0.5px solid #e5e7eb" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", minHeight: "56px !important", px: { xs: 2, md: 3 } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {isMobile && (
              <IconButton size="small" onClick={() => setMobileOpen(true)} sx={{ color: "#374151" }} aria-label="Open menu">
                <MenuIcon sx={{ fontSize: 22 }} />
              </IconButton>
            )}
            <Box>
              <Typography sx={{ fontSize: 15, fontWeight: 600, color: "#1f1f3b", lineHeight: 1.2 }}>
                {PAGE_TITLES[selectedTab] ?? selectedTab}
              </Typography>
              <Typography sx={{ fontSize: 11, color: "#9ca3af" }}>
                {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {/* Show focused-mode pill in topbar too */}
            {focusedMode && (
              <Chip
                label="City Services"
                size="small"
                sx={{ bgcolor: PURPLE_LIGHT, color: PURPLE, fontWeight: 600, fontSize: 11, borderRadius: "20px" }}
              />
            )}
            <Chip label="Live" size="small"
              sx={{ bgcolor: "#f0fdf4", color: "#16a34a", fontWeight: 600, fontSize: 12, borderRadius: "20px" }} />
            <Box sx={{ width: 34, height: 34, borderRadius: "9px", border: "0.5px solid #e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", position: "relative" }}>
              <NotificationsNone sx={{ fontSize: 19, color: "#6b6b6b" }} />
              <Box sx={{ width: 7, height: 7, borderRadius: "50%", bgcolor: PURPLE, position: "absolute", top: 6, right: 6, border: "1.5px solid #fff" }} />
            </Box>
            <Avatar sx={{ bgcolor: PURPLE, width: 32, height: 32, fontSize: 13, fontWeight: 600 }}>A</Avatar>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Desktop permanent sidebar */}
      {!isMobile && (
        <Drawer variant="permanent"
          sx={{ width: DRAWER_WIDTH, flexShrink: 0, [`& .MuiDrawer-paper`]: { width: DRAWER_WIDTH, boxSizing: "border-box", bgcolor: "#fff", borderRight: "0.5px solid #e5e7eb", mt: "56px" } }}>
          <SidebarContent
            selectedTab={selectedTab} setSelectedTab={setSelectedTab}
            focusedMode={focusedMode} setFocusedMode={setFocusedMode}
          />
        </Drawer>
      )}

      {/* Mobile temporary sidebar */}
      {isMobile && (
        <Drawer variant="temporary" open={mobileOpen} onClose={() => setMobileOpen(false)}
          ModalProps={{ keepMounted: true }}
          sx={{ [`& .MuiDrawer-paper`]: { width: DRAWER_WIDTH, boxSizing: "border-box", bgcolor: "#fff" } }}>
          <SidebarContent
            selectedTab={selectedTab} setSelectedTab={setSelectedTab}
            onClose={() => setMobileOpen(false)}
            focusedMode={focusedMode} setFocusedMode={setFocusedMode}
          />
        </Drawer>
      )}

      {/* Main content */}
      <Box component="main" sx={{ flexGrow: 1, minWidth: 0, mt: "56px" }}>
        {selectedTab === "Dashboard"         && <AdminDashboard />}
        {selectedTab === "Traffic Signal"    && <TrafficSignals />}
        {selectedTab === "Violation"         && <Violation />}
        {selectedTab === "Vehicle Breakdown" && <Breakdown />}
        {selectedTab === "Pothole Detection" && <PotholeDetection />}
        {selectedTab === "Slot Booking"      && <AdminSlots />}
        {selectedTab === "Sewage System"     && <AnalyticsDashboard />}
        {selectedTab === "Complaints"        && <Complaint />}
        {selectedTab === "Parking"           && <ParkingManagement />}
      </Box>
    </Box>
  );
}