const ModelClasse = require('../models/pet/classe');

async function getPetClasses(req, res){
    
    try {
        const classes =  await ModelClasse.ClassePet.find().populate('criadoPor');
    
        return res.status(200).send({ status : true, data : classes });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

async function insertPetClasse(req, res){
    
    try {
        const { nome } = req.body;

        if(!nome){
            return res.status(400).send({ status : false, erros : [`Atributos obrigatorios: nome.`] });
        }

        if(await ModelClasse.ClassePet.findOne({ nome })){
            return res.status(400).send({ status : false, erros : [`Classe ${nome} ja existe.`] });
        }

        const pet =  await ModelClasse.ClassePet.create({
            ...req.body,
            criadoPor : req.decodedJWT.id
            });
    
        return res.status(200).send({ status : true, data : pet });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

async function updatePetClasse(req, res){

    const { nome, descricao, wiki_link } = req.body;

    try {
        if(!nome || !descricao ){
            return res.status(400).send({ status : false, erros : ["Dados obrigatorios: nome, decricao."] });
        }

        const petClasseId = req.params.petclasseId || req.decodedJWT.id;

        const petRaca = await ModelClasse.ClassePet.findById(petClasseId);

        if(!petRaca){
            return res.status(400).send({ status : false, erros : ["Classe nao localizado."] });
        }

        const petClasseUpdated = await ModelClasse.ClassePet
        .findByIdAndUpdate(petClasseId, req.body, { new : true })
        .populate("criadoPor");

        return res.status(200).send({ status : true, data : petClasseUpdated  });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};


module.exports = { insertPetClasse, getPetClasses, updatePetClasse }