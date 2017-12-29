const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const sequelize = require("../DAL/index");
const Utils = require("../Common/Utils");
const TranslationModel = require("../DAL/models/Translation");
const PhraseModel = require("../DAL/models/Phrase");
const databaseIsDownModel = require("../DAL/responseModels/DatabaseIsDownModel");

router.use(bodyParser.urlencoded({ extended: true }));

// region new phrase
router.post('/', (req, res) => {
    const requestBody = req.body;
    let UserID = Utils.escape(requestBody.userId);
    let CategoryID = Utils.escape(requestBody.categoryId);
    let Title = Utils.escape(requestBody.title);
    let Description = Utils.escape(requestBody.description);

    PhraseModel.create({
        UserID,
        CategoryID,
        Title,
        Description
    });

    res.sendCreated();
});
// endregion

// region delete phrase
router.delete('/:id', (req, res) => {
    PhraseModel.destroy({ where: { 'ID' : req.params.id } });
    res.sendOk();
});
// endregion

// region get specific phrase
router.get('/:id', (req, res) => {
    sequelize.connect().then(() => {
        PhraseModel.findOne({ where: {ID: req.params.id} }).then(phrase => {
            phrase ? res.sendData(phrase) : res.sendNotFound();
        });
    })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
            res.sendServerError(databaseIsDownModel);
        });
});
// endregion


// region get specific phrase translations
router.get('/:id/translations', (req, res) => {
    sequelize.connect().then(() => {
        TranslationModel.find({ where: { PhraseID: req.params.id } }).then(translations => {
            translations ? res.sendData(translations) : res.sendNotFound();
        });
    })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
            res.sendServerError(databaseIsDownModel);
        });
});
// endregion

module.exports = router;