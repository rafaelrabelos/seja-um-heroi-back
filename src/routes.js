const express = require('express'); // importar o express
const LoginController = require('./controllers/LoginController');


const routes = express.Router();

// Sessão e login
routes.post('/cadastro', LoginController.create);
routes.post('/login', LoginController.autentica);


module.exports = routes; 