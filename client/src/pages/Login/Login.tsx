import React, { useState, lazy, Suspense } from 'react'
import { Stack, Checkbox, Button, Link, Typography, TextField, FormControlLabel, CircularProgress } from '@mui/material'
import Grid from '@mui/material/Grid2';
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import LoginIcon from '@mui/icons-material/Login';
import axios from 'axios';
import { toast } from 'react-toastify';
import { endpoints } from '../../common/endpoints';
import { useDispatch, useSelector } from 'react-redux';
import { UserType } from '../../types/common.js';
import { MyAvatar } from '../../styledComponents/common';
import './login.css';
import { loginSuccess } from '../../store/userLoginSlice';
import loginGif from '../../assets/loginGif.gif'
import useIsOnline from '../../hooks/useIsOnline';
const MyPaper = lazy(() => import('../../styledComponents/common').then(module => ({ default: module.MyPaper })));


const Login: React.FC = () => {

    const dispatch = useDispatch();
    const isOnline = useIsOnline();

    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [user, setUser] = useState<UserType>({
        email: '',
        password: ''
    })

    const inputLabelStyle = { style: { color: '#fff' } }
    const inputStyle = { style: { color: 'white' } }
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(prev => !prev);
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUser((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const response = await axios.post(endpoints.login.url, {
            data: user
        },
        {
            withCredentials: true, // Important for sending cookies

        })
        const responseData = response.data;
        if (responseData.success) {
            dispatch(loginSuccess({ email: response.data.data, token: response.data.token }))
            toast.success('User successfully logged in.')
            navigate('/user');
        }
        else {
            toast.error('User not logged in!')
            console.error(response.data.message)
        }
    }

    return (
        <Grid>
            <Suspense fallback={<CircularProgress />}>
                <MyPaper backgroundImage={loginGif} elevation={5}>
                    <form onSubmit={handleSubmit}>
                        <Grid container direction='column' rowSpacing={{ xs: 1, sm: 1, md: 1 }}>
                            <Grid display='flex' justifyContent='center' alignItems='center' mt={3}>
                                <MyAvatar><LoginIcon sx={{ fontSize: '40px', color: 'black' }} /></MyAvatar>
                            </Grid>
                            <Grid display='flex' justifyContent='center' alignItems='center'>
                                <Typography variant='h5' component='h1' m={2} sx={{ fontWeight: 'bold' }}> LOGIN </Typography>
                            </Grid>
                            <Grid container display='flex' flexDirection='column' rowSpacing={1} >
                                <TextField label='Email' variant='standard' type='email' name='email' fullWidth required
                                    slotProps={{ inputLabel: inputLabelStyle, input: inputStyle }} className='textfield-main' onChange={handleInputChange} />
                                <TextField label='Password' variant='standard' type='password' name='password' fullWidth required
                                    slotProps={{ inputLabel: inputLabelStyle, input: inputStyle }} className='textfield-main' onChange={handleInputChange} />
                            </Grid>
                            <Grid container mt={2}>
                                <FormControlLabel label='Remember me' control={<Checkbox style={{ color: 'yellow' }} checked={isChecked} onChange={handleChange} />} />
                            </Grid>
                            <Stack direction='column' alignItems='center' marginTop='20px' spacing={2}>
                                <Button disabled={!isOnline} type='submit' color='inherit' variant='contained' size='small' fullWidth={false} sx={{ padding: '10px 50px' }}>
                                    <Typography variant='body1'>LOGIN</Typography>
                                </Button>
                                <Typography display='flex' justifyContent='flex-end' variant='subtitle2'>Don't have an account?<Link sx={{ marginLeft: '4px', color: 'yellow' }} component={RouterLink} underline='none' to='/signup'>Signup</Link></Typography>
                            </Stack>
                        </Grid>
                    </form>
                </MyPaper>
            </Suspense>
        </Grid>
    )
}

export default Login;