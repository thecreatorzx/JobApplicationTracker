import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const JobForm = ({ refreshJobs, editingJob, setEditingJob }) => {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    appliedDate: "",
    notes: "",
  });

  useEffect(() => {
    if (editingJob) {
      setFormData(editingJob);
    }
  }, [editingJob]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (editingJob) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/api/jobs/${editingJob._id}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Job updated!");
      } else {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/jobs`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        toast.success("Job added! Email sent.");
      }
      await refreshJobs();
      setFormData({
        company: "",
        role: "",
        status: "Applied",
        appliedDate: "",
        notes: "",
      });
      setEditingJob(null);
    } catch (err) {
      toast.error("Error saving job");
      await refreshJobs();
      setFormData({
        company: "",
        role: "",
        status: "Applied",
        appliedDate: "",
        notes: "",
      });
      setEditingJob(null);
      toast.success(editingJob ? "Mock job updated!" : "Mock job added!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-white shadow-md rounded animate-fade-in"
    >
      <div className="mb-4">
        <label
          htmlFor="company"
          className="block text-sm font-medium text-gray-700"
        >
          Company
        </label>
        <input
          id="company"
          type="text"
          placeholder="Company"
          value={formData.company}
          onChange={(e) =>
            setFormData({ ...formData, company: e.target.value })
          }
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700"
        >
          Role
        </label>
        <input
          id="role"
          type="text"
          placeholder="Role"
          value={formData.role}
          onChange={(e) => setFormData({ ...formData, role: e.target.value })}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="status"
          className="block text-sm font-medium text-gray-700"
        >
          Status
        </label>
        <select
          id="status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
          <option value="Accepted">Accepted</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          htmlFor="appliedDate"
          className="block text-sm font-medium text-gray-700"
        >
          Applied Date
        </label>
        <input
          id="appliedDate"
          type="date"
          value={formData.appliedDate}
          onChange={(e) =>
            setFormData({ ...formData, appliedDate: e.target.value })
          }
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700"
        >
          Notes
        </label>
        <textarea
          id="notes"
          placeholder="Notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      >
        {editingJob ? "Update Job" : "Add Job"}
      </button>
    </form>
  );
};

export default JobForm;
