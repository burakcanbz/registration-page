import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid2';
import { Paper, Stack, Typography } from '@mui/material';

export const Nopage = () => {

    return (
        <Stack direction='column' height='100%' justifyContent='center' alignItems='center'  sx={{ flexGrow: 1 }}>
            <Typography variant='h4' component='h4' color='primary'  margin=''>
                There is no Page Here. Still working on it.
            </Typography>
        </Stack>
    )
}
