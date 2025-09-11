import { useState } from "react";
import PublicComplaints from "./Complains"; // you will import your component

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
      window.location.reload(); // ✅ reloads the whole page
    } else {
      alert("Failed to submit complaint.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left: Complaint Form */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Report an Issue
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="text"
            name="contact"
            placeholder="Contact (Email/Phone)"
            value={form.contact}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="">Select Issue Category</option>
            <option value="Traffic Jam">Traffic Jam</option>
            <option value="Potholes">Potholes</option>
            <option value="Water Logging">Water Logging</option>
            <option value="Broken Signals">Broken Signals</option>
            <option value="Encroachment">Encroachment</option>
            <option value="Others">Others</option>
          </select>

          <textarea
            name="description"
            placeholder="Describe the issue"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="4"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location / Address"
            value={form.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full"
            accept="image/*"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Submit Complaint
          </button>
        </form>
      </div>

      {/* Right: Public Complaints */}
      <div className="h-[80vh] overflow-y-auto pr-2">
        <PublicComplaints />
      </div>
    </div>
  );
}
