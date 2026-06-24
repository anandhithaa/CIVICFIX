import { useEffect, useState } from "react";
import API from "../api/axios";
import { useAuth } from "../context/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();

  const [complaints, setComplaints] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0
  });
  const [error, setError] = useState("");

  const fetchAllComplaints = async () => {
    try {
      const res = await API.get("admin/complaints");
      setComplaints(res.data);

      const total = res.data.length;
      const pending = res.data.filter(c => c.status === "Pending").length;
      const inProgress = res.data.filter(c => c.status === "In Progress").length;
      const resolved = res.data.filter(c => c.status === "Resolved").length;

      setStats({ total, pending, inProgress, resolved });
    } catch (err) {
      console.error(err);
      setError("Failed to load admin complaints");
    }
  };

  useEffect(() => {
    fetchAllComplaints();
  }, []);

  const handleStatusChange = async (complaintId, newStatus) => {
    try {
      await API.patch(`/admin/complaints/${complaintId}/status`, {
  status: newStatus
      });

      fetchAllComplaints();
    } catch (err) {
      console.error(err);
      alert("Failed to update complaint status");
    }
  };

  return (
    <div className="page-container">
      <h2>Admin Dashboard</h2>
      <p className="dashboard-subtitle">
        Welcome, {user?.name || "Admin"} 👋
      </p>

      {error && <p className="error-text">{error}</p>}

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>{stats.total}</h3>
          <p>Total Complaints</p>
        </div>

        <div className="stat-card">
          <h3>{stats.pending}</h3>
          <p>Pending</p>
        </div>

        <div className="stat-card">
          <h3>{stats.inProgress}</h3>
          <p>In Progress</p>
        </div>

        <div className="stat-card">
          <h3>{stats.resolved}</h3>
          <p>Resolved</p>
        </div>
      </div>

      {/* Complaints Table */}
      <div className="dashboard-card admin-table-card">
        <h3>All Complaints</h3>

        {complaints.length === 0 ? (
          <p>No complaints found.</p>
        ) : (
          <div className="complaints-list">
            {complaints.map((complaint) => (
              <div key={complaint._id} className="complaint-item">
                <h4>{complaint.title}</h4>
                <p>{complaint.description}</p>

                <div className="complaint-meta">
                  <span><strong>User:</strong> {complaint.user?.name || "Unknown"}</span>
                  <span><strong>Email:</strong> {complaint.user?.email || "N/A"}</span>
                  <span><strong>Zone:</strong> {complaint.zone}</span>
                  <span><strong>Category:</strong> {complaint.category}</span>
                  <span><strong>Priority:</strong> {complaint.priority}</span>
                  <span><strong>Status:</strong> {complaint.status}</span>
                  <span><strong>Department:</strong> {complaint.suggestedDepartment}</span>
                </div>

                <div className="status-actions">
                  <label>Update Status:</label>
                  <select
                    value={complaint.status}
                    onChange={(e) =>
                      handleStatusChange(complaint._id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;