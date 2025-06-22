import { FaRegEye } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // Add this at the top

const JobList = ({
  jobs,
  setJobs,
  onEdit,
  refreshJobs,
  statusFilter,
  setStatusFilter,
  sortOrder,
  setSortOrder,
}) => {
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/jobs/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await refreshJobs(); // Refetch jobs from server
      toast.success("Job deleted");
    } catch (err) {
      toast.error("Error deleting job");
      // Fallback: Update local state
      setJobs(jobs.filter((job) => job._id !== id));
      toast.success("Mock job deleted");
    }
  };

  const onView = (job) => {
    navigate(`/dashboard/job/${job._id}`, { state: { job } });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex mb-4 space-x-2">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        >
          <option value="">All Statuses</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
          <option value="Accepted">Accepted</option>
        </select>
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="p-2 bg-gray-200 rounded hover:bg-gray-300 transition"
        >
          Sort by Date ({sortOrder})
        </button>
      </div>
      <div className="grid gap-4">
        {jobs.length === 0 ? (
          <p className="text-gray-600">No jobs found.</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job._id}
              className="p-4 bg-white shadow-md rounded flex justify-between animate-fade-in"
            >
              <div>
                <h3 className="font-bold text-gray-800">
                  {job.company} - {job.role}
                </h3>
                <p className="text-gray-600">Status: {job.status}</p>
                <p className="text-gray-600">
                  Applied: {new Date(job.appliedDate).toLocaleDateString()}
                </p>
                <p className="text-gray-600">
                  Notes:{" "}
                  {!job.notes
                    ? "None"
                    : job.notes.length < 40
                    ? job.notes
                    : `${job.notes.slice(0, 40)} ...`}
                </p>
              </div>
              <div className="flex justify-center items-center space-x-2">
                <button
                  onClick={() => onView(job)}
                  className="p-2 text-black rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 transition"
                >
                  <FaRegEye />
                </button>
                <button
                  onClick={() => onEdit(job)}
                  className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="p-2 bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
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
