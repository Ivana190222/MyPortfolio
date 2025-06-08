import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';

// Componentes
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import Posts from './components/Posts/Posts';
import Highlights from './components/Highlights/Highlights';
import Followers from './components/Followers/Followers';

// Tema personalizado inspirado en Instagram
const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6B98', // Rosa Instagram personalizado
      light: '#FF8DAD',
      dark: '#E54B78',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#F5F5F5', // Gris claro para fondos
      light: '#FFFFFF',
      dark: '#E0E0E0',
      contrastText: '#121212',
    },
    background: {
      default: '#FAFAFA', // Fondo tipo Instagram
      paper: '#FFFFFF',
    },
    text: {
      primary: '#262626', // Color de texto principal de Instagram
      secondary: '#8E8E8E', // Color de texto secundario de Instagram
    }
  },
  typography: {
    fontFamily: [
      'Nunito',
      'sans-serif',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Arial',
      'sans-serif',
    ].join(','),
    fontSize: 16, // Aumentamos el tamaño base de fuente
    h1: {
      fontWeight: 700,
      fontSize: '3.8rem',
    },
    h2: {
      fontWeight: 600,
      fontSize: '3rem',
    },
    h3: {
      fontWeight: 600,
      fontSize: '2.5rem',
    },
    h4: {
      fontWeight: 600,
      fontSize: '2rem',
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.5rem',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1.25rem',
    },
    subtitle1: {
      fontSize: '1.3rem',
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: '1.2rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1.2rem',
    },
    body2: {
      fontSize: '1.1rem',
    },
    button: {
      textTransform: 'none', // Botones sin texto en mayúsculas
      fontWeight: 600,
      fontSize: '1.2rem',
    },
  },
  shape: {
    borderRadius: 8, // Bordes redondeados
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20, // Botones más redondeados al estilo Instagram
          fontSize: '1.2rem',
        },
        containedPrimary: {
          boxShadow: 'none', // Sin sombras para botones primarios
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', // Sombra al pasar el ratón
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 5px 15px rgba(255, 107, 152, 0.25)', // Sombras rosas para todos los elementos Paper
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 5px 15px rgba(255, 107, 152, 0.25)', // Sombras rosas para tarjetas
          overflow: 'hidden',
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          // Aseguramos que todos los textos tengan un tamaño mínimo
          fontSize: '1.2rem',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/highlights" element={<Highlights />} />
            <Route path="/followers" element={<Followers />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
