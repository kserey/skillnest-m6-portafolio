const express = require('express');
const router = express.Router();

const fs = require('fs').promises; 
const path = require('path');

const rutaArchivo = path.join(__dirname, '../data/productos.json');

// --- RUTAS ---


router.get('/', (req, res) => {
    res.render('home');
});


router.get('/agregar', (req, res) => {
    res.render('agregar');
});


router.get('/productos', async (req, res) => {
    try {

        const datos = await fs.readFile(rutaArchivo, 'utf-8');
        const productos = JSON.parse(datos);
        res.render('ver-productos', { productos });
    } catch (error) {
        console.error("Error al leer:", error);
 
        res.render('ver-productos', { productos: [] });
    }
});


router.post('/productos', async (req, res) => {
    const { nombre, descripcion, precio } = req.body;
    
    try {
        const datos = await fs.readFile(rutaArchivo, 'utf-8');
        const productos = JSON.parse(datos);

        const nuevoProducto = {
            id: Date.now(),
            nombre,
            descripcion,
            precio: parseFloat(precio)
        };

        productos.push(nuevoProducto);
        
        await fs.writeFile(rutaArchivo, JSON.stringify(productos, null, 2));

        res.redirect('/productos');

    } catch (error) {
        console.error("Error al guardar:", error);
        res.status(500).send("Error interno del servidor al guardar datos");
    }
});

module.exports = router;