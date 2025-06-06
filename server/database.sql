-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS cv_instagram;
USE cv_instagram;

-- Tabla de perfil
CREATE TABLE IF NOT EXISTS profile (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  title VARCHAR(100) NOT NULL,
  location VARCHAR(100),
  email VARCHAR(100),
  website VARCHAR(100),
  bio TEXT,
  avatar_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de publicaciones (para experiencia laboral y proyectos)
CREATE TABLE IF NOT EXISTS posts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  image_url VARCHAR(255),
  date_start DATE,
  date_end DATE,
  company VARCHAR(100),
  location VARCHAR(100),
  likes INT DEFAULT 0,
  comments INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de comentarios
CREATE TABLE IF NOT EXISTS post_comments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  post_id INT NOT NULL,
  author VARCHAR(100) NOT NULL,
  text TEXT NOT NULL,
  avatar_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
);

-- Tabla de likes
CREATE TABLE IF NOT EXISTS post_likes (
  id INT PRIMARY KEY AUTO_INCREMENT,
  post_id INT NOT NULL,
  user_ip VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
  UNIQUE KEY unique_like (post_id, user_ip)
);

-- Tabla de destacados (para habilidades y certificaciones)
CREATE TABLE IF NOT EXISTS highlights (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(100) NOT NULL,
  icon VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de elementos destacados
CREATE TABLE IF NOT EXISTS highlight_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  highlight_id INT,
  item VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (highlight_id) REFERENCES highlights(id) ON DELETE CASCADE
);

-- Tabla de seguidores (para referencias profesionales)
CREATE TABLE IF NOT EXISTS followers (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(100),
  company VARCHAR(100),
  avatar_url VARCHAR(255),
  email VARCHAR(100),
  linkedin_url VARCHAR(255),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Datos de ejemplo para perfil
INSERT INTO profile (name, title, location, email, website, bio, avatar_url)
VALUES (
  'Tu Nombre',
  'Desarrollador Full Stack',
  'Tu Ciudad, País',
  'tu@email.com',
  'www.tuwebsite.com',
  '👨‍💻 Desarrollador apasionado | 🚀 Creador de soluciones innovadoras | 💡 Siempre aprendiendo',
  '/path-to-your-photo.jpg'
);

-- Datos de ejemplo para publicaciones
INSERT INTO posts (title, description, image_url, date_start, date_end, company, location)
VALUES
  ('Proyecto Web E-commerce', 'Desarrollo de una plataforma de comercio electrónico utilizando React y Node.js', '/path-to-project-image.jpg', '2023-01-01', NULL, 'TechCorp', 'Remoto'),
  ('App Móvil de Delivery', 'Aplicación móvil para servicio de entrega a domicilio', '/path-to-project-image2.jpg', '2022-06-01', '2022-12-31', 'MobileApps Inc', 'Presencial');

-- Datos de ejemplo para destacados
INSERT INTO highlights (title, icon)
VALUES
  ('Desarrollo Web', '💻'),
  ('Certificaciones', '🏆'),
  ('Soft Skills', '🤝');

-- Datos de ejemplo para elementos destacados
INSERT INTO highlight_items (highlight_id, item)
VALUES
  (1, 'React.js'),
  (1, 'Node.js'),
  (1, 'TypeScript'),
  (2, 'AWS Certified Developer'),
  (2, 'MongoDB Certified Developer'),
  (3, 'Trabajo en equipo'),
  (3, 'Comunicación efectiva');

-- Datos de ejemplo para seguidores
INSERT INTO followers (name, role, company, avatar_url, email, linkedin_url, description)
VALUES
  ('Ana García', 'Tech Lead', 'TechCorp', '/path-to-avatar1.jpg', 'ana.garcia@techcorp.com', 'https://linkedin.com/in/anagarcia', 'Trabajamos juntos en el desarrollo de una plataforma de e-learning'),
  ('Carlos Rodríguez', 'Project Manager', 'InnovaSoft', '/path-to-avatar2.jpg', 'carlos.rodriguez@innovasoft.com', 'https://linkedin.com/in/carlosrodriguez', 'Supervisor directo en múltiples proyectos de desarrollo web'); 