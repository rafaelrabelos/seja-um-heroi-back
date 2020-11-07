const dotenv = require('dotenv');
dotenv.config();

const api = require('./application');

api.executaAplicacao(process.env.PORT || 8086);