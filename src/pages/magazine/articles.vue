<template>
    <v-content>
        <v-container justify-center grid-list-md>
            <v-layout row wrap>
                <v-flex xs12 sm6 md4 v-for="(article, i) in articles" :key="i">
                    <router-link v-bind:to="{ name : 'Article', params : { articleId: article.id }}">
                    <v-card :href="article.link" target="_blank">
                        <v-img
                        :src="article.sumbnail"
                        aspect-ratio="1.75"
                        ></v-img>

                        <v-card-title primary-title>
                        <div>
                            <h3 class="mb-0"><p class="description">{{ article.title }}</p></h3>
                            <div><p class="description">{{article.content}}</p></div>
                            <div>{{article.date}}</div>
                        </div>
                        </v-card-title>
                    </v-card>
                    </router-link>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
import firebaseClient from '../../firebase_client'
export default {
    data () {
        return {
            articles: []
        }
    },
    mounted() {
        const db = firebaseClient.db();
        db.collection(`magazines/${this.$route.params.magazineId}/articles`)
        .get()
        .then(querySnapshot => {
            // const articles = []
            querySnapshot.forEach(doc => {
                let data = {
                    'id': doc.id,
                    'sumbnail': doc.data().image,
                    'content': doc.data().description,
                    'create_on': doc.data().create_on,
                    'title': doc.data().title
                }
                this.articles.push(data)
            });
            // this.articles = articles;
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
