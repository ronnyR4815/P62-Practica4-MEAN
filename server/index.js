const express = require('express');
const app = express();
const morgan = require('morgan');
const { mongoose } = require('./database');
const cors= require('cors');

app.set('nombreApp', 'Aplicacion para manejo de gastos SRI');
app.set('puerto', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.json());
app.use(cors({origin: 'http://localhost:4200'}));

app.use('/api/gastos', require('./routes/server.routes'));

app.listen(app.get('puerto'), () => {
    console.log('Nombre de la app', app.get('nombreApp'));
    console.log('Puerto del servidor', app.get('puerto'));
})