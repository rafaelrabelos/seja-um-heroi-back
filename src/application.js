const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const os = require('os');
const clearSlashMidd = require('./midleware/clearPath');

function executaAplicacao(port){

    const hostname = os.hostname();
    const prefixApi = '/api';
    const versionApi = '/v1';
    const path = prefixApi + versionApi;
  
    const app = express();
    app.use(cors());
    app.use(express.json());
    //app.use(clearSlashMidd) // Pendente de fix
    app.use(path, routes); 
  
    app.listen(port, () => {
      console.log(`server started at ${hostname}:${port}`)
    });
  }

  module.exports ={executaAplicacao}