const express = require('express'); // importar o express

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const LoginController = require('./controllers/LoginController');


const routes = express.Router();

// Sessão e login

routes.post('/cadastro', LoginController.create);
routes.post('/login', LoginController.autentica);
//routes.post('/recuperar-senha', OngController.recupera);

// Adotar

routes.get('/ongs', OngController.index); 

//routes.post('/ongs', OngController.create);

routes.get('/profile', ProfileController.index);

routes.post('/incidents', IncidentController.create);

routes.get('/incidents', IncidentController.index);

routes.delete('/incidents/:id', IncidentController.delete); 

module.exports = routes; //exportar alguma variavel de dentro de um arquivo