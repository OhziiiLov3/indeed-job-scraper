import Job from "../models/JobModel.js";
import { jobScraper } from "../index.js";

// Fetch all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get by job id
export const getJobById = async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (job) {
    res.status(200).json(job);
  } else {
    res.status(404).json({ message: "job not found" });
  }
};

// fectch jobs by filters(title & location)
export const filterJobs = async (req, res) => {
  const { title, location, company } = req.query;
  console.log("Query Parameters:", { title, location, company });
  try {
    const jobs = await Job.find({
      title: new RegExp(title, "i"),
      company: new RegExp(company, "i"),
      location: new RegExp(location, "i"),
    });
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Marked Job as applied
export const markAsApplied = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findByIdAndUpdate(
      id,
      { isApplied: true },
      { new: true }
    );
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const scrapAndSaveJobs = async (req, res) => {
  try {
    const scrapedJobs = await jobScraper(); // call job scraper
    console.log(scrapedJobs)
    res.status(200).json({message: "Scraping complete", scrapedJobs})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
