require('dotenv').config();

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

require('./config/db.config');
const session = require('./config/session.config');
const cors = require('./config/cors.config');

app.use(cors);

app.use(express.static('public'));

app.use(session.session);

const api = require('./config/routes.config');
app.use('/v1', api);

const PORT = 3000;

app.listen(PORT, () => console.log(`Servidor Express escuchando en el puerto ${PORT}`));
