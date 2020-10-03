<template>
  <div class="scan">
      <h1>Scan qr code</h1>
      <h2>{{ nrp }}</h2>
      <div style=
      "display: block;
        margin-left: auto;
        margin-right: auto;
        width: 50%;">
        <qrcode-stream @decode="onDecode"></qrcode-stream>
        <br>
        <qrcode-capture @decode="onDecode" />
      </div>
  </div>
</template>

<script>
import { QrcodeStream,QrcodeCapture } from 'vue-qrcode-reader'

export default {
  name: 'Scan',
  components: {
    QrcodeStream,
    QrcodeCapture
  },
  data() {
      return {
        nrp : ''
      }
  },
  methods:{
        onDecode (decodedString) {
            this.nrp = decodedString
        }
    }
}
</script>
