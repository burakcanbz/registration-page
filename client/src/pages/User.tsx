import React, { useEffect, useState } from 'react'
import { Stack, Paper, TextField, Typography } from '@mui/material';
import axios, { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setIsLoggedIn } from '../store/userLoginSlice';
import { useDispatch } from 'react-redux';

export const User = () => {
  let firstRender = true;
  const dispatch = useDispatch();
  const userLoggedIn = useSelector((state: RootState) => state.userLogin.isLoggedIn);
  const [userName, setUserName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string|null>(null);

  const sendRequest = async () => {
    try{
      const response = await axios.get('http://localhost:3000/register/user', {
        withCredentials: true,
      })
      const responseData = response.data;
      dispatch(setIsLoggedIn(true))
      setUserName(responseData.data)
    }
    catch (err){
      const error = err as AxiosError; // Type assertion
      setError(error.message);
      dispatch(setIsLoggedIn(false))
    }
    finally{
      setLoading(false);
    }
  }

  const refreshToken = async () => {
    try{
      const resp = await axios.get('http://localhost:3000/register/refresh', {
        withCredentials: true
      })
      const respData = resp.data;
      setUserName(respData.data);
      dispatch(setIsLoggedIn(true))
    }
    catch(err){
      dispatch(setIsLoggedIn(false))
    }
  }

  useEffect(() => {
      if(firstRender){
        firstRender = false;
        sendRequest();
      }
      let interval = setInterval(() => {
        refreshToken();
      }, 1000 * 28)
      return () => clearInterval(interval)
  }, [])

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Stack>
      <Paper sx={{ height: '65vh', margin: ' 50px auto', display: 'flex', flexDirection: 'column', alignItems: 'center'}} elevation={5}>
        <Typography variant='h4' component='h4' p={2}> USER INFORMATIONS </Typography>
        { userLoggedIn && 
        <TextField
          fullWidth
          label="User Informations"
          size='small'
          variant='standard'
          aria-readonly
          value={userName ? userName : ''}
          slotProps={{
            htmlInput: {
              style: { textAlign: "center" }
            }
          }}
          sx={{ width: '100%', maxWidth: '300px', margin: 'auto' }}
          />
        }
      </Paper>
    </Stack>
  )
}
