# Usar la imagen oficial de Node.js como imagen base
FROM node:18-alpine

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto en el que se ejecuta la aplicación
EXPOSE 4000

# Comando para ejecutar la aplicación
CMD ["node", "index.js"]
