import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as uuid from 'uuid/v4';
var parser = require("ogp-parser");

admin.initializeApp(functions.config().firebase);
admin.firestore().settings({
    timestampsInSnapshots: true
});

exports.registerUsers = functions.auth.user().onCreate(async user => {
    const { uid } = user;
    const db = admin.firestore();
    const displayName = user.displayName || 'Anonymous';
    const email = user.email || '';
    const photoURL = user.photoURL || '/assets/img/default_profile.svg';

    await db.collection('users').doc(uid).set({
        user_name: displayName,
        photo_url: photoURL,
        email,
        create_on: new Date(),
    })
    .catch((err) => {
        console.log(err); // eslint-disable-line no-console
    });
    console.log('Success'); // eslint-disable-line no-console
    return;
});

exports.addMagazine = functions.https.onCall(async (data, context) => {
    const db = admin.firestore();
    await db.collection('magazines').doc(uuid()).set({
        uid: context.auth.uid,
        name: data.name,
        explain: data.explain,
        create_on: new Date()
    })
    .catch((err) => {
        console.log(err); // eslint-disable-line no-console
    });
    console.log('Success'); // eslint-disable-line no-console
    return;
});

exports.crawlArticleInfo = functions.https.onCall(async (data, context) => {
    const result = await parser(data.url, false).catch(error => {
        console.error(error);
    });
    return result;
});
