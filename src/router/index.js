import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ListParticipant from '../views/admin/ListParticipant.vue'
import CreateParticipant from '../views/admin/CreateParticipant.vue'
import EditParticipant from '../views/admin/EditParticipant.vue'
import DetailParticipant from '../views/admin/DetailParticipant.vue'
import Scan from '../views/voting/Scan.vue'
import ListCandidate from '../views/voting/ListCandidate.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/listparticipant',
    name: 'ListParticipant',
    component: ListParticipant
  },
  {
    path: '/tambahlistparticipant',
    name: 'CreateParticipant',
    component: CreateParticipant
  },
  {
    path: '/edit/:id',
    name: 'EditParticipant',
    component: EditParticipant
  },
  {
    path: '/details/:id',
    name: 'DetailParticipant',
    component: DetailParticipant
  },
  {
    path: '/scan',
    name: 'Scan',
    component: Scan
  },
  {
    path: '/listcandidate',
    name: 'ListCandidate',
    component: ListCandidate
  },
]

const router = new VueRouter({
  routes
})

export default router
