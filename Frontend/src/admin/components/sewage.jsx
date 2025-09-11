import React from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Grid,
  Chip,
  Tooltip,
  useTheme,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartTooltip,
  ResponsiveContainer,
} from "recharts";
import { format, differenceInDays } from "date-fns";

const maintenanceThresholdDays = 30; // Maintenance considered overdue after 30 days

// Mock district-wise sewage maintenance + predictive data
const districtData = [
  {
    district: "Dwarka",
    lastMaintenance: "2025-08-22",
    maintenanceBy: "Govt.",
    predictedOverflowRiskPct: 5, // percentage risk, lower is better
    impactedRoads: ["Sector 10 Road", "Main Dwarka Rd"],
    predictedBlockageInDays: 15,
    historicalMaintenanceDaysAgo: [25, 27, 22, 20, 16, 12, 8, 4, 2, 0], // past 10 cycles
  },
  {
    district: "Rohini",
    lastMaintenance: "2025-07-01",
    maintenanceBy: "Contractor A",
    predictedOverflowRiskPct: 68,
    impactedRoads: ["Sector 15 St", "Rohini Road Ext."],
    predictedBlockageInDays: 5,
    historicalMaintenanceDaysAgo: [45, 44, 42, 35, 33, 30, 28, 25, 18, 20],
  },
  {
    district: "Janakpuri",
    lastMaintenance: "2025-08-15",
    maintenanceBy: "Govt.",
    predictedOverflowRiskPct: 12,
    impactedRoads: ["Janakpuri Rd", "Ring Road"],
    predictedBlockageInDays: 18,
    historicalMaintenanceDaysAgo: [30, 28, 27, 22, 18, 15, 13, 10, 8, 6],
  },
  {
    district: "Lajpat Nagar",
    lastMaintenance: "2025-06-10",
    maintenanceBy: "Contractor B",
    predictedOverflowRiskPct: 85,
    impactedRoads: ["Lajpat Nagar Rd", "Minto Road"],
    predictedBlockageInDays: 2,
    historicalMaintenanceDaysAgo: [65, 60, 58, 55, 50, 45, 40, 35, 30, 28],
  },
  {
    district: "Vasant Kunj",
    lastMaintenance: "2025-08-30",
    maintenanceBy: "Govt.",
    predictedOverflowRiskPct: 8,
    impactedRoads: ["Vasant Kunj Rd", "Golf Course Rd"],
    predictedBlockageInDays: 20,
    historicalMaintenanceDaysAgo: [18, 15, 14, 12, 10, 9, 8, 6, 5, 4],
  },
];

// Helper to check if maintenance overdue
const isOverdue = (date) =>
  differenceInDays(new Date(), new Date(date)) > maintenanceThresholdDays;

// Status and risk color coding based on risk %
const riskColor = (risk) => {
  if (risk >= 70) return "error";
  if (risk >= 30) return "warning";
  return "success";
};

// KPI cards component
const KpiCard = ({ title, value, icon, color }) => (
  <Paper
    elevation={4}
    sx={{
      py: 3,
      px: 4,
      borderRadius: 3,
      bgcolor: (theme) => theme.palette[color].light,
      color: (theme) => theme.palette[color].contrastText,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
    }}
  >
    <Box>
      <Typography variant="h6" sx={{ fontWeight: "700", mb: 1 }}>
        {title}
      </Typography>
      <Typography variant="h3" sx={{ fontWeight: "800", letterSpacing: 1 }}>
        {value}
      </Typography>
    </Box>
    <Box sx={{ fontSize: 60, opacity: 0.15 }}>{icon}</Box>
  </Paper>
);

const AnalyticsDashboard = () => {
  const theme = useTheme();

  const totalDistricts = districtData.length;
  const overdueDistricts = districtData.filter((d) =>
    isOverdue(d.lastMaintenance)
  ).length;
  const highRiskDistricts = districtData.filter(
    (d) => d.predictedOverflowRiskPct >= 70
  ).length;

  // Historical data graph for a district
  const MaintenanceTrendChart = ({ data }) => (
    <ResponsiveContainer width="100%" height={120}>
      <LineChart
        data={data.map((daysAgo, idx) => ({ cycle: idx + 1, daysAgo }))}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.grey[300]} />
        <XAxis dataKey="cycle" tick={{ fontSize: 10 }} />
        <YAxis
          reversed
          tick={{ fontSize: 10 }}
          allowDecimals={false}
          domain={[0, Math.max(...data) + 10]}
        />
        <RechartTooltip
          labelFormatter={(label) => `Cycle ${label}`}
          formatter={(value) => [`${value} days ago`, "Maintenance"]}
        />
        <Line
          type="monotone"
          dataKey="daysAgo"
          stroke={theme.palette.primary.main}
          strokeWidth={2}
          dot
        />
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <Box
      sx={{
        minHeight: "90vh",
        p: { xs: 2, md: 4 },
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <Typography
        variant="h5"
        fontWeight="bold"
        mb={4}
        color="#4B0082"
      >
        Delhi Sewage Maintenance & Overflow Prediction Dashboard
      </Typography>

      {/* Top KPIs */}
      <Grid container spacing={3} mb={5}>
        <Box sx={{width:'30%'}}>
          <KpiCard
            title="Total Districts Monitored"
            value={totalDistricts}
            icon="📍"
            color="primary"
          />
        </Box>
        <Box sx={{width:'30%'}}>
          <KpiCard
            title="Districts Overdue for Maintenance"
            value={overdueDistricts}
            icon={<WarningAmberIcon fontSize="large" />}
            color={overdueDistricts > 0 ? "error" : "success"}
          />
        </Box>
        <Box sx={{width:'30%'}}>
          <KpiCard
            title="High Overflow Risk Districts"
            value={highRiskDistricts}
            icon={<WarningAmberIcon fontSize="large" />}
            color={highRiskDistricts > 0 ? "error" : "success"}
          />
        </Box>
      </Grid>

      {/* Data Table */}
      <Paper elevation={5} sx={{ borderRadius: 4, overflowX: "auto" }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead sx={{ bgcolor: theme.palette.grey[200] }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }}>District</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Last Maintenance</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Maintenance By</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Overflow Risk</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>
                  Predicted Blockage (Days)
                </TableCell>
                <TableCell sx={{ fontWeight: 700, minWidth: 200 }}>
                  Impacted Roads
                </TableCell>
                <TableCell sx={{ fontWeight: 700, minWidth: 120 }}>
                  Maintenance Trend
                </TableCell>
                <TableCell sx={{ fontWeight: 700, minWidth: 250 }}>
                  Insight / Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {districtData.map((row) => {
                const overdue = isOverdue(row.lastMaintenance);
                const riskStatus = riskColor(row.predictedOverflowRiskPct);

                return (
                  <TableRow
                    key={row.district}
                    sx={{
  border: overdue ? `2px solid ${theme.palette.error.main}` : "none",
  color: overdue ? theme.palette.error.contrastText : "inherit",
  "&:hover": {
    // keep background hover effect subtle without red background
    bgcolor: theme.palette.action.hover,
  },
  cursor: "default",
}}

                  >
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="600">
                        {row.district}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {format(new Date(row.lastMaintenance), "dd MMM yyyy")}
                    </TableCell>
                    <TableCell>{row.maintenanceBy}</TableCell>
                    <TableCell>
                      <Tooltip
                        title={`${row.predictedOverflowRiskPct}% overflow risk`}
                      >
                        <Chip
                          label={`${row.predictedOverflowRiskPct}%`}
                          color={riskStatus}
                          icon={
                            riskStatus === "error" ? (
                              <WarningAmberIcon />
                            ) : (
                              <CheckCircleIcon />
                            )
                          }
                          variant="outlined"
                          size="small"
                          sx={{ fontWeight: "bold" }}
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip
                        title={`Predicted blockage in ${row.predictedBlockageInDays} days`}
                      >
                        <Typography
                          sx={{
                            fontWeight: "700",
                            color:
                              row.predictedOverflowRiskPct >= 70
                                ? theme.palette.error.dark
                                : theme.palette.text.primary,
                          }}
                        >
                          {row.predictedBlockageInDays} days
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell>
                      <Tooltip
                        title={`Impacted roads: ${row.impactedRoads.join(
                          ", "
                        )}`}
                      >
                        <Typography sx={{ fontSize: 13, fontStyle: "italic" }}>
                          {row.impactedRoads.join(", ")}
                        </Typography>
                      </Tooltip>
                    </TableCell>
                    <TableCell sx={{ width: 150, py: 1 }}>
                      <MaintenanceTrendChart
                        data={row.historicalMaintenanceDaysAgo}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        fontStyle: "italic",
                        fontSize: 13,
                        paddingRight: 3,
                      }}
                    >
                      {overdue ? (
                        <>
                          <Typography
                            fontWeight="bold"
                            color={theme.palette.error.main}
                            mb={1}
                          >
                            CRITICAL: Maintenance Overdue - Prioritize Immediate
                            Action
                          </Typography>
                          <Typography>
                            High overflow risk backed by predictive model.
                            Potential road blockages imminently expected on{" "}
                            {row.impactedRoads.join(", ")}. Immediate
                            maintenance scheduling required.
                          </Typography>
                        </>
                      ) : (
                        <Typography>
                          Maintenance status normal. Monitor trends regularly.
                        </Typography>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default AnalyticsDashboard;
