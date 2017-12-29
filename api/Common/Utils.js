const crypto = require('crypto');

const escape = (unsafe) => {
    if(!unsafe) return;
    return unsafe
        .toString()
        .trim()
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
};

const genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0,length);   /** return required number of characters */
};

const sha512 = function(password, salt){
    let hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    let value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

const toBase64 = (str) => {
    return new Buffer(str).toString('base64')
};

const fromBase64 = (str) => {
    return new Buffer(str, 'base64').toString('ascii')
};

module.exports.escape = escape;
module.exports.genRandomString = genRandomString;
module.exports.sha512 = sha512;
module.exports.toBase64 = toBase64;
module.exports.fromBase64 = fromBase64;