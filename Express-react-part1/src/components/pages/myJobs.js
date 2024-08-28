import { Avatar, Box, Container, Paper, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import MenuCommpont from "../comman/menu"
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const Myjobs = (props) => {
    const { setJob } = props
    const [jobs, setJobs] = useState()
    const [jobId, setJobId] = useState()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate()

    const getJobs = async () => {
        await axios.get(`http://localhost:4000/api/jobs`)
            .then((response) => {
                console.log(response)
                setJobs(response?.data?.jobs)
            }).catch((error) => {
                console.log(error)
            })
    }
    useEffect(() => {
        getJobs()
    }, [])
    const handleClick = (event, job) => {
        setAnchorEl(event.currentTarget);
        setJobId(job?._id)
        setJob(job)
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleUpdate = () => {
        navigate(`/guest/create-job/${jobId}`)
        handleClose()
    }

    const deleteJob = async () => {
        await axios.delete(`http://localhost:4000/api/delete_job/${jobId}`)
            .then((response) => {
                console.log(response)
                toast.success(response?.data?.message)
                const updatedJobs = jobs.filter((job) => job._id !== jobId);
                setJobs(updatedJobs);
            }).catch((error) => {
                console.log(error)
                toast.error(error.response.data.message)
            })
            .finally(() => {
                handleClose()
            })
    }
    return (
        <div className='pt-20'>

            {jobs && jobs ?

                jobs.map((job, index) => (

                    <Box key={index} className='pt-20 pb-5'>
                        <Container>
                            <Paper className='jobBox'>
                                <Box className="jodHeader">
                                    <Box className="jobName">
                                        <Avatar variant='rounded'>AR</Avatar>
                                        <Box>
                                            <Typography >{job?.job_title}</Typography>
                                            <Typography >{index} day ago</Typography>
                                        </Box>
                                    </Box>
                                    <MenuCommpont
                                        handleClick={(e) => handleClick(e, job)}
                                        anchorEl={anchorEl}
                                        setAnchorEl={setAnchorEl}
                                        jobId={jobId}
                                        handleClose={handleClose}
                                        handleUpdate={handleUpdate}
                                        open={open}
                                        deleteJob={deleteJob}

                                    />
                                </Box>
                                <Box className="desc">
                                    <Typography
                                        variant="body"
                                        className="job_description"
                                        dangerouslySetInnerHTML={{
                                            __html: job?.desc,
                                        }}
                                    ></Typography>
                                </Box>
                                <Box className="jobDetail">
                                    <Typography variant='body'>{job.job_type}</Typography>
                                    <Typography variant='body'>{`$${job.minimum_rate}`} - {`$${job.maximum_rate}`}</Typography>
                                    <Typography variant='body'>{job.pay_type}</Typography>
                                    <Typography variant='body'>{job.location}</Typography>
                                    <Typography variant='body'>{job.skills}</Typography>
                                </Box>
                            </Paper>
                        </Container>
                    </Box>
                ))
                : <Typography className='text-center'>Jobs Not available</Typography>
            }
        </div>
    )
}

export default Myjobs
