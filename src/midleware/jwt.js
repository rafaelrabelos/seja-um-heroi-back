const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    const headerAuth = req.headers.authorization;

    if(!headerAuth ){

        console.log("Token não informado.")
        return res.status(401).send({ status : false, erros : [ `Token não informado.`] })
    }

    const authParts = headerAuth.split(' ');

    if(!authParts === 2){
        console.log("Token não identificavel.")
        return res.status(401).send({ status : false, erros : [ "Token não identificavel."]})
    }

    const [base, token]  = authParts;

    if(!/^Bearer$/i.test(base)){
        console.log("Token não mal formado.")
        return res.status(401).send({ status : false, erros : [ "Token não mal formado."]})
    }

    jwt.verify(token, process.env.TOKEN_HASH, (err, decoded) => {
        if(err){
            return res.status(401).send({ status : false, erros : ["Token invalido."]})
        }
        req.user = decoded.user;
        return next();
    })
}