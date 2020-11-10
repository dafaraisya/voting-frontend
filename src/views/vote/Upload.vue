<template>
  <div class="upload page pt-4">
      <img src="" alt="">
      <h1 class="text-white tittle">Unggah kartu</h1>
      <div class="scanner-card mt-5">
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
import Swal from 'sweetalert2'

export default {
  name: 'Scan',
  components: {
    QrcodeCapture
  },
  data() {
    return {
      dataParticipant : {
        name: '',
        nim: '',
        email: ''
      },
      id : '',
    }
  },
  methods:{
    onDecode (decodedString) {
      this.id = decodedString;
      axios
        .get("http://5.181.217.29:3000/api/v1/participant/"+this.id)
        .then(res => {
          this.dataParticipant = res.data.data;
          this.check();
        })
        .catch(err => {console.log(err)});
    },
    check() {
      // cek data partisipan ada enggak
      if(this.dataParticipant == null) {
        this.$router.push({ name: "Error", params: {error : 'failed-not-found'}});
      } else {
        // cek apakah sudah vote apa belum
        var dataParticipantString = JSON.parse(JSON.stringify(this.dataParticipant));
        if(Object.prototype.hasOwnProperty.call(dataParticipantString, 'voting')) {
          this.$router.push({ name: "Error", params: {error : 'failed-already-vote'}});
        } else {
          // cek apakah sedang sesinya atau enggak
          const today = new Date();
          var start = new Date(this.dataParticipant.session.min)
          start.setHours(start.getHours() - 7)
          var end = new Date(this.dataParticipant.session.max)
          end.setHours(end.getHours() - 7)
          if(start < today && end > today) {
            Swal.fire({
                icon: 'success',
                title: 'Autentikasi berhasil',
                text: 'Selamat datang ' + this.dataParticipant.name,
                showConfirmButton: true
            }).then(()=>{
              this.$store.commit("setAuthentication", true);
              this.$router.replace({ name: "Voting", params : {id:this.dataParticipant._id}, query: {'success': true} });
            })
          } else {
            this.$router.push({ name: "Error", params: {error : 'failed-not-your-session'}});
          }
        }
      }
    }
  },
  mounted() {
    axios
      .get("http://5.181.217.29:3000/api/v1/participant/all")
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

.page {
  margin-top:100px;
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
    max-width: 500px;
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
