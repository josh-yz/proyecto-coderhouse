const admin = require("firebase-admin");
const serviceAccount = require("./tienda-f6c41-firebase-adminsdk-2kt2c-f67d70c8f3.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
module.exports = db;