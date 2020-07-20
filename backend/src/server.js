const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

require('./bootstrap');

const connection = require('./database/index');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(routes);

module.exports = app;
