<template>
    <div class="edit-participant">
        <Header/>
        <h1>Edit Participant</h1>
        <form>
            <div class="form-group">
                <label for="namaLengkap">Nama lengkap</label>
                <input type="text" class="form-control" id="namaLengkap" aria-describedby="namaHelp" v-model="dataParticipant.name">
            </div>
            <div class="form-group">
                <label for="nim">NIM</label>
                <input type="text" class="form-control" id="nim" aria-describedby="namaHelp" v-model="dataParticipant.nim">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="text" class="form-control" id="email" aria-describedby="namaHelp" v-model="dataParticipant.email">
            </div>
            <a @click="editData();" href="#" class="proceed-btn">
                Ubah Data
            </a>
        </form>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'

import axios from 'axios'

export default {
  name: 'EditParticipant',
  components: {
    Header
  },
  data() {
      return {
        dataParticipant: {
            name: '',
            nim: '',
            email: ''
        }
      }
  },
  methods: {
      editData() {
        console.log("clicked");
        let data = {
            'name': this.dataParticipant.name,
            'nim': this.dataParticipant.nim,
            'email': this.dataParticipant.email
        };

        axios
            .put("http://localhost:3000/api/v1/participant/"+this.$route.params.id, data)
            .then(() => this.$router.push("/listparticipant"))
            //eslint-disable-next-line no-console
            .catch( err => console.log(err));
      } 
  },
  mounted() {
    axios
      .get('http://localhost:3000/api/v1/participant/'+this.$route.params.id)
      .then(res => (this.dataParticipant = res.data.data))
      .catch(error => console.log(error))
  }
}
</script>
