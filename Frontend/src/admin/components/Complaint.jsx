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
      const res = await fetch(
        `http://localhost:8080/api/admin/complaints/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: newStatus }),
        }
      );
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
      const res = await fetch(
        `http://localhost:8080/api/admin/complaints/${id}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        fetchComplaints(); // refresh list
      }
    } catch (err) {
      console.error("Error deleting complaint:", err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-[#3932A2] mb-4"></div>
          <p className="text-lg font-medium text-[#716179]">Loading complaints...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#3932A2] to-[#716179] text-4xl font-bold text-white text-white py-12 px-6 mb-8 shadow-lg">
        <h1 className="text-4xl font-bold mb-3">Complaints Dashboard</h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-8">
        {complaints.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-gradient-to-br from-[#3932A2] to-[#716179] rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-[#716179] mb-2">No complaints found</h3>
            <p className="text-gray-500">All caught up! No pending complaints to review.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {complaints.map((c) => (
              <div key={c._id} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-[#3932A2] mb-2">{c.category}</h3>
                      <div className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-[#716179]">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {c.location}
                      </div>
                    </div>
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold text-white shadow-lg transform hover:scale-105 transition-transform ${
                        c.status === "Pending"
                          ? "bg-gradient-to-r from-gray-400 to-gray-500"
                          : c.status === "In Progress"
                          ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                          : "bg-gradient-to-r from-green-500 to-emerald-600"
                      }`}
                    >
                      {c.status}
                    </span>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-[#716179] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <div>
                          <span className="text-sm font-medium text-[#716179]">Name</span>
                          <p className="text-gray-800 font-medium">{c.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <svg className="w-5 h-5 text-[#716179] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <div>
                          <span className="text-sm font-medium text-[#716179]">Contact</span>
                          <p className="text-gray-800 font-medium">{c.contact || "N/A"}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4">
                        <span className="text-sm font-medium text-[#716179] block mb-2">Description</span>
                        <p className="text-gray-700 leading-relaxed">{c.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Images */}
                  {c.images && c.images.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-[#716179] mb-3">Attached Images</h4>
                      <div className="flex gap-3 flex-wrap">
                        {c.images.map((img, i) => (
                          <div key={i} className="relative group">
                            <img
                              src={`http://localhost:8080${img}`}
                              alt="complaint"
                              className="w-24 h-24 object-cover rounded-lg shadow-md cursor-pointer transform group-hover:scale-110 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-lg transition-all duration-300"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => updateStatus(c._id, "In Progress")}
                      className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      In Progress
                    </button>
                    <button
                      onClick={() => updateStatus(c._id, "Resolved")}
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Resolved
                    </button>
                    <button
                      onClick={() => deleteComplaint(c._id)}
                      className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}