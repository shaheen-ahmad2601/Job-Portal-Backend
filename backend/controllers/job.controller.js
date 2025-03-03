import { Job } from "../models/job.model.js";


//ammin will post the job
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    const userId = req.id;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(404).json({
        message: "something is missing",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      jobType,
      experienceLevel: experience,
      position,
      location,
      company: companyId,
      created_by: userId,
    });
    return res.status(200).json({
      message: "New Job Created Successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "server error1",
      success: false,
    });
  }
};

//for student -----------------------get All Jobs --------------------

export const getAllJobs = async (req, res) => {
  try {
    const keyWord = req.query.keyWord || "";
    const query = {
      $or: [
        { title: { $regex: keyWord, $options: "i" } },
        { description: { $regex: keyWord, $options: "i" } },
      ],
    };
    const jobs = await Job.find(query).populate({
        path:"company",
    }).sort({createdAt:-1});

    if (!jobs || jobs.length === 0) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "server error2",
      success: false,
    });
  }
};

//for student ------------------get jobs by id ------------------------
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId);
    if (!job || job.length == 0) {
      return res.status(404).json({
        message: "Jobs not found",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "server error3",
      success: false,
    });
  }
};
//admin - how many jobs admin created uptill this point

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id; // it will find the job individual admin jobs post;
    const jobs = await Job.find({ created_by: adminId });
    if (!jobs) {
      return res.status(400).json({
        message: "jobs not found",
        success: false,
      });
    }
    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "server error4",
      success: false,
    });
  }
};
