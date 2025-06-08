import React from 'react';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Button,
  Paper,
  Box,
  Divider,
  useTheme,
  Tooltip
} from '@mui/material';
import { Email, LinkedIn } from '@mui/icons-material';

const Followers = () => {
  const theme = useTheme();
  
  const followers = [
    {
      id: 1,
      name: "Nicolas Quintana",
      role: "Desarrollador frontend",
      avatar: "/nicolas quintana.jpeg",
      email: "nicolasquintana94@outlook.es",
      linkedin: "https://www.linkedin.com/in/nicol%C3%A1s-quintana-b9a571212?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      description: "Trabajamos juntos en el desarrollo de una página web dedicada a la astrología, creando un espacio único donde los usuarios pueden explorar su interés por los astros, acceder a contenido personalizado y disfrutar de una experiencia intuitiva y atractiva."
    },
    {
      id: 2,
      name: "Alexis Jardin",
      role: "Full Stack Developer, Frontend, Backend & Mobile",
      avatar: "/alexis%20jardin.jpeg",
      email: "info.alexis.david.jardin@gmail.com",
      linkedin: "https://linkedin.com/in/alexis-d-jardin/",
      description: "Colabore en el desarrollo de una página web para un gimnasio, enfocándonos en diseñar una plataforma que refleje el dinamismo y la energía del lugar. El proyecto incluyó la creación de secciones personalizadas para horarios de clases, turnos y servicios, con una interfaz moderna e intuitiva para mejorar la experiencia de los usuarios y promover un estilo de vida saludable"
    },
    {
      id: 3,
      name: "Santiago Di Colantonio",
      role: "Téc. Sup. en Programación - Frontend - HTML - CSS - Javascript-Typescript - Vuejs -Angular- SQL - C++ - Mentor",
      avatar: "/santiago.jpeg",
      email: "dicolantonio@yahoo.com.ar",
      linkedin: "https://www.linkedin.com/in/alberto-santiago-di-colantonio-90ba561b3",
      description:"Participé en varios proyectos supervisando el desarrollo y mantenimiento de páginas web, garantizando la calidad del código y su correcta funcionalidad. Mi labor incluyó la revisión minuciosa de estructuras, depuración de errores y colaboración directa con Ivana para optimizar el rendimiento y la experiencia del usuario en cada proyecto."
    }
  ];

  return (
    <Container maxWidth="md" sx={{ mt: { xs: 8, sm: 10 }, mb: 4, px: { xs: 2, sm: 3 } }}>
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 4, 
          fontWeight: 'bold', 
          textAlign: 'center',
          fontFamily: 'Pacifico, cursive',
          color: theme.palette.primary.main,
          fontSize: '2.5rem'
        }}
      >
        Referencias Profesionales
      </Typography>

      <List sx={{ width: '100%' }}>
        {followers.map((follower, index) => (
          <React.Fragment key={follower.id}>
            <Paper 
              sx={{ 
                mb: 3, 
                overflow: 'hidden',
                borderRadius: 4,
                boxShadow: '0 8px 20px rgba(255, 107, 152, 0.25)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                  boxShadow: '0 12px 25px rgba(255, 107, 152, 0.4)'
                }
              }}
            >
              <ListItem
                alignItems="flex-start"
                sx={{
                  p: { xs: 2, sm: 3 },
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: { xs: 'center', sm: 'flex-start' },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 107, 152, 0.05)'
                  }
                }}
              >
                <ListItemAvatar sx={{ mb: { xs: 2, sm: 0 } }}>
                  <Avatar
                    alt={follower.name}
                    src={follower.avatar}
                    sx={{
                      width: { xs: 80, sm: 60 },
                      height: { xs: 80, sm: 60 },
                      mr: { xs: 0, sm: 2 },
                      border: `2px solid ${theme.palette.primary.light}`
                    }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: { xs: 'column', sm: 'row' },
                      justifyContent: 'space-between', 
                      alignItems: { xs: 'center', sm: 'flex-start' },
                      textAlign: { xs: 'center', sm: 'left' },
                      mb: { xs: 2, sm: 0 }
                    }}>
                      <Box sx={{ mb: { xs: 1, sm: 0 }, width: { sm: '60%' } }}>
                        <Typography 
                          variant="h6" 
                          component="span"
                          sx={{ 
                            fontFamily: 'Nunito, sans-serif',
                            fontWeight: 600,
                            color: theme.palette.primary.dark,
                            fontSize: '1.3rem'
                          }}
                        >
                          {follower.name}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          color="text.secondary"
                          display="block"
                          sx={{ 
                            wordBreak: 'break-word',
                            mt: 0.5,
                            fontSize: { xs: '0.85rem', sm: '0.9rem' },
                            fontFamily: 'Nunito, sans-serif'
                          }}
                        >
                          {follower.role}
                        </Typography>
                      </Box>
                      <Box sx={{ 
                        display: 'flex', 
                        flexDirection: { xs: 'row', sm: 'column', md: 'row' }, 
                        gap: 1,
                        flexWrap: 'wrap',
                        justifyContent: { xs: 'center', sm: 'flex-end' },
                        width: { sm: '40%' }
                      }}>
                        {follower.id === 3 ? (
                          // Botones más pequeños para Santiago con Tooltip
                          <>
                            <Tooltip title={follower.email}>
                              <Button
                                startIcon={<Email />}
                                href={`mailto:${follower.email}`}
                                size="small"
                                sx={{ 
                                  fontSize: '0.7rem',
                                  padding: '4px 8px',
                                  minWidth: 'auto',
                                  fontFamily: 'Nunito, sans-serif'
                                }}
                                color="primary"
                                variant="outlined"
                              >
                                Email
                              </Button>
                            </Tooltip>
                            <Tooltip title="Ver perfil de LinkedIn">
                              <Button
                                startIcon={<LinkedIn />}
                                href={follower.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                size="small"
                                sx={{ 
                                  fontSize: '0.7rem',
                                  padding: '4px 8px',
                                  minWidth: 'auto',
                                  fontFamily: 'Nunito, sans-serif'
                                }}
                                color="primary"
                                variant="contained"
                              >
                                LinkedIn
                              </Button>
                            </Tooltip>
                          </>
                        ) : (
                          // Botones normales para los demás
                          <>
                            <Button
                              startIcon={<Email />}
                              href={`mailto:${follower.email}`}
                              size="small"
                              sx={{ 
                                fontSize: { xs: '0.75rem', sm: '0.8rem' },
                                fontFamily: 'Nunito, sans-serif'
                              }}
                              color="primary"
                              variant="outlined"
                            >
                              Email
                            </Button>
                            <Button
                              startIcon={<LinkedIn />}
                              href={follower.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              size="small"
                              sx={{ 
                                fontSize: { xs: '0.75rem', sm: '0.8rem' },
                                fontFamily: 'Nunito, sans-serif'
                              }}
                              color="primary"
                              variant="contained"
                            >
                              LinkedIn
                            </Button>
                          </>
                        )}
                      </Box>
                    </Box>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      color="text.primary"
                      sx={{ 
                        mt: 1,
                        textAlign: { xs: 'center', sm: 'left' },
                        fontSize: { xs: '0.9rem', sm: '1rem' },
                        lineHeight: 1.6,
                        fontFamily: 'Nunito, sans-serif'
                      }}
                    >
                      {follower.description}
                    </Typography>
                  }
                />
              </ListItem>
            </Paper>
            {index < followers.length - 1 && (
              <Divider component="li" sx={{ display: { xs: 'none', sm: 'block' } }} />
            )}
          </React.Fragment>
        ))}
      </List>
    </Container>
  );
};

export default Followers; 