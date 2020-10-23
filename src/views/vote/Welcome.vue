<template>
  <div class="page"> 
    <div class="sub-page" >
      <h1 class="text-white" style="padding-top:150px;">
        Selamat datang di<br/>PEMIRA HIMATIPA UGM 2020
      </h1>
      <router-link :to="{name:'Method'}">
        <b-button class="btn mt-5">
          <i class="fas fa-vote-yea"></i> 
            Vote
          </b-button>
      </router-link>
      <a href="#timeline" v-smooth-scroll="{duration:1000}">
        <b-button class="btn mt-5 ml-3">
          <i class="far fa-calendar-alt" ></i>
          Timeline
        </b-button>
      </a>
      <router-link :to="{name:'Method'}">
        <b-button class="btn mt-5 ml-3">
          <i class="fas fa-bullhorn"></i>
          Pengumuman
        </b-button>
      </router-link>
    </div>
    <div class="sub-page" id="timeline" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200">
      <Timeline/> 
    </div>
    <div class="sub-page" id="announcement" data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200">
      <Announcement/> 
    </div>
  </div>
</template>

<script>
import Timeline from '@/components/Timeline.vue'
import Announcement from './Announcement.vue'

export default {
  name: 'Welcome',
  components: {
    Timeline,
    Announcement
  }
}
</script>
<style scoped>
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";

* {
    font-family: 'Poppins', sans-serif;
    scroll-behavior: smooth;
}

.page {
  height: 100%;
}

.sub-page {
  min-height:100%;
  width:100%;
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
