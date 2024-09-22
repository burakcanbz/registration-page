import React from 'react'
import Grid from '@mui/material/Grid2';
import { Paper, Typography } from '@mui/material';

export const Nopage = () => {
    return (
        <Grid container minWidth='100vw' minHeight='100vh' alignItems='center' justifyContent='center'>
            <Typography variant='h4' component='h4' color='primary'>
                There is no Page Here. Still working on it.
            </Typography>
        </Grid>
    )
}
