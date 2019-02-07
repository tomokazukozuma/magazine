<template>
    <v-content>
        <v-container justify-center grid-list-md>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card :href="article.url" target="_blank">
                        <v-img
                        :src="article.sumbnail"
                        aspect-ratio="2"
                        ></v-img>

                        <v-card-title primary-title>
                        <div>
                            <h3 class="mb-0"><p class="description">{{ article.title }}</p></h3>
                            <div><p class="description">{{article.content}}</p></div>
                            <div>{{article.date}}</div>
                        </div>
                        </v-card-title>
                    </v-card>
                </v-flex>
                <v-flex xs12>
                    <v-card-text>
                        <v-text-field
                        label="コメント"
                        required
                        v-model="comment"
                        ></v-text-field>
                    </v-card-text>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="addComment">登録</v-btn>
                    </v-card-actions>
                </v-flex>
                <v-flex xs12>
                    <v-card>
                        <v-list three-line>
                        <template v-for="(item) in comments">


                            <v-list-tile
                            :key="item.comment"
                            avatar
                            >
                            <v-list-tile-avatar>
                                <img :src="item.user.photo_url">
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-title v-html="item.comment"></v-list-tile-title>
                            </v-list-tile-content>
                            </v-list-tile>
                        </template>
                        </v-list>
                    </v-card>
                    </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
import firebase from 'firebase';
import firebaseClient from '../../firebase_client';

export default {
    data () {
        return {
            article: {},
            comments: [],
            comment: ''
        }
    },
    mounted() {
        const db = firebaseClient.db();
        db.collection("articles")
        .doc(this.$route.params.articleId)
        .get()
        .then((doc) => {
            this.article= {
                id: doc.id,
                sumbnail: doc.data().image,
                content: doc.data().description,
                create_on: doc.data().create_on,
                title: doc.data().title,
                url: doc.data().url
            }
        });

        this.getComment();
    },
    methods: {
        addComment() {
            const func = firebase.functions().httpsCallable('addComment');
            func({articleId: this.$route.params.articleId, comment: this.comment})
            .then(() => {
                this.clear();
                this.getComment();
            });
        },
        clear () {
            this.comment = '';
        },
        getComment() {
            this.comments = [];
            const db = firebaseClient.db();
            db.collection(`articles/${this.$route.params.articleId}/comments`)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach(doc => {
                    let data = {
                        id: doc.id,
                        user: doc.data().user,
                        comment: doc.data().comment,
                        create_on: doc.data().create_on
                    }
                    this.comments.push(data);
                });
            });
        }
    }
}
</script>

<style scoped>
p.description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}
</style>