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
            articles: [
                {
                    title: 'Vue.js を vue-cli を使ってシンプルにはじめてみる',
                    content: 'React.jsやAngluarやたくさんあるJavaScriptフレームワーク。けっきょく何を使おうか悩んだ結果',
                    sumbnail: 'https://public-constructor.com/wp-content/uploads/2018/09/wave-3361029_1280.jpg',
                    date: '2018-10-11',
                    link: 'https://qiita.com/567000/items/dde495d6a8ad1c25fa43'
                },
                {
                    title: '【Vue.js】Vue CLI 3系のインストール方法',
                    content: '今回は”Vue.js”アプリの開発に使用する公式ツール、「Vue CLI」のインストール方法を紹介し',
                    sumbnail: 'https://public-constructor.com/wp-content/uploads/2018/09/wave-3361029_1280.jpg',
                    date: '2018-11-27',
                    link: 'https://public-constructor.com/vue-cli3-installation/'
                },
                {
                    title: 'Vue CLI 3をわずか10分でセットアップする方法',
                    content: 'わずか10分でセットアップできてしまうVue CLI 3。そんなVue CLI 3の情報がまだまだ少ないの',
                    sumbnail: 'https://pizzamanz.net/wp-content/uploads/2018/08/Vue_cli_3.png',
                    date: '2018-09-12',
                    link: 'https://pizzamanz.net/web/vue/vue-cli-3/'
                },
                {
                    title: 'Vuetify.js でお手軽マテリアルデザイン + Atomic Design',
                    content: '最近、フロントエンドエンジニア・デザイナー不在のプライベートな開発において、フロントサイド',
                    sumbnail: 'https://public-constructor.com/wp-content/uploads/2018/09/wave-3361029_1280.jpg',
                    date: '2017-12-19',
                    link: 'https://blog.okashoi.net/entry/2017/12/19/103549'
                },
                {
                    title: 'Vuetifyのグリッドシステムの属性について',
                    content: '仕事でVuetifyを使うことになったが、グリッドシステムの属性の部分の説明がない箇所が多く、正直',
                    sumbnail: 'https://public-constructor.com/wp-content/uploads/2018/09/wave-3361029_1280.jpg',
                    date: '2018-07-29',
                    link: 'https://qiita.com/nulltemp/items/07c6998a4ad8927a9b54'
                },
                {
                    title: 'Windows10（WSL使用）でVue.jsアプリを作成するま',
                    content: 'こんにちは、平奥です！最近のフロントエンド開発では、シングルページアプリケーション( SPA )',
                    sumbnail: 'https://public-constructor.com/wp-content/uploads/2018/09/wave-3361029_1280.jpg',
                    date: '2017-06-12',
                    link: 'http://www.techscore.com/blog/2017/06/12/vue-cli-%E3%82%92%E4%BD%BF%E3%81%A3%E3%81%A6%E3%80%81%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E9%96%93%E3%81%A7%E3%83%87%E3%83%BC%E3%82%BF%E3%81%AE%E5%8F%97%E3%81%91%E6%B8%A1/'
                },
                {
                    title: 'WHow to build a Single Page Application using Vue.js,',
                    content: 'Do you want to learn how to use Vue.js? Want to create a realistic website using Vue.js? In this',
                    sumbnail: 'https://public-constructor.com/wp-content/uploads/2018/09/wave-3361029_1280.jpg',
                    date: '2018-11-24',
                    link: ',https://medium.freecodecamp.org/how-to-build-a-single-page-application-using-vue-js-vuex-vuetify-and-firebase-838b40721a07'
                }
            ]
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
                    'uid': doc.data().uid,
                    'name': doc.data().name,
                    'explain': doc.data().explain,
                    'create_on': doc.data().create_on,
                    'slug': doc.data().slug
                }
                articles.push(data)
            });
            this.articles = articles;
        });
    }
}
</script>