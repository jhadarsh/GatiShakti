// src/components/dashboard.jsx
import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Stack,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  CameraAlt,
  Traffic,
  DirectionsCar,
  GppGood,
  Build,
  CheckCircle,
  FiberManualRecord,
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import data from "../../Data/Dashboarddata.json";

// ── colour tokens ──────────────────────────────────────────────
const PURPLE = "#4B0082";
const PURPLE_LIGHT = "#F3EAF9";
const PURPLE_MID = "#7c3aed";

const FEED_COLORS = {
  info: PURPLE_MID,
  success: "#16a34a",
  warning: "#d97706",
  error: "#dc2626",
};

const STATUS_CHIP = {
  Online:   { bg: "#dcfce7", color: "#15803d" },
  Partial:  { bg: "#fef9c3", color: "#a16207" },
  Offline:  { bg: "#fee2e2", color: "#b91c1c" },
};

const COMPLIANCE_COLORS = ["#4B0082", "#e5e7eb"];

const kpiIcons = {
  cameras:            <CameraAlt sx={{ fontSize: 20 }} />,
  lanes:              <Traffic sx={{ fontSize: 20 }} />,
  dailyTraffic:       <DirectionsCar sx={{ fontSize: 20 }} />,
  compliance:         <GppGood sx={{ fontSize: 20 }} />,
  accidentsPrevented: <CheckCircle sx={{ fontSize: 20 }} />,
  potholesFixed:      <Build sx={{ fontSize: 20 }} />,
};

const kpiLabels = {
  cameras:            "Cameras installed",
  lanes:              "Lanes covered",
  dailyTraffic:       "Daily traffic volume",
  compliance:         "Compliance rate",
  accidentsPrevented: "Accidents prevented",
  potholesFixed:      "Potholes fixed (week)",
};

// ── shared styles ──────────────────────────────────────────────
const card = {
  p: 3,
  borderRadius: "12px",
  border: "0.5px solid #e5e7eb",
  boxShadow: "none",
  bgcolor: "#fff",
};

const sectionTitle = {
  fontSize: 13,
  fontWeight: 600,
  fontFamily: "'Poppins', sans-serif",
  color: "#1f1f3b",
  mb: 2,
};

// ── sub-components ─────────────────────────────────────────────
function KpiCard({ id, value, trend, direction }) {
  return (
    <Grid item xs={6} sm={4} md={4} lg={2}>
      <Paper
        sx={{
          p: 2.5,
          borderRadius: "12px",
          border: "0.5px solid #e5e7eb",
          boxShadow: "none",
          bgcolor: "#fafafa",
          transition: "transform 0.18s",
          "&:hover": { transform: "translateY(-3px)" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1.5,
          }}
        >
          <Avatar
            sx={{
              bgcolor: PURPLE_LIGHT,
              color: PURPLE,
              width: 36,
              height: 36,
            }}
          >
            {kpiIcons[id]}
          </Avatar>
          <Typography
            sx={{
              fontSize: 11,
              fontWeight: 600,
              color: direction === "up" ? "#16a34a" : "#dc2626",
            }}
          >
            {trend}
          </Typography>
        </Box>
        <Typography sx={{ fontSize: 22, fontWeight: 700, color: "#1f1f3b", lineHeight: 1 }}>
          {value}
        </Typography>
        <Typography sx={{ fontSize: 11.5, color: "#6b6b6b", mt: 0.5 }}>
          {kpiLabels[id]}
        </Typography>
      </Paper>
    </Grid>
  );
}

function StatusChip({ status }) {
  const s = STATUS_CHIP[status] ?? { bg: "#f3f4f6", color: "#555" };
  return (
    <Chip
      label={status}
      size="small"
      sx={{
        bgcolor: s.bg,
        color: s.color,
        fontWeight: 600,
        fontSize: 11,
        height: 22,
        borderRadius: "20px",
        "& .MuiChip-label": { px: 1.2 },
      }}
    />
  );
}

// ── main dashboard ─────────────────────────────────────────────
export default function AdminDashboard() {
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, fontFamily: "'Inter', sans-serif", bgcolor: "#fff", minHeight: "100vh" }}>
      {/* Page header */}
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{ fontSize: 22, fontWeight: 700, color: PURPLE, fontFamily: "'Poppins', sans-serif" }}
        >
          Smart City Authority
        </Typography>
        <Typography sx={{ fontSize: 13, color: "#6b6b6b" }}>
          Real-time infrastructure and traffic intelligence
        </Typography>
      </Box>

      {/* KPI cards */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {Object.entries(data.kpis).map(([id, kpi]) => (
          <KpiCard key={id} id={id} {...kpi} />
        ))}
      </Grid>

      {/* Charts row */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        {/* Traffic trend */}
        <Grid item xs={12} md={8}>
          <Paper sx={card}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography sx={sectionTitle}>Traffic volume trend</Typography>
              <Chip label="This week" size="small" sx={{ fontSize: 11, bgcolor: "#fafafa", border: "0.5px solid #e5e7eb", borderRadius: "20px" }} />
            </Box>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={data.trafficTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#888" }} axisLine={false} tickLine={false} />
                <YAxis
                  tickFormatter={(v) => `${(v / 1e6).toFixed(1)}M`}
                  tick={{ fontSize: 11, fill: "#888" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip formatter={(v) => `${(v / 1e6).toFixed(2)}M`} contentStyle={{ borderRadius: 8, border: "0.5px solid #e5e7eb", fontSize: 12 }} />
                <Line
                  type="monotone"
                  dataKey="volume"
                  stroke={PURPLE}
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: PURPLE, strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Compliance donut */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ ...card, height: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
              <Typography sx={sectionTitle}>Compliance split</Typography>
              <Chip label="Today" size="small" sx={{ fontSize: 11, bgcolor: "#fafafa", border: "0.5px solid #e5e7eb", borderRadius: "20px" }} />
            </Box>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={data.complianceData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  paddingAngle={3}
                >
                  {data.complianceData.map((_, i) => (
                    <Cell key={i} fill={COMPLIANCE_COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 8, border: "0.5px solid #e5e7eb", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <Stack spacing={0.8}>
              {data.complianceData.map((d, i) => (
                <Box key={d.name} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Box sx={{ width: 10, height: 10, borderRadius: "2px", bgcolor: COMPLIANCE_COLORS[i], flexShrink: 0 }} />
                  <Typography sx={{ fontSize: 12, color: "#6b6b6b", flex: 1 }}>{d.name}</Typography>
                  <Typography sx={{ fontSize: 12, fontWeight: 600, color: "#1f1f3b" }}>{d.value}%</Typography>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      {/* Bottom row */}
      <Grid container spacing={2}>
        {/* Activity feed */}
        <Grid item xs={12} md={6}>
          <Paper sx={card}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
              <Typography sx={sectionTitle}>Recent system activity</Typography>
              <Chip
                label="Live"
                size="small"
                sx={{ fontSize: 11, bgcolor: "#F3EAF9", color: PURPLE, fontWeight: 600, borderRadius: "20px" }}
              />
            </Box>
            <List disablePadding>
              {data.activityFeed.map((item, i) => (
                <ListItem
                  key={item.id}
                  disablePadding
                  sx={{
                    py: 1.2,
                    borderBottom: i < data.activityFeed.length - 1 ? "0.5px solid #f5f5f5" : "none",
                    alignItems: "flex-start",
                    gap: 1.5,
                  }}
                >
                  <FiberManualRecord
                    sx={{ fontSize: 9, color: FEED_COLORS[item.type] ?? PURPLE_MID, mt: 0.7, flexShrink: 0 }}
                  />
                  <ListItemText
                    primary={item.text}
                    secondary={item.time}
                    primaryTypographyProps={{ fontSize: 13, fontWeight: 500, color: "#1f1f3b" }}
                    secondaryTypographyProps={{ fontSize: 11, color: "#9ca3af" }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Zone status table */}
        <Grid item xs={12} md={6}>
          <Paper sx={card}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography sx={sectionTitle}>Signal zone status</Typography>
              <Chip label={`${data.zoneStatus.length} zones`} size="small" sx={{ fontSize: 11, bgcolor: "#fafafa", border: "0.5px solid #e5e7eb", borderRadius: "20px" }} />
            </Box>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {["Zone", "Cameras", "Status"].map((h) => (
                    <TableCell
                      key={h}
                      sx={{ fontSize: 11, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.05em", borderBottom: "0.5px solid #e5e7eb", pb: 1 }}
                    >
                      {h}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.zoneStatus.map((row) => (
                  <TableRow key={row.id} sx={{ "&:last-child td": { border: 0 } }}>
                    <TableCell sx={{ fontSize: 13, color: "#1f1f3b", borderBottom: "0.5px solid #f5f5f5" }}>
                      {row.zone}
                    </TableCell>
                    <TableCell sx={{ fontSize: 13, color: "#6b6b6b", borderBottom: "0.5px solid #f5f5f5" }}>
                      {row.cameras}
                    </TableCell>
                    <TableCell sx={{ borderBottom: "0.5px solid #f5f5f5" }}>
                      <StatusChip status={row.status} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}