import { useEffect, useState } from "react";

export default function Complaint() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch complaints from backend
  const fetchComplaints = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/admin/complaints");
      const data = await res.json();
      setComplaints(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching complaints:", err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Update status
  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`http://localhost:8080/api/admin/complaints/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        fetchComplaints(); // refresh list
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // Delete complaint
  const deleteComplaint = async (id) => {
    try {
      const res = await fetch(`http://localhost:8080/api/admin/complaints/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchComplaints(); // refresh list
      }
    } catch (err) {
      console.error("Error deleting complaint:", err);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600 mt-10">Loading complaints...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center mb-6">Admin Dashboard</h2>

      {complaints.length === 0 ? (
        <p className="text-center text-gray-600">No complaints found.</p>
      ) : (
        <div className="space-y-4">
          {complaints.map((c) => (
            <div key={c._id} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{c.category}</h3>
                <span
                  className={`px-3 py-1 rounded text-white ${
                    c.status === "Pending"
                      ? "bg-gray-500"
                      : c.status === "In Progress"
                      ? "bg-yellow-500"
                      : "bg-green-600"
                  }`}
                >
                  {c.status}
                </span>
              </div>

              <p className="mt-2"><strong>Name:</strong> {c.name}</p>
              <p><strong>Contact:</strong> {c.contact || "N/A"}</p>
              <p><strong>Location:</strong> {c.location}</p>
              <p className="mt-2 text-gray-700">{c.description}</p>

              {c.images && c.images.length > 0 && (
                <div className="flex gap-2 mt-3 flex-wrap">
                  {c.images.map((img, i) => (
                    <img
                      key={i}
                      src={`http://localhost:8080${img}`}
                      alt="complaint"
                      className="w-32 h-32 object-cover rounded"
                    />
                  ))}
                </div>
              )}

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => updateStatus(c._id, "In Progress")}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  In Progress
                </button>
                <button
                  onClick={() => updateStatus(c._id, "Resolved")}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Resolved
                </button>
                <button
                  onClick={() => deleteComplaint(c._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
