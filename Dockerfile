# Usar la imagen oficial de Node.js como imagen base
FROM node:16

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Copiar el script wait-for-it.sh
COPY wait-for-it.sh .

# Exponer el puerto en el que se ejecuta la aplicación
EXPOSE 4000

# Comando para ejecutar la aplicación, envuelto con wait-for-it.sh
CMD ["./wait-for-it.sh", "mysql_eevm:3306", "--", "node", "index.js"]
