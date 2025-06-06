import React from 'react';
import { Container, Avatar, Typography, Button, Paper, Box, useTheme, Stack, Divider, Link } from '@mui/material';
import { LocationOn, Email, GitHub, LinkedIn, WhatsApp } from '@mui/icons-material';

const Profile = () => {
  const theme = useTheme();
  const profileData = {
    name: "Ivana Hervot",
    title: "Programadora Full Stack",
    location: "Necochea, Argentina",
    email: "ivanareyna83@gmail.com",
    linkedIn: "https://www.linkedin.com/in/ivana-hervot/",
    github: "https://github.com/Ivana190222",
    whatsapp: "https://wa.me/2262237469",
    bio: "Soy una programadora entusiasta con una sólida formación en el desarrollo web. Me apasiona crear soluciones innovadoras y mejorar la experiencia del usuario. Tengo habilidades en HTML, CSS, JavaScript, Node, PHP y React. Siempre estoy buscando aprender nuevas tecnologías. Mi objetivo es crecer profesionalmente y contribuir a proyectos desafiantes y significativos.",
    stats: {
      posts: 15,
      followers: 120,
      following: 50
    }
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/ivana-hervot-cv.pdf';
    link.download = 'Ivana-Hervot-CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleContact = () => {
    window.open(profileData.whatsapp, '_blank');
  };

  // Componente simple para mostrar estadística
  const StatItem = ({ value, label }) => (
    <Box sx={{ 
      textAlign: 'center', 
      width: '33%',
      p: 1.5,
      borderRadius: 2,
      '&:hover': {
        backgroundColor: 'rgba(255, 107, 152, 0.1)',
      },
      transition: 'all 0.3s ease'
    }}>
      <Typography sx={{ fontWeight: 'bold', fontFamily: 'Nunito, sans-serif', color: theme.palette.primary.main }}>{value}</Typography>
      <Typography variant="body2" sx={{ fontFamily: 'Nunito, sans-serif' }}>{label}</Typography>
    </Box>
  );

  // Componente para mostrar información de contacto
  const ContactItem = ({ icon, text, href }) => (
    <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        my: 0.5
      }}
    >
      {React.cloneElement(icon, { color: 'primary' })}
      {href ? (
        <Link href={href} target="_blank" rel="noopener" color="inherit" sx={{ ml: 1, wordBreak: 'break-all', fontFamily: 'Nunito, sans-serif' }}>
          {text}
        </Link>
      ) : (
        <Typography variant="body2" sx={{ ml: 1, fontFamily: 'Nunito, sans-serif' }}>{text}</Typography>
      )}
    </Box>
  );

  return (
    <Container maxWidth="sm" sx={{ mt: 10, mb: 4, px: 2 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          borderRadius: 4, 
          overflow: 'hidden',
          boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'translateY(-10px)',
            boxShadow: '0 12px 30px rgba(0,0,0,0.1)'
          }
        }}
      >
        <Box sx={{ width: '100%', textAlign: 'center' }}>
          {/* Avatar */}
          <Avatar
            src="/ivana-photo.jpeg"
            alt={profileData.name}
            sx={{
              width: 120,
              height: 120,
              mx: 'auto',
              mb: 2,
              border: '3px solid #fff',
              boxShadow: `0 0 0 3px ${theme.palette.primary.main}`,
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          />

          {/* Nombre y título */}
          <Typography 
            variant="h5" 
            component="h1" 
            sx={{ 
              fontFamily: 'Pacifico, cursive',
              color: theme.palette.primary.main
            }}
          >
            {profileData.name}
          </Typography>
          
          <Typography 
            variant="subtitle1" 
            color="primary" 
            sx={{ mb: 2, fontFamily: 'Nunito, sans-serif' }}
          >
            {profileData.title}
          </Typography>

          {/* Estadísticas */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mb: 2,
            width: '100%',
            px: 2
          }}>
            <StatItem value={profileData.stats.posts} label="posts" />
            <StatItem value={profileData.stats.followers} label="seguidores" />
            <StatItem value={profileData.stats.following} label="siguiendo" />
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Bio */}
          <Typography 
            variant="body2" 
            sx={{ 
              mb: 2, 
              px: 1,
              textAlign: 'center',
              fontFamily: 'Nunito, sans-serif',
              maxWidth: '100%',
              lineHeight: 1.6
            }}
          >
            {profileData.bio}
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Información de contacto */}
          <Stack spacing={1} sx={{ mb: 3, alignItems: 'center' }}>
            <ContactItem 
              icon={<LocationOn fontSize="small" />} 
              text={profileData.location} 
            />
            <ContactItem 
              icon={<Email fontSize="small" />} 
              text={profileData.email} 
              href={`mailto:${profileData.email}`} 
            />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1, gap: 3 }}>
              <Link href={profileData.linkedIn} target="_blank" rel="noopener">
                <LinkedIn color="primary" sx={{ 
                  fontSize: 28,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.2)'
                  }
                }} />
              </Link>
              <Link href={profileData.github} target="_blank" rel="noopener">
                <GitHub color="primary" sx={{ 
                  fontSize: 28,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.2)'
                  }
                }} />
              </Link>
              <Link href={profileData.whatsapp} target="_blank" rel="noopener">
                <WhatsApp color="primary" sx={{ 
                  fontSize: 28,
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.2)'
                  }
                }} />
              </Link>
            </Box>
          </Stack>

          {/* Botones */}
          <Stack 
            direction={{ xs: 'column', sm: 'row' }} 
            spacing={2} 
            sx={{ 
              justifyContent: 'center',
              width: '100%'
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{ 
                borderRadius: 30,
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 600,
                py: 1,
                boxShadow: '0 4px 10px rgba(255, 107, 152, 0.3)',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 6px 15px rgba(255, 107, 152, 0.4)'
                },
                transition: 'all 0.3s ease'
              }}
              onClick={handleDownloadCV}
            >
              Descargar CV
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{ 
                borderRadius: 30,
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 600,
                py: 1,
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
                },
                transition: 'all 0.3s ease'
              }}
              onClick={handleContact}
            >
              Contactar
            </Button>
          </Stack>
        </Box>
      </Paper>
    </Container>
  );
};

export default Profile; 