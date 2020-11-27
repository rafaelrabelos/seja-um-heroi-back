const User = require('../models/usuario');
const password_check  = require('password-validator');

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

            if( await User.findOne({ email })){

                return res.status(400).send({
                     status : false,
                      erros : [
                          "Dados já existem no sistema"
                        ]
                    })
            }

            req.body.administrator = false;
            req.body.root = false;

            await User.create({ 
                ...req.body,
                 criadoPor : req._id || undefined
                });
        
            return res.status(200).send({
                status : true,
                user : await User.find({email: email}) 
            });
            
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    };

module.exports ={createUser}