const { createTrans } = require('./config');
const fs = require('fs');
const path = require("path");

const sendMail = async (data) => {
    try {
        const transporter = createTrans();
        let info = await transporter.sendMail({
            from: process.env.MAIL_USER, // sender address
            to: data.email, // list of receivers
            subject: data.asunto, // Subject line
            text: data.texto,
        });
        return true;
    } catch (error) {
        return false;
    }
}

exports.sendMail = (data) => sendMail(data);