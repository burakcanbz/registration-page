import React from 'react'
import { Box, AppBar, Toolbar, Typography, Stack, Button, Container } from '@mui/material';
import { IconButton } from '@mui/material';
import ownLogo from '../assets/b.png'
import { Link as RouterLink } from 'react-router-dom';
import { Link } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import './header.css';

const Header = () => {
    const isLoggedIn = useSelector((state: RootState) => state.userLogin.isLoggedIn)
    return (
        <header>
            <Box>
                <AppBar position='static' sx={{ padding: 1, bgcolor: 'text.primary' }} elevation={5}>
                    <Container maxWidth='xl'>
                        <Toolbar>
                            <IconButton
                                edge='start'
                                aria-label='logo'
                                size='small'
                                sx={{
                                    "&:hover": {
                                        backgroundColor: "transparent"
                                    }
                                }}
                                disableRipple>
                                <Link component={RouterLink} to='/'>
                                    <img style={{ height: '60px', borderRadius: '50%' }} src={ownLogo} />
                                </Link>
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            </Typography>
                            <Stack direction='row' spacing={2}>
                                {isLoggedIn ?
                                    <>
                                        <Link component={RouterLink} to='/' underline='none' color='inherit'><Button variant='outlined' color='inherit'  className='button-main'><Typography variant='body1'>Home</Typography></Button></Link>
                                        <Link component={RouterLink} to='/features' underline='none' color='inherit'><Button variant='outlined' color='inherit'  className='button-main'><Typography variant='body1'>Features</Typography></Button></Link>
                                        <Link component={RouterLink} to='/about' underline='none' color='inherit'><Button variant='outlined' color='inherit'  className='button-main'><Typography variant='body1'>About</Typography></Button></Link>
                                        <Link component={RouterLink} to='/logout' underline='none' color='inherit'><Button variant='outlined' color='inherit'  className='button-main'><Typography variant='body1'>Logout</Typography></Button></Link>
                                    </>
                                    :
                                        <Link component={RouterLink} to='/login' underline='none' color='inherit'><Button variant='outlined' color='inherit' size='large' className='button-main'><Typography variant='body1'>Login</Typography></Button></Link>
                                }
                            </Stack>
                        </Toolbar>
                    </Container>
                </AppBar>
            </Box >
        </header>
    )
}

export default Header