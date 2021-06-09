const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const history = require('connect-history-api-fallback');

app.use(cors());
app.use(morgan('tiny'));
app.use(history());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/clientes', require('./routes/cliente'));
app.use('/mesas', require('./routes/mesa'));
app.use('/productos', require('./routes/producto'));
app.use('/mesa', require('./routes/orden'));

app.listen(3000, function(){
    console.log('API está corriendo');
});



//Nuestra primera petición
//
//app.get('/hola', function(req, res){
//    res.send('¡Hola grupo de SAD!');
//});
//
//app.get('/', function (req, res){
//    res.send('¡Hola Mundo!');
//    });


// Segunda petición


//app.get('/hola2', function(req, res){
//    res.send('¡Hola grupo!');
//});

//Puerto