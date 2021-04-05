const { Pool } = require('pg');
const redis = require('redis');
const dotenv = require('dotenv');

dotenv.config();

// ==> Conexão com a Base de Dados:

const {
  PG_USERNAME,
  PG_PASSWORD,
  PG_HOST,
  PG_PORT,
  PG_NAME
} = process.env;

const pool = new Pool({
  connectionString: `postgres://${PG_USERNAME}:${PG_PASSWORD}@${PG_HOST}:${PG_PORT}/${PG_NAME}`,
});

pool.on('connect', () => {
  console.log('Base de Dados do Postgresql conectado com sucesso!');
});

const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT
});

client.on("connect", () => {
    console.log('Base de dados do Redis conectado com sucesso!');
}).on("error", (error) => {
    console.log(error);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  client
};