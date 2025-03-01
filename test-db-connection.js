const { Pool } = require('pg');

// Configuraciones a probar
const configs = [
  {
    name: "Configuración 1: eevm.marceloremeseiro.com sin puerto (default 5432)",
    config: {
      host: 'eevm.marceloremeseiro.com',
      user: 'postgres',
      password: 'eevm1122',
      database: 'dbEevm'
    }
  },
  {
    name: "Configuración 2: eevm.marceloremeseiro.com puerto 55000",
    config: {
      host: 'eevm.marceloremeseiro.com',
      user: 'postgres',
      password: 'eevm1122',
      port: 55000,
      database: 'dbEevm'
    }
  },
  {
    name: "Configuración 3: eevm.marceloremeseiro.com puerto 32769",
    config: {
      host: 'eevm.marceloremeseiro.com',
      user: 'postgres',
      password: 'eevm1122',
      port: 32769,
      database: 'dbEevm'
    }
  },
  {
    name: "Configuración 4: 85.10.196.133 sin puerto (default 5432)",
    config: {
      host: '85.10.196.133',
      user: 'postgres',
      password: 'eevm1122',
      database: 'dbEevm'
    }
  },
  {
    name: "Configuración 5: 85.10.196.133 puerto 55000",
    config: {
      host: '85.10.196.133',
      user: 'postgres',
      password: 'eevm1122',
      port: 55000,
      database: 'dbEevm'
    }
  },
  {
    name: "Configuración 6: 85.10.196.133 puerto 32769",
    config: {
      host: '85.10.196.133',
      user: 'postgres',
      password: 'eevm1122',
      port: 32769,
      database: 'dbEevm'
    }
  },
  {
    name: "Configuración 7: URL directa sin puerto",
    config: {
      connectionString: 'postgres://postgres:eevm1122@eevm.marceloremeseiro.com/dbEevm'
    }
  },
  {
    name: "Configuración 8: URL directa con puerto 55000",
    config: {
      connectionString: 'postgres://postgres:eevm1122@eevm.marceloremeseiro.com:55000/dbEevm'
    }
  }
];

// Función para probar una configuración
async function testConfig(name, config) {
  console.log(`\nProbando ${name}...`);
  console.log('Configuración:', JSON.stringify(config));
  
  const pool = new Pool(config);
  
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ CONEXIÓN EXITOSA');
    console.log('Resultado:', result.rows[0]);
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

// Probar todas las configuraciones
async function testAllConfigs() {
  console.log('INICIANDO PRUEBAS DE CONEXIÓN A POSTGRESQL');
  console.log('=========================================');
  
  let successCount = 0;
  
  for (const { name, config } of configs) {
    const success = await testConfig(name, config);
    if (success) successCount++;
  }
  
  console.log('\n=========================================');
  console.log(`RESUMEN: ${successCount} de ${configs.length} configuraciones exitosas`);
}

// Ejecutar las pruebas
testAllConfigs().catch(err => {
  console.error('Error en el script de prueba:', err);
}); 