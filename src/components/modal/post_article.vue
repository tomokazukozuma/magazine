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
                        <small>*indicates required field</small>
                    </v-flex>
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
                    </div>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
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
import firebase from 'firebase'
import * as uuid from 'uuid/v4';
export default {
    data: () => ({
        dialog: false,
        url: "",
        title: "",
        image: "",
        description: ""
    }),
    methods: {
        crawlArticleInfo() {
            const func = firebase.functions().httpsCallable('crawlArticleInfo');
            func({url: this.url}).then(result => {
                console.log(result.data.title)
                this.title = result.data.title,
                this.image = result.data.ogp["og:image"][0]
                this.description = result.data.ogp["og:description"][0]
            });
        },
        addArticle() {
            const db = firebase.firestore();
            db.collection('articles').doc(uuid()).set({
                title: this.title,
                image: this.image,
                description:this.description,
                create_on: new Date(),
            })
            .catch((err) => {
                console.log(err); // eslint-disable-line no-console
            });
        }
    }
}
</script>