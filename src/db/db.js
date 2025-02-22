const { Pool } = require('pg');
require("dotenv").config();

const createDatabaseIfNotExists = async () => {
  // Conexión inicial a postgres para crear la base de datos
  const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    database: 'postgres' // Conexión inicial a la base postgres por defecto
  });

  try {
    const result = await pool.query(
      `SELECT FROM pg_database WHERE datname = $1`,
      [process.env.POSTGRES_DB]
    );

    if (result.rows.length === 0) {
      await pool.query(`CREATE DATABASE ${process.env.POSTGRES_DB}`);
    }
  } finally {
    await pool.end();
  }
};

const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: process.env.POSTGRES_PORT,
  database: process.env.POSTGRES_DB,
});

// Agregamos una función helper para hacer queries y mostrar logs
const queryWithLog = async (query, params = []) => {
  try {
    const result = await pool.query(query, params);
    console.log('Query ejecutado:', query);
    console.log('Parámetros:', params);
    console.log('Resultado:', {
      rows: result.rows,
      rowCount: result.rowCount,
      fields: result.fields?.map(f => f.name)
    });
    return result;
  } catch (error) {
    console.error('Error en query:', query);
    console.error('Error completo:', error);
    throw error;
  }
};

const createTables = async () => {
  try {
    // Primero, vamos a ver la estructura de las tablas existentes
    const tablesInfo = await queryWithLog(`
      SELECT 
        table_name,
        column_name,
        data_type,
        character_maximum_length
      FROM information_schema.columns 
      WHERE table_schema = 'public'
      ORDER BY table_name, ordinal_position;
    `);
    
    console.log('=== ESTRUCTURA DE LAS TABLAS ===');
    console.log(JSON.stringify(tablesInfo.rows, null, 2));
    console.log('================================');

    await queryWithLog(`CREATE TABLE IF NOT EXISTS actividades (
      "id" SERIAL PRIMARY KEY,
      "titulo" VARCHAR(191),
      "textotarjeta" VARCHAR(1000),
      "imagen" VARCHAR(191),
      "texto" TEXT,
      "boton" BOOLEAN,
      "web" BOOLEAN,
      "orden" INTEGER
    );`);

    await queryWithLog(`CREATE TABLE IF NOT EXISTS series (
      "id" SERIAL PRIMARY KEY,
      "titulo" VARCHAR(191),
      "subtitulo" VARCHAR(191),
      "imagen" VARCHAR(191),
      "link" VARCHAR(191),
      "web" BOOLEAN,
      "orden" INTEGER
    );`);

    await queryWithLog(`CREATE TABLE IF NOT EXISTS videos (
      "id" SERIAL PRIMARY KEY,
      "titulo" VARCHAR(191),
      "subtitulo" VARCHAR(191),
      "texto" TEXT,
      "imagen" VARCHAR(191),
      "link" VARCHAR(191),
      "web" BOOLEAN,
      "fecha" TIMESTAMP WITH TIME ZONE
    );`);

    await queryWithLog(`CREATE TABLE IF NOT EXISTS slider1 (
      "id" SERIAL PRIMARY KEY,
      "titulo" VARCHAR(191),
      "subtitulo" VARCHAR(191),
      "imagen" VARCHAR(191),
      "link" VARCHAR(191),
      "web" BOOLEAN,
      "orden" INTEGER
    );`);

    await queryWithLog(`CREATE TABLE IF NOT EXISTS slider2 (
      "id" SERIAL PRIMARY KEY,
      "imagen" VARCHAR(191),
      "link" VARCHAR(191),
      "web" BOOLEAN
    );`);

    await queryWithLog(`CREATE TABLE IF NOT EXISTS tarjetas (
      "id" SERIAL PRIMARY KEY,
      "titulo" VARCHAR(191),
      "subtitulo" VARCHAR(191),
      "texto" TEXT,
      "imagen" VARCHAR(191),
      "link" VARCHAR(191),
      "web" BOOLEAN,
      "orden" INTEGER
    );`);

    await queryWithLog(`CREATE TABLE IF NOT EXISTS tempsjunts (
      "id" SERIAL PRIMARY KEY,
      "titulo" VARCHAR(191),
      "subtitulo" VARCHAR(191),
      "imagen" VARCHAR(191),
      "texto" TEXT,
      "fecha" TIMESTAMP WITH TIME ZONE,
      "link" VARCHAR(191),
      "web" BOOLEAN
    );`);

  } catch (error) {
    console.error('Error creando las tablas:', error);
  }
};

const initDb = async () => {
  await createDatabaseIfNotExists();
  await createTables();
};

// Exportamos queryWithLog para usarlo en las rutas
module.exports = { pool, initDb, queryWithLog };
