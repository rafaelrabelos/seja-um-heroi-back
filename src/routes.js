const express = require('express'); // importar o express
const LoginController = require('./controllers/LoginController');


const routes = express.Router();

routes.get('/', (req, res) => res.status(200).send({
    info:{
        apiName: "SejaUmHeroi",
        apiHost: os.hostname() || "Não indefificado",
        apiEndpoints:["/api"],
        apiVer: "v1",
        apiPort: process.env.API_PORT || "Não indefificado"
    },
    createdBy:[
        "Rafael Rabelo",
        "André Marinho Moreira",
        "Gustavo Caldeira de Oliveira",
        "Henrique Alves Kirshke",
        "Lucas Stehling Lara Carvalho"
    ]
}));

// Sessão e login
routes.post('/cadastro', LoginController.create);
routes.post('/login', LoginController.autentica);


module.exports = routes; 