# Usa una imagen base oficial de Node.js
FROM node:lts-alpine

# Instala MySQL y sus dependencias
RUN apk add --no-cache mysql mysql-client openrc bash

# Crea directorios necesarios y ajusta permisos
RUN mkdir /run/mysqld && chown -R mysql:mysql /run/mysqld && \
    mkdir /var/lib/mysql && chown -R mysql:mysql /var/lib/mysql

# Inicializa la base de datos
RUN mysql_install_db --user=mysql --datadir=/var/lib/mysql

# Establece el directorio de trabajo para Node.js
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Copia el script de inicialización de MySQL
COPY docker-entrypoint.sh /usr/local/bin/

# Expone los puertos necesarios
EXPOSE 3000 3306

# Comando para ejecutar MySQL y la aplicación Node.js
CMD ["bash", "/usr/local/bin/docker-entrypoint.sh"]
