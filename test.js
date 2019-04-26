var admin = require("firebase-admin");

var serviceAccount = require("./cesc-12-firebase-adminsdk-l90jm-c2bfb0a543.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://cesc-12.firebaseio.com"
});

function listAllUsers(nextPageToken) {
    return new Promise(function(resolve, reject) {
        admin.auth().listUsers(1000, nextPageToken)
        .then(function(listUsersResult) {
            if (listUsersResult.pageToken) {
                listAllUsers(listUsersResult.pageToken).then(function(count) {
                    resolve(listUsersResult.users.length + count);
                })
            } else {
                resolve(listUsersResult.users.length);
            }
        })
        .catch(function(error) {
            console.log('Error listing users:', error);
        });
    });
}
  // Start listing users from the beginning, 1000 at a time.
listAllUsers().then(function(count) {
    console.log(count);
})