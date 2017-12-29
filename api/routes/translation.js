const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const sequelize = require("../DAL/index");
const Utils = require("../Common/Utils");
const TranslationModel = require("../DAL/models/Translation");
const databaseIsDownModel = require("../DAL/responseModels/DatabaseIsDownModel");

router.use(bodyParser.urlencoded({ extended: true }));

// region new Translation
router.post('/', (req, res) => {
    const requestBody = req.body;
    let UserID = parseInt(Utils.escape(requestBody.userId));
    let LangID = parseInt(Utils.escape(requestBody.langId));
    let PhraseID = parseInt(Utils.escape(requestBody.phraseId));
    let Text = Utils.escape(requestBody.text);

    TranslationModel.create({
        UserID,
        PhraseID,
        LangID,
        Text,
        State: 0
    });

    res.sendCreated();
});
// endregion

// region delete translation
router.delete('/:id', (req, res) => {
    TranslationModel.destroy({ where: { 'ID' : req.params.id } });
    res.sendOk();
});
// endregion

// region get specific translation
router.get('/:id', (req, res) => {
    sequelize.connect().then(() => {
        TranslationModel.findOne({ where: {ID: req.params.id} }).then(translation => {
            translation ? res.sendData(translation) : res.sendNotFound();
        });
    })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
            res.sendServerError(databaseIsDownModel);
        });
});
// endregion

module.exports = router;