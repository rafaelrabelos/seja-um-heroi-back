const express = require("express"); // importar o express
const jwt = require("./midleware/jwt");
const secure = require("./libs/secure");
const LoginController = require("./controllers/LoginController");
const UserController = require("./controllers/UserController");
const PetController = require("./controllers/PetController");
const PetClassesController = require("./controllers/PetClasseController");
const PetRacasController = require("./controllers/PetRacaController");
const os = require("os");
const VacinaController = require("./controllers/VacinaController");

const routes = express.Router();

routes.get("/", (req, res) =>
  res.status(200).send({
    info: {
      apiName: "SejaUmHeroi",
      apiHost: os.hostname() || "Não indefificado",
      apiEndpoints: ["/api"],
      apiVer: "v1",
      apiPort: process.env.API_PORT || "Não indefificado",
    },
    createdBy: [
      "Rafael Rabelo",
      "André Marinho Moreira",
      "Gustavo Caldeira de Oliveira",
      "Henrique Alves Kirshke",
      "Lucas Stehling Lara Carvalho",
    ],
  })
);

// Sessão e login
routes.post("/login", LoginController.autentica);

// Users
routes.get("/user", (req, res) =>
  secure.secureRoute(req, res, null, UserController.getSelfUser)
);
routes.get("/user/todos", (req, res) =>
  secure.secureRoute(req, res, { admin: true }, UserController.getUsers)
);
routes.get("/user/:usuarioId", (req, res) =>
  secure.secureRoute(req, res, null, UserController.getUser)
);
routes.get("/user/:usuarioId/pets", (req, res) =>
  secure.secureRoute(req, res, null, UserController.getUserPets)
);
routes.post("/user", (req, res) =>
  secure.secureRoute(req, res, { system: true }, UserController.createUser)
);
routes.put("/user", (req, res) =>
  secure.secureRoute(req, res, null, UserController.updateUser)
);
routes.put("/user/:usuarioId", (req, res) =>
  secure.secureRoute(req, res, { owner: true }, UserController.updateUser)
);
routes.delete("/user/:usuarioId", (req, res) =>
  secure.secureRoute(req, res, { system: true }, UserController.deleteUser)
);

// Pets
routes.get("/pet", (req, res) =>
  secure.secureRoute(req, res, null, PetController.getPets)
);
routes.get("/pet/:petId", (req, res) =>
  secure.secureRoute(req, res, null, PetController.getPet)
);
routes.get("/pet/:petId/owner", (req, res) =>
  secure.secureRoute(req, res, null, PetController.getPetOwner)
);

// Pet Classes
routes.get("/pet-classe", (req, res) =>
  secure.secureRoute(req, res, null, PetClassesController.getPetClasses)
);
routes.post("/pet-classe", (req, res) =>
  secure.secureRoute(
    req,
    res,
    { admin: true },
    PetClassesController.insertPetClasse
  )
);
routes.put("/pet-classe/:petclasseId", (req, res) =>
  secure.secureRoute(
    req,
    res,
    { admin: true },
    PetClassesController.updatePetClasse
  )
);

// Pet Racas
routes.get("/pet-raca", (req, res) =>
  secure.secureRoute(req, res, null, PetRacasController.getPetRacas)
);
routes.post("/pet-raca", (req, res) =>
  secure.secureRoute(
    req,
    res,
    { admin: true },
    PetRacasController.insertPetRacas
  )
);
routes.put("/pet-raca/:petracaId", (req, res) =>
  secure.secureRoute(
    req,
    res,
    { admin: true },
    PetRacasController.updatePetRaca
  )
);

// Vacinas
routes.get("/vacina", (req, res) =>
  secure.secureRoute(req, res, { admin: true }, VacinaController.getVacinas)
);
routes.get("/vacina/:vacinaId", (req, res) =>
  secure.secureRoute(req, res, null, VacinaController.getVacina)
);
routes.get("/vacina/pet/:petId", (req, res) =>
  secure.secureRoute(req, res, null, VacinaController.getPetVacinas)
);
routes.get("/vacina/classe/:classeId", (req, res) =>
  secure.secureRoute(req, res, null, VacinaController.getClasseVacinas)
);
routes.post("/vacina", (req, res) =>
  secure.secureRoute(req, res, { admin: true }, VacinaController.insertVacina)
);
routes.put("/vacina/:vacinaId", (req, res) =>
  secure.secureRoute(req, res, { admin: true }, VacinaController.updateVacina)
);

module.exports = routes;
