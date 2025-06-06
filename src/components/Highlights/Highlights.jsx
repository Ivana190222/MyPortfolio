import React, { useState } from 'react';
import {
  Container,
  Grid,
  Avatar,
  Typography,
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Paper,
  DialogTitle,
  useTheme
} from '@mui/material';
import { Close } from '@mui/icons-material';

const Highlights = () => {
  const theme = useTheme();
  const [selectedHighlight, setSelectedHighlight] = useState(null);

  const highlights = [
    {
      id: 1,
      title: "Desarrollo Web",
      icon: "💻",
      items: [
        "HTML",
        "CSS",
        "Javascript",
        "React.js",
        "Node.js",
        "Express",
        "TypeScript",
        "Next.js",
        "PHP",
        "MySQL",
        "Git",
        "GitHub",
        
        ]
    },
    {
      id: 2,
      title: "Certificaciones",
      icon: "🏆",
      items: [
        "Tecnicatura Superior en Programación",
        "Curso de Primeros pasos en Frontend",
        "Curso de React",
        "Curso de C, C# y C++",
        
      ]
    },
    {
      id: 3,
      title: "Soft Skills",
      icon: "🤝",
      items: [
        "Trabajo en equipo",
        "Comunicación efectiva",
        "Resolución de problemas",
        "Adaptabilidad",
        "Proactividad",
        "Responsabilidad",
        "Pensamiento crítico",
        "Creatividad",
        "Flexibilidad",
        "Empatía",
        
      ]
    },
    // Add more highlights here
  ];

  const handleHighlightClick = (highlight) => {
    setSelectedHighlight(highlight);
  };

  const handleClose = () => {
    setSelectedHighlight(null);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 10, mb: 4 }}>
      <Typography 
        variant="h5" 
        sx={{ 
          mb: 4, 
          fontWeight: 'medium',
          fontFamily: 'Pacifico, cursive',
          color: theme.palette.primary.main,
          textAlign: { xs: 'center', md: 'left' }
        }}
      >
        Historias Destacadas
      </Typography>

      <Grid container spacing={3}>
        {highlights.map((highlight) => (
          <Grid item xs={4} sm={3} md={2} key={highlight.id}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
              onClick={() => handleHighlightClick(highlight)}
            >
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mb: 1,
                  fontSize: '2rem',
                  border: '3px solid #fff',
                  boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
                  backgroundColor: '#fff0f6'
                }}
              >
                {highlight.icon}
              </Avatar>
              <Typography
                variant="caption"
                align="center"
                sx={{
                  maxWidth: '100%',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  fontFamily: 'Nunito, sans-serif',
                  fontWeight: 600
                }}
              >
                {highlight.title}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Highlight Detail Dialog */}
      <Dialog
        open={Boolean(selectedHighlight)}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            overflow: 'hidden'
          }
        }}
      >
        {selectedHighlight && (
          <>
            <DialogTitle
              sx={{
                backgroundColor: theme.palette.primary.light,
                color: 'white',
                fontFamily: 'Pacifico, cursive',
                textAlign: 'center',
                position: 'relative',
                py: 2
              }}
            >
              {selectedHighlight.title}
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: 'white'
                }}
              >
                <Close />
              </IconButton>
            </DialogTitle>
            
            <DialogContent
              sx={{
                backgroundColor: 'white',
                p: 4
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 3
                }}
              >
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    fontSize: '3rem',
                    backgroundColor: '#fff0f6',
                    border: '3px solid #fff',
                    boxShadow: `0 0 0 2px ${theme.palette.primary.main}`,
                    mt: 2
                  }}
                >
                  {selectedHighlight.icon}
                </Avatar>
                
                <Box sx={{ width: '100%' }}>
                  {selectedHighlight.items.map((item, index) => (
                    <Paper
                      key={index}
                      sx={{
                        p: 2,
                        mb: 2,
                        backgroundColor: '#fff0f6',
                        color: theme.palette.text.primary,
                        borderRadius: 3,
                        boxShadow: '0 3px 8px rgba(0,0,0,0.05)',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'translateY(-3px)',
                          boxShadow: '0 6px 12px rgba(0,0,0,0.1)'
                        }
                      }}
                    >
                      <Typography 
                        variant="body1" 
                        sx={{ 
                          fontFamily: 'Nunito, sans-serif',
                          fontWeight: 500 
                        }}
                      >
                        {item}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default Highlights; 