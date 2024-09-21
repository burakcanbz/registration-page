import React, { useState } from 'react'
import { Stack, Avatar, Checkbox, Button, Link, Paper, Typography, TextField, FormControlLabel, InputLabel } from '@mui/material'
import Grid from '@mui/material/Grid2';
import { Link as RouterLink } from 'react-router-dom'
import LoginIcon from '@mui/icons-material/Login';
import loginGif from '../assets/loginGif.gif'

const Login = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const paperStyle = { padding: 30, height: '65vh', width: 400, margin: '50px auto', color: 'white' }
    const inputLabelStyle = {style: {color: '#fff' }}
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(prev => !prev);
    }
    return (
        <Grid>
            <Paper sx={{
                backgroundImage: `url(${loginGif})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }} style={paperStyle} elevation={5}>
                <Grid container direction='column' rowSpacing={{ xs: 1, sm: 1, md: 1 }}>
                    <Grid display='flex' justifyContent='center' alignItems='center' mt={3}>
                        <Avatar sx={{ width: 100, height: 100, bgcolor: 'green' }}><LoginIcon sx={{ fontSize: '40px' }} /></Avatar>
                    </Grid>
                    <Grid display='flex' justifyContent='center' alignItems='center'>
                        <Typography variant='h4' component='h1' m={2} sx={{ fontWeight: 'bold' }}> LOGIN </Typography>
                    </Grid>
                    <Grid container display='flex' flexDirection='column' rowSpacing={2} >
                        <TextField label='Username' variant='standard' fullWidth required 
                        slotProps={{ inputLabel : inputLabelStyle}} />
                        <TextField label='Password' variant='standard' fullWidth required 
                        slotProps={{ inputLabel : inputLabelStyle}}/>
                    </Grid>
                    <Grid container mt={2}>
                        <FormControlLabel label='Remember me' control={<Checkbox color='secondary' checked={isChecked} onChange={handleChange} />} />
                    </Grid>
                    <Stack direction='column' marginTop='20px' spacing={3}>
                        <Button type='submit' color='success' variant='contained' fullWidth sx={{ padding: '10px' }}>
                            <Typography variant='h6'>LOGIN</Typography>
                        </Button>
                        <Typography display='flex' justifyContent='flex-end' variant='subtitle2'>Don't have an account?<Link sx={{ marginLeft: '4px', color: 'yellow' }} component={RouterLink} underline='none' to='/signup'>Signup</Link></Typography>
                    </Stack>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default Login