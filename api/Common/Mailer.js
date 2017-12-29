'use strict';
const nodemailer = require("nodemailer");

class Mailer {
    constructor() {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'avihay@three-dev.com',
                pass: 'kovhfjojpsgpqntd'
            }
        });

        const mailOptions = {
            from: 'avihay@three-dev.com', // sender address
            to: 'avihay@three-dev.com', // list of receivers
            subject: 'Subject of your email', // Subject line
            html: '<p>Your html here</p>'// plain text body
        };

        transporter.sendMail(mailOptions, function (err, info) {
            if(err)
                console.log(err);
            else
                console.log(info);
        });
    }
}

module.exports = Mailer;