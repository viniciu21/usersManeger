const express = require('express');
const routes = require('./routes');
const app = express();

const connection = require('./database/index');

app.use(express.json());
app.use(routes);

app.listen(3333);
