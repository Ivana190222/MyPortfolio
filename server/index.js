const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '190222',
  database: process.env.DB_NAME || 'cv_instagram',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// Función para obtener IP del cliente
const getClientIp = (req) => {
  return req.headers['x-forwarded-for'] || 
         req.connection.remoteAddress || 
         req.socket.remoteAddress || 
         req.connection.socket.remoteAddress;
};

// Routes
app.get('/api/profile', (req, res) => {
  const query = 'SELECT * FROM profile LIMIT 1';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results[0] || {});
  });
});

app.get('/api/posts', (req, res) => {
  const postsQuery = 'SELECT * FROM posts ORDER BY created_at DESC';
  db.query(postsQuery, (err, postsResults) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    // Si no hay posts, devolver array vacío
    if (postsResults.length === 0) {
      return res.json([]);
    }

    // Obtener comentarios para cada post
    const clientIp = getClientIp(req);
    const posts = [...postsResults];
    let completed = 0;

    posts.forEach((post, index) => {
      // Verificar si el usuario ya dio like
      const likeQuery = 'SELECT * FROM post_likes WHERE post_id = ? AND user_ip = ?';
      db.query(likeQuery, [post.id, clientIp], (likeErr, likeResults) => {
        if (!likeErr) {
          posts[index].liked = likeResults.length > 0;
        }

        // Obtener comentarios
        const commentsQuery = 'SELECT * FROM post_comments WHERE post_id = ? ORDER BY created_at DESC';
        db.query(commentsQuery, [post.id], (commentsErr, commentsResults) => {
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
  const postId = req.params.id;
  const userIp = getClientIp(req);

  // Verificar si el usuario ya dio like
  const checkQuery = 'SELECT * FROM post_likes WHERE post_id = ? AND user_ip = ?';
  db.query(checkQuery, [postId, userIp], (checkErr, checkResults) => {
    if (checkErr) {
      return res.status(500).json({ error: checkErr.message });
    }

    // Si ya dio like, eliminarlo (unlike)
    if (checkResults.length > 0) {
      const unlikeQuery = 'DELETE FROM post_likes WHERE post_id = ? AND user_ip = ?';
      db.query(unlikeQuery, [postId, userIp], (unlikeErr) => {
        if (unlikeErr) {
          return res.status(500).json({ error: unlikeErr.message });
        }

        // Actualizar contador de likes
        const updateQuery = 'UPDATE posts SET likes = likes - 1 WHERE id = ?';
        db.query(updateQuery, [postId], (updateErr) => {
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
      db.query(likeQuery, [postId, userIp], (likeErr) => {
        if (likeErr) {
          return res.status(500).json({ error: likeErr.message });
        }

        // Actualizar contador de likes
        const updateQuery = 'UPDATE posts SET likes = likes + 1 WHERE id = ?';
        db.query(updateQuery, [postId], (updateErr) => {
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
  const postId = req.params.id;
  const { author, text, avatar_url } = req.body;

  if (!author || !text) {
    return res.status(400).json({ error: 'Se requiere autor y texto para el comentario' });
  }

  // Insertar comentario
  const insertQuery = 'INSERT INTO post_comments (post_id, author, text, avatar_url) VALUES (?, ?, ?, ?)';
  db.query(insertQuery, [postId, author, text, avatar_url], (insertErr, insertResult) => {
    if (insertErr) {
      return res.status(500).json({ error: insertErr.message });
    }

    // Actualizar contador de comentarios
    const updateQuery = 'UPDATE posts SET comments = comments + 1 WHERE id = ?';
    db.query(updateQuery, [postId], (updateErr) => {
      if (updateErr) {
        return res.status(500).json({ error: updateErr.message });
      }

      // Obtener el comentario recién insertado
      const commentQuery = 'SELECT * FROM post_comments WHERE id = ?';
      db.query(commentQuery, [insertResult.insertId], (commentErr, commentResults) => {
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
  const postId = req.params.id;
  const query = 'SELECT * FROM post_comments WHERE post_id = ? ORDER BY created_at DESC';
  
  db.query(query, [postId], (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

app.get('/api/highlights', (req, res) => {
  const query = 'SELECT h.*, GROUP_CONCAT(hi.item) as items ' +
                'FROM highlights h ' +
                'LEFT JOIN highlight_items hi ON h.id = hi.highlight_id ' +
                'GROUP BY h.id';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    const highlights = results.map(highlight => ({
      ...highlight,
      items: highlight.items ? highlight.items.split(',') : []
    }));
    res.json(highlights);
  });
});

app.get('/api/followers', (req, res) => {
  const query = 'SELECT * FROM followers';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(results);
  });
});

// PDF Generation endpoint
app.get('/api/download-cv', (req, res) => {
  // Here you would implement PDF generation logic
  // For example, using a library like PDFKit
  res.status(501).json({ message: 'PDF generation not implemented yet' });
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 