#!/bin/bash

# Navegar al directorio del servidor, instalar dependencias y ejecutar nodemon
cd server
npm install
npm start &
SERVER_PID=$!

# Navegar al directorio de los sockets, instalar dependencias y ejecutar nodemon
cd ../socket
npm install
nodemon &
SOCKET_PID=$!

# Navegar al directorio del cliente, instalar dependencias y ejecutar npm run dev
cd ../client
npm install
npm run build

# Volver a la raíz y esperar a que terminen los procesos del servidor y sockets
cd ..
wait $SERVER_PID
wait $SOCKET_PID
