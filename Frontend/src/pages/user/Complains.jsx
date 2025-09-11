import { useEffect, useState } from "react";

export default function PublicComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch complaints from backend
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

  if (loading) {
    return <p className="text-center text-gray-600 mt-10">Loading complaints...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-center mb-6">Active Complaints</h2>

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

              <p className="mt-2"><strong>Location:</strong> {c.location}</p>
              <p className="mt-1 text-gray-700">{c.description}</p>

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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
