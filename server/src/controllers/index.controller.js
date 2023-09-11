const express = require('express');
const router = express.Router();
const pgp = require('pg-promise')();

const config = {
    user: 'postgres',
    host: 'localhost',
    database: 'baserestaurante',
    password: 'admin',
    port: 5432,
};

const db = pgp(config);

// Ruta principal
router.get('/', (req, res) => {
    const mensaje = 'Bienvenido a mi aplicación.';
    res.json({ mensaje });
});

// Ruta Usuario
router.get('/usuario', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM Usuario');
        res.json(result);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
    }
});

// Ruta Mesa
router.get('/mesa', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM Mesa');
        res.json(result);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
    }
});

// Ruta Pedido
router.get('/pedido', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM Pedido');
        res.json(result);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
    }
});

// Ruta Producto
router.get('/producto', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM Producto');
        res.json(result);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
    }
});

// Ruta Categoria
router.get('/categoria', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM Categoria');
        res.json(result);
    } catch (error) {
        console.error('Error en la consulta:', error);
        res.status(500).json({ error: 'Error en la consulta' });
    }
});

module.exports = router;
