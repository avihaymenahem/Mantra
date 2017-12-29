const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Utils = require("../Common/Utils");
const sequelize = require("../DAL/index");
const UserModel = require("../DAL/models/User");
const databaseIsDownModel = require("../DAL/responseModels/DatabaseIsDownModel");
const mailer = require("../Common/Mailer");
const bcrypt = require('bcryptjs');
const authService = require("../Auth/AuthService");

router.use(bodyParser.urlencoded({ extended: true }));

// region register
router.post('/register', (req, res) => {
    let username = Utils.escape(req.body.username);
    let password = Utils.escape(req.body.password);
    let email = Utils.escape(req.body.email.toLowerCase());

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    UserModel.create({
        Email: email,
        Password: hash,
        Salt: salt,
        Username: username,
        IsApproved: 0,
        ApprovalToken: Utils.toBase64(email)
    }).then(user => {
        //new mailer();
        res.sendCreated();
    }).catch(err => {
        res.sendServerError(err);
    });
});
// endregion

// region login
router.post('/login', (req, res) => {
    console.log("REQUEST BODY", req);

    let Email = Utils.escape(req.body.email);
    let Password = Utils.escape(req.body.password);

    UserModel.findOne({ where: {
        Email
    }}).then(user => {
        if(!user) {
            res.sendBadRequest({ message: "User not found" });
            return;
        }

        let hash = bcrypt.hashSync(Password, user.Salt);

        if(hash !== user.Password) {
            res.sendBadRequest({ message: "Wrong password" });
            return;
        }

        let token = authService.sign(user);
        res.sendData({ token });
    });
});
// endregion

// region logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/api/users/login');
});
// endregion

// region auth
router.get('/auth/:hash', (req, res) => {
    let hash = Utils.escape(req.params.hash);
    let email = Utils.fromBase64(hash);

    UserModel.findOne({ where: {
        Email: email.toLowerCase()
    } }).then(user => {
        if(!user) {
            res.sendNotFound();
            return;
        }

        if(user.IsApproved) {
            res.sendBadRequest();
            return;
        }

        user.IsApproved = 1;
        user.save().then(() => {
            res.sendOk();
        });
    }).catch(err => {
        console.error('Unable to connect to the database:', err);
        res.sendServerError(databaseIsDownModel);
    });
});
// endregion

// region forgot
router.post('/forgot', (req, res) => {

});
// endregion

// region get users list
router.get('/', (req, res) => {
    sequelize.connect().then(() => {
            UserModel.findAll({ attributes: UserModel.publicAttrs }).then(users => {
                res.sendData(users);
            });
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
            res.sendServerError(databaseIsDownModel);
        });
});
// endregion

// region get specific user
router.get('/:id', (req, res) => {
    sequelize.connect().then(() => {
            let ID = parseInt(req.params.id.trim());
            UserModel.findOne({ where: {ID}, attributes: UserModel.publicAttrs }).then(user => {
                user ? res.sendData(user) : res.sendNotFound();
            });
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
            res.sendServerError(databaseIsDownModel);
        });
});
// endregion

module.exports = router;