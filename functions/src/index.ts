import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as uuid from 'uuid/v4';
const parser = require("ogp-parser");

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

exports.createMagazine = functions.firestore.document("users/{uid}/magazines/{magazineId}").onCreate(async (snap, ctx) => {
    const db = admin.firestore();
    await db.collection('magazines').doc(ctx.params.magazineId).set(snap.data())
    .catch((err) => {
        console.log(err); // eslint-disable-line no-console
    });
    console.log('Success'); // eslint-disable-line no-console
    return;
});

exports.createArticle = functions.firestore.document("magazines/{magazineId}/articles/{articleId}").onCreate(async (snap, ctx) => {
    const db = admin.firestore();
    await db.collection('articles').doc(ctx.params.articleId).set(snap.data())
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

exports.addComment = functions.https.onCall(async (data, context) => {
    const db = admin.firestore();
    const userDoc = await db.collection('users').doc(context.auth.uid).get()
                        .catch(error => {
                            console.log(error);
                            return error
                        });;
    await db.collection(`articles/${data.articleId}/comments`).doc(uuid()).set({
        user: userDoc.data(),
        comment: data.comment,
        create_on: new Date()
    })
    .catch(error => {
        console.log(error);
        return error;
    });
    console.log('Success');
    return;
});