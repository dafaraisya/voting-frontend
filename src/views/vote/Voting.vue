<template>
  <div class="voting">
    <div class="container text-left">
        <img src="" alt="">
        <h1 class="text-white tittle">PEMIRA HIMATIPA 2020</h1>
        <h4 class="mt-5 mb-5">Halo {{ participant.name }}, Silakan Ketuk Pilih untuk memilih daftar calon dibawah ini</h4>
        
        <b-card v-for="candidate in candidates" :key="candidate._id"
            :img-src="candidate.image"
            img-alt="Card image" 
            img-left 
            class="mb-3"
        >
          <b-card-text>
            <h4>No urut : {{candidate.number}}</h4>
            <h4>Nama : </h4>
            <p>{{candidate.name}}</p>
            <h4>Deskripsi : </h4>
            <p v-html="candidate.description.short"></p>
            <h4>Visi : </h4>
            <p v-html="candidate.description.vision"></p>
            <h4>Misi : </h4>
            <p v-html="candidate.description.mission"></p>
          </b-card-text>
          <b-button @click="vote(candidate._id, candidate.name)" href="#" variant="primary">Pilih</b-button>
        </b-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  name: 'Voting',
  data() {
    return {
      participant : [],
      candidates : []
    }
  },
  methods: {
    vote(id_candidate, name_candidate) {
      if(confirm("Yakin Anda akan memilih "+name_candidate)) {
        let data = {
          'id_participant' : this.participant._id,
          'id_candidate' : id_candidate
        }
        axios
            .put("http://localhost:3000/api/v1/candidate/count", {
              "id" : id_candidate
            })
            .then(() => (
              this.$store.commit("setAuthentication", false)
            ))
            .catch( err => console.log(err));

        axios
            .put("http://localhost:3000/api/v1/participant/vote", data)
            .then(() => (
              this.$router.push({ name: "Scan" })
            ))
            .catch( err => console.log(err));
      }
    }
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/v1/participant/"+this.$route.params.id)
      .then(res => (this.participant = res.data.data))
      .catch(err => console.log(err));
      
    axios
      .get('http://localhost:3000/api/v1/candidate/all')
      .then(res => (this.candidates = res.data.data))
      .catch(error => console.log(error))
  }
}
</script>
