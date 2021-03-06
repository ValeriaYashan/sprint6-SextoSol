const express = require('express')
const path = require('path');
const app = express();
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');

//Solicitando las rutas
const mainRoutes = require('./src/routes/mainRoutes');
const userRoutes = require('./src/routes/userRoutes');
const productRoutes=require('./src/routes/productRoutes');
/*const productRoutes = require('./src/routes/productRoutes');*/

//Trayendo middlewares
const rememberUser = require('./src/middlewares/rememberMiddleware');

//Configuracion del motor de vistas
app.set('views', path.join(__dirname, '/src/views'));
app.set('view engine', 'ejs');

// Configuracion de archivos estáticos
app.use(express.static(path.resolve(__dirname , './public')))

//Configuracion de métodos para formulario
app.use(methodOverride('_method'));

//Recibir datos en formato JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Configuración de session
app.use(session({
    secret: 'cookie_secret',
    resave: true,
    saveUninitialized: true
}));

//Configuración de cookies
app.use(cookieParser());

//Verificando si hay cookie con usuario
app.use(rememberUser);



//Rutas principales
app.use('/', mainRoutes);

//Rutas de usuarios
app.use('/user', userRoutes);

//Rutas de productos
app.use('/products', productRoutes);

/* error 404 */
app.use((req, res, next) => {
    res.status(404).render("pagina-no-encontrada")
});

//Levantando el servidor
app.listen(3000, () => {
    console.log("Servidor corriendo en puerto 3000")
})