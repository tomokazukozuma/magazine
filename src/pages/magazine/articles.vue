<template>
    <v-content>
        <v-container justify-center grid-list-md>
            <v-layout row wrap>
                <v-flex xs12 sm6 md4 v-for="(article, i) in articles" :key="i">
                    <v-card :href="article.link" target="_blank">
                        <v-img
                        :src="article.sumbnail"
                        aspect-ratio="1.75"
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
    </v-content>
</template>

<script>
import firebase from '../../firebase'
export default {
    data () {
        return {
            articles: []
        }
    },
    mounted() {
        const db = firebase.db();
        db.collection("articles").where("magazineId", "==", this.$route.params.magazineId)
        .get()
        .then((querySnapshot) => {
            const articles = []
            querySnapshot.forEach((doc) => {
                let data = {
                    'id': doc.id,
                    'sumbnail': doc.data().image,
                    'content': doc.data().description,
                    'create_on': doc.data().create_on,
                    'title': doc.data().title
                }
                articles.push(data)
            });
            this.articles = articles;
        });
    }
}
</script>