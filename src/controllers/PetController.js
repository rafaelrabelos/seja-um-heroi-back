const ModelPet = require('../models/pet/pet');
const { getUser } = require('./UserController');

async function getPets(req, res){

    try {
        const pets = await ModelPet.Pet.find()
        .populate("criadoPor");

        return res.status(200).send({ status : true, data : pets });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

async function getPet(req, res){

    try {
        if(!req.params.petId){
            return res.status(400).send({ status : true, erros : ["Id do pet nao informada."] });
        }

        const pet = await ModelPet.Pet.findById(req.params.petId)
        .populate("criadoPor");

        return res.status(200).send({ status : true, data : pet });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

async function getPetOwner(req, res){

    try {
        if(!req.params.petId){
            return res.status(400).send({ status : false, erros : ["Id do pet nao informada."] });
        }

        const pet = await ModelPet.Pet.findById(req.params.petId).populate("heroiDono");

        if(!pet){
            return res.status(400).send({ status : false, erros : ["Id do pet invalida."] });
        }

        req.params.usuarioId  = pet._id;

        return getUser(req, res);

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

module.exports = { getPet, getPets, getPetOwner }