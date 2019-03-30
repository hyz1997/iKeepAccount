let createHash = require('create-hash');
module.exports = (mingma) =>{
    let password = createHash('md5').update(mingma).digest('base64');
    return password;
};