import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Logout from '../views/Logout.vue'
import AddPost from '../views/AddPost.vue'
import DetailedPost from '../views/DetailedPost.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },

  {
    path: '/logout',
    name: 'logout',
    component: Logout
  },

  {
    path: '/submit',
    name: 'submit',
    component: AddPost
  },
  {
    path: '/p/:id',
    name: 'post',
    component: DetailedPost
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router