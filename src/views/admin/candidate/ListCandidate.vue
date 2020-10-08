<template>
  <div class="listparticipants">
    <div class="container text-left">
      <h1 class="text-center">Daftar Kandidat</h1>
      <router-link :to="{name:'CreateCandidate'}">
        <b-button variant="primary" class="mb-2">Tambah Kandidat</b-button>
      </router-link>
      <table class="table">
        <thead>
            <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Nomor urut</th>
                <th>Deskripsi</th>
                <th>Detail</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(candidate, index) in candidates" :key="candidate._id">
                <td scope="row">{{ index+1 }}</td>
                <td> {{ candidate.name }} </td>
                <td> {{ candidate.number }} </td>
                <td v-html="candidate.description.short"></td>
                <td>
                  <router-link :to="{name:'DetailCandidate', params: {id: candidate._id}}">
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
  name: 'ListCandidate',
  data() {
      return {
        candidates : []
      }
  },
  mounted() {
    axios
      .get('http://localhost:3000/api/v1/candidate/all')
      .then(res => (this.candidates = res.data.data))
      .catch(error => console.log(error))
  }
}
</script>
