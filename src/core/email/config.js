const nodemailer = require('nodemailer');

const createTrans = () =>{
    const transport = nodemailer.createTransport({
      host : process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secureConnection: false, 
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      }
    }); 

    return transport;
}

exports.createTrans = () => createTrans();