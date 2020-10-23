<template>
  <div class="page"> 
    <div class="sub-page" >
      <h1 class="text-white" style="padding-top:200px;">
        PEMIRA HIMATIPA UGM 2020
      </h1>
      <div class="inner">
        <span>
          HIMATIPA JAYA!<br>
          Sukseskan PEMIRA<br>
          Tunjukan Kontribusi
        </span>
      </div>
      <b-container class="mt-5">
        <router-link class="mt-5" :to="{name:'Method'}">
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
        <a href="#announcement" v-smooth-scroll="{duration:1000}">
          <b-button class="btn mt-5 ml-3">
            <i class="fas fa-bullhorn"></i>
            Pengumuman
          </b-button>
        </a>
      </b-container>
    </div>
    <div class="sub-page" id="timeline">
      <Timeline data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200"/> 
    </div>
    <div class="sub-page" id="announcement">
      <Announcement data-aos="fade-in" data-aos-duration="1000" data-aos-delay="200"/> 
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
  },
  created() {
    document.title = 'PEMIRA HIMATIPA UGM 2020';
  },
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
  width: 100%;
}

.sub-page {
  min-height:100%;
  width:100%;
  padding-top:50px;
}

b-button {
  margin-top: 50px;
}

.inner{
  position:absolute;
  height:55px;
  line-height:55px;
  font-size:50px;
  font-weight: bold;
  overflow:hidden;
  display:inline-block;
  min-width: 600px;
  left: calc(50% - 300px);
}
.inner span{
  animation:animate 6s ease infinite;
  position:relative;
  color:white
}
@keyframes animate{
  0%{
    opacity: 1;
    top:-160px;
  }
  25% {
    top:-105px;
  }
  30% {
    top:-105px;
  }
  50% {
    top:-55px;
  }
  55% {
    top:-55px;
  }
  75% {
    top: 0px;
  }
  80% {
    top: 0px;
    opacity: 1;
  }
  100% {
    top: 50px;
  }
}


#announcement {
  background: linear-gradient(
            to right,
          rgba(0, 0, 0, 0.8),
          rgba(40, 40, 40, 0.8),
          rgba(80, 80, 80, 0.8)
        ),
  url('./../../assets/background-teknologi-pertanian.jpg');
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
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
