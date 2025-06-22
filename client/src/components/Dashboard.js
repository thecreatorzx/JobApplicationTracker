import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import JobForm from "./JobForm";
import JobList from "./JobList";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const formRef = useRef();
  const navigate = useNavigate();

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Token missing");

      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/jobs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobs(res.data);
    } catch (err) {
      toast.error("Failed to load jobs. Please try again.");
      console.error("Fetch Jobs Error:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="bg-gray-50 min-h-screen py-6 px-4">
      <div className="max-w-7xl mx-auto mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-700">
            Welcome to your Dashboard
          </h2>
          <p className="text-gray-500 text-sm">
            Manage your job applications easily.
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
        >
          Logout
        </button>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-2/3">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Job Applications
          </h3>
          <JobList
            jobs={jobs}
            setJobs={setJobs}
            onEdit={setEditingJob}
            refreshJobs={fetchJobs}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            editingJob={editingJob}
            setEditingJob={setEditingJob}
            formRef={formRef}
          />
        </div>

        <div className="w-full lg:w-1/3" ref={formRef}>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {editingJob ? "Edit Job" : "Add New Job"}
          </h3>
          <JobForm
            refreshJobs={fetchJobs}
            editingJob={editingJob}
            setEditingJob={setEditingJob}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
