import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Box } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <Box
      display="flex"
      flexDirection="column" 
      minHeight="100vh" // Tüm ekran yüksekliğini kaplar
    >
      <Header />
      <Box flexGrow={1} display='flex' justifyContent='center' alignItems= 'center'>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

export default App;
