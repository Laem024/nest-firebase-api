# 1. Usar una imagen base de Node.js
FROM node:20.17.0-alpine

# 2. Establecer el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# 3. Copiar el archivo package.json y el archivo de dependencias
COPY package*.json ./

# 4. Instalar las dependencias de producción
RUN npm install --silent

# 5. Copiar todo el código del proyecto al contenedor
COPY . .

# 6. Compilar el proyecto
RUN npm run build

# 7. Exponer el puerto en el que correrá la aplicación
EXPOSE 3000

# 8. Comando por defecto para ejecutar la aplicación en producción
CMD ["npm", "run", "start:prod"]
