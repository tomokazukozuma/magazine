import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

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