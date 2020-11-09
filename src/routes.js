const express = require('express'); // importar o express
const LoginController = require('./controllers/LoginController');


const routes = express.Router();

routes.get('/', (req, res) => res.status(400).send({api: "SejaUmHeroi"}));

// Sessão e login
routes.post('/cadastro', LoginController.create);
routes.post('/login', LoginController.autentica);


module.exports = routes; 