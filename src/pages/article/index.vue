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
                    <v-btn color="blue darken-1" flat @click="addMagazine">登録</v-btn>
                    </v-card-actions>
                </v-flex>
                <v-flex xs12>
                    <v-card>
                        <v-list three-line>
                        <template v-for="(item, index) in items">
                            <v-subheader
                            v-if="item.header"
                            :key="item.header"
                            >
                            {{ item.header }}
                            </v-subheader>

                            <v-divider
                            v-else-if="item.divider"
                            :key="index"
                            :inset="item.inset"
                            ></v-divider>

                            <v-list-tile
                            v-else
                            :key="item.title"
                            avatar
                            @click=""
                            >
                            <v-list-tile-avatar>
                                <img :src="item.avatar">
                            </v-list-tile-avatar>

                            <v-list-tile-content>
                                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                <v-list-tile-sub-title v-html="item.subtitle"></v-list-tile-sub-title>
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
import firebaseClient from '../../firebase_client'
export default {
    data () {
        return {
            article: {},
            items: [
                { header: 'Today' },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
                    title: 'Brunch this weekend?',
                    subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
                },
                { divider: true, inset: true },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
                    title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
                    subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend."
                },
                { divider: true, inset: true },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
                    title: 'Oui oui',
                    subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?"
                },
                { divider: true, inset: true },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
                    title: 'Birthday gift',
                    subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?"
                },
                { divider: true, inset: true },
                {
                    avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
                    title: 'Recipe to try',
                    subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
                }
            ]
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