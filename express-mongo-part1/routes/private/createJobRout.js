const express = require('express');
const { createJob, updateJob, deleteJob, getJobs } = require('../../services/private/createJob');

const routes = express.Router()
// create job api
routes.post('/create_job', createJob)
// update job
routes.post('/update_job/:id', updateJob)
// delete Job
routes.delete('/delete_job/:id', deleteJob)
// get jobs
routes.get('/jobs', getJobs)

module.exports = routes