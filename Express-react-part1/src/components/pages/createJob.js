import { Autocomplete, Box, Button, Container, Grid, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import draftToHtml from 'draftjs-to-html';
import * as yup from 'yup';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, ContentState, convertToRaw } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';


const validationSchema = yup.object().shape({
    job_title: yup.string().required('Job title is required'),
    job_type: yup.string().required('Job type is required'),
    pay_type: yup.string().required('Pay type is required'),
    location: yup.string().required('Location is required'),
    status: yup.string().required('Status is required'),
    minimum_rate: yup.number().required('Minimum rate is required'),
    maximum_rate: yup.number().required('Maximum rate is required'),
    experience_level: yup.string().required('Experience level is required'),
    experience_year: yup.number().required('Experience years is required'),
});
const Createjob = (props) => {
    const { job } = props
    const navigate = useNavigate();
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const { id } = useParams()
    console.log("paramId", id)
    const [editorValue, setEditorValue] = useState();
    console.log("value", editorValue)
    const {
        register,
        handleSubmit,
        reset,
        control,
        setValue,
        formState: { isDirty, isValid, errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange"
    });

    const onEditorStateChange = (newEditorState) => {
        setEditorState(newEditorState);
        const contentState = newEditorState.getCurrentContent();
        const rawContent = convertToRaw(contentState);
        const htmlContent = draftToHtml(rawContent);
        console.log(htmlContent)
        setEditorValue(htmlContent);
    };


    const onsubmit = async (data) => {
        console.log(data)
        const formdata = new FormData();
        formdata.append("job_title", data.job_title)
        formdata.append("job_type", data.job_type)
        formdata.append("pay_type", data.pay_type)
        formdata.append("location", data.location)
        formdata.append("skills", data.skills.value)
        formdata.append("status", data.status)
        formdata.append("minimum_rate", data.minimum_rate)
        formdata.append("maximum_rate", data.maximum_rate)
        formdata.append("experience_level", data.experience_level)
        formdata.append("experience_year", data.experience_year)
        formdata.append("desc", editorValue)

        let apiURL;
        if (!id) {
            apiURL = `http://localhost:4000/api/create_job`
        } else {
            apiURL = `http://localhost:4000/api/update_job/${id}`
        }

        await axios.post(apiURL, formdata, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log("response", response)
                toast.success(response?.data?.message)
                reset()
            }).catch((error) => {
                console.log(error)
                toast.error(error.response.data.message)
            }).finally(() => {
                reset()
            })
    };



    useEffect(() => {
        if (job && job) {
            setValue('job_title', job?.job_title);
            setValue('job_type', job?.job_type);
            setValue('pay_type', job?.pay_type);
            setValue('location', job?.location);
            setValue('minimum_rate', job?.minimum_rate);
            setValue('maximum_rate', job?.maximum_rate);

            // Convert job.desc from HTML to EditorState
            const blocksFromHtml = htmlToDraft(job?.desc || '');
            const { contentBlocks, entityMap } = blocksFromHtml;
            const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            const editorState = EditorState.createWithContent(contentState);
            console.log(editorState, "==>")
            setEditorValue(editorState);
            setEditorState(editorState);
            // editor value set an update

            setValue('experience_level', job?.experience_level);
            setValue('experience_year', job?.experience_year);
            setValue('status', job?.status);

            const selectedSkills = skillOptions.find((option) => option.value === job?.skills);
            console.log(selectedSkills, "skills")
            setValue('skills', selectedSkills);
        }
    }, [job, setValue, skillOptions]);
    return (
        <Box className='createJob' sx={{ padding: "30px 0px" }}>
            <Container>
                <Paper className="main-box" elevation={3}>
                    <form id="myForm" onSubmit={handleSubmit(onsubmit)} >
                        <Typography variant='h4' className='pb-20'>{job && job?._id ? "Update" : "Create"} job</Typography>
                        <Grid container spacing={2} >

                            <Grid item md={6} >
                                <label className="label pb-3 fw-6">Job title</label>
                                <TextField variant='outlined' fullWidth size='small' type="text" placeholder="Enter title" name="job_title"  {...register("job_title")} />
                            </Grid>

                            <Grid item md={6} >
                                <label className="label pb-3 fw-6">Job type</label>
                                <Controller
                                    name="job_type"
                                    control={control}
                                    defaultValue="" // Ensure default value matches one of the options
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            size="small"
                                            fullWidth
                                            displayEmpty
                                        >
                                            <MenuItem value="" disabled>Select job type</MenuItem>
                                            <MenuItem value="Full time">Full time</MenuItem>
                                            <MenuItem value="Part time">Part time</MenuItem>
                                            <MenuItem value="Contract">Contract</MenuItem>
                                        </Select>
                                    )}
                                />
                            </Grid>
                            <Grid item md={6} >
                                <label className="label pb-3 fw-6">Pay type</label>
                                <Controller
                                    name="pay_type"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            size='small'
                                            fullWidth
                                        >
                                            <MenuItem value="monthly">Monthly</MenuItem>
                                            <MenuItem value="yearly">Yearly</MenuItem>
                                            <MenuItem value="daily">Daily</MenuItem>
                                            <MenuItem value="weekly">Weekly</MenuItem>
                                        </Select>
                                    )}
                                />
                            </Grid>

                            <Grid item md={6} >
                                <label className="label pb-3 fw-6">Location</label>
                                <TextField variant='outlined' fullWidth size='small' type="text" placeholder="Enter location" name="location"   {...register("location")} />
                            </Grid>

                            <Grid item md={12} >
                                <label className="label pb-3 fw-6">Description</label>
                                <Box className="editorBox">
                                    <Editor
                                        editorState={editorState}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        onEditorStateChange={onEditorStateChange}
                                    />
                                </Box>
                            </Grid>

                            <Grid item md={6} >
                                <label className="label pb-3 fw-6">Minimum Pay Rate</label>
                                <TextField variant='outlined' fullWidth size='small' type="number" placeholder="Minimum pay rate" name="minimum_rate"   {...register("minimum_rate")} />
                            </Grid>

                            <Grid item md={6} >
                                <label className="label pb-3 fw-6">Maximum Pay Rate</label>
                                <TextField variant='outlined' fullWidth size='small' type="number" placeholder="Maximum pay rate" name="maximum_rate"   {...register("maximum_rate")} />
                            </Grid>

                            <Grid item md={6} >
                                <label className="label pb-3 fw-6">Skills</label>
                                <Controller
                                    name="skills"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Autocomplete
                                            {...field}
                                            options={skillOptions}
                                            getOptionLabel={(option) => option.label}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="outlined"
                                                    size="small"
                                                    placeholder='search skill'
                                                    fullWidth
                                                />
                                            )}
                                            onChange={(_, data) => field.onChange(data)}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item md={6} >
                                <label className="label pb-3 fw-6">Status</label>
                                <Controller
                                    name="status"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            size='small'
                                            fullWidth
                                        >
                                            <MenuItem value="Open">Open</MenuItem>
                                            <MenuItem value="Closed">Closed</MenuItem>
                                            <MenuItem value="Pending">Pending</MenuItem>
                                        </Select>
                                    )}
                                />
                            </Grid>

                            <Grid item md={6}>
                                <label className="label pb-3 fw-6">Experience level</label>
                                <Controller
                                    name="experience_level"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <Select
                                            {...field}
                                            size="small"
                                            fullWidth
                                            displayEmpty // Optional: displays a placeholder when no option is selected
                                        >
                                            <MenuItem value="Entry Level">Entry Level</MenuItem>
                                            <MenuItem value="Mid Level">Mid Level</MenuItem>
                                            <MenuItem value="Senior Level">Senior Level</MenuItem>
                                            <MenuItem value="Expert Level">Expert Level</MenuItem>
                                        </Select>
                                    )}
                                />
                            </Grid>

                            <Grid item md={6} >
                                <label className="label pb-3 fw-6">Experience Year</label>
                                <TextField variant='outlined' fullWidth size='small' type="number" placeholder="Experience year" name="experience_year"   {...register("experience_year")} />
                            </Grid>

                        </Grid>
                        <Box className="mt-20">
                            <Button
                                variant='contained'
                                type="submit"
                                className="submit-button"

                                disabled={!isDirty || !isValid}

                            >
                                create job
                            </Button>
                        </Box>

                    </form>
                </Paper>
            </Container>
        </Box>
    );
}

export default Createjob;

const skillOptions = [
    { label: "Cloud Computing", value: "cloud_computing" },
    { label: "Data Analyses", value: "data_analyses" },
    { label: "Data Science", value: "data_science" },
    { label: "Machine Learning", value: "machine_learning" },
    { label: "Artificial Intelligence", value: "artificial_intelligence" },
    { label: "Cybersecurity", value: "cybersecurity" },
    { label: "Web Development", value: "web_development" },
    { label: "Mobile Development", value: "mobile_development" },
    { label: "Blockchain", value: "blockchain" },
    { label: "Internet of Things (IoT)", value: "iot" },
    { label: "DevOps", value: "devops" },
    { label: "Project Management", value: "project_management" },
    { label: "UI/UX Design", value: "ui_ux_design" },
    { label: "Digital Marketing", value: "digital_marketing" },
    { label: "Cloud Infrastructure", value: "cloud_infrastructure" },
    { label: "Big Data", value: "big_data" },
    { label: "Software Testing", value: "software_testing" },
    { label: "Network Engineering", value: "network_engineering" },
    { label: "Database Management", value: "database_management" },
    { label: "Business Analysis", value: "business_analysis" }
];