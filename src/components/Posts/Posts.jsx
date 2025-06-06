import React, { useState } from 'react';
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
  useTheme
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

const Posts = () => {
  const theme = useTheme();
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Proyecto Web GymAcgym",
      image: "/proyecto-gym.jpeg",
      description: "Este proyecto es un sitio web dinámico y profesional creado para ACGym, un gimnasio centrado en promover la salud como la verdadera riqueza. Implementé un sistema de gestión de clases y turnos, utilizando HTML, CSS, JS para el frontend y Node.js con Mysql para el backend.",
      date: "2023 - Presente",
      repoUrl: "https://github.com/Ivana190222/GimnasioAcgym-web",
      likes: 0,
      liked: false,
      comments: []
    },
    {
      id: 2,
      title: "Proyecto Lux Line Cosméticos",
      image: "/lux_line.png",
      description: "Desarrollo de una plataforma e-commerce completa para Lux Line Cosméticos con carrito de compras, gestión de inventario, integración de pagos y panel de administración. El frontend está desarrollado con HTML, CSS, Bootstrap, mientras que el backend utiliza Node.js, Express y MySQL.",
      date: "2022 - 2023",
      repoUrl: "https://github.com/Ivana190222/tienda_cosmeticos",
      likes: 0,
      liked: false,
      comments: []
    },
    {
      id: 3,
      title: "Proyecto Astro Destinos",
      image: "/DestinoAstral.png",
      description: "AstroDestinos es una aplicación web inmersiva y visualmente impactante desarrollada con tecnologías modernas para ofrecer a los usuarios una experiencia completa en el mundo de la astrología, el tarot y las prácticas esotéricas. El objetivo principal ha sido crear una plataforma elegante y fácil de usar que proporcione información personalizada sobre cartas astrales, compatibilidad zodiacal, lecturas de tarot y horóscopos diarios, todo ello con una interfaz de usuario atractiva y animaciones fluidas.",
      date: "2022 - 2023",
      repoUrl: "https://github.com/Ivana190222/astro-destinos",
      likes: 0,
      liked: false,
      comments: []
    },
    {
      id: 4,
      title: "Proyecto Carrito con React",
      image: "/proyecto%20carrito%20con%20react.png",
      description: `Este proyecto es una tienda online de productos de maquillaje creada con React, y sus características principales son:
      Catálogo de productos: Visualiza todos los productos de maquillaje disponibles
      Detalle de producto: Información completa de cada producto
      Carrito de compras: Agrega productos y gestiona tu carrito
      Diseño responsive: Se adapta a cualquier dispositivo (celular, tablet, computadora)
      Panel de administración: Gestiona los productos (agregar, eliminar)`,
      date: "2022 - 2023",
      repoUrl: "https://github.com/Ivana190222/Proyecto_Final-IMH",
      likes: 0,
      liked: false,
      comments: []
    },
    {
      id: 5,
      title: "Proyecto Institución Educativa CENS 454",
      image: "/cens454.png",
      description: `El sitio web del CENS 454 fue desarrollado para proporcionar información relevante sobre nuestra institución educativa, incluyendo:
Información general sobre el CENS 454
Nuestra misión, visión y valores
Galería de imágenes
Palabras de la Directora
Información de contacto y formulario para consultas`,
      repoUrl: "https://github.com/Ivana190222/cens454-frontend",
      likes: 0,
      liked: false,
      comments: []
    }
  ]);
  
  const [newComment, setNewComment] = useState("");
  const [commentAnchorEl, setCommentAnchorEl] = useState(null);
  const [selectedComment, setSelectedComment] = useState(null);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handleClose = () => {
    setSelectedPost(null);
    setNewComment("");
  };
  
  const handleLike = (postId) => {
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
  };
  
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };
  
  const handleAddComment = (postId) => {
    if (newComment.trim() === "") return;
    
    const now = new Date();
    const formattedDate = `${now.getDate()} ${now.toLocaleString('default', { month: 'short' })} ${now.getFullYear()}`;
    
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newCommentObj = {
          id: post.comments.length + 1,
          author: "Tú",
          avatar: "/ivana-photo.jpeg",
          text: newComment,
          date: formattedDate,
          isYours: true
        };
        
        return {
          ...post,
          comments: [...post.comments, newCommentObj]
        };
      }
      return post;
    }));
    
    setNewComment("");
  };

  const handleCommentMenuOpen = (event, comment) => {
    setCommentAnchorEl(event.currentTarget);
    setSelectedComment(comment);
  };

  const handleCommentMenuClose = () => {
    setCommentAnchorEl(null);
    setSelectedComment(null);
  };

  const handleDeleteComment = () => {
    if (!selectedComment || !selectedPost) return;
    
    setPosts(posts.map(post => {
      if (post.id === selectedPost.id) {
        return {
          ...post,
          comments: post.comments.filter(comment => comment.id !== selectedComment.id)
        };
      }
      return post;
    }));
    
    handleCommentMenuClose();
  };

  return (
    <Container maxWidth="md" sx={{ mt: 10, mb: 4 }}>
      <Typography 
        variant="h5" 
        sx={{ 
          mb: 4, 
          fontWeight: 'medium', 
          fontFamily: 'Pacifico, cursive',
          color: theme.palette.primary.main
        }}
      >
        Publicaciones
      </Typography>

      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card
              sx={{
                cursor: 'pointer',
                borderRadius: 4,
                overflow: 'hidden',
                boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-10px) scale(1.02)',
                  boxShadow: '0 12px 28px rgba(0,0,0,0.1)'
                }
              }}
              onClick={() => handlePostClick(post)}
            >
              <CardMedia
                component="img"
                height="320"
                image={post.image}
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
              <Typography variant="h6" sx={{ fontFamily: 'Pacifico, cursive' }}>
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
              <Grid container spacing={0}>
                <Grid item xs={12} md={7} sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    image={selectedPost.image}
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
                          color: theme.palette.primary.dark 
                        }}
                      >
                        {selectedPost.title}
                      </Typography>
                      <Typography 
                        variant="subtitle2" 
                        color="text.secondary"
                        sx={{ fontFamily: 'Nunito, sans-serif' }}
                      >
                        {selectedPost.date}
                      </Typography>
                    </Box>

                    <Typography 
                      variant="body2" 
                      paragraph
                      sx={{ 
                        mb: 3, 
                        flexGrow: 1,
                        fontFamily: 'Nunito, sans-serif',
                        lineHeight: 1.6 
                      }}
                    >
                      {selectedPost.description}
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                      <Button
                        startIcon={<GitHub />}
                        variant="outlined"
                        color="primary"
                        size="small"
                        href={selectedPost.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ 
                          borderRadius: 30,
                          fontFamily: 'Nunito, sans-serif',
                          '&:hover': {
                            transform: 'translateY(-3px)',
                            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
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
                        >
                          {selectedPost.liked ? <Favorite /> : <FavoriteBorder />}
                        </IconButton>
                        <Typography variant="body2" sx={{ mr: 2, fontFamily: 'Nunito, sans-serif' }}>
                          {selectedPost.likes}
                        </Typography>
                        <IconButton color="primary">
                          <Comment />
                        </IconButton>
                        <Typography variant="body2" sx={{ fontFamily: 'Nunito, sans-serif' }}>
                          {selectedPost.comments.length}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Divider sx={{ my: 2 }} />
                    
                    <Typography 
                      variant="subtitle2" 
                      gutterBottom
                      sx={{ 
                        fontWeight: 'bold',
                        fontFamily: 'Nunito, sans-serif' 
                      }}
                    >
                      Comentarios
                    </Typography>
                    
                    <List sx={{ maxHeight: 200, overflow: 'auto', mb: 2 }}>
                      {selectedPost.comments.map((comment) => (
                        <ListItem 
                          key={comment.id}
                          alignItems="flex-start"
                          sx={{ 
                            py: 1, 
                            px: 2,
                            borderRadius: 2,
                            mb: 1,
                            backgroundColor: 'rgba(255, 107, 152, 0.05)'
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
                            <Avatar src={comment.avatar} alt={comment.author} />
                          </ListItemAvatar>
                          <ListItemText
                            primary={
                              <Typography 
                                variant="subtitle2" 
                                component="span"
                                sx={{ fontFamily: 'Nunito, sans-serif', fontWeight: 'bold' }}
                              >
                                {comment.author}
                              </Typography>
                            }
                            secondary={
                              <>
                                <Typography 
                                  variant="body2" 
                                  component="span" 
                                  sx={{ display: 'block', fontFamily: 'Nunito, sans-serif' }}
                                >
                                  {comment.text}
                                </Typography>
                                <Typography 
                                  variant="caption" 
                                  color="text.secondary"
                                  sx={{ fontFamily: 'Nunito, sans-serif' }}
                                >
                                  {comment.date}
                                </Typography>
                              </>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <TextField
                        fullWidth
                        placeholder="Añade un comentario..."
                        variant="outlined"
                        size="small"
                        value={newComment}
                        onChange={handleCommentChange}
                        InputProps={{
                          sx: { 
                            borderRadius: 30,
                            fontFamily: 'Nunito, sans-serif',
                            backgroundColor: 'rgba(255, 255, 255, 0.9)'
                          }
                        }}
                        sx={{ mr: 1 }}
                      />
                      <IconButton 
                        color="primary" 
                        disabled={!newComment.trim()}
                        onClick={() => handleAddComment(selectedPost.id)}
                      >
                        <Send />
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
          </>
        )}
      </Dialog>
      
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
    </Container>
  );
};

export default Posts; 