import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Paper, 
  Button, 
  Fade, 
  Grow,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { KeyboardArrowDown, Person, Work, Star, Group } from '@mui/icons-material';

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [loaded, setLoaded] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  // Texto que se escribirá automáticamente
  const welcomeText = "¡Hola! Soy Ivana Hervot";
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Efecto para la animación de escribir
  useEffect(() => {
    if (currentIndex < welcomeText.length) {
      const timeout = setTimeout(() => {
        setTypedText(prev => prev + welcomeText[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  // Efecto para controlar las animaciones secuenciales
  useEffect(() => {
    setLoaded(true);
    
    const timer1 = setTimeout(() => {
      setAnimationStep(1);
    }, 1500);
    
    const timer2 = setTimeout(() => {
      setAnimationStep(2);
    }, 2500);
    
    const timer3 = setTimeout(() => {
      setAnimationStep(3);
    }, 3500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Secciones principales que se mostrarán animadas
  const sections = [
    { 
      icon: <Person fontSize="large" />,
      title: "Sobre Mí",
      description: "Conoce más sobre mi trayectoria y habilidades como programadora",
      link: "/profile",
      color: theme.palette.primary.main 
    },
    { 
      icon: <Work fontSize="large" />,
      title: "Proyectos",
      description: "Descubre los proyectos en los que he trabajado recientemente",
      link: "/posts",
      color: theme.palette.secondary.main
    },
    { 
      icon: <Star fontSize="large" />,
      title: "Habilidades",
      description: "Explora las tecnologías y herramientas que domino",
      link: "/highlights",
      color: "#2196f3" 
    },
    { 
      icon: <Group fontSize="large" />,
      title: "Referencias",
      description: "Personas con las que he colaborado y sus opiniones",
      link: "/followers",
      color: "#4caf50" 
    }
  ];

  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Hero Section */}
      <Box sx={{ 
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        padding: 3,
        marginTop: '64px' // Añadir espacio para el navbar
      }}>
        <Fade in={loaded} timeout={1000}>
          <Typography 
            variant={isMobile ? 'h3' : 'h1'} 
            gutterBottom
            sx={{ 
              fontFamily: 'Pacifico, cursive',
              fontWeight: 'bold',
              color: theme.palette.primary.main,
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
              mb: 3
            }}
          >
            {typedText}
            <span style={{ opacity: currentIndex < welcomeText.length ? 1 : 0 }}>|</span>
          </Typography>
        </Fade>
        
        <Fade in={animationStep >= 1} timeout={1000}>
          <Typography 
            variant={isMobile ? 'h5' : 'h4'} 
            gutterBottom
            sx={{ 
              color: theme.palette.secondary.main, 
              mb: 4,
              fontFamily: 'Nunito, sans-serif',
              fontWeight: 'bold'
            }}
          >
            Programadora Full Stack
          </Typography>
        </Fade>
        
        <Fade in={animationStep >= 2} timeout={1000}>
          <Typography 
            variant="h6" 
            gutterBottom
            sx={{ 
              maxWidth: 800, 
              mb: 5,
              fontFamily: 'Nunito, sans-serif',
              lineHeight: 1.6
            }}
          >
            Bienvenido a mi portfolio interactivo donde podrás descubrir mis proyectos, 
            habilidades técnicas y conocer un poco más sobre mi trayectoria profesional.
          </Typography>
        </Fade>
        
        <Fade in={animationStep >= 3} timeout={1000}>
          <Box sx={{ display: 'flex', gap: 2, mt: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              component={RouterLink}
              to="/profile"
              sx={{ 
                borderRadius: 30,
                px: 4,
                py: 1.5,
                boxShadow: '0 8px 16px rgba(255, 107, 152, 0.3)',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 20px rgba(255, 107, 152, 0.4)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              Conocer Más
            </Button>
            
            <Button 
              variant="outlined" 
              color="primary" 
              size="large"
              component={RouterLink}
              to="/posts"
              sx={{ 
                borderRadius: 30,
                px: 4,
                py: 1.5,
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              Ver Proyectos
            </Button>
          </Box>
        </Fade>
        
        {/* Scroll Down Indicator */}
        <Box 
          sx={{ 
            position: 'absolute', 
            bottom: 40,
            animation: 'bounce 2s infinite',
            cursor: 'pointer'
          }}
          onClick={handleScroll}
        >
          <Typography variant="body2" sx={{ mb: 1, fontFamily: 'Nunito, sans-serif' }}>Descubre más</Typography>
          <KeyboardArrowDown color="primary" fontSize="large" />
        </Box>
      </Box>
      
      {/* Secciones Destacadas */}
      <Box sx={{ py: 8, px: 2, bgcolor: 'rgba(255, 255, 255, 0.7)' }}>
        <Container maxWidth="lg">
          <Typography 
            variant="h4" 
            align="center" 
            gutterBottom
            sx={{ 
              mb: 6, 
              fontWeight: 'bold',
              color: theme.palette.primary.main,
              fontFamily: 'Pacifico, cursive'
            }}
          >
            Explora Mi Portfolio
          </Typography>
          
          <Grid container spacing={3}>
            {sections.map((section, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Grow in={animationStep >= 3} timeout={1000 + (index * 200)}>
                  <Paper 
                    elevation={3} 
                    sx={{
                      p: 3,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      borderRadius: 3,
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 12px 20px rgba(0, 0, 0, 0.1)',
                      },
                    }}
                  >
                    <Box 
                      sx={{ 
                        width: 60, 
                        height: 60, 
                        borderRadius: '50%', 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        bgcolor: `${section.color}20`,
                        color: section.color,
                        mb: 2
                      }}
                    >
                      {section.icon}
                    </Box>
                    <Typography variant="h6" component="h3" gutterBottom fontFamily="Nunito, sans-serif" fontWeight="bold">
                      {section.title}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 3, flexGrow: 1 }} fontFamily="Nunito, sans-serif">
                      {section.description}
                    </Typography>
                    <Button 
                      variant="text" 
                      component={RouterLink}
                      to={section.link}
                      sx={{ 
                        color: section.color,
                        '&:hover': {
                          bgcolor: `${section.color}10`,
                        },
                        fontFamily: 'Nunito, sans-serif'
                      }}
                    >
                      Explorar
                    </Button>
                  </Paper>
                </Grow>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 