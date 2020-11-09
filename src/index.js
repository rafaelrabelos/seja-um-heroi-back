const dotenv = require('dotenv');
dotenv.config();

const api = require('./application');

api.executaAplicacao(process.env.API_PORT || 80);