import firebase from 'firebase';
import store from "./store";

var config = {
    apiKey: "AIzaSyDiJL6QEcECY1y-nyfxWmROAg5Q-lGHYsY",
    authDomain: "magazine-master.firebaseapp.com",
    databaseURL: "https://magazine-master.firebaseio.com",
    projectId: "magazine-master",
    storageBucket: "magazine-master.appspot.com",
    messagingSenderId: "789871341817"
};

export default {
    init() {
        firebase.initializeApp(config);
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    },
    logout() {
        firebase.auth().signOut()
    },
    onAuth() {
        firebase.auth().onAuthStateChanged(user => {
            user = user ? user : {};
            store.commit('setUser', user);
            store.commit('setSignIn', user.uid ? true : false);
        });
    },
    db() {
        return firebase.firestore()
    }
};