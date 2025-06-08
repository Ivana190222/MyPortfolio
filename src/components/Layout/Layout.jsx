import React from 'react';
import { Box } from '@mui/material';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh',
      width: '100%' 
    }}>
      <Navbar />
      <Box component="main" sx={{ 
        flexGrow: 1,
        width: '100%',
        pt: '64px' // Espacio para la barra de navegación fija
      }}>
        {children}
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout; 