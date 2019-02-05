<template>
    <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
        <span slot="activator" color="black" dark>投稿</span>
        <v-card>
            <v-card-title>
                <span class="headline">取得記事</span>
            </v-card-title>
            <v-card-text>
                <v-container grid-list-md>
                    <v-layout wrap>
                    <v-flex xs12>
                        <v-text-field label="url*" required v-model="url"></v-text-field>
                    </v-flex>
                    <small>*必須</small>
                    <div v-if="image!==''">
                        <v-card>
                            <v-flex xs12>
                                <v-img
                                    :src="image"
                                    aspect-ratio="1.75"
                                ></v-img>
                            </v-flex>
                            <v-flex xs12>
                                <v-card-title primary-title>
                                    <div>
                                        <h3 class="headline mb-0">{{this.title}}</h3>
                                        <div>{{this.description}}</div>
                                    </div>
                                </v-card-title>
                            </v-flex>
                        </v-card>
                        <v-flex xs12>
                            <v-select
                                v-model="magazineId"
                                v-bind:items="magazines"
                                label="Magazine*"
                                required
                            ></v-select>
                        </v-flex>
                    </div>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="clear(); dialog = false">キャンセル</v-btn>
            <div v-if="image===''">
                <v-btn color="blue darken-1" flat @click="crawlArticleInfo">取得</v-btn>
            </div>
            <div v-else>
                <v-btn color="blue darken-1" flat @click="addArticle">登録</v-btn>
            </div>
            </v-card-actions>
        </v-card>
    </v-dialog>
    </v-layout>
</template>

<script>
import firebase from 'firebase';
import firebaseClient from '../../firebase_client';
import * as uuid from 'uuid/v4';
import crypto from'crypto';

function md5hex(str) {
  const md5 = crypto.createHash('md5')
  return md5.update(str, 'binary').digest('hex')
}

export default {
    data: () => ({
        dialog: false,
        url: "",
        title: "",
        image: "",
        description: "",
        magazineId: "",
        magazines: []
    }),
    mounted() {
        const db = firebaseClient.db();
        db.collection("magazines").where("uid", "==", this.$store.getters.user.uid)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                this.magazines.push({
                    value: doc.id,
                    text: doc.data().name
                });
            });
        });
    },
    methods: {
        crawlArticleInfo() {
            const func = firebase.functions().httpsCallable('crawlArticleInfo');
            func({url: this.url}).then(result => {
                this.title = result.data.title,
                this.image = result.data.ogp["og:image"][0]
                this.description = result.data.ogp["og:description"][0]
            });
        },
        addArticle() {
            const db = firebaseClient.db();
            db.collection(`magazines/${this.magazineId}/articles`).doc(md5hex(this.url)).set({
                url: this.url,
                title: this.title,
                image: this.image,
                description:this.description,
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
            this.url = '',
            this.image = ''
        }
    }
}
</script>