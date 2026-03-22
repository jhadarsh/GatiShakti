import { useState } from "react";
import PublicComplaints from "./Complains";

export default function ComplaintForm() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    category: "",
    description: "",
    location: "",
  });

  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });
    files.forEach((file) => formData.append("images", file));

    const res = await fetch("http://localhost:8080/api/reporting/report", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Complaint submitted successfully!");
      window.location.reload();
    } else {
      alert("Failed to submit complaint.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#060b14",
        color: "#e8f0ff",
        padding: "100px 40px 40px",
        marginTop : "-80px",
      }}
    >
      {/* GRID BACKGROUND */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(0,229,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.03) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1.2fr",
          gap: 24,
          maxWidth: 1300,
          margin: "0 auto",
        }}
      >
        {/* 🔵 LEFT: FORM */}
        <div
          style={{
            background: "rgba(12,21,38,0.9)",
            border: "1px solid rgba(0,229,255,0.12)",
            borderRadius: 20,
            padding: 24,
            backdropFilter: "blur(16px)",
            boxShadow: "0 0 40px rgba(0,229,255,0.08)",
            animation: "fadeUp 0.6s ease",
          }}
        >
          <h2
            style={{
              fontFamily: "Syne",
              fontWeight: 700,
              marginBottom: 20,
            }}
          >
            🚨 Report an Issue
          </h2>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { name: "name", placeholder: "Your Name" },
              { name: "contact", placeholder: "Contact (Email/Phone)" },
              { name: "location", placeholder: "Location / Address" },
            ].map((field) => (
              <input
                key={field.name}
                type="text"
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required={field.name !== "contact"}
                style={inputStyle}
              />
            ))}

            {/* CATEGORY */}
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              style={inputStyle}
            >
              <option value="">Select Issue Category</option>
              <option>Traffic Jam</option>
              <option>Potholes</option>
              <option>Water Logging</option>
              <option>Broken Signals</option>
              <option>Encroachment</option>
              <option>Others</option>
            </select>

            {/* DESCRIPTION */}
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the issue..."
              rows="4"
              required
              style={inputStyle}
            />

            {/* FILE INPUT */}
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              style={{ fontSize: 12 }}
            />

            {/* PREVIEW */}
            {files.length > 0 && (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {files.map((file, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    style={{
                      width: 70,
                      height: 70,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                  />
                ))}
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              style={{
                background: "linear-gradient(135deg,#00e5ff,#008fb0)",
                color: "#060b14",
                padding: "12px",
                borderRadius: 12,
                fontWeight: 700,
                cursor: "pointer",
                border: "none",
                transition: "0.3s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.boxShadow = "0 10px 30px rgba(0,229,255,0.4)")
              }
              onMouseLeave={(e) => (e.target.style.boxShadow = "none")}
            >
              Submit Complaint →
            </button>
          </form>
        </div>

        {/* 🟡 RIGHT: COMPLAINT LIST */}
        <div
          style={{
            height: "100vh",
            overflowY: "hidden",
            paddingRight: 6,
            animation: "fadeUp 0.8s ease",
          }}
        >
          <PublicComplaints />
        </div>
      </div>

      {/* ANIMATION */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

const inputStyle = {
  background: "rgba(255,255,255,0.04)",
  border: "1px solid rgba(0,229,255,0.15)",
  borderRadius: "12px",
  padding: "12px",
  color: "#e8f0ff",
  outline: "none",
};