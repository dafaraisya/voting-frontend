<template>
    <div class="edit-participant">
        <h1>Edit Participant</h1>
        <b-container fluid>
            <b-row>
                <b-col lg="3"></b-col>
                <b-col lg="6">
                    <b-form class="text-left ml-5 mt-4 mr-5">
                        <b-form-group label="Nama lengkap :" label-for="namaLengkap">
                            <b-form-input type="text" id="namaLengkap" aria-describedby="namaHelp" placeholder="Masukan Nama" v-model="dataParticipant.name"></b-form-input>
                        </b-form-group>
                        <b-form-group label="NIM :" label-for="nim">
                            <b-form-input type="text" id="nim" aria-describedby="namaHelp" placeholder="Masukan NIM" v-model="dataParticipant.nim"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Email :" label-for="email">
                            <b-form-input type="text" id="email" aria-describedby="namaHelp" placeholder="Masukan Email" v-model="dataParticipant.email"></b-form-input>
                        </b-form-group>
                        <a @click="editData();" href="#" class="btn btn-primary" type="submit">
                            Ubah Data
                        </a>
                    </b-form>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'EditParticipant',
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
            .then(() => this.$router.push("/admin/participant"))
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
