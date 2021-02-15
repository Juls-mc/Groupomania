import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../components/Auth.vue'
import Accueil from '../components/Accueil.vue'
import Profil from '../components/Profil.vue'
import Forum from '../components/Forum.vue'
import Post from '../components/FormPost.vue'
import Moderation from '../components/Moderation.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Auth',
    component: Auth
  },
  {
    path: '/Accueil',
    name: 'Accueil',
    component: Accueil
  },
  {
    path: '/Accueil/Profil',
    name: 'Profil',
    component: Profil
  },
  {
    path: '/Accueil/Forum',
    name: 'Forum',
    component: Forum
  },
  {
    path: '/Accueil/Forum/Post',
    name: 'Post',
    component: Post
  },
  {
    path: '/Accueil/Moderation',
    name: 'Moderation',
    component: Moderation
  },
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router