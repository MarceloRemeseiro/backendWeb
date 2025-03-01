const { Pool } = require('pg');
require('dotenv').config();

// Función para verificar la conexión
async function verifyConnection() {
  console.log('VERIFICACIÓN DE CONEXIÓN A POSTGRESQL');
  console.log('====================================');
  
  // Mostrar la configuración que se está usando
  const config = {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
  };
  
  console.log('Configuración:', {
    ...config,
    password: '********' // Ocultamos la contraseña por seguridad
  });
  
  // Crear el pool de conexiones
  const pool = new Pool(config);
  
  try {
    // Probar la conexión
    const result = await pool.query('SELECT NOW() as time, current_database() as database, version() as version');
    
    console.log('\n✅ CONEXIÓN EXITOSA');
    console.log('Hora del servidor:', result.rows[0].time);
    console.log('Base de datos:', result.rows[0].database);
    console.log('Versión de PostgreSQL:', result.rows[0].version);
    
    // Verificar las tablas existentes
    const tablesResult = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
    
    console.log('\nTablas disponibles:');
    tablesResult.rows.forEach((row, index) => {
      console.log(`${index + 1}. ${row.table_name}`);
    });
    
    return true;
  } catch (error) {
    console.log('\n❌ ERROR DE CONEXIÓN');
    console.log('Código de error:', error.code);
    console.log('Mensaje:', error.message);
    return false;
  } finally {
    await pool.end();
  }
}

// Ejecutar la verificación
verifyConnection()
  .then(success => {
    if (success) {
      console.log('\n✨ Todo está configurado correctamente');
    } else {
      console.log('\n❗ Hay problemas con la conexión a la base de datos');
    }
  })
  .catch(err => {
    console.error('Error en el script:', err);
  }); 