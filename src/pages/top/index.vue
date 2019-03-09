<template>
    <v-content>
        <v-container justify-center grid-list-md>
            <v-layout>
                <v-flex xs8>
                    <v-layout justify-start subheading font-weight-black>最新記事</v-layout>
                    <v-container grid-list-md>
                        <v-layout row wrap>
                            <v-flex xs6 v-for="(article, i) in articles" :key="i">
                                <ArticleCard v-bind:article="article"/>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>
                <v-flex xs4>
                    <v-layout justify-start subheading font-weight-black>ピックアップマガジン</v-layout>
                    <v-container grid-list-md>
                        <v-layout row wrap>
                            <v-flex xs12 v-for="(magazine, i) in magazines" :key="i">
                                <MagazineCard v-bind:magazine="magazine"/>
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
import articleCard from '../../components/article_card'
import magazineCard from '../../components/magazine_card'
import firebaseClient from '../../firebase_client'
import moment from 'moment'
export default {
    components: {
        ArticleCard: articleCard,
        MagazineCard: magazineCard
    },
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
