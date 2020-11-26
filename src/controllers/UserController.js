const User = require('../models/usuario');
const password_check  = require('password-validator');

    async function createUser(request, response){

        const {nome, email, senha } = request.body;
        
        try {
            if(!nome || !email || !senha)
            {
                return response.status(400).send({
                    status : false, 
                    erros : [
                        "Nome, Email e Senha devem ser informados!"
                    ]
                })
            }

            if( await User.findOne({ email })){

                return response.status(400).send({
                     status : false,
                      erros : [
                          "Dados já existem no sistema"
                        ]
                    })
            }

            request.body.administrator = false;
            request.body.root = false;

            await User.create({ 
                ...request.body,
                 criadoPor : request._id || undefined
                });
        
            return response.status(200).send({
                status : true,
                user : await User.find({email: email}) 
            });
            
        } catch (error) {
            console.log(error);
            return response.status(500).send(error);
        }
    };

module.exports ={createUser}