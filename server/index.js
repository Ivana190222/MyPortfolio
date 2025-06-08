const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Datos de respaldo (fallback) cuando la base de datos no está disponible
const FALLBACK_DATA = {
  profile: {
    id: 1,
    name: 'Ivana Hervot',
    title: 'Desarrolladora Full Stack',
    location: 'Argentina',
    email: 'ivana.hervot@example.com',
    website: 'www.miportfolio.com',
    bio: '👨‍💻 Desarrolladora apasionada | 🚀 Creadora de soluciones innovadoras | 💡 Siempre aprendiendo',
    avatar_url: '/ivana-photo.jpeg',
    created_at: new Date().toISOString()
  },
  posts: [
    {
      id: 1,
      title: "Proyecto Web GymAcgym",
      image_url: "/proyecto-gym.jpeg",
      description: "Este proyecto es un sitio web dinámico y profesional creado para ACGym, un gimnasio centrado en promover la salud como la verdadera riqueza. Implementé un sistema de gestión de clases y turnos, utilizando HTML, CSS, JS para el frontend y Node.js con Mysql para el backend.",
      date_start: "2023-01-01",
      date_end: null,
      company: "ACGym",
      location: "Argentina",
      likes: 0,
      comments: 0,
      created_at: new Date().toISOString(),
      liked: false,
      commentsData: []
    },
    {
      id: 2,
      title: "Proyecto Lux Line Cosméticos",
      image_url: "/lux_line.png",
      description: "Desarrollo de una plataforma e-commerce completa para Lux Line Cosméticos con carrito de compras, gestión de inventario, integración de pagos y panel de administración. El frontend está desarrollado con HTML, CSS, Bootstrap, mientras que el backend utiliza Node.js, Express y MySQL.",
      date_start: "2022-06-01",
      date_end: "2022-12-31",
      company: "Lux Line",
      location: "Argentina",
      likes: 0,
      comments: 0,
      created_at: new Date().toISOString(),
      liked: false,
      commentsData: []
    },
    {
      id: 3,
      title: "Proyecto Astro Destinos",
      image_url: "/DestinoAstral.png",
      description: "AstroDestinos es una aplicación web inmersiva y visualmente impactante desarrollada con tecnologías modernas para ofrecer a los usuarios una experiencia completa en el mundo de la astrología, el tarot y las prácticas esotéricas. El objetivo principal ha sido crear una plataforma elegante y fácil de usar que proporcione información personalizada sobre cartas astrales, compatibilidad zodiacal, lecturas de tarot y horóscopos diarios, todo ello con una interfaz de usuario atractiva y animaciones fluidas.",
      date_start: "2022-01-01",
      date_end: "2022-12-31",
      company: "Freelance",
      location: "Argentina",
      likes: 0,
      comments: 0,
      created_at: new Date().toISOString(),
      liked: false,
      commentsData: []
    },
    {
      id: 4,
      title: "Proyecto Carrito con React",
      image_url: "/proyecto carrito con react.png",
      description: "Este proyecto es una tienda online de productos de maquillaje creada con React, y sus características principales son: Catálogo de productos: Visualiza todos los productos de maquillaje disponibles. Detalle de producto: Información completa de cada producto. Carrito de compras: Agrega productos y gestiona tu carrito. Diseño responsive: Se adapta a cualquier dispositivo (celular, tablet, computadora). Panel de administración: Gestiona los productos (agregar, eliminar).",
      date_start: "2022-01-01",
      date_end: "2022-06-30",
      company: "Proyecto Personal",
      location: "Argentina",
      likes: 0,
      comments: 0,
      created_at: new Date().toISOString(),
      liked: false,
      commentsData: []
    },
    {
      id: 5,
      title: "Proyecto Institución Educativa CENS 454",
      image_url: "/cens454.png",
      description: "El sitio web del CENS 454 fue desarrollado para proporcionar información relevante sobre nuestra institución educativa, incluyendo: Información general sobre el CENS 454. Nuestra misión, visión y valores. Galería de imágenes. Palabras de la Directora. Información de contacto y formulario para consultas.",
      date_start: "2021-01-01",
      date_end: "2022-01-01",
      company: "CENS 454",
      location: "Argentina",
      likes: 0,
      comments: 0,
      created_at: new Date().toISOString(),
      liked: false,
      commentsData: []
    }
  ],
  highlights: [
    {
      id: 1,
      title: "Desarrollo Web",
      icon: "💻",
      created_at: new Date().toISOString(),
      items: ["React.js", "Node.js", "TypeScript", "MySQL", "Express.js", "HTML5/CSS3"]
    },
    {
      id: 2,
      title: "Certificaciones",
      icon: "🏆",
      created_at: new Date().toISOString(),
      items: ["Desarrollo Web Full Stack", "React.js Avanzado", "Node.js & Express"]
    },
    {
      id: 3,
      title: "Soft Skills",
      icon: "🤝",
      created_at: new Date().toISOString(),
      items: ["Trabajo en equipo", "Comunicación efectiva", "Resolución de problemas", "Adaptabilidad"]
    }
  ],
  followers: [
    {
      id: 1,
      name: "Ana García",
      role: "Tech Lead",
      company: "TechCorp",
      avatar_url: "/avatar1.jpg",
      email: "ana.garcia@example.com",
      linkedin_url: "https://linkedin.com/in/anagarcia",
      description: "Trabajamos juntos en el desarrollo de una plataforma de e-learning",
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      name: "Carlos Rodríguez",
      role: "Project Manager",
      company: "InnovaSoft",
      avatar_url: "/avatar2.jpg",
      email: "carlos.rodriguez@example.com",
      linkedin_url: "https://linkedin.com/in/carlosrodriguez",
      description: "Supervisor directo en múltiples proyectos de desarrollo web",
      created_at: new Date().toISOString()
    }
  ]
};

// Memoria para almacenar datos cuando la base de datos no está disponible
const memoryStore = {
  postLikes: {},
  postComments: {}
};

// Variable para controlar si usamos la base de datos o el modo respaldo
let usingDatabase = false;
let dbConnection = null;

// Función para intentar conectar a la base de datos
const connectToDatabase = () => {
  try {
    dbConnection = mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '190222',
      database: process.env.DB_NAME || 'cv_instagram',
    });

    dbConnection.connect((err) => {
      if (err) {
        console.error('Error al conectar a la base de datos:', err);
        usingDatabase = false;
        console.log('Ejecutando en modo respaldo con datos en memoria');
        return;
      }
      console.log('Conectado a la base de datos MySQL');
      usingDatabase = true;
    });
  } catch (error) {
    console.error('Conexión a la base de datos fallida:', error);
    usingDatabase = false;
    console.log('Ejecutando en modo respaldo con datos en memoria');
  }
};

// Intentar conectar a la base de datos al iniciar
connectToDatabase();

// Función para obtener IP del cliente
const getClientIp = (req) => {
  return req.headers['x-forwarded-for'] || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress || 
         req.connection.socket.remoteAddress;
};

// Rutas
app.get('/api/profile', (req, res) => {
  if (!usingDatabase || !dbConnection) {
    return res.json(FALLBACK_DATA.profile);
  }

  const query = 'SELECT * FROM profile LIMIT 1';
  dbConnection.query(query, (err, results) => {
    if (err) {
      console.error('Error de base de datos:', err);
      return res.json(FALLBACK_DATA.profile);
    }
    res.json(results[0] || FALLBACK_DATA.profile);
  });
});

app.get('/api/posts', (req, res) => {
  if (!usingDatabase || !dbConnection) {
    const clientIp = getClientIp(req);
    const posts = FALLBACK_DATA.posts.map(post => {
      // Verificar si el usuario ha dado like en la memoria
      const userLikes = memoryStore.postLikes[post.id] || [];
      const liked = userLikes.includes(clientIp);
      
      // Obtener comentarios de la memoria
      const commentsData = memoryStore.postComments[post.id] || [];
      
      return {
        ...post,
        liked,
        commentsData
      };
    });
    
    return res.json(posts);
  }

  const postsQuery = 'SELECT * FROM posts ORDER BY created_at DESC';
  dbConnection.query(postsQuery, (err, postsResults) => {
    if (err) {
      console.error('Error de base de datos:', err);
      return res.json(FALLBACK_DATA.posts);
    }

    // Si no hay posts, devolver datos de respaldo
    if (postsResults.length === 0) {
      return res.json(FALLBACK_DATA.posts);
    }

    // Obtener comentarios para cada post
    const clientIp = getClientIp(req);
    const posts = [...postsResults];
    let completed = 0;

    posts.forEach((post, index) => {
      // Verificar si el usuario ya dio like
      const likeQuery = 'SELECT * FROM post_likes WHERE post_id = ? AND user_ip = ?';
      dbConnection.query(likeQuery, [post.id, clientIp], (likeErr, likeResults) => {
        if (!likeErr) {
          posts[index].liked = likeResults.length > 0;
        }

        // Obtener comentarios
        const commentsQuery = 'SELECT * FROM post_comments WHERE post_id = ? ORDER BY created_at DESC';
        dbConnection.query(commentsQuery, [post.id], (commentsErr, commentsResults) => {
          if (!commentsErr) {
            posts[index].commentsData = commentsResults || [];
          }

          // Una vez que se han procesado todos los posts, devolver resultados
          completed++;
          if (completed === posts.length) {
            res.json(posts);
          }
        });
      });
    });
  });
});

// Endpoint para dar like a un post
app.post('/api/posts/:id/like', (req, res) => {
  const postId = parseInt(req.params.id);
  const userIp = getClientIp(req);

  if (!usingDatabase || !dbConnection) {
    // Modo respaldo: gestionar likes en memoria
    if (!memoryStore.postLikes[postId]) {
      memoryStore.postLikes[postId] = [];
    }
    
    const userLikes = memoryStore.postLikes[postId];
    const userIndex = userLikes.indexOf(userIp);
    
    let liked = false;
    
    if (userIndex === -1) {
      // Dar like
      userLikes.push(userIp);
      liked = true;
    } else {
      // Quitar like
      userLikes.splice(userIndex, 1);
      liked = false;
    }
    
    memoryStore.postLikes[postId] = userLikes;
    
    return res.json({ success: true, liked });
  }

  // Verificar si el usuario ya dio like
  const checkQuery = 'SELECT * FROM post_likes WHERE post_id = ? AND user_ip = ?';
  dbConnection.query(checkQuery, [postId, userIp], (checkErr, checkResults) => {
    if (checkErr) {
      return res.status(500).json({ error: checkErr.message });
    }

    // Si ya dio like, eliminarlo (unlike)
    if (checkResults.length > 0) {
      const unlikeQuery = 'DELETE FROM post_likes WHERE post_id = ? AND user_ip = ?';
      dbConnection.query(unlikeQuery, [postId, userIp], (unlikeErr) => {
        if (unlikeErr) {
          return res.status(500).json({ error: unlikeErr.message });
        }

        // Actualizar contador de likes
        const updateQuery = 'UPDATE posts SET likes = likes - 1 WHERE id = ?';
        dbConnection.query(updateQuery, [postId], (updateErr) => {
          if (updateErr) {
            return res.status(500).json({ error: updateErr.message });
          }
          res.json({ success: true, liked: false });
        });
      });
    } 
    // Si no ha dado like, añadirlo
    else {
      const likeQuery = 'INSERT INTO post_likes (post_id, user_ip) VALUES (?, ?)';
      dbConnection.query(likeQuery, [postId, userIp], (likeErr) => {
        if (likeErr) {
          return res.status(500).json({ error: likeErr.message });
        }

        // Actualizar contador de likes
        const updateQuery = 'UPDATE posts SET likes = likes + 1 WHERE id = ?';
        dbConnection.query(updateQuery, [postId], (updateErr) => {
          if (updateErr) {
            return res.status(500).json({ error: updateErr.message });
          }
          res.json({ success: true, liked: true });
        });
      });
    }
  });
});

// Endpoint para añadir comentario
app.post('/api/posts/:id/comment', (req, res) => {
  const postId = parseInt(req.params.id);
  const { author, text, avatar_url } = req.body;

  if (!author || !text) {
    return res.status(400).json({ error: 'Se requiere autor y texto para el comentario' });
  }

  if (!usingDatabase || !dbConnection) {
    // Modo respaldo: gestionar comentarios en memoria
    if (!memoryStore.postComments[postId]) {
      memoryStore.postComments[postId] = [];
    }
    
    const comment = {
      id: Date.now(), // ID único basado en timestamp
      post_id: postId,
      author,
      text,
      avatar_url,
      created_at: new Date().toISOString()
    };
    
    memoryStore.postComments[postId].unshift(comment); // Añadir al principio
    
    return res.json({ success: true, comment });
  }

  // Insertar comentario
  const insertQuery = 'INSERT INTO post_comments (post_id, author, text, avatar_url) VALUES (?, ?, ?, ?)';
  dbConnection.query(insertQuery, [postId, author, text, avatar_url], (insertErr, insertResult) => {
    if (insertErr) {
      return res.status(500).json({ error: insertErr.message });
    }

    // Actualizar contador de comentarios
    const updateQuery = 'UPDATE posts SET comments = comments + 1 WHERE id = ?';
    dbConnection.query(updateQuery, [postId], (updateErr) => {
      if (updateErr) {
        return res.status(500).json({ error: updateErr.message });
      }

      // Obtener el comentario recién insertado
      const commentQuery = 'SELECT * FROM post_comments WHERE id = ?';
      dbConnection.query(commentQuery, [insertResult.insertId], (commentErr, commentResults) => {
        if (commentErr) {
          return res.status(500).json({ error: commentErr.message });
        }
        res.json({ success: true, comment: commentResults[0] });
      });
    });
  });
});

// Endpoint para obtener comentarios de un post
app.get('/api/posts/:id/comments', (req, res) => {
  const postId = parseInt(req.params.id);
  
  if (!usingDatabase || !dbConnection) {
    // Modo respaldo: devolver comentarios de la memoria
    const comments = memoryStore.postComments[postId] || [];
    return res.json(comments);
  }
  
  const query = 'SELECT * FROM post_comments WHERE post_id = ? ORDER BY created_at DESC';
  
  dbConnection.query(query, [postId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.get('/api/highlights', (req, res) => {
  if (!usingDatabase || !dbConnection) {
    return res.json(FALLBACK_DATA.highlights);
  }
  
  const query = 'SELECT h.*, GROUP_CONCAT(hi.item) as items ' +
                'FROM highlights h ' +
                'LEFT JOIN highlight_items hi ON h.id = hi.highlight_id ' +
                'GROUP BY h.id';
  dbConnection.query(query, (err, results) => {
    if (err) {
      console.error('Error de base de datos:', err);
      return res.json(FALLBACK_DATA.highlights);
    }
    
    if (results.length === 0) {
      return res.json(FALLBACK_DATA.highlights);
    }
    
    const highlights = results.map(highlight => ({
      ...highlight,
      items: highlight.items ? highlight.items.split(',') : []
    }));
    res.json(highlights);
  });
});

app.get('/api/followers', (req, res) => {
  if (!usingDatabase || !dbConnection) {
    return res.json(FALLBACK_DATA.followers);
  }
  
  const query = 'SELECT * FROM followers';
  dbConnection.query(query, (err, results) => {
    if (err) {
      console.error('Error de base de datos:', err);
      return res.json(FALLBACK_DATA.followers);
    }
    
    if (results.length === 0) {
      return res.json(FALLBACK_DATA.followers);
    }
    
    res.json(results);
  });
});

// Endpoint para generación de PDF
app.get('/api/download-cv', (req, res) => {
  // Aquí implementarías la lógica de generación de PDF
  // Por ejemplo, utilizando una biblioteca como PDFKit
  res.status(501).json({ message: 'Generación de PDF no implementada aún' });
});

// Endpoint para verificar el estado del backend
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    mode: usingDatabase ? 'database' : 'respaldo',
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en puerto ${PORT}`);
}); 