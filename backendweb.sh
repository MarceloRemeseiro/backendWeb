#!/bin/bash

# Configuración
REPOSITORIO="backendWeb"
CONTAINER_NAME_APP="express-app"
CONTAINER_NAME_DB="mysql-database"
CONTAINER_NAME_NGINX="nginx-proxy"
IMAGE_NAME_APP="my-express-app"
IMAGE_NAME_NGINX="my-nginx-proxy"
PORT_APP=3000
PORT_NGINX=80
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

# Verificar si los contenedores están corriendo y detenerlos si es necesario
echo "Deteniendo y eliminando los contenedores actuales..."
docker stop $CONTAINER_NAME_APP $CONTAINER_NAME_DB $CONTAINER_NAME_NGINX || true
docker rm $CONTAINER_NAME_APP $CONTAINER_NAME_DB $CONTAINER_NAME_NGINX || true

# Verificar si las imágenes existen y eliminarlas si es necesario
echo "Eliminando las imágenes Docker..."
docker rmi $IMAGE_NAME_APP $IMAGE_NAME_NGINX || true

# Reconstruir la imagen Docker de la aplicación
echo "Construyendo la nueva imagen Docker para la aplicación..."
docker build -t $IMAGE_NAME_APP .

# Reconstruir la imagen Docker de Nginx
echo "Construyendo la nueva imagen Docker para Nginx..."
docker build -t $IMAGE_NAME_NGINX -f nginx/Dockerfile ./nginx

# Iniciar el contenedor de MySQL
echo "Iniciando el contenedor MySQL..."
docker run -d --name $CONTAINER_NAME_DB --restart=always -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD -e MYSQL_DATABASE=$MYSQL_DATABASE -e MYSQL_USER=$MYSQL_USER -e MYSQL_PASSWORD=$MYSQL_PASSWORD -p 3306:3306 mysql:5.7

# Iniciar el contenedor de la aplicación Node.js
echo "Iniciando el contenedor de la aplicación Node.js..."
docker run -d --name $CONTAINER_NAME_APP --link $CONTAINER_NAME_DB:database -e NODE_ENV=production -e MYSQL_HOST=database -e MYSQL_USER=$MYSQL_USER -e MYSQL_DATABASE=$MYSQL_DATABASE -e MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD -e MYSQL_PORT=3306 -p $PORT_APP:$PORT_APP $IMAGE_NAME_APP

# Iniciar el contenedor Nginx
echo "Iniciando el contenedor Nginx..."
docker run -d --name $CONTAINER_NAME_NGINX --link $CONTAINER_NAME_APP:express-app -v $(pwd)/nginx/nginx.conf:/etc/nginx/nginx.conf -p $PORT_NGINX:80 $IMAGE_NAME_NGINX

# Limpiar imágenes "dangling"
echo "Limpiando imágenes sin usar..."
docker image prune -f

echo "Actualización completada y contenedores reiniciados."
