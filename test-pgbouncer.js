const { Pool } = require('pg');

// Prueba de conexión a través de pgBouncer
async function testPgBouncer() {
  console.log('PRUEBA DE CONEXIÓN A TRAVÉS DE PGBOUNCER');
  console.log('========================================');
  
  // Configuración para conectarse a pgBouncer
  const config = {
    host: 'localhost',  // pgBouncer se ejecuta localmente
    port: 6432,         // Puerto de pgBouncer
    user: 'postgres',
    password: 'eevm1122',
    database: 'dbEevm',
    connectionTimeoutMillis: 5000
  };
  
  console.log('Configuración:', JSON.stringify(config));
  
  const pool = new Pool(config);
  
  try {
    // Prueba simple de conexión
    const result1 = await pool.query('SELECT NOW()');
    console.log('✅ CONEXIÓN EXITOSA');
    console.log('Resultado:', result1.rows[0]);
    
    // Prueba para verificar que estamos usando pgBouncer
    console.log('\nVerificando información de conexión...');
    const result2 = await pool.query('SHOW POOLS');
    console.log('Información de pools de pgBouncer:');
    console.table(result2.rows);
    
    return true;
  } catch (error) {
    console.log('❌ ERROR DE CONEXIÓN');
    console.log('Código de error:', error.code);
    console.log('Mensaje:', error.message);
    return false;
  } finally {
    await pool.end();
  }
}

// Ejecutar
testPgBouncer().catch(err => {
  console.error('Error en el script:', err);
}); 