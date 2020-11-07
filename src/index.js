//import{ clearSlash } from './midleware/clearPath';

const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const app = express();
const os = require('os');
const clearSlashMidd = require('./midleware/clearPath');
const hostname = os.hostname();
const port = process.env.PORT || 8086;
const prefixApi = '/api';
const versionApi = '/v1';

const path = prefixApi + versionApi;

app.use(cors());
app.use(express.json());
//app.use(clearSlashMidd)
app.use(path, routes); // para o index reconhecer as rotas

app.listen(port, () => {
    console.log(`server started at ${hostname}:${port}`)
  });