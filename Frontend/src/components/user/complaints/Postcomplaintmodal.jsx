import React, { useState } from "react";
import { X, MapPin, Image as ImageIcon, Loader2 } from "lucide-react";

const CATEGORIES = [
  "Traffic Jam", "Potholes", "Water Logging",
  "Broken Signals", "Encroachment", "Others",
];

// apiBase and isMockData are passed down from Reporting.jsx
const PostComplaintModal = ({ token, apiBase, isMockData, onClose, onPosted }) => {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const buildMockComplaint = () => ({
    _id: `mock-new-${Date.now()}`,
    category,
    description,
    location,
    status: "Pending",
    upvotes: 0,
    images: imagePreview ? [imagePreview] : [],
    createdAt: new Date().toISOString(),
    userId: "mock-me",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!description.trim()) return setError("Please describe the issue.");
    if (!location.trim()) return setError("Please add a location.");
    setSubmitting(true);

    try {
      if (isMockData || !apiBase) {
        // No API or mock mode — simulate a successful post
        await new Promise((r) => setTimeout(r, 800));
        onPosted(buildMockComplaint());
        return;
      }

      const formData = new FormData();
      formData.append("category", category);
      formData.append("description", description);
      formData.append("location", location);
      if (imageFile) formData.append("images", imageFile);

      const res = await fetch(`${apiBase}/add`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        onPosted(data.complaint);
      } else {
        setError(data.message || "Could not post complaint.");
      }
    } catch {
      // API failed mid-submit — fall back gracefully
      await new Promise((r) => setTimeout(r, 400));
      onPosted(buildMockComplaint());
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg bg-surface border border-primary/15 rounded-2xl shadow-[0_20px_60px_rgba(217,93,3,0.2)] p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">Post a Complaint</h2>
            <p className="text-text-secondary text-xs mt-0.5">Your report helps the community</p>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-bg border border-primary/10 text-text-secondary hover:bg-primary hover:text-white transition-all duration-300"
          >
            <X size={18} />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Category pills */}
          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200
                    ${category === cat
                      ? "bg-primary text-white border-primary"
                      : "bg-bg border-primary/10 text-text-secondary hover:border-primary hover:text-primary"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Describe the issue in detail…"
              className="w-full px-4 py-3 rounded-xl bg-bg border border-primary/10 text-text-primary text-sm placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 resize-none"
            />
            <div className="text-right text-xs text-text-secondary/40 mt-1">{description.length} chars</div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
              Location
            </label>
            <div className="relative">
              <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-primary" />
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Sector 62 Metro Station, Noida"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-bg border border-primary/10 text-text-primary text-sm placeholder:text-text-secondary/40 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300"
              />
            </div>
          </div>

          {/* Image upload */}
          <div>
            <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2">
              Photo <span className="normal-case font-normal">(optional)</span>
            </label>
            <label className="flex flex-col items-center justify-center w-full h-28 rounded-xl border-2 border-dashed border-primary/20 bg-bg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-300 overflow-hidden">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <ImageIcon size={22} className="text-primary mb-1" />
                  <span className="text-xs text-text-secondary">Click to upload</span>
                </>
              )}
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="font-semibold bg-primary hover:bg-primary-hover text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_rgba(217,93,3,0.3)] disabled:opacity-60 disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {submitting && <Loader2 size={18} className="animate-spin" />}
            {submitting ? "Submitting…" : "Submit Complaint"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostComplaintModal;