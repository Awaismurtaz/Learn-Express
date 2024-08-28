import { Box, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Activate = () => {
    const navigate = useNavigate();
    const [active, setActive] = useState("0")
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
        const payload = {
            email: data.email,
            isActive: active
        }
        console.log(payload)
        await axios.post(`http://localhost:4000/api/activate`, payload, {

        })
            .then((response) => {
                console.log("response", response)
                if (response.status === 200) {
                    navigate("/")
                }

                toast.success(response?.data?.message)
            }).catch((error) => {
                console.log(error)
                toast.error(error.response.data.message)
            })
    };
    return (
        <div>
            <Box className='widgetBox'>
                <Box className="container">
                    <Paper className="main-box">
                        <form id="myForm" onSubmit={handleSubmit(onsubmit)}>
                            <Typography variant="h4" align="center">Activate this Account</Typography>
                            <Typography variant="subtitle2" align="center">
                                Please confirm to activate your account by clicking the button below.
                            </Typography>
                            <Grid container >
                                <Grid item md={12} >
                                    <label className="label pb-3 fw-6">Email</label>
                                    <TextField variant='outlined' fullWidth size='small' type="email" placeholder="Enter email" name="email"  {...register("email")} />
                                </Grid>
                            </Grid>
                            <Box className="button-box" marginTop={2}>
                                <Button
                                    variant="contained"
                                    type='submit'
                                    onClick={() => setActive("1")}
                                    className="submit-button"
                                >
                                    Activate
                                </Button>
                            </Box>
                        </form>

                    </Paper>
                </Box>
            </Box>
        </div>
    )
}

export default Activate
