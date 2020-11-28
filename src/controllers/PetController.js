const jwt = require('jsonwebtoken');
const Model = require('../models/pet/classe');
const secure = require('../libs/secure');


async function getPetClasses(req, res){
    
    try {
        req.body.administrator = undefined;

        const classes =  await Model.ClassePet.find().populate('criadoPor')
    
        return res.status(200).send({
            status : true,
            data : classes
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

async function insertPetClasse(request, response){

    secure.checkUserRights(response, request.decodedJWT.id, { admin : true });
    
    const { nome } = request.body;
    
    try {

        if( await Model.ClassePet.findOne({ nome })){

            return response.status(400).send({
                    status : false,
                    erros : [`Classe ${nome} ja existe.`]
                })
        }

        const pet =  await Model.ClassePet.create({
            ...request.body,
            criadoPor : request.decodedJWT.id
            });
    
        return response.status(200).send({
            status : true,
            classe : await Model.ClassePet.findOne({nome})
        });
        
    } catch (error) {
        console.log(error);
        return response.status(500).send(error);
    }
};

module.exports ={insertPetClasse, getPetClasses}