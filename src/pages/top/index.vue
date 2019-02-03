<template>
    <v-content>
        <v-container grid-list-md text-xs-center>
            <v-layout row wrap>
                <v-flex v-for="i in 3" :key="`4${i}`" xs4>
                    <v-card dark color="primary">
                    <v-card-text class="px-0">4</v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

        <v-container justify-center grid-list-md>
            <v-layout>
                <v-flex xs8>
                    <v-container grid-list-md>
                        <v-layout row wrap>
                            <v-flex xs12 v-for="(article, i) in articles" :key="i">
                                <v-card :href="article.url" target="_blank">
                                    <v-img
                                    :src="article.sumbnail"
                                    aspect-ratio="2"
                                    ></v-img>

                                    <v-card-title primary-title>
                                    <div>
                                        <h3 class="headline mb-0">{{ article.title }} ...</h3>
                                        <div>{{article.content}} ...</div>
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
                                            <h3 class="headline mb-0">{{ magazine.name }} ...</h3>
                                            <div>{{magazine.explain}} ...</div>
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
                    'id': doc.id,
                    'uid': doc.data().uid,
                    'name': doc.data().name,
                    'explain': doc.data().explain,
                    'create_on': doc.data().create_on,
                }
                this.magazines.push(data)
            });
        });
    }
}
</script>