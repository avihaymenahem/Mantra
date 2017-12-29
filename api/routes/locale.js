const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const sequelize = require("../DAL/index");
const Utils = require("../Common/Utils");
const LocaleModel = require("../DAL/models/Locale");
const databaseIsDownModel = require("../DAL/responseModels/DatabaseIsDownModel");

router.use(bodyParser.urlencoded({ extended: true }));

// region get category list
router.get('/', (req, res) => {
    sequelize.connect().then(() => {
        LocaleModel.findAll().then(locales => {
            res.sendData(locales);
        });
    })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
            res.sendServerError(databaseIsDownModel);
        });
});
// endregion

module.exports = router;