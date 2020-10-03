<template>
  <div class="generate">
      <Header/>
      <h1>Generate qr code</h1>
      <div v-for="participant in participants" :key="participant._id">
        <vue-qr :text="participant.nim" :callback="test" qid="testid"></vue-qr>
        <h5>{{ participant.name }}</h5>
        <h5>{{ participant.nim }}</h5>
        <h5>{{ participant.email }}</h5>
        <br>
      </div>
      <!-- <input type="text" v-model="nim">
      <h1>{{ nim }}</h1> -->
      
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

import VueQr from 'vue-qr'
import axios from 'axios'

export default {
  name: 'Generate',
  components: {
    Header,
    VueQr
  },
  data() {
      return {
        participants : []
      }
  },
  methods:{
      test(dataUrl,id){
          console.log(dataUrl, id)
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
