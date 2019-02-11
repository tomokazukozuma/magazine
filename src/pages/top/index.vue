<template>
    <v-content>
        <v-container justify-center grid-list-md>
            <v-layout>
                <v-flex xs8>
                    <v-layout justify-start subheading font-weight-black>最新記事</v-layout>
                    <v-container grid-list-md>
                        <v-layout row wrap>
                            <v-flex xs6 v-for="(article, i) in articles" :key="i">
                                <router-link v-bind:to="{ name : 'Article', params : { articleId: article.id }}">
                                <v-card :href="article.url" target="_blank">
                                    <v-img
                                    :src="article.sumbnail"
                                    aspect-ratio="2"
                                    ></v-img>

                                    <v-card-title primary-title>
                                    <div>
                                        <h3><p class="title">{{ article.title }}</p></h3>
                                        <div><p class="description">{{article.content}}</p></div>
                                        <v-layout row wrap>
                                            <v-flex xs6>
                                                <div>{{article.create_on}}</div>
                                            </v-flex>
                                            <v-flex xs6>
                                                <div>{{article.pickCount}} Picks</div>
                                            </v-flex>
                                        </v-layout>
                                    </div>
                                    </v-card-title>
                                </v-card>
                                </router-link>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>
                <v-flex xs4>
                    <v-layout justify-start subheading font-weight-black>ピックアップマガジン</v-layout>
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
import moment from 'moment'
export default {
    data () {
        return {
            loading: true,
            articles: [],
            magazines: []
        }
    },
    mounted() {
        const db = firebaseClient.db();
        db.collection("articles")
        .orderBy("create_on", "desc")
        .get()
        .then((querySnapshot) => {
            const articles = []
            querySnapshot.forEach(doc => {
                let data = {
                    id: doc.id,
                    sumbnail: doc.data().image,
                    content: doc.data().description,
                    create_on: moment(doc.data().create_on.toDate()).locale('ja').fromNow(),
                    title: doc.data().title,
                    url: doc.data().url,
                    pickCount: doc.data().pickCount
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
p.title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
}

p.description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
}
</style>
