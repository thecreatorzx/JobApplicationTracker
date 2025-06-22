const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let jobs = [
  {
    _id: "1",
    company: "Test Corp",
    role: "Developer",
    status: "Applied",
    appliedDate: "2025-06-20",
    notes: "Initial application submitted",
  },
];

app.post("/api/auth/signup", (req, res) => {
  console.log("--- Signup Request Received ---");
  console.log("Body:", req.body);
  console.log("Headers:", req.headers);
  console.log("-----------------------------");

  if (req.body.email === "test@test.com") {
    return res.status(400).json({ error: "Email already exists" });
  }
  res.status(201).json({ message: "User created" });
});

app.post("/api/auth/login", (req, res) => {
  console.log("--- Login Request Received ---");
  console.log("Body:", req.body);
  console.log("Headers:", req.headers);
  console.log("-----------------------------");

  if (
    req.body.email === "test@test.com" &&
    req.body.password === "password123"
  ) {
    return res.status(200).json({ token: "mock-jwt-token" });
  }
  res.status(401).json({ error: "Invalid credentials" });
});

app.get("/api/jobs", (req, res) => {
  console.log("--- Get Jobs Request Received ---");
  console.log("Query:", req.query);
  console.log("Headers:", req.headers);
  console.log("-----------------------------");

  const { status, sort } = req.query;
  let filteredJobs = [...jobs];

  if (status) {
    filteredJobs = filteredJobs.filter((job) => job.status === status);
  }

  filteredJobs.sort((a, b) => {
    const dateA = new Date(a.appliedDate);
    const dateB = new Date(b.appliedDate);
    return sort === "asc" ? dateA - dateB : dateB - dateA;
  });

  res.status(200).json(filteredJobs);
});

app.post("/api/jobs", (req, res) => {
  console.log("--- Add Job Request Received ---");
  console.log("Body:", req.body);
  console.log("Headers:", req.headers);
  console.log("-----------------------------");

  const newJob = {
    _id: String(jobs.length + 1),
    ...req.body,
    appliedDate: req.body.appliedDate || new Date().toISOString().split("T")[0],
  };
  jobs.push(newJob);
  res.status(201).json({ message: "Job added" });
});
app.put("/api/jobs/:id", (req, res) => {
  console.log(`--- Update Job Request Received for ID: ${req.params.id} ---`);
  console.log("Body:", req.body);
  console.log("Headers:", req.headers);
  console.log("-----------------------------");

  const jobIndex = jobs.findIndex((job) => job._id === req.params.id);
  if (jobIndex === -1) {
    return res.status(404).json({ error: "Job not found" });
  }
  jobs[jobIndex] = { ...jobs[jobIndex], ...req.body };
  res.status(200).json({ message: "Job updated" });
});

app.delete("/api/jobs/:id", (req, res) => {
  console.log(`--- Delete Job Request Received for ID: ${req.params.id} ---`);
  console.log("Headers:", req.headers);
  console.log("-----------------------------");

  const jobIndex = jobs.findIndex((job) => job._id === req.params.id);
  if (jobIndex === -1) {
    return res.status(404).json({ error: "Job not found" });
  }
  jobs = jobs.filter((job) => job._id !== req.params.id);
  res.status(200).json({ message: "Job deleted" });
});

app.all("/api/:endpoint", (req, res) => {
  console.log(`--- Request Received at /api/${req.params.endpoint} ---`);
  console.log("Method:", req.method);
  console.log("Body:", req.body);
  console.log("Headers:", req.headers);
  console.log("-----------------------------");

  res.status(200).json({
    message: `Received ${req.method} request at /api/${req.params.endpoint}`,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Dummy server running on port ${PORT}`);
});
