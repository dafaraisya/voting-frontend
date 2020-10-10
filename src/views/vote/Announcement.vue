<template>
  <div class="announcement">
    <div class="container">
      <img src="" alt="">
      <h1 class="text-white tittle">HASIL PEROLEHAN PERHITUNGAN SUARA</h1>
      <h5 class="text-left mt-5">Perolehan Suara Tiap Calon</h5>
      <hr>
      <div class="mb-3" v-for="candidate in candidates" :key="candidate._id">
        <b-card :title="candidate.name" class="card">
          <b-card-text>
            {{ 'Persentase Perolehan Suara :'+ candidate.total_vote*100/total_vote +'%' }}
            <br>
            {{ 'Jumlah Perolehan Suara :' +candidate.total_vote }}
          </b-card-text>
        </b-card>
      </div>
      <div class="mb-3">
        <b-card title="Total Suara yang Masuk" class="card">
          <b-card-text>{{ total_vote }} suara</b-card-text>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  name: 'Announcement',
  data() {
    return {
      candidates: [],
      total_vote: 0,
    }
  },
  methods: {
    totalVote(){
      this.total_vote = this.candidates.reduce((acc, item) => acc + item.total_vote, 0)
    }
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/v1/candidate/all")
      .then(res => {
        this.candidates = res.data.data;
        this.totalVote();
      })
      .catch(error => console.log(error)); 
  }
}
</script>
<style scoped>
.tittle, h1 {
    margin-top: 20px;
    font-weight: bold;
}
.card {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
}
hr {
  color: black;
}
</style>
