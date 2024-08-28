import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { Controller, useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email('Invalid email address')
        .required('Email is required'),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters long'),
});
const Register = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { isDirty, isValid },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange",
    });


    const onsubmit = async (data) => {
        console.log(data)
        await axios.post(`http://localhost:4000/api/register`, data)
            .then((response) => {
                console.log("response", response)
                toast.success(response?.data?.message)
                setTimeout(() => {
                    if (response?.status === 200) {
                        navigate('/');
                    }
                }, 2000)
            }).catch((error) => {
                console.log(error)
                toast.error(error?.response?.data?.message)
            })
    };

    return (
        <Box className='widgetBox'>
            <Box className="container">
                <Paper className="main-box">
                    <form id="myForm" onSubmit={handleSubmit(onsubmit)}>
                        <Typography variant='h4' className='text-center'>Sign Up</Typography>
                        <Grid container spacing={2} >

                            <Grid item md={12} >
                                <label className="label pb-3 fw-6">Name</label>
                                <TextField variant='outlined' fullWidth size='small' type="text" placeholder="Enter name" name="userName"  {...register("userName")} />
                            </Grid>

                            <Grid item md={12} >
                                <label className="label pb-3 fw-6">Email</label>
                                <TextField variant='outlined' fullWidth size='small' type="email" placeholder="Enter email" name="email"   {...register("email")} />
                            </Grid>
                            <Grid item md={12} >
                                <label className="label pb-3 fw-6">Password</label>
                                <TextField variant='outlined' fullWidth size='small' type="text" placeholder="Enter password" name="password"   {...register("password")} />
                            </Grid>
                        </Grid>
                        <Box className="button-box">
                            <Button
                                variant='contained'
                                type="submit"
                                className="submit-button "
                                disabled={!isDirty || !isValid}
                            >
                                Sign up
                            </Button>
                        </Box>
                        <Typography variant='subtitle2' className='text-center signUp pt-20 '> Already have an account?<Link to="/">Sign In </Link> </Typography>
                    </form>
                </Paper>
            </Box>
        </Box>
    );
}

export default Register;
