import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Controller, useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
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
const Login = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { isDirty, isValid, errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        mode: "onChange"
    });


    const onsubmit = async (data) => {
        console.log(data)
        await axios.post(`http://localhost:4000/api/login`, data, {
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                console.log("response", response)
                const token = response?.data?.token
                console.log(token, "token")
                localStorage.setItem('token', JSON.stringify(token));
                if (response.status === 200) {
                    navigate("/guest/my-jobs")
                }

                toast.success(response?.data?.message)
            }).catch((error) => {
                console.log(error)
                toast.error(error.response.data.message)
            })
    };

    return (
        <Box className='widgetBox'>
            <Box className="container">
                <Paper className="main-box">
                    <form id="myForm" onSubmit={handleSubmit(onsubmit)}>
                        <Typography variant='h4' className='text-center'>Sign In</Typography>
                        <Grid container spacing={2} >

                            <Grid item md={12} >
                                <label className="label pb-3 fw-6">Email</label>
                                <TextField variant='outlined' fullWidth size='small' type="email" placeholder="Enter email" name="email"  {...register("email")} />
                            </Grid>

                            <Grid item md={12} >
                                <label className="label pb-3 fw-6">Password</label>
                                <TextField variant='outlined' fullWidth size='small' type="password" placeholder="Enter password" name="password"   {...register("password")} />
                                <Typography variant='subtitle2' className=' forgot pt-20 '><Link to="/forgot-password">forgot password</Link> </Typography>
                            </Grid>
                        </Grid>
                        <Box className="button-box">
                            <Button
                                variant='contained'
                                type="submit"
                                className="submit-button"
                                disabled={!isDirty || !isValid}

                            >
                                Sign in
                            </Button>
                        </Box>
                        <Typography variant='subtitle2' className='text-center signUp pt-20 '>Don't have an account?<Link to="/register">Sign Up</Link> </Typography>
                    </form>
                </Paper>
            </Box>
        </Box>
    );
}

export default Login;
