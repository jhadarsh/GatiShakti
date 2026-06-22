import React from "react";
const STATUS_STYLES = {
  Pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
  "In Progress": "bg-blue-100 text-blue-700 border-blue-200",
  Resolved: "bg-green-100 text-green-700 border-green-200",
};

const CATEGORY_ICONS = {
  "Traffic Jam": "🚦",
  Potholes: "🕳️",
  "Water Logging": "🌊",
  "Broken Signals": "🚨",
  Encroachment: "🏗️",
  Others: "📌",
};


export const StatusBadge = ({ status }) => (
  <span
    className={`font-sans uppercase tracking-wider text-xs font-semibold px-3 py-1 rounded-full border ${
      STATUS_STYLES[status] || "bg-gray-100 text-gray-700 border-gray-200"
    }`}
  >
    {status}
  </span>
);

export const CategoryBadge = ({ category }) => (
  <span className="inline-flex items-center gap-1.5 font-sans uppercase tracking-wider text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
    <span>{CATEGORY_ICONS[category] || "📌"}</span>
    {category}
  </span>
);