# Usa la imagen oficial de Node.js
FROM node:22.14.0

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos del frontend
COPY . .

# Instala dependencias
RUN npm install

# Compila el frontend de Next.js
RUN npm run build

# Expone el puerto que Next usará
EXPOSE 3000

# Inicia la app
CMD ["npm", "start"]
