// REQUIRES
// Importación de librerias, propias o de terceros, que se utilizan en el proyecto
var express = require('express');
var mongoose = require('mongoose');


// Inicializar variables
// Aqui voy a usar la libreria e inicializar mi app
var app = express();


// Realizar la conexion a la bd
mongoose.connection.openUri('mongodb://localhost:27017/hospitalBD', (err, res) => {
// mongoose.connection.openUri('mongodb://localhost:27017/libreria', (err, res) => {
    if (err) throw err;

    console.log('BD mongo puerto 27017: \x1b[32m %s \x1b[0m', 'online');
});


// Rutas
app.get('/', (request, response, next) => {
    response.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente'
    });
})

// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000 online');
    // poner el mensaje en colores
    console.log('Express server puerto 3000: \x1b[32m %s \x1b[0m', 'online');
})
