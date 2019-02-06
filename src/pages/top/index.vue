<template>
    <v-content>
        <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
                <v-flex xs4>
                    <v-card dark color="primary">
                    <v-card-text class="px-0">New</v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs4>
                    <v-card dark color="primary">
                    <v-card-text class="px-0">Recommend</v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xs4>
                    <v-card dark color="primary">
                    <v-card-text class="px-0">Magazine</v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

        <v-container justify-center grid-list-md>
            <v-layout>
                <v-flex xs8>
                    <v-container grid-list-md>
                        <v-layout row wrap>
                            <v-flex xs6 v-for="(article, i) in articles" :key="i">
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
                        </v-layout>
                    </v-container>
                </v-flex>
                <v-flex xs4>
                    <v-container grid-list-md>
                        <v-layout row wrap>
                            <v-flex xs12 v-for="(magazine, i) in magazines" :key="i">
                                <router-link v-bind:to="{ name : 'MagazineArticles', params : { magazineId: magazine.id }}">
                                    <v-card>
                                        <v-img
                                        :src="magazine.sumbnail"
                                        aspect-ratio="1.75"
                                        ></v-img>

                                        <v-card-title primary-title>
                                        <div>
                                            <h3 class="mb-0"><p class="description">{{ magazine.name }}</p></h3>
                                            <div><p class="description">{{magazine.description}}</p></div>
                                        </div>
                                        </v-card-title>
                                    </v-card>
                                </router-link>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>
            </v-layout>
            <router-view></router-view>
        </v-container>
    </v-content>
</template>

<script>
import firebaseClient from '../../firebase_client'
export default {
    data () {
        return {
            articles: [],
            magazines: []
        }
    },
    mounted() {
        const db = firebaseClient.db();
        db.collection("articles")
        .get()
        .then((querySnapshot) => {
            const articles = []
            querySnapshot.forEach(doc => {
                let data = {
                    id: doc.id,
                    sumbnail: doc.data().image,
                    content: doc.data().description,
                    create_on: doc.data().create_on,
                    title: doc.data().title,
                    url: doc.data().url
                }
                articles.push(data)
            });
            this.articles = articles;
        });

        db.collection("magazines")
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach(doc => {
                let data = {
                    id: doc.id,
                    uid: doc.data().uid,
                    name: doc.data().name,
                    description: doc.data().description,
                    create_on: doc.data().create_on,
                }
                this.magazines.push(data)
            });
        });
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
