<template>
    <v-dialog v-model="loading" persistent fullscreen content-class="loading-dialog">
        <v-container fill-height>
        <v-layout row justify-center align-center>
            <v-progress-circular indeterminate :size="70" :width="7" color="primary"></v-progress-circular>
        </v-layout>
        </v-container>
    </v-dialog>
</template>

<script>
export default {
    data() {
        return {
            loading: false
        }
    },
    methods: {
        openDialog() {
            this.loading = true;
        },
        closeDialog() {
            this.loading = false;
        }
    }
}
</script>

<style>
.loading-dialog {
   background-color: #69696994;
}
</style>
