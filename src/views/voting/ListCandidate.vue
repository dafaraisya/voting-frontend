<template>
  <div class="listcandidate">
    <Header/>
    <div class="container">
        <h1>List Candidate</h1>
        <b-card v-for="candidate in candidates" :key="candidate._id"
            :img-src="candidate.image"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
        >
            <b-card-text>
                <p>{{ candidate.number }} {{ candidate.name }} </p>
                <p>{{ candidate.description.short }}</p>
                <p>{{ candidate.description.vision }}</p>
                <p>{{ candidate.description.mission }}</p>
            </b-card-text>

            <b-button href="#" variant="primary">Go somewhere</b-button>
        </b-card>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'

import axios from 'axios'

export default {
  name: 'ListCandidate',
  components: {
    Header
  },
  data() {
      return {
        candidates : []
      }
  },
  mounted() {
    axios
      .get('http://localhost:3000/api/v1/candidate/all')
      .then(res => (this.candidates = res.data.data))
      .catch(error => console.log(error))
  }
}
</script>
