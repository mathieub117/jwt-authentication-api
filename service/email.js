const nodemailer = require('nodemailer');

let transporter = null

const mailOptions = {
    from: 'account@validator.com',
    subject: 'Confirm your email'
};

// Create dummy account
async function Init() {
    const account = await nodemailer.createTestAccount();

    transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: account.user, // generated ethereal user
            pass: account.pass, // generated ethereal password
        },
        debug: true, // show debug output
        logger: true // log information in console
    });
}

// Send email. options is a json object that needs to contains at least: to, html
function SendMail(options) {
    transporter.sendMail({mailOptions, ...options}, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = { Init, SendMail };