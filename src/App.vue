<template>
  <v-app>
    <v-toolbar app>
        <v-toolbar-title class="headline">
            <router-link v-bind:to="{ name : 'Top'}"><span>Programming Magazine</span></router-link>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <Login />
    </v-toolbar>
    <v-container justify-center>
        <v-layout text-md-center>
            <router-link to="/"></router-link>
            <router-link to="/login"></router-link>
            <router-link to="/magazine/add"></router-link>
            <router-link to="/magazine/vue"></router-link>
            <router-link to="/user/:uid/magazine"></router-link>
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

<style>
a {
    text-decoration: none;
}
</style>
