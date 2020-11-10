<style>
.dot {
  margin-bottom: 4px;
  font-size: 14px;
}
</style>
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
            <h3> 
              {{ participant.name }} 
              <i v-if="participant.voting != null" class="fas fa-circle text-success dot"></i>
              <i v-if="participant.voting == null" class="fas fa-circle text-danger dot"></i>
            </h3>
          </div>
          <div> NIM : {{ participant.nim }} </div>
          <div> Email : {{ participant.email }} </div>
          <div> Sesi : {{ participant.session.number }} </div>
          <div v-if="participant.voting != null"> Telah memilih pada : {{ getDateTime(new Date(participant.voting.time)) }} </div>
          <div class="mt-3">
            <router-link :to="{name:'DetailParticipant',params:{id:participant._id}}">
              <b-button href="" variant="primary">
                <i class="fas fa-info-circle text-white"></i>
                Detail
              </b-button>
            </router-link>
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
          .delete("http://5.181.217.29:3000/api/v1/participant/"+id)
          .then(() => location.reload())
          .catch( err => console.log(err));
    },
    getDateTime(date) {
      date.setHours(date.getHours() - 7);

      var tahun = date.getFullYear();
      var month = date.getMonth();
      var tanggal = date.getDate();
      var day = date.getDay();
      var hour = date.getHours();
      var minute = date.getMinutes();

      switch(day) {
        case 0: day = "Minggu"; break;
        case 1: day = "Senin"; break;
        case 2: day = "Selasa"; break;
        case 3: day = "Rabu"; break;
        case 4: day = "Kamis"; break;
        case 5: day = "Jum'at"; break;
        case 6: day = "Sabtu"; break;
      }
      switch(month) {
        case 0: month = "Januari"; break;
        case 1: month = "Februari"; break;
        case 2: month = "Maret"; break;
        case 3: month = "April"; break;
        case 4: month = "Mei"; break;
        case 5: month = "Juni"; break;
        case 6: month = "Juli"; break;
        case 7: month = "Agustus"; break;
        case 8: month = "September"; break;
        case 9: month = "Oktober"; break;
        case 10: month = "November"; break;
        case 11: month = "Desember"; break;
      }

      if(hour<10)
        hour = "0"+hour;

      if(minute<10)
        minute = "0"+minute;

      var datetime = hour + ":" + minute + ", "+ day + ", " + tanggal + " " + month + " " + tahun;
    
      return datetime;
    }
  },
  mounted() {
    axios
      .get('http://5.181.217.29:3000/api/v1/participant/all')
      .then(res => (this.participants = res.data.data))
      .catch(error => console.log(error))
  }
}
</script>
