const express = require('express');
const cors = require('cors');

// ==> Rotas da API:
const index = require('./routes/index');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(index);

module.exports = app;
