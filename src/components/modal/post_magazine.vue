<template>
    <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="600px">
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
    <Loading ref="childLoading"/>
  </v-layout>
</template>

<script>
import firebaseClient from '../../firebase_client';
import * as uuid from 'uuid/v4';

import loading from '../loading';

export default {
    components: {
        Loading: loading
    },
    data() {
        return {
            dialog: false,
            name: '',
            description: ''
        }
    },
    methods: {
        addMagazine() {
            this.$refs.childLoading.openDialog();
            const db = firebaseClient.db();
            db.collection(`users/${this.$store.getters.user.uid}/magazines`).doc(uuid()).set({
                uid: this.$store.getters.user.uid,
                name: this.name,
                description: this.description,
                create_on: new Date()
            })
            .then(() => {
                this.$refs.childLoading.closeDialog();
                this.dialog = false;
                this.clear();
            })
            .catch(err => {
                this.$refs.childLoading.closeDialog();
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