//Modules
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const path = require('path');

//Import Roles
const createRol = require('./libs/automaticSetup');

//Import Routes 
const home = require('./routes/home.routes');
const activities = require('./routes/act.routes');
const auth = require('./routes/auth.routes');
const user = require('./routes/user.routes');

//Inicializar 
const app = express();
createRol();

//View engine
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir:path.join(app.get('views'), 'partials') ,
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middleware 
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(cookieParser());

//Routes
//Hom
app.use('/', home);
//Actividades 
app.use('/activities', activities);
//Auth
app.use('/auth', auth);
//User
app.use('/user', user);

//Static 
app.use(express.static(path.join(__dirname, 'public')));
//Export
module.exports = app;