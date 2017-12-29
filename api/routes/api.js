const fs = require('fs');
const express = require('express');
const router = express.Router();
const successModel = require("../DAL/responseModels/SuccessModel");
const configuration = require("../Config/config.json");
const bcrypt = require("bcryptjs");
const Utils = require("../Common/Utils");

// region user
const UserController = require("./user");
const UserModel = require("../DAL/models/User");
router.use('/users', UserController);
// endregion

// region user
const ProjectController = require("./project");
const ProjectModel = require("../DAL/models/Project");
router.use('/projects', ProjectController);
// endregion

// region category
const CategoryController = require("./category");
const CategoryModel = require("../DAL/models/Category");
router.use('/categories', CategoryController);
// endregion

// region Locale
const LocaleController = require("./locale");
const LocaleModel = require("../DAL/models/Locale");
router.use('/locales', LocaleController);
// endregion

// region Phrase
const PhraseController = require("./phrase");
const PhraseModel = require("../DAL/models/Phrase");
router.use('/phrases', PhraseController);
// endregion

// region Translation
const TranslationController = require("./translation");
const TranslationModel = require("../DAL/models/Translation");
router.use('/translations', TranslationController);
// endregion

// region Export
const ExportController = require("./export");
router.use('/export', ExportController);
// endregion

// region resetDB
router.get('/reset', (req, res) => {
    const SyncOptions = {
        force: true,
        alter: true
    };

    UserModel.sync(SyncOptions).then(() => {
        let password = configuration.ADMIN_PASSWORD;
        let salt     = bcrypt.genSaltSync(10);
        let hash     = bcrypt.hashSync(password, salt);
        let token    = Utils.toBase64(configuration.ADMIN_EMAIL);

        UserModel.create({
            Username: configuration.ADMIN_USERNAME,
            Email   : configuration.ADMIN_EMAIL,
            Password: hash,
            Salt    : salt,
            IsApproved: 1,
            ApprovalToken: token
        });

        res.json(successModel);
    });
});
// endregion

// region migrate
router.get('/migrate', (req, res) => {
    let options = {
        alter: true
    };

    UserModel.sync(options);
    ProjectModel.sync(options);
    CategoryModel.sync(options);
    LocaleModel.sync(options);
    PhraseModel.sync(options);
    TranslationModel.sync(options);

    res.json(successModel);
});
// endregion

// region version
router.get('/version', (req, res) => {
    res.json({
        version: '1.0.0'
    });
});
// endregion

// region health check
router.get('/health', (req, res) => {
    res.json({
        status: 200,
        state: "ALIVE"
    });
});
// endregion

module.exports = router;