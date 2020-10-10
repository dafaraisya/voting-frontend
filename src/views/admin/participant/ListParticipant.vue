<template>
  <div class="container text-left">
    <router-link :to="{name:'CreateParticipant'}">
      <b-button variant="primary" class="mb-2">
        <i class="far fa-plus-square text-white"></i>
        Tambah peserta
      </b-button>
    </router-link>
      <div class="bg-white mt-2 p-3 shadow-sm rounded" v-for="participant in participants" :key="participant._id">
          <div> 
            <h3> {{ participant.name }} </h3>
          </div>
          <div> NIM : {{ participant.nim }} </div>
          <div> Email : {{ participant.email }} </div>
          <div> Sesi : {{ participant.session.number }} </div>
          <div class="mt-3">
            <router-link :to="{name:'DetailParticipant',params:{id:participant._id}}">
              <b-button href="" variant="primary">
                <i class="fas fa-info-circle text-white"></i>
                Detail
              </b-button>
            </router-link>
            <router-link class="ml-2" :to="{name:'EditParticipant',params:{id:participant._id}}">           
              <b-button variant="primary">
                <i class="far fa-edit text-white"></i>
                Ubah
              </b-button>
            </router-link>
            <b-button class="ml-2" @click="del(participant._id)" variant="primary">
              <i class="far fa-trash-alt text-white"></i>
              Hapus
            </b-button>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ListParticipant',
  data() {
      return {
        participants : []
      }
  },
  methods: {
    del(id){
      axios
          .delete("http://localhost:3000/api/v1/participant/"+id)
          .then(() => location.reload())
          .catch( err => console.log(err));
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
