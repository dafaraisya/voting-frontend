import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// Admin
import HomeAdmin from '../views/admin/Home.vue'
import IndexParticipant from '../views/admin/participant/IndexParticipant.vue'
import ListParticipant from '../views/admin/participant/ListParticipant.vue'
import CreateParticipant from '../views/admin/participant/CreateParticipant.vue'
import EditParticipant from '../views/admin/participant/EditParticipant.vue'
import DetailParticipant from '../views/admin/participant/DetailParticipant.vue'
import IndexCandidate from '../views/admin/candidate/IndexCandidate.vue'
import ListCandidate from '../views/admin/candidate/ListCandidate.vue'
import CreateCandidate from '../views/admin/candidate/CreateCandidate.vue'
import EditCandidate from '../views/admin/candidate/EditCandidate.vue'
import DetailCandidate from '../views/admin/candidate/DetailCandidate.vue'
// Voting
import Generate from '../views/Generate.vue'
import HomeVote from '../views/vote/Home.vue'
import Scan from '../views/vote/Scan.vue'
import Voting from '../views/vote/Voting.vue'
import Announcement from '../views/vote/Announcement.vue'

Vue.use(VueRouter)
Vue.use(Vuex);

export const store = new Vuex.Store(
  {
      state: {
          authenticated: false
      },
      mutations: {
          setAuthentication(state, status) {
              state.authenticated = status;
          }
      }
  }
);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'admin',
    component: HomeAdmin,
    children: [
      {
        path: 'participant',
        name: 'participant',
        component: IndexParticipant,
        children: [
          {
            path: '',
            name: 'ListParticipant',
            component: ListParticipant,
          },
          {
            path: 'add',
            name: 'CreateParticipant',
            component: CreateParticipant
          },
          {
            path: 'edit/:id',
            name: 'EditParticipant',
            component: EditParticipant
          },
          {
            path: ':id',
            name: 'ParticipantDetail',
            component: DetailParticipant
          },
        ]
      },
      {
        path: 'candidate',
        name: 'candidate',
        component: IndexCandidate,
        children: [
          {
            path: '',
            name: 'ListCandidate',
            component: ListCandidate,
          },
          {
            path: 'add',
            name: 'CreateCandidate',
            component: CreateCandidate
          },
          {
            path: 'edit/:id',
            name: 'EditCandidate',
            component: EditCandidate
          },
          {
            path: ':id',
            name: 'DetailCandidate',
            component: DetailCandidate
          },
        ]
      }
    ] 
  },
  {
    path: '/generate',
    name: 'Generate',
    component: Generate
  },
  {
    path: '/vote',
    name: 'vote',
    component: HomeVote,
    children: [
      {
        path: 'scan',
        name: 'Scan',
        component: Scan
      },
      {
        path: 'voting/:id',
        name: 'Voting',
        component: Voting,
        beforeEnter: (to, from, next) => {
          if(store.state.authenticated == false) {
              next({ name: 'Scan'});
          } else {
              next();
          }
        }
      },
      {
        path: 'announcement',
        name: 'Announcement',
        component: Announcement
      }
    ] 
  }
]

export const router = new VueRouter({
  routes,
  mode: 'history'
})

// export default router
