import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  IconButton, 
  Link, 
  useTheme 
} from '@mui/material';
import { 
  GitHub, 
  LinkedIn, 
  WhatsApp 
} from '@mui/icons-material';

const Footer = () => {
  const theme = useTheme();
  
  const socialLinks = [
    { 
      icon: <WhatsApp />, 
      url: 'https://wa.me/2262237469', 
      label: 'WhatsApp' 
    },
    { 
      icon: <LinkedIn />, 
      url: 'https://www.linkedin.com/in/ivana-hervot/', 
      label: 'LinkedIn' 
    },
    { 
      icon: <GitHub />, 
      url: 'https://github.com/Ivana190222', 
      label: 'GitHub' 
    }
  ];
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        backgroundColor: theme.palette.primary.main,
        color: 'white',
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography variant="body1" sx={{ mb: { xs: 2, sm: 0 } }}>
            © {new Date().getFullYear()} Ivana Hervot - Portfolio
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            gap: 1 
          }}>
            {socialLinks.map((social, index) => (
              <IconButton 
                key={index}
                component={Link}
                href={social.url}
                target="_blank"
                rel="noopener"
                aria-label={social.label}
                sx={{ 
                  color: 'white',
                  '&:hover': { 
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    transform: 'scale(1.1)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 