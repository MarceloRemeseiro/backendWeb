#!/bin/bash

# Inicia MySQL
/usr/bin/mysqld_safe --datadir='/var/lib/mysql' &

# Espera a que MySQL se inicie
until mysqladmin ping &>/dev/null; do
  echo -n "."; sleep 1
done

# Configura la base de datos y crea las tablas
mysql -uroot -e "CREATE DATABASE IF NOT EXISTS ${MYSQL_DATABASE};"
mysql -uroot -e "CREATE USER IF NOT EXISTS '${MYSQL_USER}'@'%' IDENTIFIED BY '${MYSQL_PASSWORD}';"
mysql -uroot -e "GRANT ALL PRIVILEGES ON ${MYSQL_DATABASE}.* TO '${MYSQL_USER}'@'%';"
mysql -uroot -e "FLUSH PRIVILEGES;"

# Ejecuta las migraciones y crea tablas
node src/db/db.js

# Inicia la aplicación Node.js
node index.js
