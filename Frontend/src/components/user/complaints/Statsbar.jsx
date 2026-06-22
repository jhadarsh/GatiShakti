import React from "react";

const StatsBar = ({ complaints }) => {
  const total = complaints.length;
  const resolved = complaints.filter((c) => c.status === "Resolved").length;
  const inProgress = complaints.filter((c) => c.status === "In Progress").length;
  const pending = complaints.filter((c) => c.status === "Pending").length;
  const totalUpvotes = complaints.reduce((sum, c) => sum + (c.upvotes || 0), 0);

  const stats = [
    { label: "Total", value: total, color: "text-text-primary" },
    { label: "Pending", value: pending, color: "text-yellow-500" },
    { label: "In Progress", value: inProgress, color: "text-blue-500" },
    { label: "Resolved", value: resolved, color: "text-green-500" },
    { label: "Upvotes", value: totalUpvotes, color: "text-primary" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
      {stats.map(({ label, value, color }) => (
        <div
          key={label}
          className="bg-surface border border-primary/8 rounded-xl p-3 text-center shadow-sm"
        >
          <div className={`text-xl font-bold ${color}`}>{value}</div>
          <div className="text-xs text-text-secondary mt-0.5">{label}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsBar;