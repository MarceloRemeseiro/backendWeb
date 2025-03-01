const { Pool } = require('pg');

// Prueba de conexión sin especificar puerto
async function testNoPortConnection() {
  console.log('PRUEBA DE CONEXIÓN SIN ESPECIFICAR PUERTO');
  console.log('=========================================');
  
  const configs = [
    {
      name: "Conexión a eevm.marceloremeseiro.com sin puerto",
      config: {
        host: 'eevm.marceloremeseiro.com',
        user: 'postgres',
        password: 'eevm1122',
        database: 'dbEevm',
        connectionTimeoutMillis: 5000
      }
    },
    {
      name: "Conexión a 85.10.196.133 sin puerto",
      config: {
        host: '85.10.196.133',
        user: 'postgres',
        password: 'eevm1122',
        database: 'dbEevm',
        connectionTimeoutMillis: 5000
      }
    },
    {
      name: "Conexión con URL sin puerto (eevm.marceloremeseiro.com)",
      config: {
        connectionString: 'http://postgres:eevm1122@eevm.marceloremeseiro.com/dbEevm',
        connectionTimeoutMillis: 5000
      }
    },
    {
      name: "Conexión con URL sin puerto (85.10.196.133)",
      config: {
        connectionString: 'postgres://postgres:eevm1122@85.10.196.133/dbEevm',
        connectionTimeoutMillis: 5000
      }
    }
  ];
  
  for (const { name, config } of configs) {
    console.log(`\nProbando: ${name}`);
    console.log('Configuración:', JSON.stringify(config));
    
    const pool = new Pool(config);
    
    try {
      const result = await pool.query('SELECT NOW()');
      console.log('✅ CONEXIÓN EXITOSA');
      console.log('Resultado:', result.rows[0]);
    } catch (error) {
      console.log('❌ ERROR DE CONEXIÓN');
      console.log('Código de error:', error.code);
      console.log('Mensaje:', error.message);
    } finally {
      await pool.end();
    }
  }
  
  console.log('\n=========================================');
}

// Ejecutar
testNoPortConnection().catch(err => {
  console.error('Error en el script:', err);
}); 