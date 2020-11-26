const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/usuario');
const email_check = require("email-validator");
const password_check  = require('password-validator');


    async function create(request, response){

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

    async function autentica(request, response){

        const { email, senha } = request.body;

        if(!email || !senha){

            return response
            .status(200)
            .send({ status : false, erros : ["Usuário e Senha devem ser informado."]});
        }else{
            let valideRes = [ email_check.validate(email) || `Email [${email}] invalido.`]
            .filter( (e) => e !== true);

            if( valideRes.length > 0 ){
                return response.status(400).send({ status : false, erros : valideRes});
            }
        }

        const user = await  User.findOne({ email }).select('+senha')

        if(!user){
            return response.status(400).send({ status : false,  erros : [`(${email})Usuário não encontrado.`] });
        }else if( !user.senha ){
            return response.status(400).send({ status : false, erros : ["Senha não devolvida pela base."] });
        }else if( !await bcrypt.compare(senha, user.senha) ){
            return response.status(400).send({ status : false, erros : ["Senha informada é inválida."] });
        }else{
            user.senha = undefined;
            response.status(200).send({
            status : true,
            data : {
                user : {  nome : user.nome,  email : user.email },
                token : generateToken({ id: user.id, user : user })
                }
            });
        }
    }

    function generateToken( data = {} ){
        return jwt.sign(data, process.env.TOKEN_HASH,
            {
                expiresIn : 43200
            });
    }


module.exports ={autentica, create}