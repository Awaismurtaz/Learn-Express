import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { Controller, useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { isDirty, isValid },
    } = useForm({
        mode: "onChange",
    });


    const onsubmit = async (data) => {
        console.log(data)
        await axios.post(`http://localhost:4000/api/forgot-password`, data)
            .then((response) => {
                console.log("response", response)
                toast.success("Please check inbox")
            }).catch((error) => {
                console.log(error)
                toast.error("Please all fields must be fill")
            })
    };

    return (
        <Box className='widgetBox'>
            <Box className="container">
                <Paper className="main-box">
                    <form id="myForm" onSubmit={handleSubmit(onsubmit)}>
                        <Typography variant='h4' className='text-center'>Forgot your password</Typography>
                        <Typography variant='subtitle1' className='text-center '>Enter your email address and we'll send you a link to reset your password</Typography>
                        <Grid container spacing={2} >

                            <Grid item md={12} >
                                <label className="label pb-3 fw-6">Email*</label>
                                <TextField variant='outlined' fullWidth size='small' type="email" placeholder="Enter email" name="email"  {...register("email")} />
                            </Grid>

                        </Grid>
                        <Box className="button-box">
                            <Button
                                variant='contained'
                                type="submit"
                                className="submit-button"
                            >
                                submit
                            </Button>
                        </Box>
                        <Typography variant='subtitle2' className='text-center signUp pt-20 '> Already have an account?<Link to="/">Sign In </Link> </Typography>
                    </form>
                </Paper>
            </Box>
        </Box>
    );
}

export default ForgotPassword;
