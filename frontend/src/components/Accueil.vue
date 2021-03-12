<template>
    <v-app id="homePage">
        <top-header/>
        <router-view></router-view>
           <div id= "headTitle">
                <h1>Bienvenue sur l'intranet de Groupomania !</h1>
            </div>      
    </v-app>
</template>

<script>
import Header from "./Header"
export default {
    name: "Accueil",
    
    components: {
        "top-header": Header,
    },
}
</script>
<style lang="scss">
    #homePage{
        background-image: url("../assets/images/openspace.jpg");
        background-repeat: no-repeat;
        background-size: cover;
    }
    h1{
        padding-top: 10%;
    }
     #logo{
        width: 20%;
        margin-left: 50%;
        padding-bottom: 0;
    }
 
    @media screen and (min-width: 200px) and (max-width: 640px) {
    
    #headTitle{
        width: 60%;
        margin-left: 20%;
    }
    h1{
        font-size: 1.2em;
    }
}
</style>