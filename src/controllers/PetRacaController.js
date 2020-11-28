const ModelRacas = require('../models/pet/raca');

async function getPetRacas(req, res){
    
    try {
        req.body.administrator = undefined;

        const racas =  await ModelRacas.RacaPet.find().populate('criadoPor classe');
    
        return res.status(200).send({
            status : true,
            data : racas
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

async function insertPetRacas(req, res){
    
    const { nome, classe } = req.body;
    
    try {

        if(!classe){
            return res.status(400).send({ status : false, erros : [`Atributos obrigatorios: classe.`] })
        }

        if( await ModelRacas.RacaPet.findOne({ nome })){

            return res.status(400).send({ status : false, erros : [`Raca ${nome} ja existe.`] })
        }

        const raca =  await ModelRacas.RacaPet.create({
            ...req.body,
            criadoPor : req.decodedJWT.id
            });
    
        return res.status(200).send({
            status : true,
            classe : await ModelRacas.RacaPet.findOne({nome})
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

module.exports = { getPetRacas, insertPetRacas }