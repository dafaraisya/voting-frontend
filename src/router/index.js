import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ListParticipant from '../views/admin/ListParticipant.vue'
import CreateParticipant from '../views/admin/CreateParticipant.vue'
import EditParticipant from '../views/admin/EditParticipant.vue'
import ParticipantDetails from '../views/admin/ParticipantDetails.vue'
import Generate from '../views/Generate.vue'
import Scan from '../views/Scan.vue'

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
    path: '/:id/edit',
    name: 'EditParticipant',
    component: EditParticipant
  },
  {
    path: '/:id',
    name: 'ParticipantDetails',
    component: ParticipantDetails
  },
  {
    path: '/generate',
    name: 'Generate',
    component: Generate
  },
  {
    path: '/scan',
    name: 'Scan',
    component: Scan
  }
]

const router = new VueRouter({
  routes
})

export default router
