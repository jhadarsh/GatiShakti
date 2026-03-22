import { useEffect, useState } from "react";

export default function PublicComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchComplaints = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/reporting/all");
      const data = await res.json();
      setComplaints(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching complaints:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  return (
    <div
      style={{
        minHeight: "auto",
        background: "#060b14",
        color: "#e8f0ff",
        fontFamily: "'DM Sans',sans-serif",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* GRID BG */}
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

      {/* CONTENT */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          padding: "100px 40px 60px",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* HEADER */}
        <div style={{ marginBottom: 30 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(0,229,255,0.08)",
              border: "1px solid rgba(0,229,255,0.25)",
              borderRadius: 999,
              padding: "6px 16px",
              fontSize: 11,
              letterSpacing: "0.12em",
              color: "#00e5ff",
            }}
          >
            ● PUBLIC PORTAL · LIVE
          </div>

          <h1
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: "2.6rem",
              marginTop: 14,
            }}
          >
            Track Public <span style={{ color: "#00e5ff" }}>Complaints</span>
          </h1>

          <p style={{ color: "#6b7fa3", marginTop: 8 }}>
            Real-time issue reporting · Transparency · Faster resolution
          </p>
        </div>

        {/* LOADING */}
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 300,
              color: "#00e5ff",
            }}
          >
            <div className="animate-pulse">Loading complaints...</div>
          </div>
        )}

        {/* EMPTY */}
        {!loading && complaints.length === 0 && (
          <div style={{ textAlign: "center", marginTop: 80 }}>
            <div style={{ fontSize: 60, opacity: 0.4 }}>📭</div>
            <p style={{ color: "#6b7fa3" }}>No complaints found</p>
          </div>
        )}

        {/* CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(320px,1fr))",
            gap: 20,
          }}
        >
          {complaints.map((c, index) => (
            <div
              key={c._id}
              style={{
                background: "rgba(12,21,38,0.9)",
                border: "1px solid rgba(0,229,255,0.1)",
                borderRadius: 18,
                padding: 18,
                backdropFilter: "blur(12px)",
                transition: "all 0.3s ease",
                animation: `fadeUp 0.5s ease ${index * 0.05}s both`,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-6px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 40px rgba(0,229,255,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "none";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {/* HEADER */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h3
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontWeight: 700,
                  }}
                >
                  {c.category}
                </h3>

                <span
                  style={{
                    padding: "4px 12px",
                    borderRadius: 999,
                    fontSize: 11,
                    fontWeight: 600,
                    color: "#060b14",
                    background:
                      c.status === "Pending"
                        ? "#6b7280"
                        : c.status === "In Progress"
                        ? "#f5a623"
                        : "#22c55e",
                  }}
                >
                  {c.status}
                </span>
              </div>

              {/* BODY */}
              <p style={{ marginTop: 10, fontSize: 13, color: "#6b7fa3" }}>
                📍 {c.location}
              </p>

              <p style={{ marginTop: 8, fontSize: 14 }}>
                {c.description}
              </p>

              {/* IMAGES */}
              {c.images?.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    gap: 8,
                    marginTop: 12,
                    flexWrap: "wrap",
                  }}
                >
                  {c.images.map((img, i) => (
                    <img
                      key={i}
                      src={`http://localhost:8080${img}`}
                      alt="complaint"
                      style={{
                        width: 90,
                        height: 90,
                        objectFit: "cover",
                        borderRadius: 10,
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          ))}
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