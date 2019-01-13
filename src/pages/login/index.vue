<template>
    <v-content>
        <v-container justify-center>
            <div id="firebaseui-auth-container"></div>
        </v-container>
    </v-content>
</template>

<script>
import store from '../../store'
import firebase from 'firebase';
import * as firebaseui from 'firebaseui';

export default {
  mounted() {
    // FirebaseUI config.
    var uiConfig = {
        callbacks: {
            signInSuccess: function(currentUser) {
                store.commit('setUser', currentUser);
                store.commit('setSignIn', true);
                return true;
            },
        },
        signInFlow: 'popup',
        signInSuccessUrl: '/magazine/vue',
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