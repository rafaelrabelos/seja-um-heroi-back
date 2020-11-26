const User = require('../models/usuario');

async function checkUserRights(res, userId, rights){
    let status = true;
    let statusCode = 401;
    let message = "";

    if(userId === undefined || userId ===  ''){
        status = false;
        message = `Usuário não identificado.`;
    }else{

        const user = await  User.findById({ userId }).select('-senha');

        if(rights.root != undefined && rights.root && !isRoot(user)){
            status = false;
            message = `Usuário ${user.name} sem privilégios root para executar esta ação.`;
        }
        if(rights.admin != undefined && rights.admin && !isAdmin(user) ){
            status = false;
            message = `Usuário ${user.name} sem privilégios adm para executar esta ação.`;
        }
    }

    if( !status){
        res.status(401).send({ status : status, erros : [message] });
    }
}

function isRoot(user){
    return user.root 
}

function isAdmin(user){
    if(isRoot() || user.administrador ){
        return true;
    }
    
    return false;
}

module.exports ={checkUserRights, isRoot, isAdmin}