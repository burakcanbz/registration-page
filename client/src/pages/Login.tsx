import React, { useState } from 'react'
import { styled } from '@mui/system';
import { Stack, Avatar, Checkbox, Button, Link, Paper, Typography, TextField, FormControlLabel, InputLabel, makeStyles } from '@mui/material'
import Grid from '@mui/material/Grid2';
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import LoginIcon from '@mui/icons-material/Login';
import loginGif from '../assets/loginGif.gif'
import axios from 'axios';


interface User {
    email: string,
    password: string
}

const MyPaper = styled(Paper)({
    padding: 30,
    height: '65vh',
    width: 400,
    margin: '50px auto',
    color: 'white',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundImage: `url(${loginGif})`
});

const MyAvatar = styled(Avatar)({
    width: 75, 
    height: 75, 
    bgcolor: 'rgb(220 220 220)'
});

const MyTextField = styled(TextField)({
    
})

const Login = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [user, setUser] = useState<User>({
        email: '',
        password: ''
    })
    const inputLabelStyle = { style: { color: '#fff' } }
    const inputStyle = { style: { color: 'white' } }
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(prev => !prev);
    }
    const style = {
        '& .MuiInput-underline:before': { borderBottomColor: 'white' },
        '& .MuiInput-underline:after': { borderBottomColor: 'white' },
        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottomColor: "white"
        }
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
        console.log("in submit?")
        const response = await axios.post('http://localhost:3000/register/login', {
            data: user
        })
        console.log(response)
        const responseData = response.data;
        if (responseData.success){
            console.log('in success')
            navigate('/user');
        }
    }

    return (
        <Grid>
            <MyPaper>
                <form onSubmit={handleSubmit}>
                    <Grid container direction='column' rowSpacing={{ xs: 1, sm: 1, md: 1 }}>
                        <Grid display='flex' justifyContent='center' alignItems='center' mt={3}>
                            <MyAvatar><LoginIcon sx={{ fontSize: '40px', color: 'black' }} /></MyAvatar>
                        </Grid>
                        <Grid display='flex' justifyContent='center' alignItems='center'>
                            <Typography variant='h5' component='h1' m={2} sx={{ fontWeight: 'bold' }}> LOGIN </Typography>
                        </Grid>
                        <Grid container display='flex' flexDirection='column' rowSpacing={2} >
                            <TextField label='Email' variant='standard' type='email' name='email' fullWidth required
                                slotProps={{ inputLabel: inputLabelStyle, input: inputStyle }} sx={style} onChange={handleInputChange} />
                            <TextField label='Password' variant='standard' type='password' name='password' fullWidth required
                                slotProps={{ inputLabel: inputLabelStyle, input: inputStyle }} sx={style} onChange={handleInputChange} />
                        </Grid>
                        <Grid container mt={2}>
                            <FormControlLabel label='Remember me' control={<Checkbox style={{ color: 'yellow' }} checked={isChecked} onChange={handleChange} />} />
                        </Grid>
                        <Stack direction='column' alignItems='center' marginTop='20px' spacing={3}>
                            <Button type='submit' color='inherit' variant='contained' size='small' fullWidth={false} sx={{ padding: '10px 50px' }}>
                                <Typography variant='body1'>LOGIN</Typography>
                            </Button>
                            <Typography display='flex' justifyContent='flex-end' variant='subtitle2'>Don't have an account?<Link sx={{ marginLeft: '4px', color: 'yellow' }} component={RouterLink} underline='none' to='/signup'>Signup</Link></Typography>
                        </Stack>
                    </Grid>
                </form>
            </MyPaper>
        </Grid>
    )
}

export default Login