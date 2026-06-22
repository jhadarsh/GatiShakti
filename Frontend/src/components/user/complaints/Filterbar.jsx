import React from "react";

const CATEGORIES = ["Traffic Jam", "Potholes", "Water Logging", "Broken Signals", "Encroachment", "Others"];
const CATEGORY_ICONS = { "Traffic Jam": "🚦", Potholes: "🕳️", "Water Logging": "🌊", "Broken Signals": "🚨", Encroachment: "🏗️", Others: "📌" };
const STATUSES = ["All", "Pending", "In Progress", "Resolved"];

const FilterBar = ({ filterCat, setFilterCat, filterStatus, setFilterStatus, search, setSearch }) => (
  <div className="flex flex-col gap-3 mb-6">
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search by description, location or category…"
      className="w-full px-4 py-2.5 rounded-xl bg-surface border border-primary/10 text-text-primary text-sm placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
    />
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => setFilterCat("")}
        className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200
          ${!filterCat ? "bg-primary text-white border-primary" : "bg-surface border-primary/10 text-text-secondary hover:border-primary hover:text-primary"}`}
      >
        All Categories
      </button>
      {CATEGORIES.map((cat) => (
        <button
          key={cat}
          onClick={() => setFilterCat(filterCat === cat ? "" : cat)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 flex items-center gap-1
            ${filterCat === cat ? "bg-primary text-white border-primary" : "bg-surface border-primary/10 text-text-secondary hover:border-primary hover:text-primary"}`}
        >
          <span>{CATEGORY_ICONS[cat]}</span> {cat}
        </button>
      ))}
    </div>
    <div className="flex flex-wrap gap-2">
      {STATUSES.map((s) => (
        <button
          key={s}
          onClick={() => setFilterStatus(s === "All" ? "" : s)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200
            ${(s === "All" && !filterStatus) || filterStatus === s
              ? "bg-primary/10 text-primary border-primary/30"
              : "bg-surface border-primary/10 text-text-secondary hover:border-primary hover:text-primary"}`}
        >
          {s}
        </button>
      ))}
    </div>
  </div>
);

export default FilterBar;