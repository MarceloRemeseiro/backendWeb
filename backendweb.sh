#!/bin/bash

# Configuración
REPOSITORIO="backendWeb"
CONTAINER_NAME="backend_eevm"
DB_CONTAINER_NAME="mysql_eevm"
COMPOSE_FILE="docker-compose.yml"
SCRIPT_DIR=$(dirname "$0")  # Obtiene el directorio del script

# Función para verificar si un contenedor está corriendo
is_container_running() {
    docker inspect -f '{{.State.Running}}' $1 2>/dev/null
}

# Actualizar el código fuente
echo "Actualizando el código fuente desde Git..."
cd $SCRIPT_DIR
if [[ -z "$GITHUB_TOKEN" ]]; then
    echo "Error: El token de GitHub no está configurado."
    exit 1
fi

# Usa el usuario y token directamente en la URL del repositorio
git config --local credential.username marceloremeseiro
git pull https://marceloremeseiro:${GITHUB_TOKEN}@github.com/MarceloRemeseiro/${REPOSITORIO}.git

# Detener y eliminar los contenedores actuales, pero mantener los volúmenes
echo "Deteniendo y eliminando los contenedores actuales..."
docker-compose down

# Limpiar imágenes "dangling"
echo "Limpiando imágenes sin usar..."
docker image prune -f

# Reconstruir la imagen Docker y levantar los contenedores
echo "Construyendo la nueva imagen Docker y levantando los contenedores..."
docker-compose up --build -d

# Esperar a que los contenedores se inicien
sleep 10

# Verificar si los contenedores están corriendo
if [[ "$(is_container_running $CONTAINER_NAME)" == "true" ]]; then
    echo "El contenedor $CONTAINER_NAME
