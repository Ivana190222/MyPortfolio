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

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002/api';

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

  // Cargar posts al montar el componente
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/posts`);
      setPosts(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setError('No se pudieron cargar los proyectos. Por favor, intenta de nuevo más tarde.');
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
      }
    } catch (err) {
      console.error('Error dando like:', err);
      setSnackbar({
        open: true,
        message: 'No se pudo procesar el like. Intenta de nuevo.',
        severity: 'error'
      });
    }
  };
  
  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };
  
  const handleAddComment = async (postId) => {
    if (newComment.trim() === "") return;
    
    try {
      const response = await axios.post(`${API_URL}/posts/${postId}/comment`, {
        author: "Visitante",
        text: newComment,
        avatar_url: "/ivana-photo.jpeg"
      });
      
      if (response.data.success) {
        const newCommentObj = response.data.comment;
        newCommentObj.isYours = true;
        
        // Actualizar la lista de posts
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
        
        // Actualizar el post seleccionado si es el que recibe el comentario
        if (selectedPost && selectedPost.id === postId) {
          const updatedComments = selectedPost.commentsData ? 
            [...selectedPost.commentsData, newCommentObj] : 
            [newCommentObj];
          
          setSelectedPost(prev => ({
            ...prev,
            commentsData: updatedComments
          }));
        }
        
        setNewComment("");
        setSnackbar({
          open: true,
          message: '¡Comentario añadido correctamente!',
          severity: 'success'
        });
      }
    } catch (err) {
      console.error('Error al añadir comentario:', err);
      setSnackbar({
        open: true,
        message: 'No se pudo añadir el comentario. Intenta de nuevo.',
        severity: 'error'
      });
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
    // Aquí iría la llamada a la API para eliminar el comentario
    // Por ahora solo lo eliminamos del estado local
    if (!selectedComment || !selectedPost) return;
    
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
    setSnackbar({
      open: true,
      message: 'Comentario eliminado correctamente',
      severity: 'success'
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

  if (error) {
    return (
      <Container sx={{ mt: 10 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

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
                        {selectedPost.date_start ? 
                          new Date(selectedPost.date_start).toLocaleDateString('es-ES', {year: 'numeric', month: 'long'}) : 
                          selectedPost.date}
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
                          {selectedPost.commentsData ? selectedPost.commentsData.length : 0}
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
                      {selectedPost.commentsData && selectedPost.commentsData.length > 0 ? (
                        selectedPost.commentsData.map((comment) => (
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
                              <Avatar src={comment.avatar_url} alt={comment.author} />
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
                                    {new Date(comment.created_at).toLocaleDateString('es-ES', {
                                      year: 'numeric', 
                                      month: 'short', 
                                      day: 'numeric'
                                    })}
                                  </Typography>
                                </>
                              }
                            />
                          </ListItem>
                        ))
                      ) : (
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            textAlign: 'center', 
                            fontStyle: 'italic',
                            color: 'text.secondary',
                            py: 2
                          }}
                        >
                          No hay comentarios aún. ¡Sé el primero en comentar!
                        </Typography>
                      )}
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

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Posts; 