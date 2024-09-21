import React, { useState } from 'react'
import { Stack, Avatar, Checkbox, Button, Link, Paper, Typography, TextField, FormControlLabel, InputLabel } from '@mui/material'
import Grid from '@mui/material/Grid2';
import { Link as RouterLink } from 'react-router-dom'
import LoginIcon from '@mui/icons-material/Login';
import loginGif from '../assets/loginGif.gif'

const Login = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const paperStyle = { padding: 30, height: '65vh', width: 400, margin: '50px auto', color: 'white' }
    const inputLabelStyle = { style: { color: '#fff' } }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(prev => !prev);
    }
    const style = {
        '& .MuiInput-underline:before' : {borderBottomColor: 'white'},
        '& .MuiInput-underline:after' : {borderBottomColor: 'white' },
        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
          borderBottomColor: "white"
        }
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
                        <Avatar sx={{ width: 75, height: 75, bgcolor: 'rgb(220 220 220)' }}><LoginIcon sx={{ fontSize: '40px', color: 'black' }} /></Avatar>
                    </Grid>
                    <Grid display='flex' justifyContent='center' alignItems='center'>
                        <Typography variant='h5' component='h1' m={2} sx={{ fontWeight: 'bold' }}> LOGIN </Typography>
                    </Grid>
                    <Grid container display='flex' flexDirection='column' rowSpacing={2} >
                        <TextField label='Username' variant='standard' fullWidth required
                            slotProps={{ inputLabel: inputLabelStyle }} sx={style} />
                        <TextField label='Password' variant='standard' fullWidth required
                            slotProps={{ inputLabel: inputLabelStyle }} sx={style}/>
                    </Grid>
                    <Grid container mt={2}>
                        <FormControlLabel label='Remember me' control={<Checkbox style={{ color: 'yellow' }} checked={isChecked} onChange={handleChange} />} />
                    </Grid>
                    <Stack direction='column' alignItems='center' marginTop='20px' spacing={3}>
                        <Button type='submit' color='inherit' variant='contained' size='small' fullWidth={false} sx={{ padding: '10px 50px'}}>
                            <Typography variant='body1'>LOGIN</Typography>
                        </Button>
                        <Typography display='flex' justifyContent='flex-end' variant='subtitle2'>Don't have an account?<Link sx={{ marginLeft: '4px', color: 'yellow' }} component={RouterLink} underline='none' to='/signup'>Signup</Link></Typography>
                    </Stack>
                </Grid>
            </Paper>
        </Grid>
    )
}

export default Login