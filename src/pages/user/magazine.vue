<template>
    <v-content>
        <v-container justify-center grid-list-md>
            <v-layout row wrap>
                <v-flex xs12 sm6 md4 v-for="(magazine, i) in magazines" :key="i">
                    <router-link v-bind:to="{ name : 'MagazineArticles', params : { magazineId: magazine.id }}">
                        <v-card>
                            <v-img
                            :src="magazine.sumbnail"
                            aspect-ratio="1.75"
                            ></v-img>

                            <v-card-title primary-title>
                            <div>
                                <h3 class="mb-0">{{ magazine.name }}</h3>
                                <div>{{magazine.description}}</div>
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
            return { magazines: [] }
        },
        mounted () {
            const db = firebaseClient.db();
            db.collection(`users/${this.$store.getters.user.uid}/magazines`)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    let data = {
                        'id': doc.id,
                        'uid': doc.data().uid,
                        'name': doc.data().name,
                        'description': doc.data().description,
                        'create_on': doc.data().create_on,
                    }
                    console.log(data)
                    this.magazines.push(data)
                });
            });
        }
    }
</script>