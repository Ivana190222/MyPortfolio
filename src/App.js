import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import Navbar from './components/Layout/Navbar';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Posts from './components/Posts/Posts';
import Highlights from './components/Highlights/Highlights';
import Followers from './components/Followers/Followers';
import Footer from './components/Layout/Footer';

// Create a theme instance with a more feminine touch
let theme = createTheme({
  palette: {
    primary: {
      main: '#ff6b98', // Rosa más claro y femenino
      light: '#ffa1c0',
      dark: '#d14b7a',
    },
    secondary: {
      main: '#a367dc', // Violeta más suave
      light: '#cea5f2',
      dark: '#7c4aa5',
    },
    background: {
      default: '#fff0f6', // Actualizado al color rosa claro del Home
      paper: '#ffffff',   // Mantener el papel blanco para los componentes
    },
  },
  typography: {
    fontFamily: [
      'Poppins',
      'Nunito',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: 'Pacifico, cursive',
    },
    h2: {
      fontFamily: 'Pacifico, cursive',
    },
    h3: {
      fontFamily: 'Pacifico, cursive',
    },
    h4: {
      fontFamily: 'Pacifico, cursive',
    },
    h5: {
      fontFamily: 'Pacifico, cursive',
    },
    h6: {
      fontFamily: 'Nunito, sans-serif',
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 30, // Botones más redondeados, estilo femenino
          fontFamily: 'Nunito, sans-serif',
          fontWeight: 600,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: {
            xs: 2,
            sm: 3,
          },
          paddingRight: {
            xs: 2,
            sm: 3,
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Bordes más redondeados para todos los papeles
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)', // Sombra más suave y femenina
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

// Make typography responsive
theme = responsiveFontSizes(theme);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div style={{ 
          minHeight: '100vh', 
          background: 'linear-gradient(135deg, #fff0f6 0%, #ffcee0 100%)', // Mismo gradiente que el Home
          overflowX: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: '0' // Quitar padding inferior para que el footer esté pegado al fondo
        }}>
          <Navbar />
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/posts" element={<Posts />} />
              <Route path="/highlights" element={<Highlights />} />
              <Route path="/followers" element={<Followers />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
