const mysql = require('mysql2/promise');
require("dotenv").config();

const createDatabaseIfNotExists = async () => {
  const connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    port: process.env.MYSQL_PORT,
  });

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQL_DATABASE}\`;`);
  await connection.end();
};

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  password: process.env.MYSQL_ROOT_PASSWORD,
  port: process.env.MYSQL_PORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const createTables = async () => {
  try {
    await pool.query(`CREATE TABLE IF NOT EXISTS actividades (
      id INT(11) AUTO_INCREMENT PRIMARY KEY,
      titulo VARCHAR(191),
      textoTarjeta VARCHAR(1000),
      imagen VARCHAR(191),
      texto TEXT,
      boton TINYINT(1),
      web TINYINT(1),
      orden INT(11)
    );`);

    await pool.query(`CREATE TABLE IF NOT EXISTS series (
      id INT(11) AUTO_INCREMENT PRIMARY KEY,
      titulo VARCHAR(191),
      subtitulo VARCHAR(191),
      imagen VARCHAR(191),
      link VARCHAR(191),
      web TINYINT(1),
      orden INT(11)
    );`);

    await pool.query(`CREATE TABLE IF NOT EXISTS videos (
      id INT(11) AUTO_INCREMENT PRIMARY KEY,
      titulo VARCHAR(191),
      subtitulo VARCHAR(191),
      texto TEXT,
      imagen VARCHAR(191),
      link VARCHAR(191),
      web TINYINT(1),
      fecha DATETIME(3)
    );`);

    await pool.query(`CREATE TABLE IF NOT EXISTS slider1 (
      id INT(11) AUTO_INCREMENT PRIMARY KEY,
      titulo VARCHAR(191),
      subtitulo VARCHAR(191),
      imagen VARCHAR(191),
      link VARCHAR(191),
      web TINYINT(1),
      orden INT(11)
    );`);

    await pool.query(`CREATE TABLE IF NOT EXISTS slider2 (
      id INT(11) AUTO_INCREMENT PRIMARY KEY,
      imagen VARCHAR(191),
      link VARCHAR(191),
      web TINYINT(1)
    );`);

    await pool.query(`CREATE TABLE IF NOT EXISTS tarjetas (
      id INT(11) AUTO_INCREMENT PRIMARY KEY,
      titulo VARCHAR(191),
      subtitulo VARCHAR(191),
      texto TEXT,
      imagen VARCHAR(191),
      link VARCHAR(191),
      web TINYINT(1),
      orden INT(11)
    );`);

    await pool.query(`CREATE TABLE IF NOT EXISTS tempsjunts (
      id INT(11) AUTO_INCREMENT PRIMARY KEY,
      titulo VARCHAR(191),
      subtitulo VARCHAR(191),
      imagen VARCHAR(191),
      texto TEXT,
      fecha DATETIME(3),
      link VARCHAR(191),
      web TINYINT(1)
    );`);

  } catch (error) {
    console.error('Error creando las tablas:', error);
  }
};

const initDb = async () => {
  await createDatabaseIfNotExists();
  await createTables();
};

module.exports = { pool, initDb };
