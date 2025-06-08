import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  IconButton, 
  Container, 
  Box,
  Tooltip,
  useMediaQuery,
  useTheme,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar
} from '@mui/material';
import { 
  Home, 
  Person, 
  Work, 
  Star, 
  Group,
  Menu as MenuIcon,
  Close
} from '@mui/icons-material';

const Navbar = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { name: 'Inicio', icon: <Home />, path: '/' },
    { name: 'Perfil', icon: <Person />, path: '/profile' },
    { name: 'Proyectos', icon: <Work />, path: '/posts' },
    { name: 'Habilidades', icon: <Star />, path: '/highlights' },
    { name: 'Referencias', icon: <Group />, path: '/followers' }
  ];

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  // Contenido del drawer para móviles
  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', py: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar 
            src="/logoIvana2.jpeg" 
            alt="Logo Ivana" 
            sx={{ 
              width: 50, 
              height: 50, 
              mr: 1,
              border: `2px solid ${theme.palette.primary.main}`
            }} 
          />
          <Typography variant="h6" sx={{ fontFamily: 'Pacifico, cursive', color: theme.palette.primary.main }}>
            Mi Portfolio
          </Typography>
        </Box>
        <IconButton>
          <Close />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem 
            button 
            component={Link} 
            to={item.path} 
            key={item.name}
            selected={isActiveRoute(item.path)}
            sx={{ 
              color: isActiveRoute(item.path) ? theme.palette.primary.main : 'inherit',
              '&.Mui-selected': {
                bgcolor: theme.palette.primary.light + '20',
              }
            }}
          >
            <ListItemIcon sx={{ 
              color: isActiveRoute(item.path) ? theme.palette.primary.main : 'inherit',
              minWidth: 40
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.name} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="fixed" sx={{ 
      backgroundColor: theme.palette.primary.main, 
      color: 'white',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', minHeight: { xs: '64px', sm: '70px' } }}>
          <Box
            component={Link}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Box sx={{ 
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Avatar 
                src="/logoIvana2.jpeg" 
                alt="Logo Ivana" 
                sx={{ 
                  width: { xs: 50, sm: 60 }, 
                  height: { xs: 50, sm: 60 }, 
                  mr: 2,
                  border: '3px solid white',
                  boxShadow: '0 3px 5px rgba(0,0,0,0.2)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.1)'
                  }
                }} 
              />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontFamily: 'Pacifico, cursive',
                fontWeight: 'bold',
                fontSize: { xs: '1.1rem', sm: '1.3rem' },
                display: { xs: 'block', sm: 'block' }
              }}
            >
              Mi Portfolio
            </Typography>
          </Box>
          
          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {navItems.map((item) => (
                <Tooltip title={item.name} key={item.name}>
                  <IconButton 
                    component={Link} 
                    to={item.path} 
                    color="inherit"
                    sx={{ 
                      mx: 1,
                      transition: 'all 0.3s ease',
                      transform: isActiveRoute(item.path) ? 'scale(1.2)' : 'scale(1)',
                      backgroundColor: isActiveRoute(item.path) ? 'rgba(255,255,255,0.2)' : 'transparent',
                      '&:hover': { 
                        transform: 'scale(1.2)',
                        backgroundColor: 'rgba(255,255,255,0.2)',
                      }
                    }}
                  >
                    {item.icon}
                  </IconButton>
                </Tooltip>
              ))}
            </Box>
          )}
        </Toolbar>
      </Container>

      {/* Drawer para móviles */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Mejor rendimiento en móviles
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
