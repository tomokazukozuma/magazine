<template>
    <div v-if="isSignIn" key="login" class="navbar-item">
        <v-menu offset-y>
            <v-btn
                slot="activator"
                color="primary"
                dark
            >
                {{ user.displayName }}
            </v-btn>
            <v-list>
                <v-list-tile v-for="(item, index) in items" :key="index">
                    <v-list-tile-title>
                        <div v-if="item.title=='Sign Out'" key="" class="navbar-item">
                            <p @click="doLogout">
                            Sign out
                            </p>
                        </div>
                        <div v-else key="logout">
                            <router-link v-bind:to="{ name : 'UserMagazine', params : { uid: user.uid }}"><p class="navbar-item">{{ item.title }}</p></router-link>
                        </div>
                    </v-list-tile-title>
                </v-list-tile>
            </v-list>
        </v-menu>
        <!-- <router-link v-bind:to="{ name : 'UserMagazine', params : { uid: user.uid }}"><p class="navbar-item">{{ user.displayName }}</p></router-link> -->
    </div>
    <!-- 未ログイン時にはログインボタンを表示 -->
    <div v-else key="logout">
        <span><router-link to="/login">Login</router-link></span>
    </div>
</template>

<script>
import firebase from '../../firebase'
export default {
    data() {
        //{{ item.title }}
        return {
            items: [
                {
                    title: "マガジン一覧"
                },
                {
                    title: "Sign Out"
                }
            ]
        }
    },
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