const jwt = require('jsonwebtoken');

function valideAuthJWT (req, res) {

    const headerAuth = req.headers.authorization;

    if(!isValidAthorization(headerAuth)){
        res.status(401).send({ status : false, erros : [ `Token mal formado`] });
    }

    const [base, token]  = headerAuth.split(' ');

    if(!isValidJWT(token)){
        res.status(401).send({ status : false, erros : ["Token invalido."]});
    }

    return true;
}

function isValidAthorization(authorization){

    if(!authorization){
        return false;
    }

    const authParts = authorization.split(' ');

    if(!authParts === 2){
        return false;
    }else if(authParts[0] !== 'Bearer' || !/^Bearer$/i.test(authParts[0])){
        return false;
    }else if(authParts[1] === ''){
        return false;
    }else{
        return true;
    }
}

function isValidJWT(token){

    return jwt.verify(token, process.env.TOKEN_HASH, (err, decoded) => {
        if(err){
            return false;
        }

        return true;
    });
}

function generateToken( data = {} ){
    return jwt.sign(data, process.env.TOKEN_HASH,
        {
            expiresIn : 43200
        });
}

function decodeJWT(jwt_token){

    if(!isValidAthorization(jwt_token)){
        return false;
    }

    const [base, token]  = jwt_token.split(' ');

    if(!isValidJWT(token)){
        return false;
    }

    return jwt.decode(token);
}

module.exports = { valideAuthJWT, generateToken, decodeJWT }