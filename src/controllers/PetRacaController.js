const ModelRacas = require('../models/pet/raca');

async function getPetRacas(req, res){
    
    try {
        req.body.administrator = undefined;

        const racas =  await ModelRacas.RacaPet.find().populate('criadoPor classe');
    
        return res.status(200).send({ status : true, data : racas });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

async function insertPetRacas(req, res){
    
    const { nome, classe } = req.body;
    
    try {
        if(!classe){
            return res.status(400).send({ status : false, erros : [`Atributos obrigatorios: classe.`] });
        }

        if( await ModelRacas.RacaPet.findOne({ nome })){

            return res.status(400).send({ status : false, erros : [`Raca ${nome} ja existe.`] });
        }

        const raca =  await ModelRacas.RacaPet.create({
            ...req.body,
            criadoPor : req.decodedJWT.id
            });
    
        return res.status(200).send({ status : true, data : raca });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

async function updatePetRaca(req, res){

    const { nome, descricao, classe, wiki_link } = req.body;

    try {
        if(!nome || !descricao || !classe ){
            return res.status(400).send({ status : false, erros : ["Dados obrigatorios: nome, decricao, classe"] });
        }

        const petRacaId = req.params.petracaId || req.decodedJWT.id;

        const petRaca = await ModelRacas.RacaPet.findById(petRacaId);

        if(!petRaca){
            return res.status(400).send({ status : false, erros : ["Raca nao localizado."] });
        }

        const petRacaUpdated = await ModelRacas.RacaPet
        .findByIdAndUpdate(petRacaId, req.body, { new : true })
        .populate("criadoPor");

        return res.status(200).send({ status : true, data : petRacaUpdated  });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

module.exports = { getPetRacas, insertPetRacas, updatePetRaca }