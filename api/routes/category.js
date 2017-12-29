const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const sequelize = require("../DAL/index");
const Utils = require("../Common/Utils");
const CategoryModel = require("../DAL/models/Category");
const PhraseModel = require("../DAL/models/Phrase");
const databaseIsDownModel = require("../DAL/responseModels/DatabaseIsDownModel");

router.use(bodyParser.urlencoded({ extended: true }));

// region new category
router.post('/', (req, res) => {
    const requestBody = req.body;
    let Title = Utils.escape(requestBody.Title);
    let Description = Utils.escape(requestBody.Description);
    let ProjectID = Utils.escape(requestBody.ProjectID);

    CategoryModel.create({
        Title,
        Description,
        ProjectID
    }).then((category) => {
        res.sendData(category);
    });

});
// endregion

// region delete category
router.delete('/:id', (req, res) => {
    CategoryModel.destroy({ where: { 'ID' : req.params.id } });
    res.sendOk();
});
// endregion

// region get category list
router.get('/', (req, res) => {
    sequelize.connect().then(() => {
            CategoryModel.findAll().then(categories => {
                res.sendData(categories);
            });
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
            res.sendServerError(databaseIsDownModel);
        });
});
// endregion

// region get specific category
router.get('/:id', (req, res) => {
    sequelize.connect().then(() => {
            CategoryModel.findOne({ where: {ID: req.params.id} }).then(category => {
                category ? res.sendData(category) : res.sendNotFound();
            });
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
            res.sendServerError(databaseIsDownModel);
        });
});
// endregion

// region get phrases list by category id
router.get('/:id/phrases', (req, res) => {
    sequelize.connect().then(() => {
        PhraseModel.findAll({ where: {
            CategoryID: {
                $eq : parseInt(Utils.escape(req.params.id))
            }
        } }).then(phrases => {
            phrases ? res.sendData(phrases) : res.sendNotFound();
        });
    })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
            res.sendServerError(databaseIsDownModel);
        });
});
// endregion

module.exports = router;