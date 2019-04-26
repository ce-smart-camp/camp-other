const admin = require("firebase-admin");

var serviceAccount = require("./cesc-12-firebase-adminsdk-l90jm-c2bfb0a543.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

var friend = require("./friend.json");
var crypto = require('crypto');

Object.keys(friend).forEach(id => {
    var email = '6101' + id + '@kmitl.ac.th';
    var data = { ...friend[id], ...{email, more: false, q1: false, q2: false, check: false}};
    var doc = crypto.createHash('md5').update(email).digest("hex");
    console.log(doc, data);

    var setDoc = db.collection('role').doc(doc).set(data);
})
