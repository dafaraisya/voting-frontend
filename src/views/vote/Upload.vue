<template>
  <div class="scan">
      <img src="" alt="">
      <h1 class="text-white tittle">Unggah kartu</h1>
      <div class="alert text-center">
        <b-alert md="3" v-model="showError" variant="danger" dismissible>
          <h5>{{ error }}</h5>
        </b-alert>
      </div>


      <div class="scanner-card">
        <b-row>
          <b-col lg="3"/>
          <b-col lg="6">
            <b-container class="bg-white p-3 rounded-sm shadow-sm">
              <qrcode-capture @decode="onDecode"/>
            </b-container>
          </b-col>
        </b-row>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import { QrcodeCapture } from 'vue-qrcode-reader'

export default {
  name: 'Scan',
  components: {
    QrcodeCapture
  },
  data() {
    return {
      dataParticipants : {
        name: '',
        nim: '',
        email: ''
      },
      id : '',
      error : '',
      showError : false
    }
  },
  methods:{
    onDecode (decodedString) {
      this.id = decodedString;
      for(let i = 0; i <= this.dataParticipants.length; i++) {
        // cek id partisipan ada atau tidak
        if(this.dataParticipants[i]._id === this.id) {
          // cek apakah sudah pernah ngisi
          var thisSession = JSON.parse(JSON.stringify(this.dataParticipants[i]));
          if(Object.prototype.hasOwnProperty.call(thisSession, 'voting')) {
            this.error = "Maaf Anda Sudah Melakukan Pemilihan";
            this.showError = true;
            break;
          } else {
            // cek sesi 
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+('0' + today.getDate()).slice(-2);
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const dateTime = date +'T'+ time + '.000Z';
            if(this.dataParticipants[i].session.min < dateTime && this.dataParticipants[i].session.max > dateTime) {
              this.$store.commit("setAuthentication", true);
              this.$router.replace({ name: "Voting", params : {id:this.dataParticipants[i]._id} });
              break;
            } else {
              this.error = "Maaf Saat ini Bukan Sesi Anda"
              this.showError = true;
            }
            break;
            
          }
        } else {
          this.error = "Maaf Qr Code yang Anda Masukkan Salah"
          this.showError = true;
        }
      }
    }
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/v1/participant/all")
      .then(res => (this.dataParticipants = res.data.data))
      .catch(error => console.log(error))
  }
}
</script>
<style scoped>
.tittle, h1 {
    margin-top: 20px;
    font-weight: bold;
}
.scanner-card {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 1000px;
}
.alert {
    display: block;
    margin-left: auto;
    margin-right: auto;
    max-width: 600px;
}

@media only screen and (min-width: 1200px) and (max-width: 1920px){
    .scanner-card-body {
        margin-top: 100px;
    }
}
@media only screen and (max-width: 767px) {
    .scanner-card-body {
        margin-top: 10px;
    }
    .scanner-card {
        margin-bottom: 20px;
    }
}
</style>
