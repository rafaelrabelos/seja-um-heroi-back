
function clearSlash(req){
    let str = req.url;
    const count = (str.match(/\/\//g) || []).length;
    if(count > 0 && count < 50)
        return clearSlash(str.replace('//', '/'))
    return str;
}

module.exports = clearSlash;