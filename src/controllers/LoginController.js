const jwt = require('../midleware/jwt');
const bcrypt = require('bcrypt');
const User = require('../models/usuario');
const email_check = require("email-validator");


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
                token : jwt.generateToken({ id: user.id, user : user })
                }
            });
        }
    }


module.exports ={autentica}