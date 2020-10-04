<template>
  <div class="scan">
      <Header/>
      <h2>Scan qr Code anda disini</h2>
      <p>{{ error }}</p>
      <div style=
      "display: block;
        margin-left: auto;
        margin-right: auto;
        width: 70%;
        max-width: 1000px;">
        <qrcode-stream @decode="onDecode"></qrcode-stream>
        <br> <h2>atau</h2>
        <qrcode-capture @decode="onDecode" />
      </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

import axios from 'axios'
import { QrcodeStream,QrcodeCapture } from 'vue-qrcode-reader'

export default {
  name: 'Scan',
  components: {
    Header,
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
          // this.$emit("authenticated", true);
          // this.$router.replace({ name: "ListParticipant" });
          this.$router.push('/listcandidate');
          // console.log("oke");
        } else {
          this.error = "Data tidak Ditemukan"
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
