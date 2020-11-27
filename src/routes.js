const express = require('express'); // importar o express
const jwt = require('./midleware/jwt');
const secure = require('./libs/secure');
const LoginController = require('./controllers/LoginController');
const UserController = require('./controllers/UserController');
const PetController = require('./controllers/PetController');
const os = require('os');

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
routes.post('/login', LoginController.autentica);

// Users
routes.post('/user/create', UserController.createUser);
routes.get('/user/obtem', (req, res) => secure.secureRoute(req, res, {admin: true}, UserController.getUsers));

// Pets
routes.get('/pet/classe',  (req, res) => secure.secureRoute(req, res, null, PetController.getPetClasses));
routes.post('/pet/classe', (req, res) => secure.secureRoute(req, res, {admin: true}, PetController.insertPetClasse));

module.exports = routes; 