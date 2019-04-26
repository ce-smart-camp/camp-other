/* eslint-disable promise/no-nesting */
const functions = require('firebase-functions');
var admin = require("firebase-admin");

var serviceAccount = require("./cesc-12-firebase-adminsdk-l90jm-c2bfb0a543.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cesc-12.firebaseio.com"
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.helloWorld = functions.https.onRequest((_request, response) => {
    response.send("Hello from Firebase!");
});

function listAllUsers(nextPageToken) {
    return new Promise((resolve, reject) => {
        admin.auth().listUsers(1000, nextPageToken)
        .then((listUsersResult) => {
            if (listUsersResult.pageToken) {
                listAllUsers(listUsersResult.pageToken).then(count => {
                    resolve(listUsersResult.users.length + count);
                    return;
                }).catch(error => {
                    reject(error);
                })
            } else {
                resolve(listUsersResult.users.length);
            }
            return;
        })
        .catch(error => {
            reject(error);
        });
    });
}

exports.count = functions.https.onRequest((_request, response) => {
    listAllUsers().then((count) => {
        response.send({ count: count, time: new Date() });
        return;
    }).catch((error) => {
        response.send('Error listing users:', error);
    })
});