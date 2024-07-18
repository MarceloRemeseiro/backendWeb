# Etapa de construcción
FROM node:lts-alpine AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos del proyecto
COPY . .

# Construye la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:alpine AS runtime

# Copia el archivo de configuración de Nginx
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

# Copia los archivos construidos al directorio de Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto en el que Nginx estará escuchando
EXPOSE 80

# Comando para ejecutar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
