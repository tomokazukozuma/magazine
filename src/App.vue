<template>
  <v-app>
    <v-toolbar app>
        <v-toolbar-title class="headline">
            <span>Programming Magazine</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <Login />
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
import login from './components/header/login'
export default {
    components: {
        Login: login
    }
}
</script>
