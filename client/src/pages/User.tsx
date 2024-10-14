  import React, { useEffect, useState } from 'react'
  import { Stack, Paper, TextField, Typography } from '@mui/material';
  import axios, { AxiosError } from 'axios';

  export const User = () => {
    let firstRender = true;
    const [user, setUser] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string|null>(null);

    const sendRequest = async () => {
      try{
        const response = await axios.get('http://localhost:3000/register/user', {
          withCredentials: true,
        })
        const responseData = response.data;
        return responseData
      }
      catch (err){
        const error = err as AxiosError; // Type assertion
        setError(error.message);
      }
      finally{
        setLoading(false);
      }
    }

    const refreshToken = async () => {
      const resp = await axios.get('http://localhost:3000/register/refresh', {
        withCredentials: true
      })
      const respData = resp.data;
      return respData;
    }
    useEffect(() => {
        if(firstRender){
          firstRender = false;
          sendRequest().then(data => setUser(data.data));
        }
        let interval = setInterval(() => {

          refreshToken().then(data => setUser(data.data))
        }, 1000 * 28)
        return () => clearInterval(interval)
    }, [])

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
      <Stack display='flex'  justifyContent='center' alignItems='center' minHeight='90vh'>
        <Paper sx={{ height: '65vh', margin: ' 50px auto', width: '30%', display: 'flex', flexDirection: 'column', alignItems: 'center'}} elevation={5}>
          <Typography variant='h4' component='h4' p={2}> USER INFORMATIONS </Typography>
          <TextField
            fullWidth
            label="User Informations"
            size='small'
            variant='standard'
            aria-readonly
            value={user ? user : ''}
            slotProps={{
              htmlInput: {
                style: { textAlign: "center" }
              }
            }}
            sx={{ width: '100%', maxWidth: '300px', margin: 'auto' }}
          />
        </Paper>
      </Stack>
    )
  }
