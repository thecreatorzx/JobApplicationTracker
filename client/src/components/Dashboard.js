import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import JobForm from "./JobForm";
import JobList from "./JobList";
import { toast } from "react-toastify";
import axios from "axios";

const Dashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const navigate = useNavigate();

  const refreshJobs = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/jobs?status=${statusFilter}&sort=${sortOrder}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setJobs(res.data);
    } catch (err) {
      toast.error("Error fetching jobs");
      // Fallback mock data
      setJobs([
        {
          _id: "1",
          company: "Test Corp",
          role: "Developer",
          status: "Applied",
          appliedDate: "2025-06-20",
          notes: "Initial application submitted",
        },
      ]);
    }
  }, [statusFilter, sortOrder, setJobs]);
  useEffect(() => {
    refreshJobs();
  }, [refreshJobs]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 animate-fade-in">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Job Application Tracker
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          >
            Logout
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">
              {editingJob ? "Edit Job Application" : "Add Job Application"}
            </h2>
            <JobForm
              refreshJobs={refreshJobs}
              editingJob={editingJob}
              setEditingJob={setEditingJob}
            />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Applications</h2>
            <JobList
              jobs={jobs}
              setJobs={setJobs}
              onEdit={setEditingJob}
              refreshJobs={refreshJobs}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
