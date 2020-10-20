<template>
  <div class="page"> 
    <div v-if="loading">
      <transition name="slide-fade" mode="out-in">
        <Loader/>
      </transition>
    </div>
    <div v-else>
      <h1 class="text-white" style="padding-top:150px;">
        Selamat datang di<br/>PEMIRA HIMATIPA UGM 2020
      </h1>
      <router-link :to="{name:'Method'}">
        <b-button class="btn mt-5">Masuk</b-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/Loader'
export default {
  name: 'Welcome',
  components: {
    Loader
  },
  data() {
    return {
      loading : true
    }
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      let stateCheck = setInterval(() => {
        if (document.readyState === 'complete') {
          this.loading = false;
          clearInterval(stateCheck);
        }
      }, 1000);
    }
  }
}
</script>
<style scoped>
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";

* {
    font-family: 'Poppins', sans-serif;
}

.btn {
  padding: 10px 30px;
  background-color: rgba(0,0,0,0);
  border-color: rgb(255,255,255);
}

.btn:hover {
  background-color: rgb(255,255,255);
  color: rgb(0,0,0)
}

@media only screen and (min-width: 1200px) and (max-width: 1920px){
  h1 {
    font-size: 50px;
  }
}
@media only screen and (max-width: 767px) {
  h1 {
    font-size: 35px;
  }
}
</style>
