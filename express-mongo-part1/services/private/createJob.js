const createJob_database = require('../../models/private/createJob')

const createJob = async (req, res) => {
    const { job_title, job_type, pay_type, location, skills, status, minimum_rate, maximum_rate,
        experience_level, experience_year, desc } = req.body;
    try {
        const requiredFields = {
            job_title: "Job title is required",
            job_type: "Job type is required",
            pay_type: "Pay type is required",
            location: "Location is required",
            skills: "Skills are required",
            status: "Status is required",
            minimum_rate: "Minimum rate is required",
            maximum_rate: "Maximum rate is required",
            experience_level: "Experience level is required",
            experience_year: "Experience year is required",
            desc: "Description is required"
        };
        for (const field in requiredFields) {
            if (!eval(field)) {
                return res.status(401).json({ success: false, message: requiredFields[field] });
            }
        }

        const job = new createJob_database({
            job_title, job_type, pay_type, location, skills, status, minimum_rate, maximum_rate,
            experience_level, experience_year, desc
        })
        await job.save();
        res.status(200).json({
            success: true,
            message: "job created successfully",
            job
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateJob = async (req, res) => {
    const id = req.params.id;
    const { job_title, job_type, pay_type, location, skills, status, minimum_rate, maximum_rate, experience_level, experience_year, desc } = req.body;

    try {
        // Validate if job ID exists
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "This job ID does not exist"
            });
        }

        // Validate required fields
        const requiredFields = {
            job_title: "Job title is required",
            job_type: "Job type is required",
            pay_type: "Pay type is required",
            location: "Location is required",
            skills: "Skills are required",
            status: "Status is required",
            minimum_rate: "Minimum rate is required",
            maximum_rate: "Maximum rate is required",
            experience_level: "Experience level is required",
            experience_year: "Experience year is required",
            desc: "Description is required"
        };

        for (const field in requiredFields) {
            if (!req.body[field]) {
                return res.status(400).json({
                    success: false,
                    message: requiredFields[field]
                });
            }
        }

        // Create the jobFields object to be updated
        const jobFields = {
            job_title,
            job_type,
            pay_type,
            location,
            skills,
            status,
            minimum_rate,
            maximum_rate,
            experience_level,
            experience_year,
            desc
        };

        // Update the job document in the database
        const updateResult = await createJob_database.updateOne({ _id: id }, { $set: jobFields });

        if (updateResult.modifiedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Job not found or no changes made"
            });
        }

        res.status(200).json({
            success: true,
            message: "Job updated successfully",
            updateResult
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const deleteJob = async (req, res) => {
    const { id } = req.params

    try {
        const jobId = await createJob_database.findOne({ _id: id })
        console.log(jobId)
        if (!jobId) {
            return res.status(401).json({
                success: false,
                message: "the job id not exist"
            })
        }

        await createJob_database.deleteOne({ _id: id })

        res.status(200).json({
            success: true,
            message: "job deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: { error: error.message }
        })
    }
}

const getJobs = async (req, res) => {
    try {
        const jobs = await createJob_database.find()

        if (jobs.length === 0) {
            return res.status(401).json({
                success: false,
                message: "No job found"
            })
        }
        res.status(200).json({
            success: true,
            message: "All jobs fetched",
            jobs
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: { error: error.message }
        })
    }
}


module.exports = { createJob, updateJob, deleteJob, getJobs }