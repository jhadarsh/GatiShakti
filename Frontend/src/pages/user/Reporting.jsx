import React, { useState, useEffect, useMemo } from "react";
import { Plus, X, Loader2, AlertCircle, WifiOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

import ComplaintCard from "../../components/user/complaints/Complaintcard";
import PostComplaintModal from "../../components/user/complaints/Postcomplaintmodal";
import StatsBar from "../../components/user/complaints/Statsbar";
import FilterBar from "../../components/user/complaints/Filterbar";
import mockData from "../../Data/Mockcomplaints.json";

/* ─── Constants (merged from constants.js) ────────── */

const BACKEND_URL = import.meta.env.VITE_SERVER_BACKEND_URL || "";

export const API_BASE = `${BACKEND_URL}/api/complaints`;


export const CATEGORIES = [
  "Traffic Jam",
  "Potholes",
  "Water Logging",
  "Broken Signals",
  "Encroachment",
  "Others",
];

export const STATUS_STYLES = {
  Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  "In Progress": "bg-blue-100 text-blue-700 border-blue-200",
  Resolved: "bg-green-100 text-green-700 border-green-200",
};

export const CATEGORY_ICONS = {
  "Traffic Jam": "🚦",
  Potholes: "🕳️",
  "Water Logging": "🌊",
  "Broken Signals": "🚨",
  Encroachment: "🏗️",
  Others: "📌",
};

// Mock data split from the JSON file
const MOCK_COMPLAINTS = mockData;
const MOCK_MY_COMPLAINTS = mockData.filter((c) => c.userId === "mock-me");

/* ─── Fetch helper with JSON mock fallback ────────── */

const fetchWithFallback = async (url, options, mockFallback) => {
  if (!url) {
    // No API configured — go straight to mock
    await new Promise((r) => setTimeout(r, 400));
    return { data: { success: true, complaints: mockFallback }, isMock: true };
  }
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return { data, isMock: false };
  } catch {
    // API failed — silently fall back to mock JSON
    await new Promise((r) => setTimeout(r, 400));
    return { data: { success: true, complaints: mockFallback }, isMock: true };
  }
};

/* ─── Reporting Page ──────────────────────────────── */

const Reporting = () => {
  const { token, isAuthenticated } = useAuth();

  const [activeTab, setActiveTab] = useState("all");
  const [allComplaints, setAllComplaints] = useState([]);
  const [myComplaints, setMyComplaints] = useState([]);
  const [loadingAll, setLoadingAll] = useState(true);
  const [loadingMine, setLoadingMine] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [upvotingIds, setUpvotingIds] = useState(new Set());
  const [deletingIds, setDeletingIds] = useState(new Set());
  const [upvotedIds, setUpvotedIds] = useState(new Set());
  const [error, setError] = useState("");
  const [isMockData, setIsMockData] = useState(false);

  const [filterCat, setFilterCat] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [search, setSearch] = useState("");

  /* ── Fetch all complaints ── */
  const fetchAllComplaints = async () => {
    setLoadingAll(true);
    const { data, isMock } = await fetchWithFallback(
      API_BASE ? `${API_BASE}/all` : "",
      {},
      MOCK_COMPLAINTS
    );
    if (data.success) {
      setAllComplaints(data.complaints || []);
      if (isMock) setIsMockData(true);
    }
    setLoadingAll(false);
  };

  /* ── Fetch my complaints ── */
  const fetchMyComplaints = async () => {
    if (!token) { setLoadingMine(false); return; }
    setLoadingMine(true);
    const { data, isMock } = await fetchWithFallback(
      API_BASE ? `${API_BASE}/user/my-complaints` : "",
      { headers: { Authorization: `Bearer ${token}` } },
      MOCK_MY_COMPLAINTS
    );
    if (data.success) {
      setMyComplaints(data.complaints || []);
      if (isMock) setIsMockData(true);
    }
    setLoadingMine(false);
  };

  useEffect(() => {
    fetchAllComplaints();
    fetchMyComplaints();
  }, [token]);

  /* ── Upvote toggle ── */
  const handleUpvoteToggle = async (id) => {
    if (!isAuthenticated) { setError("Please login to upvote complaints."); return; }
    setUpvotingIds((p) => new Set(p).add(id));
    const alreadyUpvoted = upvotedIds.has(id);

    try {
      if (isMockData || !API_BASE) {
        await new Promise((r) => setTimeout(r, 300));
        const delta = alreadyUpvoted ? -1 : 1;
        const update = (list) =>
          list.map((c) => c._id === id ? { ...c, upvotes: (c.upvotes || 0) + delta } : c);
        setAllComplaints(update);
        setMyComplaints(update);
      } else {
        const endpoint = alreadyUpvoted ? "remove-upvote" : "upvote";
        const res = await fetch(`${API_BASE}/${endpoint}/${id}`, {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) {
          const update = (list) =>
            list.map((c) => c._id === id ? { ...c, upvotes: data.upvotes } : c);
          setAllComplaints(update);
          setMyComplaints(update);
        } else {
          setError(data.message || "Could not update upvote.");
        }
      }
      setUpvotedIds((p) => {
        const n = new Set(p);
        alreadyUpvoted ? n.delete(id) : n.add(id);
        return n;
      });
    } catch {
      setError("Something went wrong while upvoting.");
    } finally {
      setUpvotingIds((p) => { const n = new Set(p); n.delete(id); return n; });
    }
  };

  /* ── Delete ── */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this complaint?")) return;
    setDeletingIds((p) => new Set(p).add(id));
    try {
      if (!isMockData && API_BASE) {
        const res = await fetch(`${API_BASE}/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!data.success) { setError(data.message || "Could not delete."); return; }
      } else {
        await new Promise((r) => setTimeout(r, 500));
      }
      setMyComplaints((p) => p.filter((c) => c._id !== id));
      setAllComplaints((p) => p.filter((c) => c._id !== id));
    } catch {
      setError("Something went wrong while deleting.");
    } finally {
      setDeletingIds((p) => { const n = new Set(p); n.delete(id); return n; });
    }
  };

  /* ── New complaint posted ── */
  const handleComplaintPosted = (newComplaint) => {
    setAllComplaints((p) => [newComplaint, ...p]);
    setMyComplaints((p) => [newComplaint, ...p]);
    setIsModalOpen(false);
  };

  /* ── Filtered + searched list ── */
  const displayedComplaints = useMemo(() => {
    let list = activeTab === "all" ? allComplaints : myComplaints;
    if (filterCat) list = list.filter((c) => c.category === filterCat);
    if (filterStatus) list = list.filter((c) => c.status === filterStatus);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.description?.toLowerCase().includes(q) ||
          c.location?.toLowerCase().includes(q) ||
          c.category?.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeTab, allComplaints, myComplaints, filterCat, filterStatus, search]);

  const isLoading = activeTab === "all" ? loadingAll : loadingMine;

  return (
    <div className="min-h-screen bg-section px-4 sm:px-6 pt-32 pb-20 lg:px-8 relative overflow-hidden">
      <div className="absolute top-24 left-8 w-80 h-80 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-24 right-8 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Civic Reporting Platform
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-3 leading-tight">
            Your Voice,<br />
            <span className="text-primary">Their Action</span>
          </h1>
          <p className="text-text-secondary max-w-xl mx-auto">
            Report civic issues, rally community support, and track real progress — all in one place.
          </p>
        </div>

        {/* Mock data notice */}
        {isMockData && (
          <div className="mb-6 flex items-center gap-3 p-3.5 rounded-xl bg-yellow-50 border border-yellow-200 text-yellow-700 text-sm">
            <WifiOff size={16} className="flex-shrink-0" />
            <span>API unavailable — showing demo data. Your actions are simulated locally.</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-5 flex items-center gap-3 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
            <AlertCircle size={16} className="flex-shrink-0" />
            <span className="flex-1">{error}</span>
            <button onClick={() => setError("")} className="text-red-400 hover:text-red-600">
              <X size={15} />
            </button>
          </div>
        )}

        {/* Stats */}
        {!loadingAll && <StatsBar complaints={allComplaints} />}

        {/* Tabs + Post button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-1.5 bg-surface border border-primary/10 rounded-full p-1.5 shadow-sm">
            {["all", "mine"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-wide transition-all duration-300
                  ${activeTab === tab
                    ? "bg-primary text-white shadow-[0_4px_14px_rgba(217,93,3,0.35)]"
                    : "text-text-secondary hover:text-primary"}`}
              >
                {tab === "all" ? "All Complaints" : "My Reports"}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              if (!isAuthenticated) { setError("Please login to post a complaint."); return; }
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary hover:bg-primary-hover text-white text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_24px_rgba(217,93,3,0.3)] active:scale-95"
          >
            <Plus size={17} />
            Post Complaint
          </button>
        </div>

        {/* Filters */}
        <FilterBar
          filterCat={filterCat} setFilterCat={setFilterCat}
          filterStatus={filterStatus} setFilterStatus={setFilterStatus}
          search={search} setSearch={setSearch}
        />

        {/* List */}
        {isLoading ? (
          <div className="flex flex-col items-center gap-3 py-24 text-text-secondary">
            <Loader2 size={32} className="text-primary animate-spin" />
            <span className="text-sm">Fetching complaints…</span>
          </div>
        ) : displayedComplaints.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🗂️</div>
            <p className="text-text-primary font-semibold mb-1">No complaints found</p>
            <p className="text-text-secondary text-sm">
              {search || filterCat || filterStatus
                ? "Try adjusting your filters."
                : activeTab === "all"
                ? "Be the first to report an issue."
                : "You haven't posted any complaints yet."}
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {displayedComplaints.map((complaint) => (
              <ComplaintCard
                key={complaint._id}
                complaint={complaint}
                isMine={activeTab === "mine" || myComplaints.some((c) => c._id === complaint._id)}
                isUpvoted={upvotedIds.has(complaint._id)}
                isUpvoting={upvotingIds.has(complaint._id)}
                isDeleting={deletingIds.has(complaint._id)}
                onUpvote={() => handleUpvoteToggle(complaint._id)}
                onDelete={() => handleDelete(complaint._id)}
              />
            ))}
          </div>
        )}

        {!isLoading && displayedComplaints.length > 0 && (
          <p className="text-center text-xs text-text-secondary/50 mt-8">
            Showing {displayedComplaints.length} complaint{displayedComplaints.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {isModalOpen && (
        <PostComplaintModal
          token={token}
          apiBase={API_BASE}
          isMockData={isMockData}
          onClose={() => setIsModalOpen(false)}
          onPosted={handleComplaintPosted}
        />
      )}
    </div>
  );
};

export default Reporting;