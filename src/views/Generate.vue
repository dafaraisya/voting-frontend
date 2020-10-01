<template>
  <div class="generate">
      <h1>Generate qr code</h1>
      <input type="text" v-model="nrp">
      <h1>{{ nrp }}</h1>
      <br>
      <vue-qr :text="nrp" :callback="test" qid="testid"></vue-qr>
  </div>
</template>

<script>
import VueQr from 'vue-qr'

export default {
  name: 'Generate',
  components: {
    VueQr
  },
  data() {
      return {
        nrp : ''
      }
  },
  methods:{
        test(dataUrl,id){
            console.log(dataUrl, id)
        }
    }
}
</script>
