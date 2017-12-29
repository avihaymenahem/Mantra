const jwt = require("jsonwebtoken");
const appConfiguration = require("../Config/config.json");

let ensureToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];
    if(typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        req.token = bearer[1];
        next();
    } else {
        res.sendStatus(403);
    }
};

let sign = (str) => {
    return jwt.sign({str}, appConfiguration.APP_SECRET);
};

module.exports.ensureToken = ensureToken;
module.exports.sign = sign;