import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [job, setJob] = useState(location.state?.job || null);
  const [loading, setLoading] = useState(!job);

  useEffect(() => {
    if (!job) {
      const fetchJob = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/jobs/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          setJob(res.data);
        } catch (err) {
          console.error("Error fetching job:", err);
          toast.error("Job not found or error loading details");
          setJob(null);
        } finally {
          setLoading(false);
        }
      };
      fetchJob();
    }
  }, [id, job]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading job details...
        </p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Job Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            Either the job was deleted or the link is incorrect.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6 print:bg-white print:text-black">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-lg p-8 print:shadow-none print:p-0 print:rounded-none">
        <div className="flex justify-between items-center mb-6 border-b pb-4 print:border-none">
          <h1 className="text-4xl font-extrabold text-gray-800 print:text-black">
            Job Details
          </h1>

          <div className="space-x-2 hidden print:hidden md:block">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
            >
              Back
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Print
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 print:text-black">
          <DetailItem label="Company" value={job.company} />
          <DetailItem label="Role" value={job.role} />
          <DetailItem label="Status" value={job.status} />
          <DetailItem
            label="Applied Date"
            value={new Date(job.appliedDate).toLocaleDateString()}
          />
          <div className="md:col-span-2">
            <DetailItem label="Notes" value={job.notes || "None"} />
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div>
    <h3 className="text-lg font-semibold text-gray-700">{label}</h3>
    <p className="text-gray-600 whitespace-pre-line">{value}</p>
  </div>
);

export default JobDetails;
