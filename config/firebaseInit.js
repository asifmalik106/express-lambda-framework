const admin = require("firebase-admin");
const serviceAccount = require("../key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // storageBucket: 'gs://test-project-with-shuvo.appspot.com/',
    databaseURL: "https://playground-e2401-default-rtdb.firebaseio.com/"
});

module.exports = admin;