// src/pages/admin/Dashboard.jsx
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
} from "@mui/material";
import {
  CameraAlt,
  Traffic,
  DirectionsCar,
  GppGood,
  Build,
  ReportProblem,
  CheckCircle,
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
  BarChart,
  Bar,
  Legend,
} from "recharts";

// Mock Insights Data
const kpis = {
  cameras: 124,
  lanes: 320,
  dailyTraffic: "2.4M",
  compliance: 86,
  accidentsPrevented: 312,
  potholesFixed: 58,
};

const trafficTrend = [
  { day: "Mon", volume: 2100000 },
  { day: "Tue", volume: 2300000 },
  { day: "Wed", volume: 2500000 },
  { day: "Thu", volume: 2400000 },
  { day: "Fri", volume: 2600000 },
];

const complianceData = [
  { name: "Compliant", value: 86 },
  { name: "Violations", value: 14 },
];

const accidentsData = [
  { year: "2021", prevented: 120 },
  { year: "2022", prevented: 180 },
  { year: "2023", prevented: 240 },
  { year: "2024", prevented: 312 },
];

const activityFeed = [
  {
    id: 1,
    text: "Camera #1023 calibrated successfully",
    time: "5 mins ago",
  },
  {
    id: 2,
    text: "Pothole fixed at Sector 44, Gurgaon",
    time: "25 mins ago",
  },
  {
    id: 3,
    text: "Traffic compliance reached 90% peak today",
    time: "2 hrs ago",
  },
  {
    id: 4,
    text: "New AI camera installed at Ring Road",
    time: "4 hrs ago",
  },
];

const COLORS = ["#4caf50", "#f44336"];

export default function PremiumDashboard() {
  return (
    <Box
      sx={{
        p: 4,
        fontFamily: "'Inter', sans-serif",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Typography
        sx={{
          fontFamily: "'Poppins', sans-serif", fontWeight: 700, color: "#4B0082" ,   fontSize: 28,mb:3}}
      >
        Smart City Authority Dashboard
      </Typography>

      {/* KPI Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <KpiCard icon={<CameraAlt />} value={kpis.cameras} label="Cameras Installed" />
        <KpiCard icon={<Traffic />} value={kpis.lanes} label="Lanes Covered" />
        <KpiCard icon={<DirectionsCar />} value={kpis.dailyTraffic} label="Daily Traffic Volume" />
        <KpiCard icon={<GppGood />} value={`${kpis.compliance}%`} label="Compliance Rate" />
        <KpiCard icon={<CheckCircle />} value={kpis.accidentsPrevented} label="Accidents Prevented" />
        <KpiCard icon={<Build />} value={kpis.potholesFixed} label="Potholes Fixed (Week)" />
      </Grid>

     {/* Charts Section */}
<Grid container spacing={4}>
  <Box sx={{ width: '30%', mb: 4 }}>
    <Paper sx={chartCard}>
      <Typography sx={chartTitle}>Traffic Volume Trend</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={trafficTrend}>
          <Line type="monotone" dataKey="volume" stroke="#673ab7" strokeWidth={3} />
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis tickFormatter={(v) => `${(v / 1e6).toFixed(1)}M`} />
          <Tooltip formatter={(v) => `${(v / 1e6).toFixed(2)}M`} />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  </Box>

   <Box sx={{ width: '30%', mb: 4 }}>
    <Paper sx={chartCard}>
      <Typography sx={chartTitle}>Compliance Overview</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={complianceData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {complianceData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Paper>
  </Box>

   <Box sx={{ width: '30%', mb: 4 }}>
    <Paper sx={chartCard}>
      <Typography sx={chartTitle}>Accidents Prevented by Year</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={accidentsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="prevented" fill="#2196f3" barSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  </Box>
</Grid>


      {/* Activity Feed */}
      <Box sx={{ mt: 4 }}>
        <Paper sx={chartCard}>
          <Typography sx={chartTitle}>Recent System Activity</Typography>
          <Divider sx={{ my: 2 }} />
          <List>
            {activityFeed.map((a) => (
              <ListItem key={a.id} sx={{ px: 0 }}>
                <ReportProblem sx={{ color: "#673ab7", mr: 2 }} />
                <ListItemText
                  primary={a.text}
                  secondary={a.time}
                  primaryTypographyProps={{ fontWeight: 600 }}
                  secondaryTypographyProps={{ color: "text.secondary" }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
}

/* ---- KPI CARD COMPONENT ---- */
function KpiCard({ icon, value, label }) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={2}>
      <Paper
        sx={{
          p: 3,
          borderRadius: 3,
          textAlign: "center",
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(12px)",
          boxShadow: "0 8px 24px rgba(12,20,40,0.08)",
          transition: "0.3s",
          "&:hover": { transform: "translateY(-5px)", boxShadow: "0 12px 32px rgba(12,20,40,0.15)" },
        }}
      >
        <Stack spacing={1} alignItems="center">
          <Avatar sx={{ bgcolor: "#673ab7", width: 56, height: 56 }}>{icon}</Avatar>
          <Typography sx={{ fontSize: 28, fontWeight: 700, color: "#1f1f3b" }}>{value}</Typography>
          <Typography sx={{ fontSize: 14, color: "#555" }}>{label}</Typography>
        </Stack>
      </Paper>
    </Grid>
  );
}

/* ---- Styles ---- */
const chartCard = {
  p: 3,
  borderRadius: 3,
  background: "rgba(255,255,255,0.9)",
  backdropFilter: "blur(12px)",
  boxShadow: "0 8px 24px rgba(12,20,40,0.06)",
};
const chartTitle = {
  fontWeight: 700,
  fontSize: 16,
  fontFamily: "'Poppins', sans-serif",
  mb: 2,
  color: "#1f1f3b",
};
