const Model = require('../models/usuario');
const password_check  = require('password-validator');
const secure = require('../libs/secure');

    async function createUser(req, res){

        const {nome, email, senha } = req.body;
        
        try {
            if(!nome || !email || !senha)
            {
                return res.status(400).send({
                    status : false, 
                    erros : [
                        "Nome, Email e Senha devem ser informados!"
                    ]
                })
            }

            if( await Model.User.findOne({ email })){

                return res.status(400).send({
                     status : false,
                      erros : [
                          "Dados já existem no sistema"
                        ]
                    })
            }

            req.body.administrator = false;
            req.body.root = false;

            await Model.User.create({ 
                ...req.body,
                 criadoPor : req._id || undefined
                });
        
            return res.status(200).send({
                status : true,
                user : await Model.User.find({email: email}) 
            });
            
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    };

    async function getUsers(req, res){


        try {
            const users = await Model.User.find()
            .select(`${await selectPermissions(req)}`)
            .populate("criadoPor");

            return res.status(200).send({ status : true, user : users });
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    };

    async function getUser(req, res){

        try {
            const users = await Model.User.findById(req.params.usuarioId || req.decodedJWT.id).populate("criadoPor");

            return res.status(200).send({ status : true, user : users });
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    };

    async function updateUser(req, res){

        const { nome } = req.body;

        try {

            if(!nome)
            {
                return res.status(400).send({ status : false, erros : ["Nome e email devem ser informados!"] });
            }

            const usuarioId = req.params.usuarioId || req.decodedJWT.id;

            const user = await Model.User.findById(usuarioId);

            if(!user){
                return res.status(500).send({ status : false, erros : ["Usuario nao localizado."] });
            }

            const userUpdated = await Model.User.findByIdAndUpdate(usuarioId, { nome }, { new : true });

            return res.status(200).send({ status : true, user : userUpdated  });
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    };

    async function selectPermissions(req){
        return await secure.checkUserRights(req, {root: true}) === true 
            ? '+administrador +system_user' : '';
    }

module.exports = { createUser, getUsers, getUser, updateUser }