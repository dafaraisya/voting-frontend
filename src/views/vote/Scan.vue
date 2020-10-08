<template>
  <div class="scan">
      <h2>Scan qr Code anda disini</h2>
      <h2>{{ error }}</h2>
      <div style=
      "display: block;
        margin-left: auto;
        margin-right: auto;
        width: 70%;
        max-width: 1000px;">
        <qrcode-stream @decode="onDecode"></qrcode-stream>
        <br> <h2>atau</h2>
        <h2>{{ error }}</h2>
        <qrcode-capture @decode="onDecode" />
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import { QrcodeStream,QrcodeCapture } from 'vue-qrcode-reader'

export default {
  name: 'Scan',
  components: {
    QrcodeStream,
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
      error : ''
    }
  },
  methods:{
    onDecode (decodedString) {
      this.id = decodedString;
      for(let i = 0; i <= this.dataParticipants.length; i++) {
        if(this.dataParticipants[i]._id === this.id) {
          var thisSession = JSON.parse(JSON.stringify(this.dataParticipants[i]));
          if(Object.prototype.hasOwnProperty.call(thisSession, 'voting')) {
            this.error = "sudah mengisi"
            break;
          } else {
            this.$store.commit("setAuthentication", true);
            this.$router.replace({ name: "Voting", params : {id:this.dataParticipants[i]._id} });
          }
        } else {
          this.error = "Qr Code Salah"
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
