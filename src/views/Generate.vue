<template>
  <div class="generate">
      <Header/>
      <h1>Generate qr code</h1>
      <div v-for="participant in participants" :key="participant._id">
        <vue-html2pdf
        :show-layout="false"
        :float-layout="true"
        :enable-download="true"
        :preview-modal="true"
        :paginate-elements-by-height="1400"
        filename="hee hee"
        :pdf-quality="2"
        :manual-pagination="false"
        pdf-format="a4"
        pdf-orientation="landscape"
        pdf-content-width="800px"
 
        @progress="onProgress($event)"
        @hasStartedGeneration="hasStartedGeneration()"
        @hasGenerated="hasGenerated($event)"
        ref="html2Pdf">
        <section slot="pdf-content">
        <vue-qr :text="participant._id" :callback="test" qid="testid"></vue-qr>
        <h5>{{ participant.name }}</h5>
        <h5>{{ participant.nim }}</h5>
        <h5>{{ participant.email }}</h5>
        </section>
        </vue-html2pdf>
        <br>
      </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'

import VueQr from 'vue-qr'
import axios from 'axios'
import VueHtml2pdf from 'vue-html2pdf'

export default {
  name: 'Generate',
  components: {
    Header,
    VueQr,
    VueHtml2pdf
  },
  data() {
      return {
        participants : []
      }
  },
  methods:{
      test(dataUrl,id){
          console.log(dataUrl, id)
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
