#!/bin/bash

# Configuración
REPOSITORIO="backendWeb"
CONTAINER_NAME="combined-app"
IMAGE_NAME="my-combined-app"
PORT_APP=3000
MYSQL_ROOT_PASSWORD="1234"
MYSQL_DATABASE="dbEevm"
MYSQL_USER="root"
MYSQL_PASSWORD="1234"
SCRIPT_DIR=$(dirname "$0")  # Obtiene el directorio del script

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

# Verificar si el contenedor está corriendo y detenerlo si es necesario
echo "Deteniendo y eliminando el contenedor actual..."
docker stop $CONTAINER_NAME || true
docker rm $CONTAINER_NAME || true

# Verificar si la imagen existe y eliminarla si es necesario
echo "Eliminando la imagen Docker..."
docker rmi $IMAGE_NAME || true

# Reconstruir la imagen Docker
echo "Construyendo la nueva imagen Docker..."
docker build -t $IMAGE_NAME .

# Iniciar el nuevo contenedor
echo "Iniciando el nuevo contenedor..."
docker run -d --name $CONTAINER_NAME --env-file .env -p $PORT_APP:3000 -p 3306:3306 $IMAGE_NAME

# Limpiar imágenes "dangling"
echo "Limpiando imágenes sin usar..."
docker image prune -f

echo "Actualización completada y contenedor reiniciado."
