const jwt = require('jsonwebtoken');
const PetClasse = require('../models/pet/classe');
const secure = require('../libs/secure');


async function getPetClasses(request, response){
    
    try {
        request.body.administrator = undefined;

        const classes =  await PetClasse.find()
    
        return response.status(200).send({
            status : true,
            data : classes
        });
        
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
};

async function insertPetClasse(request, response){

    secure.checkUserRights(response, request.decodedJWT.id, { admin : true });
    
    const { nome } = request.body;
    
    
    try {

        if( await PetClasse.findOne({ nome })){

            return response.status(400).send({
                    status : false,
                    erros : [`Classe ${nome} ja existe.`]
                })
        }

        const pet =  await PetClasse.create({
            ...request.body,
                criadoPor : request._id
            });
    
        return response.status(200).send({
            status : true,
            classe : await PetClasse.find({nome: nome})
        });
        
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
};

module.exports ={insertPetClasse, getPetClasses}