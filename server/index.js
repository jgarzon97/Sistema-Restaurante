const express = require('express');
const cors = require('cors');
const app = express();

// Habilita CORS
app.use(cors());

// Importa tus rutas
const rutas = require('./src/routers/index');

// Usa tus rutas
app.use('/', rutas);
app.use('/usuario', rutas);
app.use('/mesa', rutas);
app.use('/pedido', rutas);
app.use('/producto', rutas);
app.use('/categoria', rutas);

const startServer = (port) => {
    app.listen(port, () => {
        console.log(`El servidor está funcionando en el puerto: ${port}.`);
    });
};

const PORT = process.env.PORT || 8080;
startServer(PORT);
