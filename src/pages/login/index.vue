<template>
  <v-content>
        <v-container justify-center>
            <div id="firebaseui-auth-container"></div>
        </v-container>
    </v-content>
</template>

<script>
import firebase from 'firebase/';
import * as firebaseui from 'firebaseui';

var config = {
    apiKey: "AIzaSyDiJL6QEcECY1y-nyfxWmROAg5Q-lGHYsY",
    authDomain: "magazine-master.firebaseapp.com",
    databaseURL: "https://magazine-master.firebaseio.com",
    projectId: "magazine-master",
    storageBucket: "magazine-master.appspot.com",
    messagingSenderId: "789871341817"
};
firebase.initializeApp(config);
export default {
  mounted() {
    // FirebaseUI config.
    var uiConfig = {
      signInSuccessUrl: '/category',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.GithubAuthProvider.PROVIDER_ID,
      ],
      // tosUrl and privacyPolicyUrl accept either url string or a callback
      // function.
      // Terms of service url/callback.
      tosUrl: '/category',
      // Privacy policy url/callback.
      privacyPolicyUrl: function() {
        window.location.assign('/top');
      }
    };

    // Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
    // The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
  }
}
</script>