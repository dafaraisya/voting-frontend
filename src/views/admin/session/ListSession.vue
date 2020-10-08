<template>
  <div class="listsessions">
    <div class="container text-left">
      <h1 class="text-center">List Session</h1>
      <router-link :to="{name:'CreateSession'}">
        <b-button variant="primary" class="mb-2">Buat sesi</b-button>
      </router-link>
      <table class="table">
        <thead>
            <tr>
                <th>No</th>
                <th>Mulai</th>
                <th>Berakhir</th>
                <th>Jumlah peserta</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(session, index) in sessions" :key="session._id">
                <td> {{ index+1 }} </td>
                <td> {{ session.start }} </td>
                <td> {{ session.end }} </td>
                <td> {{ session.total_participant }} </td>
                <td>
                  <router-link :to="{name:'DetailSession', params:{id:session._id}}">
                    <b-button href="" variant="primary">Detail</b-button>
                  </router-link>
                </td>
            </tr>    
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ListSession',
  data() {
      return {
        sessions : []
      }
  },
  mounted() {
    axios
      .get('http://localhost:3000/api/v1/session/all')
      .then(res => (this.sessions = res.data.data))
      .catch(error => console.log(error))
  }
}
</script>
