const ModelClasse = require('../models/pet/classe');

async function getPetClasses(req, res){
    
    try {
        req.body.administrator = undefined;

        const classes =  await ModelClasse.ClassePet.find().populate('criadoPor')
    
        return res.status(200).send({
            status : true,
            data : classes
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

async function insertPetClasse(req, res){
    
    try {

        const { nome } = req.body;

        if(!nome){
            return res.status(400).send({ status : false, erros : [`Atributos obrigatorios: nome.`] })
        }

        if(await ModelClasse.ClassePet.findOne({ nome })){

            return res.status(400).send({ status : false, erros : [`Classe ${nome} ja existe.`] })
        }

        const pet =  await ModelClasse.ClassePet.create({
            ...req.body,
            criadoPor : req.decodedJWT.id
            });
    
        return res.status(200).send({
            status : true,
            classe : await ModelClasse.ClassePet.findOne({nome})
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

module.exports = { insertPetClasse, getPetClasses }