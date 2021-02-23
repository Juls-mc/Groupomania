<template>
    <v-app id="auth">
        <v-container class="auth">
            <div class="logo">
                <v-img src="../assets/icon-above-font.png" id ="logoPng"></v-img>
            </div>  
            <div class="auth__boutons">
                <v-btn class="auth__boutons--ind" color="black white--text" @click="component='signup'">S'inscrire</v-btn>
                <v-btn class="auth__boutons--ind" color="black white--text white--hover" @click="component='login'">Se connecter</v-btn>
            </div>
            <component v-bind:is="component"></component>
        </v-container>
    </v-app>
</template>

<script>
    import Signup from "./Signup.vue"
    import Login from "./Login.vue"
    export default {
        name : "Auth",
        data(){
            return{
                component: ""
            }
        },
        
        components: {
            'login': Login,
            'signup': Signup
        }
    }
</script>

<style lang="scss">
    #auth {
        display: flex;
        flex-direction: row;
        background-size: cover;
    }
    .auth {
            &__boutons{
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                align-items: center;
                margin-bottom: 2%;
                &--ind{
                    margin-top: 5%;
                    width: 150px ;
                    
                }
        }
    }
    #logoPng {
        width: 30%;
    }
    
</style>