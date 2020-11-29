const ModelVacina = require('../models/pet/vacina');
const ModelPet = require('../models/pet/pet');

async function getVacinas(req, res) {

    try {
        const vacinas = await ModelVacina.VacinaPet.find().populate('classe_pets');

        return res.status(200).send({ status: true, data: vacinas });

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

async function getVacina(req, res) {

    try {
        if (!req.params.vacinaId) {
            return res.status(400).send({ status: true, erros: ["Id da vacina nao informado."] });
        }

        const vacinas = await ModelVacina.VacinaPet.findById(req.params.vacinaId).populate('classe_pets');

        return res.status(200).send({ status: true, data: vacinas });

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

async function getPetVacinas(req, res) {

    try {
        if (!req.params.petId) {
            return res.status(400).send({ status: true, erros: ["Id do pet nao informado."] });
        }

        const pet = await ModelPet.Pet.findById(req.params.petId)
            .populate("vacinas");

        if (!pet) {
            return res.status(404).send({ status: true, erros: ["Pet solicitado náo encontrado"] });
        }

        const vacinas = pet.vacinas || [];

        return res.status(200).send({ status: true, data: vacinas });

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

async function getClasseVacinas(req, res) {

    try {
        if (!req.params.classeId) {
            return res.status(400).send({ status: true, erros: ["Id da classe nao informado."] });
        }

        const vacinas = await ModelVacina.VacinaPet.find({ classe_pets: req.params.classeId });

        return res.status(200).send({ status: true, data: vacinas });

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

async function insertVacina(req, res) {

    try {
        const { nome, dose, classe_pets } = req.body;

        if (!nome || !dose || !classe_pets) {
            return res.status(400).send({ status: false, erros: [`Atributos obrigatorios: nome, dose, classe_pets.`] });
        }

        if (await ModelVacina.VacinaPet.findOne({ nome })) {
            return res.status(400).send({ status: false, erros: [`Vacina ${nome} ja existe.`] });
        }

        const vacina = await ModelVacina.VacinaPet.create({
            ...req.body,
            criadoPor: req.decodedJWT.id
        });

        return res.status(200).send({ status: true, data: vacina });

    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};

async function updateVacina(req, res) {

    try {
        const { nome, dose, classe_pets } = req.body;
        const vacinaId = req.params.vacinaId;
        const vacina = await ModelVacina.VacinaPet.findById(vacinaId)

        if (!nome || !dose || !classe_pets) {
            return res.status(400).send({ status: false, erros: [`Atributos obrigatorios: nome, dose, classe_pets.`] });
        }

        if (!vacina) {
            return res.status(404).send({ status: false, erros: [`Vacina ${nome} náo encontrada.`] });
        }

        const vacinaUpdated = await ModelVacina.VacinaPet
            .findByIdAndUpdate(vacinaId, req.body, { new: true });

        if (!vacinaUpdated) {
            return res.status(500).send({ status: false, erros: ["Náo foi possivel atualizar."] });
        }

        return res.status(200).send({ status: true, data: vacinaUpdated });
    } catch (error) {
        console.log(error);
        return res.status(500).send(error);
    }
};


module.exports = { getVacinas, getVacina, getPetVacinas, getClasseVacinas, insertVacina, updateVacina }