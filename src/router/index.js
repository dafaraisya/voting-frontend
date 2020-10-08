import Vue from 'vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import HomeAdmin from '../views/admin/Home.vue'
import IndexSession from '../views/admin/session/IndexSession.vue'
import ListSession from '../views/admin/session/ListSession.vue'
import CreateSession from '../views/admin/session/CreateSession.vue'
import EditSession from '../views/admin/session/EditSession.vue'
import DetailSession from '../views/admin/session/DetailSession.vue'
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
import Generate from '../views/Generate.vue'
import Scan from '../views/Scan.vue'
import ListCandidateVoting from '../views/ListCandidateVoting.vue'

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
            name: 'DetailParticipant',
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
      },
      {
        path: 'session',
        name: 'session',
        component: IndexSession,
        children: [
          {
            path: '',
            name: 'ListSession',
            component: ListSession,
          },
          {
            path: 'add',
            name: 'CreateSession',
            component: CreateSession
          },
          {
            path: 'edit/:id',
            name: 'EditSession',
            component: EditSession
          },
          {
            path: ':id',
            name: 'DetailSession',
            component: DetailSession
          },
        ]
      },
    ] 
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
  },
  {
    path: '/listcandidate',
    name: 'ListCandidateVoting',
    component: ListCandidateVoting,
    beforeEnter: (to, from, next) => {
      if(store.state.authenticated == false) {
          next({ name: 'Scan'});
      } else {
          next();
      }
    }
  }
]

export const router = new VueRouter({
  routes,
  mode: 'history'
})

// export default router
