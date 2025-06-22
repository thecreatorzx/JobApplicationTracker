import { FaRegEye } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const JobList = ({
  jobs,
  setJobs,
  onEdit,
  refreshJobs,
  statusFilter,
  setStatusFilter,
  sortOrder,
  setSortOrder,
  editingJob,
  setEditingJob,
  formRef, // <-- receive the form ref
}) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await refreshJobs();
      toast.success("Job deleted");
    } catch (err) {
      toast.error("Error deleting job");
      setJobs(jobs.filter((job) => job._id !== id));
      toast.success("Mock job deleted");
    }
  };

  const onView = (job) => {
    navigate(`/dashboard/job/${job._id}`, { state: { job } });
  };

  const isEditing = (job) => editingJob && editingJob._id === job._id;

  const handleToggleEdit = (job) => {
    if (isEditing(job)) {
      setEditingJob(null);
      toast.info("Editing canceled");
    } else {
      onEdit(job);
      // Scroll to form if ref is available
      if (formRef?.current) {
        setTimeout(() => {
          formRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100); // wait for render cycle
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-lg shadow-lg">
      <div className="flex flex-wrap items-center justify-between mb-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
          <option value="Accepted">Accepted</option>
        </select>
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="mt-2 sm:mt-0 p-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          Sort by Date ({sortOrder})
        </button>
      </div>

      <div className="space-y-4">
        {jobs.length === 0 ? (
          <p className="text-center text-gray-500 py-6">No jobs found.</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job._id}
              className={`p-4 transition rounded-lg shadow flex justify-between items-center ${
                isEditing(job)
                  ? "bg-blue-50 border-l-4 border-blue-600 animate-pulse"
                  : "bg-gray-50 hover:bg-white"
              }`}
            >
              <div>
                <h3 className="font-bold text-gray-800">
                  {job.company} • {job.role}
                </h3>
                <p className="text-gray-600">Status: {job.status}</p>
                <p className="text-gray-600">
                  Applied on: {new Date(job.appliedDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600 truncate max-w-md">
                  Notes: {job.notes || "None"}
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onView(job)}
                  className="p-2 bg-gray-100 rounded hover:bg-gray-200 transition"
                  title="View"
                >
                  <FaRegEye />
                </button>
                <button
                  onClick={() => handleToggleEdit(job)}
                  className={`p-2 text-white rounded transition ${
                    isEditing(job)
                      ? "bg-gray-600 hover:bg-gray-700"
                      : "bg-yellow-500 hover:bg-yellow-600"
                  }`}
                >
                  {isEditing(job) ? "Cancel" : "Edit"}
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobList;
