const User = require('../models/usuario');

    async function create(request, response){

        const {nome, email, senha } = request.body;
        
        try {
            if(!nome || !email || !senha)
            {
                return response.status(400).send({
                    status : false, 
                    erros : [{ dados : "Nome, Email e Senha devem ser informados!"}]
                })
            }

            if( User.findOne({ email })){

                return response.status(400).send({
                     status : false,
                      erros : [{ email : "Dados já existem no sistema"}]
                    })
            }

            request.body.administrator = undefined;

            const user =  await User.create({ 
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

    function autentica(request, response){

    return response.json(request.body);
    }


module.exports ={autentica, create}