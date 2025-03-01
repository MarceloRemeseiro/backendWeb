const { Pool } = require('pg');

// Función para probar una conexión con timeout
async function testConnection(host, port) {
  console.log(`Probando conexión a ${host}:${port}...`);
  
  const config = {
    host,
    port,
    user: 'postgres',
    password: 'eevm1122',
    database: 'dbEevm',
    // Timeout más corto para no esperar tanto
    connectionTimeoutMillis: 3000
  };
  
  const pool = new Pool(config);
  
  try {
    const result = await pool.query('SELECT NOW()');
    console.log(`✅ CONEXIÓN EXITOSA a ${host}:${port}`);
    console.log('Resultado:', result.rows[0]);
    return true;
  } catch (error) {
    console.log(`❌ ERROR al conectar a ${host}:${port}: ${error.code}`);
    return false;
  } finally {
    await pool.end();
  }
}

// Función principal
async function main() {
  const hosts = ['eevm.marceloremeseiro.com', '85.10.196.133'];
  const ports = [5432, 5433, 5434, 32768, 32769, 55000, 8080, 3000, 3306];
  
  console.log('INICIANDO PRUEBAS DE CONEXIÓN RÁPIDAS');
  console.log('=====================================');
  
  for (const host of hosts) {
    for (const port of ports) {
      await testConnection(host, port);
    }
  }
  
  console.log('=====================================');
  console.log('PRUEBAS COMPLETADAS');
}

// Ejecutar
main().catch(err => {
  console.error('Error en el script:', err);
}); 