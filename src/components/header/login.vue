<template>
    <v-toolbar-items>
        <v-btn flat>
            <PostArticle />
        </v-btn>
        <v-btn flat>
        <div v-if="isSignIn">
            <!-- <div class="navbar-item">
                投稿
            </div> -->
            <v-menu offset-y>
                <span
                    slot="activator"
                    color="primary"
                    dark
                >
                    {{ user.displayName }}
                </span>
                <v-list>
                    <v-list-tile v-for="(item, index) in items" :key="index">
                        <v-list-tile-title>
                            <div v-if="item.title==='Sign Out'">
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
        </v-btn>
    </v-toolbar-items>
</template>

<script>
import firebaseClient from '../../firebase_client'
import postArticle from '../modal/post_article'
export default {
    components: {
        PostArticle: postArticle
    },
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
            firebaseClient.logout();
        }
    }
}
</script>