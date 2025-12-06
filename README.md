# skillnest-m6-portafolio
# Portafolio Módulo 6: Backend Tienda Online con Node.js y Express

Este proyecto consiste en el desarrollo del backend para una aplicación web de gestión de productos (Tienda en Línea). La aplicación permite visualizar un catálogo de productos y agregar nuevos ítems mediante formularios. Se implementa persistencia de datos en archivos locales, manejo de rutas, motor de plantillas y gestión de errores.

---

## 📋 Tabla de Contenidos
1. [Requisitos Previos](#requisitos-previos)
2. [Instalación y Configuración](#instalación-y-configuración)
3. [Fundamentos Teóricos y Herramientas](#fundamentos-teóricos-y-herramientas)
4. [Dependencias Utilizadas](#dependencias-utilizadas)
5. [Persistencia de Datos](#persistencia-de-datos)
6. [Manejo de Errores](#manejo-de-errores)
7. [Instrucciones de Ejecución](#instrucciones-de-ejecución)
8. [Estructura del Proyecto](#estructura-del-proyecto)

---

## 🛠 Requisitos Previos
* Tener instalado **Node.js** (versión LTS recomendada).
* Tener instalado **NPM** (se instala automáticamente con Node.js).
* Un editor de código (como VS Code).

---

## ⚙️ Instalación y Configuración

Para configurar este entorno de desarrollo desde cero, se siguieron estos pasos:

1.  **Inicialización del Proyecto:**
    Se creó la carpeta del proyecto y se ejecutó el comando para generar el archivo `package.json`, que administra la configuración y dependencias:
    ```bash
    npm init -y
    ```

2.  **Instalación de Dependencias:**
    Se instalaron los paquetes necesarios para el servidor y las vistas:
    ```bash
    npm install express express-handlebars
    ```

3.  **Configuración de Desarrollo:**
    Se instaló `nodemon` como dependencia de desarrollo para reiniciar el servidor automáticamente ante cambios:
    ```bash
    npm install -D nodemon
    ```

---

## 📚 Fundamentos Teóricos y Herramientas

### ¿Qué es NPM?
**NPM (Node Package Manager)** es el gestor de paquetes predeterminado de Node.js. Funciona como un repositorio gigante de software libre que permite a los desarrolladores compartir y tomar prestado código (paquetes) para resolver problemas comunes sin tener que escribir todo desde cero. En este proyecto, NPM se utilizó para:
* Inicializar el proyecto (`package.json`).
* Instalar librerías de terceros (Express, Handlebars).
* Ejecutar scripts de inicio (`npm run dev`).

### ¿Cómo facilita Express la creación de servidores?
**Express** es un framework web minimalista para Node.js. Sin Express, crear un servidor requeriría usar el módulo nativo `http` de Node, lo cual implica escribir mucho código repetitivo para manejar cosas básicas como detectar URLs, gestionar tipos de archivos (MIME types) o leer datos enviados por el usuario.
Express simplifica esto ofreciendo:
* Un sistema de **enrutamiento** sencillo (`app.get`, `app.post`).
* Soporte para **Middlewares** (funciones intermedias).
* Integración fácil con motores de plantillas.

---

## 📦 Dependencias Utilizadas

1.  **express:** El núcleo del servidor web.
2.  **express-handlebars:** Motor de plantillas que permite renderizar HTML dinámico (vistas) utilizando datos del servidor.
3.  **nodemon (DevDependency):** Herramienta que monitorea los archivos del proyecto y reinicia el servidor automáticamente cuando detecta cambios, agilizando el desarrollo.
4.  **Body-Parser (Integrado):** Anteriormente una dependencia externa, ahora utilizamos `express.urlencoded({ extended: true })` y `express.json()` incluidos en Express para leer los datos enviados a través de los formularios HTML.

---

## 💾 Persistencia de Datos

Para almacenar la información de los productos se utilizó el módulo nativo **File System (fs)** de Node.js, específicamente su versión basada en promesas (`fs.promises`).

* **Archivo:** Los datos se guardan en `data/productos.json`.
* **Lectura:** Se lee el archivo de texto y se parsea (JSON.parse) para mostrarlo en las vistas.
* **Escritura:** Al agregar un producto, se convierte el array de objetos a texto (JSON.stringify) y se sobrescribe el archivo de manera asíncrona para no bloquear el hilo principal de ejecución del servidor.

---

## ⚠️ Manejo de Errores

El servidor cuenta con middlewares específicos para gestionar situaciones imprevistas:

1.  **Error 404 (Not Found):**
    Si el usuario intenta acceder a una ruta que no está definida (ej: `/ruta-falsa`), el servidor responde con una vista o mensaje amigable indicando que la página no existe, en lugar de dejar al navegador esperando.

2.  **Error 500 (Internal Server Error):**
    Se implementó un middleware con 4 argumentos (`err, req, res, next`) para capturar cualquier fallo técnico en el servidor (como problemas de lectura de archivos) y evitar que la aplicación se cierre inesperadamente.

---

## 🚀 Instrucciones de Ejecución

1.  **Instalar dependencias:**
    Si descargas este código por primera vez, ejecuta:
    ```bash
    npm install
    ```

2.  **Modo Desarrollo (con reinicio automático):**
    ```bash
    npm run dev
    ```

3.  **Modo Producción:**
    ```bash
    npm start
    ```

4.  Abrir el navegador en: `http://localhost:3000`

---

## 📂 Estructura del Proyecto

* **/data**: Contiene `productos.json` (base de datos local).
* **/public**: Archivos estáticos (CSS, imágenes).
* **/routes**: Lógica de enrutamiento separada del archivo principal (`productos.js`).
* **/views**: Plantillas HTML (Handlebars).
    * **/layouts**: Contiene la plantilla maestra `main.handlebars`.
* **app.js**: Punto de entrada de la aplicación y configuración del servidor.