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
                <v-flex xs12>
                    <span>{{this.title}}</span>
                </v-flex>
                <v-flex xs12>
                    <span>{{this.description}}</span>
                </v-flex>
                <v-flex xs12>
                    <v-img
                        :src="image"
                        aspect-ratio="1"
                    ></v-img>
                </v-flex>
                </v-layout>
            </v-container>
            <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click="crawlArticleInfo">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </v-layout>
</template>


<script>
import firebase from 'firebase'

export default {
    data: () => ({
        dialog: false,
        url: "",
        title: "",
        image: "",
        description: ""
    }),
    methods: {
        crawlArticleInfo () {
            console.log(this.url)
            const func = firebase.functions().httpsCallable('crawlArticleInfo');
            func({url: this.url}).then(result => {
                console.log(result.data.title)
                this.title = result.data.title,
                this.image = result.data.ogp["og:image"][0]
                this.description = result.data.ogp["og:description"][0]
            });
        },
        
    }
}
</script>