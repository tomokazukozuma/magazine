<template>
    <v-content>
        <v-container justify-center>
            <form>
                <v-text-field
                v-validate="'required|max:20'"
                v-model="name"
                :counter="10"
                :error-messages="errors.collect('name')"
                label="マガジン名"
                data-vv-name="name"
                required
                ></v-text-field>
                <v-text-field
                v-validate="'required|max:100'"
                v-model="explain"
                :error-messages="errors.collect('explain')"
                label="説明文"
                data-vv-name="explain"
                required
                ></v-text-field>

                <v-btn @click="submit">登録</v-btn>
                <v-btn @click="clear">クリア</v-btn>
            </form>
        </v-container>
    </v-content>
</template>
<script>
    import firebase from 'firebase'
    import Vue from 'vue'
    import VeeValidate from 'vee-validate'

    Vue.use(VeeValidate)

    export default {
        $_veeValidate: {
        validator: 'new'
        },

        data: () => ({
        name: '',
        explain: '',
        dictionary: {
            attributes: {
                explain: 'E-mail Address'
                // custom attributes
            },
            custom: {
                name: {
                    required: () => 'マガジン名を入力してください',
                    max: 'マガジン名は20文字以内です'
                },
                explain: {
                    required: () => 'マガジンの説明が空です',
                    max: '説明文は100文字以内です'
                }
            }
        }
        }),

        mounted () {
        this.$validator.localize('en', this.dictionary)
        },

        methods: {
        submit () {
            this.$validator.validateAll()
            const func = firebase.functions().httpsCallable('addMagazine');
            func({name: this.name, explain: this.explain}).then(function(result) {
                console.log("success")
            });
        },
        clear () {
            this.name = ''
            this.explain = ''
            this.$validator.reset()
        }
        }
    }
</script>