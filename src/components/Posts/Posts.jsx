import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Box,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  ListItemAvatar,
  useTheme,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import { 
  Favorite, 
  FavoriteBorder, 
  Comment, 
  Close, 
  GitHub, 
  Send, 
  MoreVert,
  Delete
} from '@mui/icons-material';

// API URL con fallback para Netlify
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';

// Datos de respaldo (fallback) para cuando no se pueda conectar a la API
const FALLBACK_POSTS = [
  {
    id: 1,
    title: "Proyecto Web GymAcgym",
    image: "/proyecto-gym.jpeg",
    image_url: "/proyecto-gym.jpeg",
    description: "Este proyecto es un sitio web dinámico y profesional creado para ACGym, un gimnasio centrado en promover la salud como la verdadera riqueza. Implementé un sistema de gestión de clases y turnos, utilizando HTML, CSS, JS para el frontend y Node.js con Mysql para el backend.",
    date: "2023 - Presente",
    repoUrl: "https://github.com/Ivana190222/GimnasioAcgym-web",
    likes: 0,
    liked: false,
    commentsData: []
  },
  {
    id: 2,
    title: "Proyecto Lux Line Cosméticos",
    image: "/lux_line.png",
    image_url: "/lux_line.png",
    description: "Desarrollo de una plataforma e-commerce completa para Lux Line Cosméticos con carrito de compras, gestión de inventario, integración de pagos y panel de administración. El frontend está desarrollado con HTML, CSS, Bootstrap, mientras que el backend utiliza Node.js, Express y MySQL.",
    date: "2022 - 2023",
    repoUrl: "https://github.com/Ivana190222/tienda_cosmeticos",
    likes: 0,
    liked: false,
    commentsData: []
  },
  {
    id: 3,
    title: "Proyecto Astro Destinos",
    image: "/DestinoAstral.png",
    image_url: "/DestinoAstral.png",
    description: "AstroDestinos es una aplicación web inmersiva y visualmente impactante desarrollada con tecnologías modernas para ofrecer a los usuarios una experiencia completa en el mundo de la astrología, el tarot y las prácticas esotéricas. El objetivo principal ha sido crear una plataforma elegante y fácil de usar que proporcione información personalizada sobre cartas astrales, compatibilidad zodiacal, lecturas de tarot y horóscopos diarios, todo ello con una interfaz de usuario atractiva y animaciones fluidas.",
    date: "2022 - 2023",
    repoUrl: "https://github.com/Ivana190222/astro-destinos",
    likes: 0,
    liked: false,
    commentsData: []
  },
  {
    id: 4,
    title: "Proyecto Carrito con React",
    image: "/proyecto carrito con react.png",
    image_url: "/proyecto carrito con react.png",
    description: "Este proyecto es una tienda online de productos de maquillaje creada con React, y sus características principales son: Catálogo de productos: Visualiza todos los productos de maquillaje disponibles. Detalle de producto: Información completa de cada producto. Carrito de compras: Agrega productos y gestiona tu carrito. Diseño responsive: Se adapta a cualquier dispositivo (celular, tablet, computadora). Panel de administración: Gestiona los productos (agregar, eliminar).",
    date: "2022 - 2023",
    repoUrl: "https://github.com/Ivana190222/Proyecto_Final-IMH",
    likes: 0,
    liked: false,
    commentsData: []
  },
  {
    id: 5,
    title: "Proyecto Institución Educativa CENS 454",
    image: "/cens454.png",
    image_url: "/cens454.png",
    description: "El sitio web del CENS 454 fue desarrollado para proporcionar información relevante sobre nuestra institución educativa, incluyendo: Información general sobre el CENS 454. Nuestra misión, visión y valores. Galería de imágenes. Palabras de la Directora. Información de contacto y formulario para consultas.",
    date: "2021 - 2022",
    repoUrl: "https://github.com/Ivana190222/cens454-frontend",
    likes: 0,
    liked: false,
    commentsData: []
  }
];

const Posts = () => {
  const theme = useTheme();
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [commentAnchorEl, setCommentAnchorEl] = useState(null);
  const [selectedComment, setSelectedComment] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [isNetlify, setIsNetlify] = useState(false);

  // Cargar posts al montar el componente
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      // Verificar si estamos en Netlify (URL que contiene "netlify.app")
      const isNetlifyEnvironment = window.location.hostname.includes('netlify.app');
      setIsNetlify(isNetlifyEnvironment);
      
      if (isNetlifyEnvironment) {
        // Si estamos en Netlify, usar los datos de respaldo
        console.log("Ejecutando en Netlify: usando datos de respaldo");
        setPosts(FALLBACK_POSTS);
        setError(null);
      } else {
        // En desarrollo o otro entorno, intentar conectar a la API
        try {
          const response = await axios.get(`${API_URL}/posts`);
          if (response.data && response.data.length > 0) {
            setPosts(response.data);
            setError(null);
          } else {
            // Si la API devuelve un array vacío, usar datos de respaldo
            setPosts(FALLBACK_POSTS);
            setError("No se encontraron proyectos en la base de datos. Mostrando datos locales.");
          }
        } catch (err) {
          console.error('Error API:', err);
          setPosts(FALLBACK_POSTS);
          setError("No se pudo conectar a la API. Mostrando datos locales.");
        }
      }
    } catch (err) {
      console.error('Error general:', err);
      // En caso de error, usar los datos de respaldo
      setPosts(FALLBACK_POSTS);
      setError('Usando datos locales. La API no está disponible en este momento.');
    } finally {
      setLoading(false);
    }
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleClose = () => {
    setSelectedPost(null);
    setNewComment("");
  };
  
  const handleLike = async (postId) => {
    try {
      // Si estamos en Netlify, simular el like localmente
      if (isNetlify) {
        setPosts(posts.map(post => {
          if (post.id === postId) {
            const liked = !post.liked;
            return {
              ...post,
              liked,
              likes: liked ? post.likes + 1 : post.likes - 1
            };
          }
          return post;
        }));
        
        if (selectedPost && selectedPost.id === postId) {
          const liked = !selectedPost.liked;
          setSelectedPost(prev => ({
            ...prev,
            liked,
            likes: liked ? prev.likes + 1 : prev.likes - 1
          }));
        }
        
        setSnackbar({
          open: true,
          message: 'Like registrado en modo de demostración',
          severity: 'info'
        });
        
        return;
      }
      
      // Si no estamos en Netlify, intentar usar la API
      try {
        const response = await axios.post(`${API_URL}/posts/${postId}/like`);
        
        if (response.data.success) {
          setPosts(posts.map(post => {
            if (post.id === postId) {
              return {
                ...post,
                liked: response.data.liked,
                likes: response.data.liked ? post.likes + 1 : post.likes - 1
              };
            }
            return post;
          }));
          
          // Si el post seleccionado es el que se le dio like, actualizarlo también
          if (selectedPost && selectedPost.id === postId) {
            setSelectedPost(prev => ({
              ...prev,
              liked: response.data.liked,
              likes: response.data.liked ? prev.likes + 1 : prev.likes - 1
            }));
          }
          
          setSnackbar({
            open: true,
            message: response.data.liked ? '¡Gracias por tu like!' : 'Like removido',
            severity: 'success'
          });
        }
      } catch (apiErr) {
        console.error('Error API like:', apiErr);
        // Fallback: simular like localmente
        simulateLikeLocally(postId);
      }
    } catch (err) {
      console.error('Error general like:', err);
      // Fallback: simular like localmente
      simulateLikeLocally(postId);
    }
  };
  
  // Función para simular like localmente cuando falla la API
  const simulateLikeLocally = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const liked = !post.liked;
        return {
          ...post,
          liked,
          likes: liked ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));
    
    if (selectedPost && selectedPost.id === postId) {
      const liked = !selectedPost.liked;
      setSelectedPost(prev => ({
        ...prev,
        liked,
        likes: liked ? prev.likes + 1 : prev.likes - 1
      }));
    }
    
    setSnackbar({
      open: true,
      message: 'Funcionando en modo local. Los cambios no se guardarán permanentemente.',
      severity: 'info'
    });
  };
  
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };
  
  const handleAddComment = async (postId) => {
    if (newComment.trim() === "") return;
    
    try {
      // Si estamos en Netlify, simular la adición del comentario localmente
      if (isNetlify) {
        simulateAddCommentLocally(postId, newComment);
        return;
      }
      
      // Si no estamos en Netlify, intentar usar la API
      try {
        const response = await axios.post(`${API_URL}/posts/${postId}/comment`, {
          author: "Visitante",
          text: newComment,
          avatar_url: "/ivana-photo.jpeg"
        });
        
        if (response.data.success) {
          const newCommentObj = response.data.comment;
          newCommentObj.isYours = true;
          
          updatePostsWithNewComment(postId, newCommentObj);
          
          setNewComment("");
          setSnackbar({
            open: true,
            message: '¡Comentario añadido correctamente!',
            severity: 'success'
          });
        }
      } catch (apiErr) {
        console.error('Error API comentario:', apiErr);
        // Fallback: simular comentario localmente
        simulateAddCommentLocally(postId, newComment);
      }
    } catch (err) {
      console.error('Error general comentario:', err);
      // Fallback: simular comentario localmente
      simulateAddCommentLocally(postId, newComment);
    }
  };
  
  // Función para simular añadir comentario localmente
  const simulateAddCommentLocally = (postId, commentText) => {
    const now = new Date();
    const newCommentObj = {
      id: Date.now(), // ID único basado en timestamp
      author: "Visitante",
      text: commentText,
      avatar_url: "", // Usaremos la inicial en lugar de una foto
      created_at: now.toISOString(),
      isYours: true
    };
    
    updatePostsWithNewComment(postId, newCommentObj);
    
    setNewComment("");
    setSnackbar({
      open: true,
      message: 'Comentario añadido en modo de demostración',
      severity: 'info'
    });
  };
  
  // Función para actualizar posts con nuevo comentario
  const updatePostsWithNewComment = (postId, newCommentObj) => {
    // Actualizar posts
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const updatedComments = post.commentsData ? 
          [...post.commentsData, newCommentObj] : 
          [newCommentObj];
        return {
          ...post,
          commentsData: updatedComments
        };
      }
      return post;
    }));
    
    // Actualizar post seleccionado
    if (selectedPost && selectedPost.id === postId) {
      const updatedComments = selectedPost.commentsData ? 
        [...selectedPost.commentsData, newCommentObj] : 
        [newCommentObj];
      setSelectedPost(prev => ({
        ...prev,
        commentsData: updatedComments
      }));
    }
  };

  const handleCommentMenuOpen = (event, comment) => {
    event.stopPropagation();
    setCommentAnchorEl(event.currentTarget);
    setSelectedComment(comment);
  };

  const handleCommentMenuClose = () => {
    setCommentAnchorEl(null);
    setSelectedComment(null);
  };

  const handleDeleteComment = () => {
    if (!selectedComment || !selectedPost) return;
    
    // Intentar eliminar comentario a través de la API (no implementado aún)
    // Por ahora, solo eliminamos localmente
    setPosts(posts.map(post => {
      if (post.id === selectedPost.id) {
        return {
          ...post,
          commentsData: post.commentsData.filter(comment => comment.id !== selectedComment.id)
        };
      }
      return post;
    }));
    
    setSelectedPost(prev => ({
      ...prev,
      commentsData: prev.commentsData.filter(comment => comment.id !== selectedComment.id)
    }));
    
    handleCommentMenuClose();
    
    const message = isNetlify ? 
      'Comentario eliminado en modo de demostración' : 
      'Comentario eliminado correctamente';
      
    const severity = isNetlify ? 'info' : 'success';
    
    setSnackbar({
      open: true,
      message,
      severity
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({...snackbar, open: false});
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 10, mb: 4 }}>
      {error && (
        <Alert severity="info" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Typography 
        variant="h4" 
        sx={{ 
          mb: 4, 
          fontWeight: 'bold', 
          fontFamily: 'Pacifico, cursive',
          color: theme.palette.primary.main,
          fontSize: '2.5rem',
          textAlign: 'center'
        }}
      >
        Mis Proyectos
      </Typography>

      <Grid container spacing={4}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card
              sx={{
                cursor: 'pointer',
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 8px 20px rgba(255, 107, 152, 0.25)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-10px) scale(1.02)',
                  boxShadow: '0 12px 28px rgba(255, 107, 152, 0.4)'
                }
              }}
              onClick={() => handlePostClick(post)}
            >
              <CardMedia
                component="img"
                height="320"
                image={post.image_url || post.image}
                alt={post.title}
                sx={{ objectFit: 'cover' }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Post Detail Dialog */}
      <Dialog
        open={Boolean(selectedPost)}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            overflow: 'hidden'
          }
        }}
      >
        {selectedPost && (
          <>
            <DialogTitle 
              sx={{ 
                m: 0, 
                p: 2, 
                backgroundColor: theme.palette.primary.light,
                color: 'white'
              }}
            >
              <Typography variant="h5" sx={{ fontFamily: 'Pacifico, cursive', fontSize: '1.7rem' }}>
                {selectedPost.title}
              </Typography>
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
            <DialogContent sx={{ p: 0, bgcolor: 'white' }}>
              <Grid container>
                <Grid item xs={12} md={7} sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    image={selectedPost.image_url || selectedPost.image}
                    alt={selectedPost.title}
                    sx={{ 
                      width: '100%', 
                      height: { xs: '300px', md: '500px' },
                      objectFit: 'cover'
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={5}>
                  <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ mb: 2 }}>
                      <Typography 
                        variant="h6" 
                        component="div" 
                        gutterBottom
                        sx={{ 
                          fontFamily: 'Nunito, sans-serif',
                          fontWeight: 'bold',
                          color: theme.palette.primary.dark,
                          fontSize: '1.4rem'
                        }}
                      >
                        {selectedPost.title}
                      </Typography>
                      <Typography 
                        variant="subtitle2" 
                        color="text.secondary"
                        sx={{ fontFamily: 'Nunito, sans-serif', fontSize: '1.1rem' }}
                      >
                        {selectedPost.date_start ? 
                          new Date(selectedPost.date_start).toLocaleDateString('es-ES', {year: 'numeric', month: 'long'}) : 
                          selectedPost.date}
                      </Typography>
                    </Box>

                    <Typography 
                      variant="body1" 
                      paragraph
                      sx={{ 
                        mb: 3, 
                        flexGrow: 1,
                        fontFamily: 'Nunito, sans-serif',
                        lineHeight: 1.6,
                        fontSize: '1.2rem'
                      }}
                    >
                      {selectedPost.description}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Button
                        startIcon={<GitHub />}
                        variant="contained"
                        color="primary"
                        size="large"
                        href={selectedPost.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          borderRadius: 30,
                          fontFamily: 'Nunito, sans-serif',
                          fontSize: '1.1rem',
                          fontWeight: 'bold',
                          px: 3,
                          py: 1,
                          '&:hover': {
                            transform: 'translateY(-3px)',
                            boxShadow: '0 8px 15px rgba(255, 107, 152, 0.3)'
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >
                        Ver Repositorio
                      </Button>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(selectedPost.id);
                          }}
                          color="primary"
                          size="large"
                        >
                          {selectedPost.liked ? <Favorite /> : <FavoriteBorder />}
                        </IconButton>
                        <Typography variant="body1" sx={{ mr: 2, fontFamily: 'Nunito, sans-serif', fontSize: '1.1rem' }}>
                          {selectedPost.likes}
                        </Typography>
                        <IconButton color="primary" size="large">
                          <Comment />
                        </IconButton>
                        <Typography variant="body1" sx={{ fontFamily: 'Nunito, sans-serif', fontSize: '1.1rem' }}>
                          {selectedPost.commentsData ? selectedPost.commentsData.length : 0}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography 
                      variant="subtitle1" 
                      gutterBottom
                      sx={{ 
                        fontWeight: 'bold',
                        fontFamily: 'Nunito, sans-serif',
                        fontSize: '1.3rem',
                        color: '#ff6b98'
                      }}
                    >
                      Comentarios
                    </Typography>
                    
                    <List sx={{ maxHeight: 200, overflow: 'auto', mb: 2 }}>
                      {selectedPost.commentsData && selectedPost.commentsData.length > 0 ? (
                        selectedPost.commentsData.map((comment) => (
                          <ListItem 
                            key={comment.id}
                            alignItems="flex-start"
                            sx={{ 
                              py: 1.5, 
                              px: 3,
                              borderRadius: 3,
                              mb: 2,
                              backgroundColor: 'rgba(255, 107, 152, 0.08)',
                              boxShadow: '0 2px 8px rgba(255, 107, 152, 0.15)',
                              border: '1px solid rgba(255, 107, 152, 0.1)'
                            }}
                            secondaryAction={
                              comment.isYours && (
                                <IconButton 
                                  edge="end" 
                                  size="small"
                                  onClick={(e) => handleCommentMenuOpen(e, comment)}
                                >
                                  <MoreVert fontSize="small" />
                                </IconButton>
                              )
                            }
                          >
                            <ListItemAvatar>
                              <Avatar 
                                src={comment.avatar_url} 
                                alt={comment.author}
                                sx={{ 
                                  width: 45, 
                                  height: 45,
                                  border: '2px solid rgba(255, 107, 152, 0.3)'
                                }} 
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primary={
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                  <Typography 
                                    variant="subtitle2" 
                                    component="span"
                                    sx={{ 
                                      fontFamily: 'Nunito, sans-serif', 
                                      fontWeight: 'bold', 
                                      fontSize: '1.1rem',
                                      color: '#ff6b98'
                                    }}
                                  >
                                    {comment.author}
                                  </Typography>
                                </Box>
                              }
                              secondary={
                                <Typography 
                                  variant="body2" 
                                  component="span" 
                                  sx={{ 
                                    display: 'block',
                                    fontFamily: 'Nunito, sans-serif',
                                    fontSize: '1rem',
                                    color: 'text.primary',
                                    mt: 0.5
                                  }}
                                >
                                  {comment.text}
                                </Typography>
                              }
                            />
                          </ListItem>
                        ))
                      ) : null}
                    </List>
                    
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        backgroundColor: 'rgba(255, 107, 152, 0.05)',
                        p: 1,
                        borderRadius: 4,
                        border: '1px solid rgba(255, 107, 152, 0.1)'
                      }}>
                        <Avatar 
                          sx={{ 
                            width: 36, 
                            height: 36, 
                            mr: 1.5,
                            bgcolor: '#ff6b98',
                            fontSize: '1rem',
                            fontWeight: 'bold'
                          }}
                        >
                          V
                        </Avatar>
                        <TextField
                          fullWidth
                          placeholder="Añadir un comentario..."
                          variant="standard"
                          size="small"
                          value={newComment}
                          onChange={handleCommentChange}
                          sx={{ 
                            '& .MuiInput-root': {
                              fontSize: '1.1rem',
                              fontFamily: 'Nunito, sans-serif',
                              '&:before, &:after': {
                                display: 'none'
                              }
                            }
                          }}
                        />
                        <IconButton 
                          color="primary"
                          onClick={() => handleAddComment(selectedPost.id)}
                          disabled={!newComment.trim()}
                          size="large"
                          sx={{
                            color: '#ff6b98',
                            '&.Mui-disabled': {
                              color: 'rgba(255, 107, 152, 0.3)'
                            }
                          }}
                        >
                          <Send />
                        </IconButton>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
          </>
        )}
      </Dialog>
      
      {/* Menu for comment actions */}
      <Menu
        anchorEl={commentAnchorEl}
        open={Boolean(commentAnchorEl)}
        onClose={handleCommentMenuClose}
      >
        <MenuItem onClick={handleDeleteComment}>
          <ListItemIcon>
            <Delete fontSize="small" />
          </ListItemIcon>
          <ListItemText>Eliminar comentario</ListItemText>
        </MenuItem>
      </Menu>
      
      {/* Snackbar para notificaciones */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          severity={snackbar.severity} 
          sx={{ 
            width: '100%',
            boxShadow: '0 4px 12px rgba(255, 107, 152, 0.3)',
            fontFamily: 'Nunito, sans-serif',
            fontWeight: 'medium',
            backgroundColor: '#ff6b98',
            color: 'white'
          }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Posts; 