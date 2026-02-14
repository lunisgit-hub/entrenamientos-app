# Instrucciones de instalación, configuración y despliegue

## Requisitos previos
- Tener instalado Node.js (versión 14 o superior)
- Tener una cuenta en Firebase (gratuita)
- Tener Git instalado en tu computadora

## Instalación del proyecto
1. Clonar el repositorio en tu computadora:
git clone https://github.com/tu-usuario/entrenamientos-app.git

2. Entrar a la carpeta del proyecto:
cd entrenamientos-app

3. Instalar todas las dependencias necesarias:
npm install

## Configuración de Firebase
1. Ve a https://console.firebase.google.com/ e inicia sesión con tu cuenta de Google
2. Haz clic en "Crear un proyecto" y ponle un nombre (por ejemplo "entrenamientos-app")
3. Una vez creado el proyecto, haz clic en el icono de la web que dice </> para agregar una aplicación web
4. Ponle un nombre a tu aplicación (por ejemplo "entrenamientos-web") y haz clic en "Registrar app"
5. Te aparecerá un código con la configuración de Firebase que contiene apiKey, authDomain, projectId, etc. Copia ese código
6. En el proyecto, abre la carpeta src/firebase y edita el archivo config.ts
7. Pega la configuración que copiaste en ese archivo y guarda los cambios
8. En el menú izquierdo de Firebase, haz clic en "Firestore Database"
9. Haz clic en "Crear base de datos"
10. Selecciona "Comenzar en modo de prueba" y elige la ubicación más cercana a ti
11. Haz clic en "Habilitar" y espera unos segundos a que se cree la base de datos

## Ejecutar la aplicación en modo desarrollo
Para probar la aplicación en tu computadora antes de desplegarla:
npm run dev
Luego abre tu navegador y ve a http://localhost:5173

## Desplegar la aplicación en Firebase Hosting
1. Instalar Firebase Tools de manera global:
npm install -g firebase-tools

2. Iniciar sesión en Firebase desde la terminal:
firebase login
Esto abrirá una ventana en tu navegador para que inicies sesión con tu cuenta de Google

3. Inicializar Firebase Hosting en tu proyecto:
firebase init
Durante la configuración responde así:
- Selecciona solo "Hosting" con la barra espaciadora y presiona Enter
- Selecciona el proyecto que creaste antes (entrenamientos-app)
- Escribe "dist" como directorio público
- Escribe "Yes" cuando pregunte si es una aplicación de una sola página
- Escribe "No" cuando pregunte por builds automáticos con GitHub
- Escribe "No" cuando pregunte si sobrescribir el archivo index.html

4. Construir la aplicación para producción:
npm run build

5. Desplegar la aplicación:
firebase deploy

6. Al finalizar, verás un mensaje con la URL de tu aplicación:
Hosting URL: https://tu-proyecto.web.app

## Actualizar la aplicación cuando hagas cambios
Cada vez que modifiques el código y quieras que los cambios se vean en internet, solo tienes que ejecutar estos dos comandos:
npm run build
firebase deploy --only hosting

## Estructura del proyecto
entrenamientos-app/
├── src/
│   ├── assets/
│   │   └── style.css
│   ├── components/
│   │   ├── TrainingForm.vue
│   │   └── TrainingList.vue
│   ├── firebase/
│   │   └── config.ts
│   ├── types/
│   │   └── Training.ts
│   ├── App.vue
│   └── main.ts
├── index.html
├── package.json
└── README.md

## Notas importantes
- La base de datos está en modo prueba por 30 días, después tendrás que actualizar las reglas de seguridad
- Si cambias de computadora, solo necesitas clonar el repositorio y ejecutar npm install nuevamente
- Para cualquier error, revisa la consola del navegador con F12 para ver los mensajes de error

## Enlaces de la aplicación
- Repositorio: https://github.com/tu-usuario/entrenamientos-app
- App desplegada: https://entrenamiento-app-bd7ea.web.app