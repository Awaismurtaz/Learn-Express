import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { Controller, useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
    const navigate = useNavigate();
    const { id, token } = useParams()
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
        await axios.post(`http://localhost:4000/api/reset-password/${id}/${token}`, data, {
        })
            .then((response) => {
                console.log("response", response)
                if (response.status === 200) {
                    navigate("/")
                }

                toast.success("successfully reset password")
            }).catch((error) => {
                console.log(error)
                toast.error(error)
            })
    };

    return (
        <Box className='widgetBox'>
            <Box className="container">
                <Paper className="main-box">
                    <form id="myForm" onSubmit={handleSubmit(onsubmit)}>
                        <Typography variant='h4' className='text-center'>Reset password</Typography>
                        <Grid container spacing={2} >

                            <Grid item md={12} >
                                <label className="label pb-3 fw-6">New Password*</label>
                                <TextField variant='outlined' fullWidth size='small' type="password" placeholder="Enter password" name="password"  {...register("password")} />
                            </Grid>

                            {/* <Grid item md={12} >
                                <label className="label pb-3 fw-6">Confirm Password*</label>
                                <TextField variant='outlined' fullWidth size='small' type="password" placeholder="Enter password" name="confirm_password"  {...register("confirm_password")} />
                            </Grid> */}

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
                    </form>
                </Paper>
            </Box>
        </Box>
    );
}

export default ResetPassword;
