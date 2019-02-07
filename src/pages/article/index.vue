<template>
    <v-content>
        <v-container justify-center grid-list-md>
            <v-layout>
                <v-flex xs12>
                    <v-container grid-list-md>
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
                    </v-container>
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
            article: {}
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
            this.magazines.push(data);
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