const express = require("express");
const Job = require("../models/Job");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  const { status, sort } = req.query;
  try {
    let query = { userId: req.userId };
    if (status) query.status = status;

    const jobs = await Job.find(query).sort({
      appliedDate: sort === "asc" ? 1 : -1,
    });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const job = await Job.findOne({ _id: req.params.id, userId: req.userId });
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", authMiddleware, async (req, res) => {
  const { company, role, status, appliedDate, notes } = req.body;
  if (!company || !role || !status || !appliedDate) {
    return res.status(400).json({ error: "Required fields missing" });
  }

  try {
    const job = new Job({
      userId: req.userId,
      company,
      role,
      status,
      appliedDate,
      notes,
    });
    await job.save();
    res.status(201).json({ message: "Job added" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  const { company, role, status, appliedDate, notes } = req.body;
  try {
    const job = await Job.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { company, role, status, appliedDate, notes },
      { new: true, runValidators: true }
    );
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.status(200).json({ message: "Job updated" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    res.status(200).json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
