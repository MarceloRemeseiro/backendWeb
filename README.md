# Backend EEVM

Backend para la aplicación web de EEVM.

## Configuración de la Base de Datos

La aplicación se conecta a una base de datos PostgreSQL remota. La configuración de conexión se encuentra en el archivo `.env`:

```
POSTGRES_HOST=eevm.marceloremeseiro.com
POSTGRES_USER=postgres
POSTGRES_PASSWORD=eevm1122
POSTGRES_DB=dbEevm
POSTGRES_PORT=55000
```

## Verificación de Conexión

Para verificar que la conexión a la base de datos funciona correctamente, puedes ejecutar:

```bash
node verify-connection.js
```

## Desarrollo Local

Para ejecutar la aplicación en modo desarrollo:

```bash
docker-compose -f docker-compose-dev.yml up
```

La aplicación estará disponible en http://localhost:4000.

## Producción

Para ejecutar la aplicación en modo producción:

```bash
docker-compose up -d
```

## Solución de Problemas de Conexión a la Base de Datos

Si tienes problemas para conectarte a la base de datos, puedes usar los scripts de prueba incluidos:

- `test-db-connection.js`: Prueba múltiples configuraciones
- `test-db-connection-simple.js`: Versión simplificada con timeout corto
- `test-db-no-port.js`: Prueba conexiones sin especificar puerto
- `test-db-subdomains.js`: Prueba diferentes subdominios
- `test-db-url.js`: Prueba la conexión con URL específica

Ejemplo:

```bash
node test-db-connection.js
```

## Configuración de pgBouncer (Opcional)

Si deseas utilizar pgBouncer como intermediario para las conexiones a PostgreSQL:

```bash
docker-compose -f docker-compose-pgbouncer.yml up -d
```

Luego, modifica el archivo `.env` para usar pgBouncer:

```
POSTGRES_HOST=localhost
POSTGRES_PORT=6432
```

## Estructura del Proyecto

- `src/`: Código fuente de la aplicación
  - `db/`: Configuración y funciones de la base de datos
  - `routes/`: Rutas de la API
  - `public/`: Archivos estáticos
- `docker-compose.yml`: Configuración para producción
- `docker-compose-dev.yml`: Configuración para desarrollo
- `docker-compose-pgbouncer.yml`: Configuración para pgBouncer
