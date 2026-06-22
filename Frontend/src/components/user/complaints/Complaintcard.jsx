import React, { useState } from "react";
import { ThumbsUp, Trash2, MapPin, Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { CategoryBadge, StatusBadge } from "./Badges";

const ComplaintCard = ({
  complaint,
  isMine,
  isUpvoted,
  isUpvoting,
  isDeleting,
  onUpvote,
  onDelete,
}) => {
  const { category, description, location, status, upvotes, images, createdAt } = complaint;
  const [expanded, setExpanded] = useState(false);

  const imageUrl = Array.isArray(images) ? images[0] : images;
  const isLong = description?.length > 120;
  const displayDesc = isLong && !expanded ? description.slice(0, 120) + "…" : description;

  return (
    <div
      className="
        group bg-surface border border-primary/10 rounded-2xl overflow-hidden
        shadow-[0_4px_20px_rgba(217,93,3,0.04)]
        hover:shadow-[0_8px_32px_rgba(217,93,3,0.12)]
        hover:-translate-y-0.5
        transition-all duration-300
      "
    >
      <div className="flex flex-col sm:flex-row">
        {/* Left accent bar */}
        <div
          className={`w-full sm:w-1 h-1 sm:h-auto flex-shrink-0 rounded-t-2xl sm:rounded-t-none sm:rounded-l-2xl
            ${status === "Resolved" ? "bg-green-400" : status === "In Progress" ? "bg-blue-400" : "bg-yellow-400"}
          `}
        />

        {/* Image */}
        {imageUrl && (
          <div className="w-full sm:w-36 h-36 sm:h-auto flex-shrink-0 overflow-hidden bg-bg">
            <img
              src={imageUrl}
              alt={category}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0 p-5">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <CategoryBadge category={category} />
            <StatusBadge status={status} />
            {createdAt && (
              <span className="ml-auto text-xs text-text-secondary/60">
                {new Date(createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            )}
          </div>

          <p className="text-text-primary text-sm leading-relaxed mb-1">{displayDesc}</p>
          {isLong && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="text-primary text-xs flex items-center gap-1 mb-2 hover:underline"
            >
              {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
              {expanded ? "Show less" : "Read more"}
            </button>
          )}

          {location && (
            <div className="flex items-center gap-1.5 text-text-secondary text-xs mb-4">
              <MapPin size={12} className="text-primary flex-shrink-0" />
              <span className="truncate">{location}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2 mt-auto">
            <button
              onClick={onUpvote}
              disabled={isUpvoting}
              className={`
                flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium
                border transition-all duration-300 disabled:opacity-60
                ${isUpvoted
                  ? "bg-primary text-white border-primary shadow-[0_4px_12px_rgba(217,93,3,0.3)]"
                  : "bg-bg text-text-secondary border-primary/10 hover:border-primary hover:text-primary hover:bg-primary/5"
                }
              `}
            >
              {isUpvoting ? <Loader2 size={14} className="animate-spin" /> : <ThumbsUp size={14} />}
              <span>{upvotes ?? 0}</span>
            </button>

            {/* Upvote pulse on high count */}
            {upvotes > 50 && (
              <span className="text-xs text-primary/70 font-medium animate-pulse">
                🔥 Trending
              </span>
            )}

            {isMine && (
              <button
                onClick={onDelete}
                disabled={isDeleting}
                className="
                  ml-auto flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium
                  border border-red-200 text-red-400
                  hover:bg-red-50 hover:text-red-600
                  transition-all duration-300 disabled:opacity-60
                "
              >
                {isDeleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplaintCard;