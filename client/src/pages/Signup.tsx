import { useFormik } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import { TextField, Button, Paper, Avatar, Typography, Link, InputLabel } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { object, string, ref, number, date, InferType } from 'yup';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import signupGif from '../assets/signupGif.gif'
import { BorderColor } from '@mui/icons-material';
import axios from 'axios';

const validationSchema = object({
  name: string().required('Name required'),
  email:
    string()
      .email('Enter a valid email')
      .required('Email is required'),
  password:
    string()
      .min(3, 'Password should be of minimum 3 characters length')
      .required('Password is required'),
  confirmPassword: string()
    .oneOf([ref('password')], 'Passwords must match')
    .required('confirm password required')
});

export const Signup = () => {

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationSchema,
    onSubmit: async(values) => {
      console.log(values);
      const response = await axios.post('http://localhost:3000/register/signup', {
        data: values,
      })
      console.log(response);
    },
  });
  const paperStyle = { padding: 30, height: '65vh', width: 400, margin: '50px auto', backgroundColor: 'rgb(241 245 249)', color: 'white' }
  const inputLabelStyle = { style: { color: '#fff' } }
  const inputBorderStyle = { style: { color: 'white', BorderColor: 'white', backgroundColor: 'inherit'} }
  const inputStyle = { style :{color: 'white'}}

  const style = {
    '& .MuiInput-underline:before' : {borderBottomColor: 'white'},
    '& .MuiInput-underline:after' : {borderBottomColor: 'white' },
      "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
        borderBottomColor: "white"
      }  
  }

  return (
    <Grid container direction='column' justifyContent='center' alignItems='center'>
      <Paper style={paperStyle} elevation={5} sx={{
        backgroundImage: `url(${signupGif})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container display='flex' justifyContent='center' mt={3}>
            <Avatar sx={{ width: 75, height: 75, bgcolor: 'rgb(220 220 220)' }}><AccountCircleIcon sx={{ fontSize: '50px', color: 'black' }} /></Avatar>
          </Grid>
          <Grid display='flex' justifyContent='center' alignItems='center'>
            <Typography variant='h5' component='h1' m={3} sx={{ fontWeight: 'bold' }}> SIGNUP </Typography>
          </Grid>
          <Grid container rowSpacing={2}>
            <TextField
              fullWidth
              id="name"
              name="name"
              label="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.name)}
              helperText={formik.touched.email && formik.errors.name}
              size='small'
              variant='standard'
              slotProps={{ inputLabel: inputLabelStyle, input: inputStyle }}
              sx={ style }
              required
            />
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              size='small'
              variant='standard'
              slotProps={{ inputLabel: inputLabelStyle, input: inputStyle }}
              sx={ style }
              required
            />
            <TextField
              fullWidth
              id="password"
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              size='small'
              variant='standard'
              slotProps={{ inputLabel: inputLabelStyle, input: inputStyle }}
              sx={ style }
              required
            />
            <TextField
              fullWidth
              id="confirmPassword"
              name="confirmPassword"
              label="ConfirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.confirmPassword)}
              helperText={formik.touched.password && formik.errors.confirmPassword}
              size='small'
              variant='standard'
              slotProps={{ inputLabel: inputLabelStyle, input: inputStyle }}
              sx={ style }
              required
            />
          </Grid>
          <Grid display='flex' justifyContent='center' mt={5} spacing={3}>
            <Button type='submit' color='secondary' variant='contained' fullWidth={false} sx={{ padding: '10px 50px' }}>
              <Typography variant='body1'>SIGNUP</Typography>
            </Button>
          </Grid>
        </form>
      </Paper>
    </Grid >
  );
}