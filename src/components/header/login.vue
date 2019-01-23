<template>
    <div v-if="isSignIn" key="login" class="navbar-item">
        <router-link v-bind:to="{ name : 'UserMagazine', params : { uid: user.uid }}"><p class="navbar-item">{{ user.displayName }}</p></router-link>
        <button type="button" class="button is-small is-info is-outlined" @click="doLogout">
        Sign out
        </button>
    </div>
    <!-- 未ログイン時にはログインボタンを表示 -->
    <div v-else key="logout">
        <span><router-link to="/login">Login</router-link></span>
    </div>
</template>

<script>
import firebase from '../../firebase'
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