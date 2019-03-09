<template>
    <v-content>
        <v-container justify-center grid-list-md>
            <v-layout row wrap>
                <v-flex xs12 sm6 md4 v-for="(article, i) in articles" :key="i">
                    <ArticleCard v-bind:article="article"/>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
import articleCard from '../../components/article_card'
import firebaseClient from '../../firebase_client'
import moment from 'moment'
export default {
    components: {
        ArticleCard: articleCard
    },
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
            querySnapshot.forEach(doc => {
                let data = {
                    'id': doc.id,
                    'sumbnail': doc.data().image,
                    'content': doc.data().description,
                    'create_on': moment(doc.data().create_on.toDate()).locale('ja').fromNow(),
                    'title': doc.data().title
                }
                this.articles.push(data)
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
