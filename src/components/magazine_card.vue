<template>
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
</template>

<script>
export default {
    props: ["magazine"]
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
