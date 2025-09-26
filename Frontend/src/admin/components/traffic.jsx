 
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Avatar,
  Grid,
  Stack,
  IconButton,
  Paper,
  TextField,
  FormHelperText,
  Snackbar,
  Alert,
  Badge,
  Tooltip,
} from "@mui/material";
import { Close, Add } from "@mui/icons-material";
import VideocamIcon from "@mui/icons-material/Videocam";
import { MapPin } from "lucide-react";

// Initial data with proper structure
const initialSignals = [
  {
    name: "ITO",
    img: "/Admin/ITO.png",
    signals: [
      {
        id: "S-001",
        name: "Signal 1",
        top: "20%",
        left: "28%",
        status: "red",
        currentIndex: 0,
        lastUpdateTime: Date.now(),
        greenInterval: 15000, // 15 seconds for demo (adjust as needed)
        dataHistory: [
          {
            stats: { red: 0.0, yellow: 7, green: 12, vehicles: 4 },
            image: "/traffic/Photo1.jpg",
            updated: "2 mins ago",
            timestamp: "10:56 PM",
          },
          {
            stats: { red: 6, yellow: 15, green: 42, vehicles: 14 },
            image: "/traffic/Photo2.jpg",
            updated: "5 mins ago",
            timestamp: "10:53 PM",
          },
          {
            stats: { red: 21, yellow: 10, green: 21, vehicles: 7 },
            image: "/traffic/Photo3.jpg",
            updated: "8 mins ago",
            timestamp: "10:50 PM",
          },
          {
            stats: { red: 10, yellow: 20, green: 51, vehicles: 17 },
            image: "/traffic/Photo4.jpg",
            updated: "11 mins ago",
            timestamp: "10:47 PM",
          },
        ],
        cameraIP: "192.168.10.11",
      },
      {
        id: "S-002",
        name: "Signal 2",
        top: "15%",
        left: "57%",
        status: "green",
        currentIndex: 0,
        lastUpdateTime: Date.now(),
        greenInterval: 12000, // 12 seconds for demo
        dataHistory: [
          {
            stats: { red: 25, yellow: 20, green: 51, vehicles: 17 },
            image: "/traffic/Photo5.jpg",
            updated: "1 min ago",
            timestamp: "10:57 PM",
          },
          {
            stats: { red: 25, yellow: 22, green: 54, vehicles: 18 },
            image: "/traffic/Photo6.jpg",
            updated: "4 mins ago",
            timestamp: "10:54 PM",
          },
          {
            stats: { red: 27, yellow: 15, green: 36, vehicles: 12 },
            image: "/traffic/Photo7.jpg",
            updated: "7 mins ago",
            timestamp: "10:51 PM",
          },
          {
            stats: { red: 18, yellow: 12, green: 36, vehicles: 12 },
            image: "/traffic/Photo8.jpg",
            updated: "10 mins ago",
            timestamp: "10:48 PM",
          },
        ],
        cameraIP: "192.168.10.12",
      },
      // Rest of the signals remain as original structure
      {
        id: "S-003",
        name: "Signal 3",
        top: "46%",
        left: "50%",
        status: "yellow",
        stats: { red: 21, yellow: 10, green: 21, vehicles: 7 },
        image: "/traffic/Photo9.jpg",
        updated: "20 sec ago",
        cameraIP: "192.168.10.13",
      },
      {
        id: "S-004",
        name: "Signal 4",
        top: "66%",
        left: "34%",
        status: "red",
        stats: { red: 10.5, yellow: 13, green: 51, vehicles: 17 },
        image: "/traffic/Photo9.jpg",
        updated: "30 sec ago",
        cameraIP: "192.168.10.14",
      },
      {
        id: "S-005",
        name: "Signal 5",
        top: "5%",
        left: "40%",
        status: "green",
        stats: { red: 25.5, yellow: 23, green: 51, vehicles: 17 },
        image: "/traffic/Photo5.jpg",
        updated: "1 min ago",
        cameraIP: "192.168.10.15",
      },
      {
        id: "S-006",
        name: "Signal 6",
        top: "40%",
        left: "60%",
        status: "yellow",
        stats: { red: 25.5, yellow: 20, green: 54, vehicles: 18 },
        image: "/traffic/Photo9.jpg",
        updated: "45 sec ago",
        cameraIP: "192.168.10.16",
      },
      {
        id: "S-007",
        name: "Signal 7",
        top: "85%",
        left: "40%",
        status: "red",
        stats: { red: 27.0, yellow: 15, green: 36, vehicles: 12 },
        image: "/traffic/Photo9.jpg",
        updated: "3 mins ago",
        cameraIP: "192.168.10.17",
      },
      {
        id: "S-008",
        name: "Signal 8",
        top: "70%",
        left: "55%",
        status: "green",
        stats: { red: 18, yellow: 15, green: 36, vehicles: 12 },
        image: "/traffic/Photo9.jpg",
        updated: "2 mins ago",
        cameraIP: "192.168.10.18",
      },
      {
        id: "S-009",
        name: "Signal 9",
        top: "40%",
        left: "80%",
        status: "yellow",
        stats: { red: 18, yellow: 14, green: 36, vehicles: 12 },
        image: "/traffic/Photo9.jpg",
        updated: "1 min ago",
        cameraIP: "192.168.10.19",
      },
    ],
  },
  {
    name: "Ashram Chowk",
    img: "/Admin/Ashram chowk.png",
    signals: [
      {
        id: "S-001",
        name: "Signal 1",
        top: "8%",
        left: "28%",
        status: "red",
        currentIndex: 0,
        lastUpdateTime: Date.now(),
        greenInterval: 15000, // 15 seconds for demo (adjust as needed)
        dataHistory: [
          {
            stats: { red: 0.0, yellow: 7, green: 12, vehicles: 4 },
            image: "/traffic/Photo1.jpg",
            updated: "2 mins ago",
            timestamp: "10:56 PM",
          },
          {
            stats: { red: 6, yellow: 15, green: 42, vehicles: 14 },
            image: "/traffic/Photo2.jpg",
            updated: "5 mins ago",
            timestamp: "10:53 PM",
          },
          {
            stats: { red: 21, yellow: 10, green: 21, vehicles: 7 },
            image: "/traffic/Photo3.jpg",
            updated: "8 mins ago",
            timestamp: "10:50 PM",
          },
          {
            stats: { red: 10, yellow: 20, green: 51, vehicles: 17 },
            image: "/traffic/Photo4.jpg",
            updated: "11 mins ago",
            timestamp: "10:47 PM",
          },
        ],
        cameraIP: "192.168.10.11",
      },
      {
        id: "S-002",
        name: "Signal 2",
        top: "30%",
        left: "40%",
        status: "green",
        currentIndex: 0,
        lastUpdateTime: Date.now(),
        greenInterval: 12000, // 12 seconds for demo
        dataHistory: [
          {
            stats: { red: 25, yellow: 20, green: 51, vehicles: 17 },
            image: "/traffic/Photo5.jpg",
            updated: "1 min ago",
            timestamp: "10:57 PM",
          },
          {
            stats: { red: 25, yellow: 22, green: 54, vehicles: 18 },
            image: "/traffic/Photo6.jpg",
            updated: "4 mins ago",
            timestamp: "10:54 PM",
          },
          {
            stats: { red: 27, yellow: 15, green: 36, vehicles: 12 },
            image: "/traffic/Photo7.jpg",
            updated: "7 mins ago",
            timestamp: "10:51 PM",
          },
          {
            stats: { red: 18, yellow: 12, green: 36, vehicles: 12 },
            image: "/traffic/Photo8.jpg",
            updated: "10 mins ago",
            timestamp: "10:48 PM",
          },
        ],
        cameraIP: "192.168.10.12",
      },
      // Rest of the signals remain as original structure
      {
        id: "S-003",
        name: "Signal 3",
        top: "46%",
        left: "50%",
        status: "yellow",
        stats: { red: 21, yellow: 10, green: 21, vehicles: 7 },
        image: "/traffic/Photo9.jpg",
        updated: "20 sec ago",
        cameraIP: "192.168.10.13",
      },
      {
        id: "S-004",
        name: "Signal 4",
        top: "75%",
        left: "25%",
        status: "red",
        stats: { red: 10.5, yellow: 13, green: 51, vehicles: 17 },
        image: "/traffic/Photo9.jpg",
        updated: "30 sec ago",
        cameraIP: "192.168.10.14",
      },
      {
        id: "S-005",
        name: "Signal 5",
        top: "48%",
        left: "57%",
        status: "green",
        stats: { red: 25.5, yellow: 23, green: 51, vehicles: 17 },
        image: "/traffic/photo5.jpg",
        updated: "1 min ago",
        cameraIP: "192.168.10.15",
      },
      {
        id: "S-006",
        name: "Signal 6",
        top: "33%",
        left: "68%",
        status: "yellow",
        stats: { red: 25.5, yellow: 20, green: 54, vehicles: 18 },
        image: "/traffic/Photo9.jpg",
        updated: "45 sec ago",
        cameraIP: "192.168.10.16",
      },
      {
        id: "S-007",
        name: "Signal 7",
        top: "58%",
        left: "44%",
        status: "red",
        stats: { red: 27.0, yellow: 15, green: 36, vehicles: 12 },
        image: "/traffic/Photo9.jpg",
        updated: "3 mins ago",
        cameraIP: "192.168.10.17",
      },
      {
        id: "S-008",
        name: "Signal 8",
        top: "70%",
        left: "60%",
        status: "green",
        stats: { red: 18, yellow: 15, green: 36, vehicles: 12 },
        image: "/traffic/Photo9.jpg",
        updated: "2 mins ago",
        cameraIP: "192.168.10.18",
      },
      {
        id: "S-009",
        name: "Signal 9",
        top: "23%",
        left: "80%",
        status: "yellow",
        stats: { red: 18, yellow: 14, green: 36, vehicles: 12 },
        image: "/traffic/Photo9.jpg",
        updated: "1 min ago",
        cameraIP: "192.168.10.19",
      },
    ],
  },
  {
    name: "Dhaula Kuan",
    img: "/Admin/Dhaula Kuan.png",
    signals: [
      {
        id: "S-001",
        name: "Signal 1",
        top: "8%",
        left: "28%",
        status: "red",
        currentIndex: 0,
        lastUpdateTime: Date.now(),
        greenInterval: 15000, // 15 seconds for demo (adjust as needed)
        dataHistory: [
          {
            stats: { red: 0.0, yellow: 7, green: 12, vehicles: 4 },
            image: "/traffic/Photo1.jpg",
            updated: "2 mins ago",
            timestamp: "10:56 PM",
          },
          {
            stats: { red: 6, yellow: 15, green: 42, vehicles: 14 },
            image: "/traffic/Photo2.jpg",
            updated: "5 mins ago",
            timestamp: "10:53 PM",
          },
          {
            stats: { red: 21, yellow: 10, green: 21, vehicles: 7 },
            image: "/traffic/Photo3.jpg",
            updated: "8 mins ago",
            timestamp: "10:50 PM",
          },
          {
            stats: { red: 10, yellow: 20, green: 51, vehicles: 17 },
            image: "/traffic/Photo4.jpg",
            updated: "11 mins ago",
            timestamp: "10:47 PM",
          },
        ],
        cameraIP: "192.168.10.11",
      },
      {
        id: "S-002",
        name: "Signal 2",
        top: "18%",
        left: "62%",
        status: "green",
        currentIndex: 0,
        lastUpdateTime: Date.now(),
        greenInterval: 12000, // 12 seconds for demo
        dataHistory: [
          {
            stats: { red: 25, yellow: 20, green: 51, vehicles: 17 },
            image: "/traffic/Photo5.jpg",
            updated: "1 min ago",
            timestamp: "10:57 PM",
          },
          {
            stats: { red: 25, yellow: 22, green: 54, vehicles: 18 },
            image: "/traffic/Photo6.jpg",
            updated: "4 mins ago",
            timestamp: "10:54 PM",
          },
          {
            stats: { red: 27, yellow: 15, green: 36, vehicles: 12 },
            image: "/traffic/Photo7.jpg",
            updated: "7 mins ago",
            timestamp: "10:51 PM",
          },
          {
            stats: { red: 18, yellow: 12, green: 36, vehicles: 12 },
            image: "/traffic/Photo8.jpg",
            updated: "10 mins ago",
            timestamp: "10:48 PM",
          },
        ],
        cameraIP: "192.168.10.12",
      },
      // Rest of the signals remain as original structure
      {
        id: "S-003",
        name: "Signal 3",
        top: "46%",
        left: "50%",
        status: "yellow",
        stats: { red: 21, yellow: 10, green: 21, vehicles: 7 },
        image: "/traffic/Photo9.jpg",
        updated: "20 sec ago",
        cameraIP: "192.168.10.13",
      },
      {
        id: "S-004",
        name: "Signal 4",
        top: "66%",
        left: "34%",
        status: "red",
        stats: { red: 10.5, yellow: 13, green: 51, vehicles: 17 },
        image: "/traffic/Photo9.jpg",
        updated: "30 sec ago",
        cameraIP: "192.168.10.14",
      },
      {
        id: "S-005",
        name: "Signal 5",
        top: "20%",
        left: "45%",
        status: "green",
        stats: { red: 25.5, yellow: 23, green: 51, vehicles: 17 },
        image: "/traffic/photo5.jpg",
        updated: "1 min ago",
        cameraIP: "192.168.10.15",
      },
      {
        id: "S-006",
        name: "Signal 6",
        top: "38%",
        left: "65%",
        status: "yellow",
        stats: { red: 25.5, yellow: 20, green: 54, vehicles: 18 },
        image: "/traffic/Photo9.jpg",
        updated: "45 sec ago",
        cameraIP: "192.168.10.16",
      },
      {
        id: "S-007",
        name: "Signal 7",
        top: "55%",
        left: "40%",
        status: "red",
        stats: { red: 27.0, yellow: 15, green: 36, vehicles: 12 },
        image: "/traffic/Photo9.jpg",
        updated: "3 mins ago",
        cameraIP: "192.168.10.17",
      },
      {
        id: "S-008",
        name: "Signal 8",
        top: "70%",
        left: "55%",
        status: "green",
        stats: { red: 18, yellow: 15, green: 36, vehicles: 12 },
        image: "/traffic/Photo9.jpg",
        updated: "2 mins ago",
        cameraIP: "192.168.10.18",
      },
      {
        id: "S-009",
        name: "Signal 9",
        top: "30%",
        left: "70%",
        status: "yellow",
        stats: { red: 18, yellow: 14, green: 36, vehicles: 12 },
        image: "/traffic/Photo9.jpg",
        updated: "1 min ago",
        cameraIP: "192.168.10.19",
      },
    ],
  },
  {
    name: "Mukarba Chowk",
    img: "/Admin/Mukarba Chowk.png",
    signals: [
      {
        id: "S-001",
        name: "Signal 1",
        top: "8%",
        left: "28%",
        status: "red",
        currentIndex: 0,
        lastUpdateTime: Date.now(),
        greenInterval: 15000, // 15 seconds for demo (adjust as needed)
        dataHistory: [
          {
            stats: { red: 0.0, yellow: 7, green: 12, vehicles: 4 },
            image: "/traffic/Photo1.jpg",
            updated: "2 mins ago",
            timestamp: "10:56 PM",
          },
          {
            stats: { red: 6, yellow: 15, green: 42, vehicles: 14 },
            image: "/traffic/Photo2.jpg",
            updated: "5 mins ago",
            timestamp: "10:53 PM",
          },
          {
            stats: { red: 21, yellow: 10, green: 21, vehicles: 7 },
            image: "/traffic/Photo3.jpg",
            updated: "8 mins ago",
            timestamp: "10:50 PM",
          },
          {
            stats: { red: 10, yellow: 20, green: 51, vehicles: 17 },
            image: "/traffic/Photo4.jpg",
            updated: "11 mins ago",
            timestamp: "10:47 PM",
          },
        ],
        cameraIP: "192.168.10.11",
      },
      {
        id: "S-002",
        name: "Signal 2",
        top: "18%",
        left: "62%",
        status: "green",
        currentIndex: 0,
        lastUpdateTime: Date.now(),
        greenInterval: 12000, // 12 seconds for demo
        dataHistory: [
          {
            stats: { red: 25, yellow: 20, green: 51, vehicles: 17 },
            image: "/traffic/Photo5.jpg",
            updated: "1 min ago",
            timestamp: "10:57 PM",
          },
          {
            stats: { red: 25, yellow: 22, green: 54, vehicles: 18 },
            image: "/traffic/Photo6.jpg",
            updated: "4 mins ago",
            timestamp: "10:54 PM",
          },
          {
            stats: { red: 27, yellow: 15, green: 36, vehicles: 12 },
            image: "/traffic/Photo7.jpg",
            updated: "7 mins ago",
            timestamp: "10:51 PM",
          },
          {
            stats: { red: 18, yellow: 12, green: 36, vehicles: 12 },
            image: "/traffic/Photo8.jpg",
            updated: "10 mins ago",
            timestamp: "10:48 PM",
          },
        ],
        cameraIP: "192.168.10.12",
      },
      // Rest of the signals remain as original structure
      {
        id: "S-003",
        name: "Signal 3",
        top: "46%",
        left: "50%",
        status: "yellow",
        stats: { red: 21, yellow: 10, green: 21, vehicles: 7 },
        image: "/traffic/Photo9.jpg",
        updated: "20 sec ago",
        cameraIP: "192.168.10.13",
      },
      {
        id: "S-004",
        name: "Signal 4",
        top: "66%",
        left: "34%",
        status: "red",
        stats: { red: 10.5, yellow: 13, green: 51, vehicles: 17 },
        image: "/traffic/Photo9.jpg",
        updated: "30 sec ago",
        cameraIP: "192.168.10.14",
      },
      {
        id: "S-005",
        name: "Signal 5",
        top: "20%",
        left: "45%",
        status: "green",
        stats: { red: 25.5, yellow: 23, green: 51, vehicles: 17 },
        image: "/traffic/photo5.jpg",
        updated: "1 min ago",
        cameraIP: "192.168.10.15",
      },
      {
        id: "S-006",
        name: "Signal 6",
        top: "38%",
        left: "65%",
        status: "yellow",
        stats: { red: 25.5, yellow: 20, green: 54, vehicles: 18 },
        image: "/traffic/Photo9.jpg",
        updated: "45 sec ago",
        cameraIP: "192.168.10.16",
      },
      {
        id: "S-007",
        name: "Signal 7",
        top: "55%",
        left: "40%",
        status: "red",
        stats: { red: 27.0, yellow: 15, green: 36, vehicles: 12 },
        image: "/traffic/Photo9.jpg",
        updated: "3 mins ago",
        cameraIP: "192.168.10.17",
      },
      {
        id: "S-008",
        name: "Signal 8",
        top: "70%",
        left: "55%",
        status: "green",
        stats: { red: 18, yellow: 15, green: 36, vehicles: 12 },
        image: "/traffic/Photo9.jpg",
        updated: "2 mins ago",
        cameraIP: "192.168.10.18",
      },
      {
        id: "S-009",
        name: "Signal 9",
        top: "30%",
        left: "70%",
        status: "yellow",
        stats: { red: 18, yellow: 14, green: 36, vehicles: 12 },
        image: "/traffic/Photo9.jpg",
        updated: "1 min ago",
        cameraIP: "192.168.10.19",
      },
    ],
  },
  {
    name: "Chirag Delhi",
    img: "/Admin/Chirag Delhi.png",
    signals: [
      {
        id: "S-001",
        name: "Signal 1",
        top: "8%",
        left: "28%",
        status: "red",
        currentIndex: 0,
        lastUpdateTime: Date.now(),
        greenInterval: 15000, // 15 seconds for demo (adjust as needed)
        dataHistory: [
          {
            stats: { red: 0.0, yellow: 7, green: 12, vehicles: 4 },
            image: "/traffic/Photo1.jpg",
            updated: "2 mins ago",
            timestamp: "10:56 PM",
          },
          {
            stats: { red: 6, yellow: 15, green: 42, vehicles: 14 },
            image: "/traffic/Photo2.jpg",
            updated: "5 mins ago",
            timestamp: "10:53 PM",
          },
          {
            stats: { red: 21, yellow: 10, green: 21, vehicles: 7 },
            image: "/traffic/Photo3.jpg",
            updated: "8 mins ago",
            timestamp: "10:50 PM",
          },
          {
            stats: { red: 10, yellow: 20, green: 51, vehicles: 17 },
            image: "/traffic/Photo4.jpg",
            updated: "11 mins ago",
            timestamp: "10:47 PM",
          },
        ],
        cameraIP: "192.168.10.11",
      },
      {
        id: "S-002",
        name: "Signal 2",
        top: "18%",
        left: "62%",
        status: "green",
        currentIndex: 0,
        lastUpdateTime: Date.now(),
        greenInterval: 12000, // 12 seconds for demo
        dataHistory: [
          {
            stats: { red: 25, yellow: 20, green: 51, vehicles: 17 },
            image: "/traffic/Photo5.jpg",
            updated: "1 min ago",
            timestamp: "10:57 PM",
          },
          {
            stats: { red: 25, yellow: 22, green: 54, vehicles: 18 },
            image: "/traffic/Photo6.jpg",
            updated: "4 mins ago",
            timestamp: "10:54 PM",
          },
          {
            stats: { red: 27, yellow: 15, green: 36, vehicles: 12 },
            image: "/traffic/Photo7.jpg",
            updated: "7 mins ago",
            timestamp: "10:51 PM",
          },
          {
            stats: { red: 18, yellow: 12, green: 36, vehicles: 12 },
            image: "/traffic/Photo8.jpg",
            updated: "10 mins ago",
            timestamp: "10:48 PM",
          },
        ],
        cameraIP: "192.168.10.12",
      },
      // Rest of the signals remain as original structure
      {
        id: "S-003",
        name: "Signal 3",
        top: "46%",
        left: "50%",
        status: "yellow",
        stats: { red: 21, yellow: 10, green: 21, vehicles: 7 },
        image: "/traffic/Photo9.jpg",
        updated: "20 sec ago",
        cameraIP: "192.168.10.13",
      },
      {
        id: "S-004",
        name: "Signal 4",
        top: "66%",
        left: "34%",
        status: "red",
        stats: { red: 10.5, yellow: 13, green: 51, vehicles: 17 },
        image: "/traffic/Photo9.jpg",
        updated: "30 sec ago",
        cameraIP: "192.168.10.14",
      },
      {
        id: "S-005",
        name: "Signal 5",
        top: "20%",
        left: "45%",
        status: "green",
        stats: { red: 25.5, yellow: 23, green: 51, vehicles: 17 },
        image: "/traffic/photo5.jpg",
        updated: "1 min ago",
        cameraIP: "192.168.10.15",
      },
      {
        id: "S-006",
        name: "Signal 6",
        top: "38%",
        left: "65%",
        status: "yellow",
        stats: { red: 25.5, yellow: 20, green: 54, vehicles: 18 },
        image: "/traffic/Photo9.jpg",
        updated: "45 sec ago",
        cameraIP: "192.168.10.16",
      },
      {
        id: "S-007",
        name: "Signal 7",
        top: "55%",
        left: "40%",
        status: "red",
        stats: { red: 27.0, yellow: 15, green: 36, vehicles: 12 },
        image: "/traffic/Photo9.jpg",
        updated: "3 mins ago",
        cameraIP: "192.168.10.17",
      },
      {
        id: "S-008",
        name: "Signal 8",
        top: "70%",
        left: "55%",
        status: "green",
        stats: { red: 18, yellow: 15, green: 36, vehicles: 12 },
        image: "/traffic/Photo9.jpg",
        updated: "2 mins ago",
        cameraIP: "192.168.10.18",
      },
      {
        id: "S-009",
        name: "Signal 9",
        top: "30%",
        left: "70%",
        status: "yellow",
        stats: { red: 18, yellow: 14, green: 36, vehicles: 12 },
        image: "/traffic/Photo9.jpg",
        updated: "1 min ago",
        cameraIP: "192.168.10.19",
      },
    ],
  },
];

const statusColor = {
  red: "#d32f2f",
  yellow: "#f9a825",
  green: "#2e7d32",
};

export default function TrafficSignals() {
  // State management
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [signalsData, setSignalsData] = useState(initialSignals);
  const [openDetails, setOpenDetails] = useState(false);
  const [activeSignal, setActiveSignal] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [form, setForm] = useState({
    name: "",
    id: "",
    latitude: "",
    longitude: "",
    posX: "",
    posY: "",
    cameraIP: "",
    image: "https://via.placeholder.com/800x450?text=New+Signal+Snapshot",
  });
  const [formErrors, setFormErrors] = useState({});
  const [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  console.log("Component rendered with signalsData:", signalsData);

  // Auto-update functionality for signals with dataHistory
  useEffect(() => {
    console.log("Setting up auto-update interval");
    const interval = setInterval(() => {
      setSignalsData((prevData) => {
        return prevData.map((location) => {
          return {
            ...location,
            signals: location.signals.map((signal) => {
              // Only auto-update signals that have dataHistory
              if (signal.dataHistory && signal.greenInterval) {
                const now = Date.now();
                const timeSinceLastUpdate = now - signal.lastUpdateTime;

                if (timeSinceLastUpdate >= signal.greenInterval) {
                  const nextIndex = (signal.currentIndex + 1) % signal.dataHistory.length;
                  console.log(`Auto-cycling signal ${signal.id} to index ${nextIndex}`);
                  
                  return {
                    ...signal,
                    currentIndex: nextIndex,
                    lastUpdateTime: now,
                    // Update status based on cycling pattern
                    status: nextIndex % 3 === 0 ? "red" : nextIndex % 3 === 1 ? "green" : "yellow",
                  };
                }
              }
              return signal;
            }),
          };
        });
      });
    }, 1000); // Check every second

    return () => {
      console.log("Cleaning up auto-update interval");
      clearInterval(interval);
    };
  }, []);

  // Helper functions
  const hasDataHistory = (signal) => {
    const result = signal && signal.dataHistory && signal.dataHistory.length > 0;
    console.log(`Signal ${signal?.id} has dataHistory:`, result);
    return result;
  };

  const getSafeCurrentData = (signal) => {
    console.log("getSafeCurrentData called with signal:", signal?.id);
    
    if (!signal) {
      console.log("No signal provided, returning default data");
      return {
        stats: { red: 0, yellow: 0, green: 0, vehicles: 0 },
        image: "",
        updated: "-",
        timestamp: "-"
      };
    }

    // If signal has dataHistory, use cycling data
    if (signal.dataHistory && signal.dataHistory.length > 0) {
      const currentIndex = signal.currentIndex || 0;
      console.log(`Signal ${signal.id} using dataHistory index ${currentIndex}`);
      const currentData = signal.dataHistory[currentIndex] || {
        stats: { red: 0, yellow: 0, green: 0, vehicles: 0 },
        image: "",
        updated: "-",
        timestamp: "-"
      };
      console.log("Current data:", currentData);
      return currentData;
    }

    // Otherwise use static data
    console.log(`Signal ${signal.id} using static data`);
    const staticData = {
      stats: signal.stats || { red: 0, yellow: 0, green: 0, vehicles: 0 },
      image: signal.image || "",
      updated: signal.updated || "-",
      timestamp: "-"
    };
    console.log("Static data:", staticData);
    return staticData;
  };

  // Find current signal from current signalsData
  const getCurrentSignalData = (signalId, locationName) => {
    console.log("Finding current signal data for:", signalId, locationName);
    
    if (!signalId || !locationName) return null;
    
    const location = signalsData.find(loc => loc.name === locationName);
    if (!location) {
      console.log("Location not found:", locationName);
      return null;
    }
    
    const signal = location.signals.find(sig => sig.id === signalId);
    console.log("Found signal:", signal?.id);
    return signal;
  };

  // Event handlers
  const handleOpenDetails = (signal) => {
    console.log("Opening details for signal:", signal?.id);
    
    if (!signal) {
      console.error("No signal provided to handleOpenDetails");
      return;
    }

    if (hasDataHistory(signal)) {
      console.log("Signal has dataHistory, manual cycling");
      // Manual cycle for signals with history
      setSignalsData((prevData) => {
        return prevData.map((location) => {
          return {
            ...location,
            signals: location.signals.map((sig) => {
              if (sig.id === signal.id) {
                const nextIndex = (sig.currentIndex + 1) % sig.dataHistory.length;
                console.log(`Manual cycle: ${sig.id} to index ${nextIndex}`);
                
                return {
                  ...sig,
                  currentIndex: nextIndex,
                  lastUpdateTime: Date.now(), // Reset timer on manual click
                };
              }
              return sig;
            }),
          };
        });
      });

      // Find the updated signal to set as active
      setTimeout(() => {
        const updatedSignal = getCurrentSignalData(signal.id, selectedLocation?.name);
        console.log("Setting updated signal as active:", updatedSignal?.id);
        setActiveSignal(updatedSignal);
      }, 0);
    } else {
      console.log("Signal is static, setting as active directly");
      setActiveSignal(signal);
    }
    
    setOpenDetails(true);
  };

  const handleCloseDetails = () => {
    console.log("Closing details dialog");
    setOpenDetails(false);
    setActiveSignal(null);
  };

  const handleOpenAdd = () => {
    console.log("Opening add signal dialog");
    setForm({
      name: "",
      id: `S-${Math.floor(100 + Math.random() * 900)}`,
      latitude: "",
      longitude: "",
      posX: "",
      posY: "",
      cameraIP: "",
      image: "https://via.placeholder.com/800x450?text=New+Signal+Snapshot",
    });
    setFormErrors({});
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    console.log("Closing add signal dialog");
    setOpenAdd(false);
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};
    if (!form.name) errors.name = "Name required";
    if (!form.cameraIP) errors.cameraIP = "Camera IP required";
    if (!form.posX || isNaN(Number(form.posX)) || Number(form.posX) < 0 || Number(form.posX) > 100) {
      errors.posX = "Position (left %) required between 0 and 100";
    }
    if (!form.posY || isNaN(Number(form.posY)) || Number(form.posY) < 0 || Number(form.posY) > 100) {
      errors.posY = "Position (top %) required between 0 and 100";
    }
    
    setFormErrors(errors);
    console.log("Form validation errors:", errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddActivate = () => {
    console.log("Adding new signal");
    if (!validateForm()) return;

    const newSignal = {
      id: form.id,
      name: form.name,
      top: `${form.posY}%`,
      left: `${form.posX}%`,
      status: "green",
      stats: { red: 0, yellow: 0, green: 0, vehicles: 0 },
      image: form.image,
      updated: "just now",
      cameraIP: form.cameraIP,
      latitude: form.latitude,
      longitude: form.longitude,
    };

    if (selectedLocation) {
      setSignalsData(prevData => 
        prevData.map(location => 
          location.name === selectedLocation.name 
            ? { ...location, signals: [...location.signals, newSignal] }
            : location
        )
      );
    }

    setOpenAdd(false);
    setSnack({
      open: true,
      message: "Signal activated and added to map",
      severity: "success",
    });
    console.log("New signal added successfully");
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9, rotateX: -15 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    }),
    hover: {
      scale: 1.05,
      y: -10,
      rotateY: 5,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  const getGradient = (index) => {
    const gradients = [
      "from-blue-500 via-purple-500 to-pink-500",
      "from-emerald-500 via-teal-500 to-cyan-500",
      "from-orange-500 via-red-500 to-pink-500",
      "from-violet-500 via-purple-500 to-indigo-500",
      "from-yellow-500 via-orange-500 to-red-500",
    ];
    return gradients[index % gradients.length];
  };

  return (
    <Box sx={{ fontFamily: "'Inter', sans-serif", minHeight: "100vh", p: 4 }}>
      {/* CSS Styles */}
      <style>{`
        .map-container { 
          border-radius: 12px; 
          overflow: hidden; 
          box-shadow: 0 10px 30px rgba(16,24,40,0.08); 
          background: white; 
          border: 1px solid rgba(15,23,42,0.04); 
        }
        .signal-marker { 
          position: absolute; 
          transform: translate(-50%, -50%); 
          cursor: pointer; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
        }
        .signal-bubble { 
          width: 56px; 
          height: 56px; 
          border-radius: 12px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          background: white; 
          border: 1px solid rgba(0,0,0,0.06); 
          box-shadow: 0 8px 22px rgba(11,15,30,0.06); 
        }
        .pulse { 
          position: absolute; 
          width: 64px; 
          height: 64px; 
          border-radius: 50%; 
          opacity: 0.12; 
          animation: pulse 1.8s infinite; 
          transform: translate(-50%, -50%); 
        }
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(0.95); opacity: 0.14; }
          70% { transform: translate(-50%, -50%) scale(1.6); opacity: 0.02; }
          100% { transform: translate(-50%, -50%) scale(1.9); opacity: 0; }
        }
        .marker-label { 
          position: absolute; 
          transform: translate(-50%, 70%); 
          background: rgba(255,255,255,0.95); 
          padding: 6px 10px; 
          border-radius: 10px; 
          font-size: 12px; 
          box-shadow: 0 8px 20px rgba(10,15,30,0.06); 
          border: 1px solid rgba(0,0,0,0.04);
        }
        .auto-cycling { 
          animation: glow 2s ease-in-out infinite alternate; 
        }
        @keyframes glow {
          from { box-shadow: 0 8px 22px rgba(11,15,30,0.06); }
          to { box-shadow: 0 8px 22px rgba(75,0,130,0.3); }
        }
      `}</style>

      {/* Header */}
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Box>
          <Typography
            variant="h5"
            sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, color: "#4B0082" }}
          >
            Traffic Signals - Authority Console
          </Typography>
          <Typography variant="body2" sx={{ color: "#566477", mt: 0.5 }}>
            Official traffic signal management — S-001 & S-002 auto-cycle every green interval
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            startIcon={<Add />}
            onClick={handleOpenAdd}
            variant="contained"
            sx={{
              bgcolor: "#4B0082",
              px: 3,
              py: 1.05,
              boxShadow: "0 8px 30px rgba(75,0,130,0.12)",
              fontWeight: 600,
            }}
          >
            Add Signal
          </Button>
        </Stack>
      </Box>

      {/* Location Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto mb-6">
        {signalsData.map((location, index) => (
          <motion.div
            key={location.name}
            custom={index}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            onClick={() => {
              console.log("Selected location:", location.name);
              setSelectedLocation(location);
            }}
            className="cursor-pointer group perspective-1000"
          >
            <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${getGradient(index)} p-1 shadow-2xl`}>
              <div className="relative bg-white/90 backdrop-blur-xl rounded-xl p-6 h-48 flex flex-col justify-between border border-white/50">
                {/* Animated background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/10 to-transparent rounded-xl"></div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gray-900/5 rounded-full -translate-y-10 translate-x-10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-gray-900/5 rounded-full translate-y-8 -translate-x-8"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <MapPin className="w-6 h-6 text-gray-700" />
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-3 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-500/30"
                    />
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                    {location.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4">
                    {location.signals.length} Active Signals
                  </p>
                </div>

                {/* Status indicator */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex space-x-2">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        className="w-2 h-2 bg-gray-400/50 rounded-full"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 font-medium">ACTIVE</span>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Map View */}
      <AnimatePresence>
        {selectedLocation && (
          <Paper className="map-container" elevation={0} sx={{ position: "relative", width: "100%", height: { xs: 520, md: 760 } }}>
            <Box
              component="img"
              src={selectedLocation.img}
              alt={selectedLocation.name}
              sx={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "contrast(0.98) saturate(0.98)" }}
            />

            {/* Map Header */}
            <Box sx={{ 
              position: "absolute", 
              top: 18, 
              left: 18, 
              bgcolor: "rgba(255,255,255,0.9)", 
              borderRadius: 10, 
              p: 1.25, 
              display: "flex", 
              gap: 2, 
              alignItems: "center", 
              boxShadow: "0 8px 24px rgba(12,20,40,0.06)", 
              border: "1px solid rgba(0,0,0,0.04)" 
            }}>
              <Avatar sx={{ bgcolor: "#4B0082", width: 38, height: 38 }}>
                <VideocamIcon />
              </Avatar>
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: 13, fontFamily: "'Poppins', sans-serif" }}>
                  {selectedLocation.name}
                </Typography>
                <Typography sx={{ fontSize: 12, color: "#596a7a" }}>
                  {selectedLocation.signals.length} signals active • Click for details
                </Typography>
              </Box>
            </Box>

            {/* Signal Markers */}
            {selectedLocation.signals.map((signal) => {
              const currentLocationData = signalsData.find(loc => loc.name === selectedLocation.name);
              const currentSignal = currentLocationData?.signals.find(sig => sig.id === signal.id);
              const isAutoCycling = hasDataHistory(currentSignal);

              return (
                <Box
                  key={signal.id}
                  className="signal-marker"
                  sx={{ top: signal.top, left: signal.left }}
                  onClick={() => handleOpenDetails(currentSignal)}
                >
                  <Box className="pulse" sx={{ bgcolor: statusColor[currentSignal?.status || signal.status] }} />
                  <Tooltip
                    title={`${signal.name} — ${signal.id} ${
                      isAutoCycling ? `(Auto-cycling every ${currentSignal.greenInterval / 1000}s)` : ""
                    }`}
                    placement="top"
                  >
                    <Box
                      className={`signal-bubble ${isAutoCycling ? "auto-cycling" : ""}`}
                      sx={{ width: 62, height: 62, borderRadius: 14 }}
                    >
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: "top", horizontal: "right" }}
                        badgeContent={
                          <Box sx={{ 
                            width: 12, 
                            height: 12, 
                            bgcolor: statusColor[currentSignal?.status || signal.status], 
                            borderRadius: "50%", 
                            border: "2px solid white" 
                          }} />
                        }
                      >
                        <Avatar sx={{ bgcolor: "#fff", color: "#333", width: 46, height: 46, border: "1px solid rgba(0,0,0,0.04)" }}>
                          <VideocamIcon sx={{ fontSize: 20, color: "#333" }} />
                        </Avatar>
                      </Badge>
                    </Box>
                  </Tooltip>
                  <Box className="marker-label">
                    <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
                      {signal.id}
                      {isAutoCycling && <span style={{ color: "#4B0082" }}> ●</span>}
                    </Typography>
                  </Box>
                </Box>
              );
            })}
          </Paper>
        )}
      </AnimatePresence>

      {/* Details Dialog */}
      <Dialog open={openDetails} onClose={handleCloseDetails} fullWidth maxWidth="md">
        <DialogTitle sx={{ bgcolor: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between", px: 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ bgcolor: activeSignal ? statusColor[activeSignal.status] : "#4B0082" }}>
              <VideocamIcon />
            </Avatar>
            <Box>
              <Typography sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16 }}>
                {activeSignal ? activeSignal.name : ""}
              </Typography>
              <Typography sx={{ fontSize: 12, color: "#6b6b6b" }}>
                {activeSignal && hasDataHistory(activeSignal)
                  ? `${activeSignal.id} • Data Set ${activeSignal.currentIndex + 1} of ${activeSignal.dataHistory.length} • Auto-cycling`
                  : activeSignal
                  ? `${activeSignal.id} • Static data`
                  : ""}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton onClick={handleCloseDetails} size="large">
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent dividers sx={{ bgcolor: "#fbfcfe", px: 3, py: 3 }}>
          <div className="flex gap-6 h-96">
            {/* Left side - Image (70%) */}
            <motion.div
              className="w-[70%] relative"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative h-80 rounded-xl overflow-hidden border border-gray-200 shadow-lg">
                <img
                  src={
                    activeSignal
                      ? getSafeCurrentData(activeSignal).image ||
                        "https://via.placeholder.com/800x450?text=No+image"
                      : "https://via.placeholder.com/800x450?text=No+image"
                  }
                  alt="traffic snapshot"
                  className="w-full h-full object-cover"
                />

                {/* Image overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>

              {/* Camera info below image */}
              <motion.div
                className="mt-3 flex gap-2 flex-wrap"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-700 border">
                  Camera IP: {activeSignal?.cameraIP || "-"}
                </div>
                <div className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-700 border">
                  {activeSignal && hasDataHistory(activeSignal)
                    ? `Updated: ${getSafeCurrentData(activeSignal).updated}`
                    : `Signal: ${activeSignal?.id || "-"}`}
                </div>
                <div className="px-2 py-1 bg-gray-100 rounded text-xs font-medium text-gray-700 border">
                  {activeSignal && hasDataHistory(activeSignal)
                    ? `Timestamp: ${getSafeCurrentData(activeSignal).timestamp}`
                    : `Status: ${activeSignal?.status || "-"}`}
                </div>
              </motion.div>
            </motion.div>

            {/* Right side - Traffic Lights and Stats (30%) */}
            <motion.div
              className="w-[30%] h-80 flex flex-col justify-between"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Header */}
              <div className="mb-3">
                <h3 className="font-bold text-sm text-gray-800 font-['Poppins']">
                  Signal Metrics
                </h3>
                <p className="text-xs text-gray-500">
                  {activeSignal && hasDataHistory(activeSignal)
                    ? `Live Data • Cycling ${activeSignal.greenInterval / 1000}s`
                    : "Static Data"}
                </p>
              </div>

              {/* Traffic Lights */}
           {activeSignal && (
  <div className="flex-1 flex flex-col justify-center items-center space-y-4">
    {/* Red Light */}
    <motion.div
      className="flex flex-col items-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
    >
      <motion.div
        className="w-12 h-12 rounded-full border-3 border-gray-800 relative overflow-hidden shadow-lg bg-red-500"
        animate={{
          opacity: [1, 0.4, 1],
          scale: [1, 1.05, 1],
          boxShadow: [
            "0 0 15px rgba(239, 68, 68, 0.5)",
            "0 0 25px rgba(239, 68, 68, 0.8)",
            "0 0 15px rgba(239, 68, 68, 0.5)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute inset-1.5 rounded-full bg-white opacity-30"
          animate={{ scale: [0.8, 1, 0.8], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <span className="mt-1 text-lg font-bold text-red-600">
        {getSafeCurrentData(activeSignal).stats.red || 0}
      </span>
    </motion.div>

    {/* Yellow Light */}
    <motion.div
      className="flex flex-col items-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
    >
      <motion.div
        className="w-12 h-12 rounded-full border-3 border-gray-800 relative overflow-hidden shadow-lg bg-yellow-400"
        animate={{
          opacity: [1, 0.4, 1],
          scale: [1, 1.05, 1],
          boxShadow: [
            "0 0 15px rgba(251, 191, 36, 0.5)",
            "0 0 25px rgba(251, 191, 36, 0.8)",
            "0 0 15px rgba(251, 191, 36, 0.5)",
          ],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
      >
        <motion.div
          className="absolute inset-1.5 rounded-full bg-white opacity-30"
          animate={{ scale: [0.8, 1, 0.8], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <span className="mt-1 text-lg font-bold text-yellow-600">
        {getSafeCurrentData(activeSignal).stats.yellow || 0}
      </span>
    </motion.div>

    {/* Green Light */}
    <motion.div
      className="flex flex-col items-center"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
    >
      <motion.div
        className="w-12 h-12 rounded-full border-3 border-gray-800 relative overflow-hidden shadow-lg bg-green-500"
        animate={{
          opacity: [1, 0.4, 1],
          scale: [1, 1.05, 1],
          boxShadow: [
            "0 0 15px rgba(34, 197, 94, 0.5)",
            "0 0 25px rgba(34, 197, 94, 0.8)",
            "0 0 15px rgba(34, 197, 94, 0.5)",
          ],
        }}
        transition={{
          duration: 2.2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.6,
        }}
      >
        <motion.div
          className="absolute inset-1.5 rounded-full bg-white opacity-30"
          animate={{ scale: [0.8, 1, 0.8], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
      <span className="mt-1 text-lg font-bold text-green-600">
        {getSafeCurrentData(activeSignal).stats.green || 0}
      </span>
    </motion.div>
  </div>
)}


              {/* Vehicle Count at Bottom */}
              {activeSignal && (
                <motion.div
                  className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="text-center">
                    <h4 className="font-bold text-xs text-gray-700 mb-1">
                      Vehicles Present
                    </h4>
                    <motion.span
                      className="text-2xl font-bold text-gray-800"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {getSafeCurrentData(activeSignal).stats.vehicles || 0}
                    </motion.span>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>Congestion</span>
                        <span>
                          {Math.min(
                            100,
                            Math.round(
                              ((getSafeCurrentData(activeSignal).stats.vehicles || 0) / 50) * 100
                            )
                          )}
                          %
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <motion.div
                          className="bg-gradient-to-r from-green-400 to-red-500 h-1.5 rounded-full"
                          initial={{ width: 0 }}
                          animate={{
                            width: `${Math.min(
                              100,
                              Math.round(
                                ((getSafeCurrentData(activeSignal).stats.vehicles || 0) / 50) * 100
                              )
                            )}%`,
                          }}
                          transition={{ duration: 1, delay: 1 }}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          {activeSignal && hasDataHistory(activeSignal) ? (
            <Button
              variant="contained"
              sx={{ bgcolor: "#4B0082" }}
              onClick={() => handleOpenDetails(activeSignal)}
            >
              Manual Cycle ({activeSignal.currentIndex + 1}/{activeSignal.dataHistory.length})
            </Button>
          ) : (
            <Button variant="contained" sx={{ bgcolor: "#4B0082" }}>
              Acknowledge
            </Button>
          )}
          <Button variant="outlined">Export Data</Button>
          <Button onClick={handleCloseDetails}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Add Signal Dialog */}
      <Dialog open={openAdd} onClose={handleCloseAdd} fullWidth maxWidth="sm">
        <DialogTitle sx={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700 }}>
          Add / Activate Signal
        </DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Signal Name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              fullWidth
              error={!!formErrors.name}
              helperText={formErrors.name}
            />
            <TextField
              label="Signal ID"
              value={form.id}
              onChange={(e) => setForm((f) => ({ ...f, id: e.target.value }))}
              fullWidth
            />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Latitude (optional)"
                  value={form.latitude}
                  onChange={(e) => setForm((f) => ({ ...f, latitude: e.target.value }))}
                  fullWidth
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Longitude (optional)"
                  value={form.longitude}
                  onChange={(e) => setForm((f) => ({ ...f, longitude: e.target.value }))}
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  label="Map left (X%)"
                  value={form.posX}
                  onChange={(e) => setForm((f) => ({ ...f, posX: e.target.value }))}
                  fullWidth
                  error={!!formErrors.posX}
                  helperText={formErrors.posX || "Enter value 0-100 (left percentage on map)"}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Map top (Y%)"
                  value={form.posY}
                  onChange={(e) => setForm((f) => ({ ...f, posY: e.target.value }))}
                  fullWidth
                  error={!!formErrors.posY}
                  helperText={formErrors.posY || "Enter value 0-100 (top percentage on map)"}
                />
              </Grid>
            </Grid>

            <TextField
              label="Camera IP"
              value={form.cameraIP}
              onChange={(e) => setForm((f) => ({ ...f, cameraIP: e.target.value }))}
              fullWidth
              error={!!formErrors.cameraIP}
              helperText={formErrors.cameraIP}
            />
            <FormHelperText sx={{ color: "#6b6b6b" }}>
              Provide map percentage coordinates so admin can place marker precisely. (Latitude/Longitude are recorded but map placement requires X/Y%)
            </FormHelperText>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ pr: 3, pb: 2 }}>
          <Button onClick={handleCloseAdd}>Cancel</Button>
          <Button variant="contained" onClick={handleAddActivate} sx={{ bgcolor: "#4B0082" }}>
            Activate
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          severity={snack.severity}
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}