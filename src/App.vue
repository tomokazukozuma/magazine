<template>
  <v-app>
    <v-toolbar app>
        <v-toolbar-title class="headline">
            <span>Programming Magazine</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <div v-if="isSignIn" key="login" class="navbar-item">
            <p class="navbar-item">{{ user.displayName }}</p>
            <button type="button" class="button is-small is-info is-outlined" @click="doLogout">
            Sign out
            </button>
        </div>
        <!-- 未ログイン時にはログインボタンを表示 -->
        <div v-else key="logout">
            <span><router-link to="/login">Login</router-link></span>
        </div>
    </v-toolbar>
    <v-container justify-center>
        <v-layout text-xs-center>
            <p>
                <router-link to="/"></router-link>
            </p>
            <p>
                <router-link to="/login">Login</router-link>
            </p>
            <p>
                <router-link to="/magazine/vue">Vue Magazine</router-link>
            </p>
            <router-view></router-view>
        </v-layout>
    </v-container>
  </v-app>
</template>

<script>
import firebase from './firebase'
export default {
    computed: {
        user() {
            return this.$store.getters.user;
        },
        isSignIn() {
            return this.$store.getters.isSignIn
        }
    },
    methods: {
        // ログアウト処理
        doLogout() {
            firebase.logout();
        }
    }
}
</script>
