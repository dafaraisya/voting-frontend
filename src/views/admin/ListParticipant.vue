<template>
  <div class="listparticipants">
    <Header/>
    <div class="container">
      <h1>List Participant</h1>
      <router-link :to="'tambahlistparticipant'">
        <b-button variant="primary" class="mb-2">Tambah Partisipan</b-button>
      </router-link>
      <table class="table">
        <thead>
            <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Nim</th>
                <th>Email</th>
                <th>Detail</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(participant, index) in participants" :key="participant._id">
                <td scope="row">{{ index+1 }}</td>
                <td> {{ participant.name }} </td>
                <td> {{ participant.nim }} </td>
                <td> {{ participant.email }} </td>
                <td>
                  <router-link :to="participant._id">
                    <b-button href="" variant="primary">Details</b-button>
                  </router-link>
                </td>
            </tr>    
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'

import axios from 'axios'

export default {
  name: 'ListParticipant',
  components: {
    Header
  },
  data() {
      return {
        participants : []
      }
  },
  mounted() {
    axios
      .get('http://localhost:3000/api/v1/participant/all')
      .then(res => (this.participants = res.data.data))
      .catch(error => console.log(error))
  }
}
</script>
