<template>
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
</template>

<script>
export default {
    props: ["article"]
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
