import { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const UserDashboard = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    zone: ""
  });

  const [complaints, setComplaints] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchComplaints = async () => {
    try {
      const res = await API.get("/complaints/my");
      setComplaints(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load complaints");
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await API.post("/complaints", formData);

      setMessage("Complaint submitted successfully!");
      setFormData({
        title: "",
        description: "",
        zone: ""
      });

      fetchComplaints();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to submit complaint");
    }
  };

  return (
    <div className="page-container">
      <h2>User Dashboard</h2>
      <p className="dashboard-subtitle">
        Welcome, {user?.name || "User"} 👋
      </p>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Submit a Complaint</h3>

          {message && <p className="success-text">{message}</p>}
          {error && <p className="error-text">{error}</p>}

          <form onSubmit={handleSubmit} className="complaint-form">
            <input
              type="text"
              name="title"
              placeholder="Complaint title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <textarea
              name="description"
              placeholder="Describe the issue..."
              value={formData.description}
              onChange={handleChange}
              rows="5"
              required
            />

            <input
              type="text"
              name="zone"
              placeholder="Zone / Area"
              value={formData.zone}
              onChange={handleChange}
              required
            />

            <button type="submit">Submit Complaint</button>
          </form>
        </div>

        <div className="dashboard-card">
          <h3>My Complaints</h3>

          {complaints.length === 0 ? (
            <p>No complaints submitted yet.</p>
          ) : (
            <div className="complaints-list">
              {complaints.map((complaint) => (
                <div key={complaint._id} className="complaint-item">
                  <h4>{complaint.title}</h4>
                  <p>{complaint.description}</p>

                  <div className="complaint-meta">
                    <span><strong>Zone:</strong> {complaint.zone}</span>
                    <span><strong>Category:</strong> {complaint.category}</span>
                    <span><strong>Priority:</strong> {complaint.priority}</span>
                    <span><strong>Status:</strong> {complaint.status}</span>
                  </div>

                  <p className="department-text">
                    Assigned to: {complaint.suggestedDepartment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;