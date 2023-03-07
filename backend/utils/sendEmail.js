const nodemailer = require('nodemailer');

const sendEmail = async (subject, message, sendTo, sentFrom, replyTo) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 587,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });
        const mailOptions = {
            from: sentFrom,
            to: sendTo,
            replyTo: replyTo,
            subject: subject,
            html: message
        }
        // send email 
        transporter.sendMail(mailOptions, function (err, info) {

            if (err) {
                console.log(err);
            } else {
                console.log(info);
            }
        });
    } catch (error) {

        console.log(error);
    }
}

module.exports = sendEmail;