<template>
    <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <span slot="activator" color="black" dark>マガジン登録</span>
        <v-card>
            <v-card-title>
                <span class="headline">マガジン登録</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                    <v-flex xs12>
                        <v-text-field
                        label="マガジン名*"
                        required
                        v-model="name"
                        ></v-text-field>
                    </v-flex>
                    <v-flex xs12>
                        <v-text-field
                        label="説明文"
                        required
                        v-model="description"
                        ></v-text-field>
                    </v-flex>
                    <small>*必須</small>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="clear(); dialog = false">キャンセル</v-btn>
            <v-btn color="blue darken-1" flat @click="addMagazine">登録</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import firebase from 'firebase'
import firebaseClient from '../../firebase_client';
import * as uuid from 'uuid/v4';

export default {
    data() {
        return {
            dialog: false,
            name: '',
            description: ''
        }
    },
    methods: {
        submit () {
            const func = firebase.functions().httpsCallable('addMagazine');
            func({name: this.name, description: this.description})
            .then(() => {
                this.dialog = false;
            });
        },
        addMagazine() {
            const db = firebaseClient.db();
            db.collection(`users/${this.$store.getters.user.uid}/magazines`).doc(uuid()).set({
                uid: this.$store.getters.user.uid,
                name: this.name,
                description: this.description,
                create_on: new Date()
            })
            .then(() => {
                this.dialog = false;
                this.clear();
            })
            .catch(err => {
                console.log(err)
            });
        },
        clear () {
            this.name = ''
            this.description = ''
        }
    }
}
</script>