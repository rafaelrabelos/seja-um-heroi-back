const User = require('../models/usuario');
const jwt = require('../midleware/jwt');

async function secureRoute(req, res, validators, _next){

    if(jwt.valideAuthJWT(req, res) === true){
        
        req.decodedJWT = jwt.decodeJWT(req.headers.authorization);
        
        if(validators){
            
            const checAthorizedResult = await checkUserRights(res, req.decodedJWT.id, validators)

            if(checAthorizedResult === true){
                return _next(req, res);
            }
            return res.status(401).send({ status : false, erros : [checAthorizedResult] });
            
        }else{
            return _next(req, res);
        }
    }
}

async function checkUserRights(res, userId, rights){

    if(userId === undefined || userId ===  ''){
        return `Usuário não identificado.`;
    }else{

        const user = await User.findById(userId).select('-senha');

        if(rights.root != undefined && rights.root && !isRoot(user)){
            return `${user.nome}<${user.email}> sem privilégios root para executar esta ação.`;
        }
        if(rights.admin != undefined && rights.admin && !isAdmin(user) ){
            return `${user.nome}<${user.email}> sem privilégios admim para executar esta ação.`;
        }
    }

    return true;
}

function isRoot(user){
    return user.root 
}

function isAdmin(user){
    
    if(isRoot(user) || user.administrador ){
        return true;
    }
    
    return false;
}

module.exports ={secureRoute, checkUserRights, isRoot, isAdmin}