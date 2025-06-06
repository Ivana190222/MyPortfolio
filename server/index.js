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
  const query = 'SELECT * FROM posts ORDER BY date DESC';
  db.query(query, (err, results) => {
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