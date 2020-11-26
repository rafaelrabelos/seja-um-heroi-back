const jwt = require('jsonwebtoken');

function valideAuthJWT (req, res, next) {

    const headerAuth = req.headers.authorization;

    if(!headerAuth ){
        return res.status(401).send({ status : false, erros : [ `Token não informado.`] });
    }

    const authParts = headerAuth.split(' ');

    if(!authParts === 2){
        return res.status(401).send({ status : false, erros : [ "Token não identificavel."]});
    }

    const [base, token]  = authParts;

    if(!/^Bearer$/i.test(base)){
        return res.status(401).send({ status : false, erros : [ "Token não mal formado."]});
    }

    if(isValidJWT(token)){
        req.decodedJWT = jwt.decode(token);
        return next(req, res);
    }

    return res.status(401).send({ status : false, erros : ["Token invalido."]});
}

function isValidJWT(token){

    jwt.verify(token, process.env.TOKEN_HASH, (err, decoded) => {
        if(err){
            return false;
        }
        req.user = decoded.user;
        return true;
    })

}

function generateToken( data = {} ){
    return jwt.sign(data, process.env.TOKEN_HASH,
        {
            expiresIn : 43200
        });
}

module.exports = { valideAuthJWT, generateToken }