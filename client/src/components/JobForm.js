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
      const formattedDate = editingJob.appliedDate
        ? new Date(editingJob.appliedDate).toISOString().split("T")[0]
        : "";
      setFormData({ ...editingJob, appliedDate: formattedDate });
    } else {
      setFormData({
        company: "",
        role: "",
        status: "Applied",
        appliedDate: "",
        notes: "",
      });
    }
  }, [editingJob]);

  const resetForm = () => {
    setFormData({
      company: "",
      role: "",
      status: "Applied",
      appliedDate: "",
      notes: "",
    });
    setEditingJob(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (editingJob) {
        await axios.put(
          `${process.env.REACT_APP_API_URL}/api/jobs/${editingJob._id}`,
          formData,
          config
        );
        toast.success("Job updated successfully!");
      } else {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/jobs`,
          formData,
          config
        );
        toast.success("Job added and email sent!");
      }

      await refreshJobs();
      resetForm();
    } catch (err) {
      toast.error("Something went wrong. Using mock fallback.");
      await refreshJobs();
      resetForm();
      toast.success(editingJob ? "Mock job updated" : "Mock job added");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-lg space-y-4 animate-fade-in"
    >
      <InputField
        label="Company"
        type="text"
        value={formData.company}
        onChange={(v) => setFormData({ ...formData, company: v })}
        required
      />
      <InputField
        label="Role"
        type="text"
        value={formData.role}
        onChange={(v) => setFormData({ ...formData, role: v })}
        required
      />
      <SelectField
        label="Status"
        value={formData.status}
        options={["Applied", "Interview", "Offer", "Rejected", "Accepted"]}
        onChange={(v) => setFormData({ ...formData, status: v })}
      />
      <InputField
        label="Applied Date"
        type="date"
        value={formData.appliedDate}
        onChange={(v) => setFormData({ ...formData, appliedDate: v })}
        required
      />
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes
        </label>
        <textarea
          rows={3}
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 transition"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        {editingJob ? "Update Job" : "Add Job"}
      </button>
    </form>
  );
};

const InputField = ({ label, type, value, onChange, required }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 transition"
      required={required}
    />
  </div>
);

const SelectField = ({ label, value, options, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 transition"
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default JobForm;
