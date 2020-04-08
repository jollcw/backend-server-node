// REQUIRES
// Configuraciones
const mongoUrl = require('./config/dbMongoConfig');
const serverConfig = require('./config/serverConfig');

// Importación de librerias, propias o de terceros, que se utilizan en el proyecto
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')


// Inicializar variables
// Aqui voy a usar la libreria e inicializar mi app
const app = express();

// body-parser Configuracion
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


// importar rutas
const appRoutes = require('./routes/appRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const loginRoutes = require('./routes/loginRoutes');
const hopitalRoutes = require('./routes/hospitalRoutes');
const medicoRoutes = require('./routes/medicoRoutes');

// Realizar la conexion a la bd
// mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {
// // mongoose.connection.openUri('mongodb://localhost:27017/libreria', (err, res) => {
//     if (err) throw err;

//     console.log('BD mongo puerto 27017: \x1b[32m %s \x1b[0m', 'online');
// });

mongoose.connect(
  mongoUrl,
  { useNewUrlParser: true, useCreateIndex: true }
)
.then(() => console.log("Conexión establecida con: ", mongoUrl))
.catch((err) => console.log(`Error al conectar a la bd: ${err}`));


// Rutas: cuando viene una petición que coincide con la ruta '?', utilizar el archivo de Routes indicado
app.use('/', appRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/hospital', hopitalRoutes);
app.use('/medico', medicoRoutes);

// Escuchar peticiones
// app.listen(3000, () => {
//     console.log('Express server puerto 3000 online');
//     // poner el mensaje en colores
//     console.log('Express server puerto 3000: \x1b[32m %s \x1b[0m', 'online');
// })

app.listen(serverConfig.port, serverConfig.host, () => {
  console.log(`Conexión establecida con server: ${serverConfig.host}, puerto: ${serverConfig.port}`);
});
