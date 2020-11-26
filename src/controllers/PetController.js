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

module.exports ={ getPetClasses}