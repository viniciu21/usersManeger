const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
require('dotenv').config();

const connection = require('./database/index');

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(routes);

app.listen(3333);
