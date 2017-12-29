const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const sequelize = require("../DAL/index");
const Utils = require("../Common/Utils");
const ProjectModel = require("../DAL/models/Project");
const CategoryModel = require("../DAL/models/Category");
const databaseIsDownModel = require("../DAL/responseModels/DatabaseIsDownModel");

router.use(bodyParser.urlencoded({ extended: true }));

// region new project
router.post('/', (req, res) => {
    const requestBody = req.body;
    let Title = Utils.escape(requestBody.Title);
    let Description = Utils.escape(requestBody.Description);

    ProjectModel.create({
        Title,
        Description
    }).then((project) => {
        res.sendData(project);
    });
});
// endregion

// region delete project
router.delete('/:id', (req, res) => {
    ProjectModel.destroy({ where: { 'ID' : req.params.id } });
    res.sendOk();
});
// endregion

// region get project list
router.get('/', (req, res) => {
    sequelize.connect().then(() => {
        ProjectModel.findAll().then(projects => {
                res.sendData(projects);
            });
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
            res.sendServerError(databaseIsDownModel);
        });
});
// endregion

// region get specific project
router.get('/:id', (req, res) => {
    sequelize.connect().then(() => {
        ProjectModel.findOne({ where: {ID: req.params.id} }).then(category => {
                category ? res.sendData(category) : res.sendNotFound();
            });
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
            res.sendServerError(databaseIsDownModel);
        });
});
// endregion

// region get categories list by project id
router.get('/:id/categories', (req, res) => {
    sequelize.connect().then(() => {
        CategoryModel.findAll({ where: {
            ProjectID: {
                $eq : parseInt(Utils.escape(req.params.id))
            }
        } }).then(categories => {
            categories ? res.sendData(categories) : res.sendNotFound();
        });
    })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
            res.sendServerError(databaseIsDownModel);
        });
});
// endregion

module.exports = router;