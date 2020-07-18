const express = require('express');
const routes = express.Router();

routes.get('/', (req, resp) => {
  resp.send('lala');
});

module.exports = routes;
