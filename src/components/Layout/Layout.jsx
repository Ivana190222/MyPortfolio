import React from 'react';
import { Box, Container } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      <Container maxWidth="lg" sx={{ py: 3 }}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout; 