import * as React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
  Avatar,
  Divider,
} from "@mui/material";
import {
  Dashboard,
  Traffic,
  ReportProblem,
  DirectionsCar,
  Construction,
} from "@mui/icons-material";
import TrafficSignals from "../components/traffic";
import Violation from "../components/voilation";
import Breakdown from "../components/breakdown";
import PotholeDetection from "../components/pothole";
import AdminDashboard from "../components/dashboard";

import AdminSlots from "../components/Slots";
import Complaint from "../components/Complaint";

import AnalyticsDashboard from "../components/sewage";
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';



const drawerWidth = 260;

export default function AdminLayout() {
  const [selectedTab, setSelectedTab] = React.useState("Dashboard");

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard /> },
    { text: "Traffic Signal", icon: <Traffic /> },
    { text: "Violation", icon: <ReportProblem /> },
    { text: "Vehicle Breakdown", icon: <DirectionsCar /> },

    { text: "Slot Booking", icon: <Traffic /> },
    { text: "User Complains", icon: <Traffic /> },

    { text: "Pothole Detection", icon: <LocationSearchingIcon /> },
    { text: "Sewage System", icon: <Construction /> },

  ];

  return (
    <Box sx={{ display: "flex", fontFamily: "'Poppins', 'Inter', sans-serif" }}>
      <CssBaseline />

      {/* Top Bar */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "white",
          color: "#4B0082", // deep purple
          borderBottom: "1px solid #eee",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ fontWeight: 700, letterSpacing: 0.5 }}
          >
            GatiShakti Admin
          </Typography>
          <Avatar sx={{ bgcolor: "#4B0082", fontWeight: 600 }}>A</Avatar>
        </Toolbar>
      </AppBar>

      {/* Left Navigation Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#fafafa",
            borderRight: "1px solid #eee",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", p: 2 }}>
          <Typography
            variant="subtitle2"
            sx={{
              color: "#6b6b6b",
              mb: 2,
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              textTransform: "uppercase",
              fontSize: "0.75rem",
              letterSpacing: 1,
            }}
          >
          </Typography>
          <List>
            {menuItems.map((item) => (
              <ListItem
                key={item.text}
                disablePadding
                onClick={() => setSelectedTab(item.text)}
              >
                <ListItemButton
                  selected={selectedTab === item.text}
                  sx={{
                    borderRadius: "12px",
                    mb: 1,
                    "&.Mui-selected": {
                      background:
                        "linear-gradient(90deg, #6A0DAD 0%, #8E2DE2 100%)",
                      color: "white",
                      "& .MuiListItemIcon-root": {
                        color: "white",
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color:
                        selectedTab === item.text ? "white" : "#6b6b6b",
                      minWidth: 40,
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        <Divider />
      </Drawer>

      {/* Right Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "white",
          minHeight: "100vh",
        }}
      >
        <Toolbar />
        <Box
          sx={{
            borderRadius: "16px",
            bgcolor: "white",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {selectedTab === "Dashboard" && <AdminDashboard/>}
          {selectedTab === "Traffic Signal" && <TrafficSignals />}
          {selectedTab === "Violation" && <Violation />}
          {selectedTab === "Vehicle Breakdown" && <Breakdown   />}
          {selectedTab === "Pothole Detection" && <PotholeDetection />}

          {selectedTab === "Slot Booking" && <AdminSlots />}
          {selectedTab === "User Complains" && <Complaint />}

          {selectedTab === "Sewage System" && <AnalyticsDashboard />}

        </Box>
      </Box>
    </Box>
  );
}
