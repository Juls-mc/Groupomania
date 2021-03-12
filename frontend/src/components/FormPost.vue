<template>
    <v-app id="formPost">
        <top-header/>
        <div id= "headTitle">
            <h1 class="ml-12">Forum</h1>
         </div>
        <v-card class="ma-3 ml-12 align-self-center" id="displayCard">
            <v-card-title class="mb-3">
                <h2>Créez votre nouveau post</h2>
            </v-card-title>
            <v-card-text>
                <v-form ref="form" class="ma-3" v-model="valid" >
                    <v-text-field v-model="dataPost.title" color="black" :rules="titleRules" :counter="50" label="Titre" autofocus required></v-text-field>
                    <v-textarea v-model="dataPost.content" color="black" :rules="contentRules" label="Message" required></v-textarea>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn  :disabled="!valid" class="success" @click="createPost">Poster</v-btn>
                <v-btn text href="/Accueil/Forum" color="black">Annuler</v-btn>
            </v-card-actions>
        </v-card>
    </v-app>
</template>
<script>
import axios from "axios"
import Header from "./Header"
export default {
    name: "FormPost",
    data(){
        return{
            valid: true,
            titleRules: [
                v => !!v || 'Le titre est obligatoire.',
                v => (v && v.length <= 100) || 'Le titre doit faire moins de 100 caractères',
            ],
            contentRules: [
                v => !!v || 'Le message est obligatoire.',
            ],
            dataPost:{
                title: "",
                content:"",
                userId: localStorage.userId
            },
            dataPostS: "",
            msg: false,
            message: "",
        }
    },
    methods: {
        createPost(){
            this.dataPostS = JSON.stringify(this.dataPost);
            axios.post("http://localhost:3000/api/posts/", this.dataPostS, {headers: {'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.token}})
                .then(response => {
                    let resp = JSON.parse(response.data);
                    this.message = resp.message;
                    this.msg = true;
                    this.form = false;
                    this.$router.push('/Accueil/Forum')
                    
                })
                .catch(error => {
                    console.log(error); 
                    this.message = error;
                    this.msg = true
                });
        },
    },
    components: {
        "top-header": Header, 
        
    },
}
</script>
<style lang="scss">
    #displayCard {
        width: 50%;
    }
    #formPost {
        background-image: url("../assets/images/openspace.jpg");
        background-repeat: no-repeat;
        background-size: cover;
    }
    #headTitle{
        margin-bottom: 5%;
            #logo{
                width: 20%;
                position: relative;
                margin-left: 80%;
                padding-bottom: 0;
            }
            h1{
                text-align: center;
                margin-top: -5%;
            }
    }
</style>