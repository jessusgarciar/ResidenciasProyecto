import express from 'express';
import session from 'express-session';
import {join, dirname} from 'path';
import { fileURLToPath } from 'url';
import { engine } from 'express-handlebars';
import morgan from 'morgan';
import loginroutes from './routes/login.routes.js';
import formroutes from './routes/form.routes.js';
import empresasroutes from './routes/empresas.routes.js';
import alumnosroutes from './routes/alumnos.routes.js';
import asesoresroutes from './routes/asesores.routes.js';

// INICIALIZACION
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

// CONFIGURACION
app.set('port', process.env.PORT || 3000);
app.set('views',join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: {
        equals: (a, b) => a === b
    }
}));
app.set('view engine', '.hbs');

// MIDDLEWARES
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(session({
    secret: 'password',
    resave: false,
    saveUninitialized: false
}));

app.use((req, res, next) => {
    res.locals.usuario = req.session.usuario || null;
    res.locals.rol = req.session.rol || null;
    next();
});

// RUTAS
app.get('/', (req, res) => {
    res.render('index')
});


app.use(loginroutes);

app.use(formroutes);

app.use(empresasroutes);

app.use(alumnosroutes);

app.use(asesoresroutes);



// ARCHIVOS PUBLICOS
app.use(express.static(join(__dirname, 'public')));
app.use(express.static('src/public'));

// SERVER

app.listen(app.get('port'), () =>
    console.log('Server on port', app.get('port')));