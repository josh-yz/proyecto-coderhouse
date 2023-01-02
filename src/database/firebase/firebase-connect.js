const admin = require("firebase-admin");
const serviceAccount = require("./tienda-f6c41-firebase-adminsdk-2kt2c-f67d70c8f3.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();
setTimeout(() => { // ESTO SOLO ES PARA QUE SALGA EL LOG AL ULTIMO
    console.log('Base de datos (firebase) : \x1b[32m%s\x1b[0m', 'Online') 
}, 3);

module.exports = db;    