<template>
    <v-content>
        <v-container justify-center>
            <v-layout row wrap>
                <v-flex xs12 sm6 md4 v-for="(magazine, i) in magazines" :key="i">
                    <v-card :href="magazine.link" target="_blank">
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
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
    import firebase from '../../firebase'
    

    export default {
        data () {
            return { magazines: [] }
        },
        mounted () {
            const db = firebase.db();
            db.collection("magazines").where("uid", "==", this.$route.params.uid)
            .get()
            .then((querySnapshot) => {
                console.log(querySnapshot.docs)
                querySnapshot.forEach(function(doc) {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                });
                this.magazines = querySnapshot.docs.map(elem => elem.data());
                console.log(this.magazines)
            })
;        },
    }
</script>