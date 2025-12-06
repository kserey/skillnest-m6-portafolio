const express = require('express');
const { engine } = require('express-handlebars');
const path = require('path');

const rutasProductos = require('./routes/productos');

const app = express();
const PORT = 3000;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', rutasProductos);

// --- MANEJO DE ERRORES 
app.use((req, res, next) => {
    res.status(404).send(`
        <h1 style="color:red">Error 404</h1>
        <p>La página que buscas no existe en nuestra tienda.</p>
        <a href="/">Volver al inicio</a>
    `);
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal en el servidor! Por favor intente más tarde.');
});




app.listen(PORT, () => {
    console.log(`Servidor de Tienda Online corriendo en http://localhost:${PORT}`);
});