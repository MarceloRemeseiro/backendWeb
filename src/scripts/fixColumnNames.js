const { Pool } = require('pg');
require('dotenv').config();

async function fixColumnNames() {
  const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB
  });

  try {
    // Primero mostramos la estructura actual
    console.log('Estructura actual de las tablas:');
    const tables = await pool.query(`
      SELECT table_name, column_name 
      FROM information_schema.columns 
      WHERE table_schema = 'public'
      ORDER BY table_name, ordinal_position;
    `);
    console.log(tables.rows);

    // Corregimos los nombres de las columnas uno por uno
    await pool.query(`ALTER TABLE actividades RENAME COLUMN "TEXToTarjeta" TO "textotarjeta";`);
    await pool.query(`ALTER TABLE actividades RENAME COLUMN "TEXTo" TO "texto";`);
    
    await pool.query(`ALTER TABLE videos RENAME COLUMN "TEXTo" TO "texto";`);
    
    await pool.query(`ALTER TABLE tarjetas RENAME COLUMN "TEXTo" TO "texto";`);
    
    await pool.query(`ALTER TABLE tempsjunts RENAME COLUMN "TEXTo" TO "texto";`);

    // Mostramos la estructura después de los cambios
    console.log('\nEstructura después de los cambios:');
    const updatedTables = await pool.query(`
      SELECT table_name, column_name 
      FROM information_schema.columns 
      WHERE table_schema = 'public'
      ORDER BY table_name, ordinal_position;
    `);
    console.log(updatedTables.rows);

    console.log('Nombres de columnas corregidos correctamente');
  } catch (error) {
    console.error('Error al corregir los nombres de las columnas:', error.message);
    // Si una columna no existe, continuamos con las demás
    if (error.code === '42703') {
      console.log('Alguna columna no existe, pero continuamos con las demás');
    }
  } finally {
    await pool.end();
  }
}

// Ejecutar la corrección
fixColumnNames().then(() => {
  console.log('Proceso completado');
  process.exit(0);
}); 