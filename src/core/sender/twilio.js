const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


const sendWhatsApp = async (body, to = 'whatsapp:+56989544767') => {
    const message = await client.messages
    .create({
        body: body,
        from: 'whatsapp:+14155238886',
        to: to
    });
};


const sendSMS = async (body, to = '+56989544767') => {
    const message = await client.messages
    .create({
        body: body,
        from: 'MGd8d8828f772253e0f8b745b4b9b2dc2b',
        to: to
    });
};



module.exports = {
    sendWhatsApp,
    sendSMS
}
