const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Sequelize = require("sequelize");
const sequelize = require("../DAL/index");
const Utils = require("../Common/Utils");
const CategoryModel = require("../DAL/models/Category");
const LocaleModel = require("../DAL/models/Locale");
const TranslationModel = require("../DAL/models/Translation");
const databaseIsDownModel = require("../DAL/responseModels/DatabaseIsDownModel");

router.use(bodyParser.urlencoded({ extended: true }));

// region get category list
router.get('/:localeId', (req, res) => {
    sequelize.connect().then(() => {
        sequelize.query("SELECT ca.Title AS CategoryTitle, tr.Text AS TranslatedText, ph.Title as KeyName FROM translations AS tr LEFT JOIN phrases AS ph ON tr.PhraseID = ph.ID LEFT JOIN categories AS ca ON ph.CategoryID = ca.ID;", {
            type: Sequelize.QueryTypes.SELECT
        }).then(data => {
            let returnObject = {};
            for(let i in data) {
                let manipulateKey = (str) => {
                    return str.toUpperCase().replace(" ", "_");
                };

                let current = data[i],
                    categoryName = manipulateKey(current.CategoryTitle),
                    keyName = manipulateKey(current.KeyName),
                    value = current.TranslatedText;

                if(!returnObject[categoryName]) {
                    returnObject[categoryName] = {};
                }

                returnObject[categoryName][keyName] = value;

            }
            res.sendData(returnObject);
        });
    })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
            res.sendServerError(databaseIsDownModel);
        });
});
// endregion

module.exports = router;