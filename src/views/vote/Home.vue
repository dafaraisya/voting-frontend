<template>
  <div>
    <div class="home-voting">
      <vue-particles
        style="position: fixed"
        color="#dedede"
        :particleOpacity="0.5"
        :particlesNumber="100"
        shapeType="circle"
        :particleSize="4"
        linesColor="#dedede"
        :linesWidth="1"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      </vue-particles>
    </div>
    <div class="container voting-page">
      <transition name="slide-fade" mode="out-in">
        <router-view/>
      </transition>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'Home'
}
</script>
<style scoped>
/* html, body
{
  height: 100%;
} */
html {
  min-height: 100% !important;
  height: 100%;
}
.home-voting {
    background: linear-gradient(
            to right,
          rgba(0, 0, 0, 0.8),
          rgba(40, 40, 40, 0.8),
          rgba(80, 80, 80, 0.8)
        ),
    url('./../../assets/background-ugm.jpg');
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
}
#particles-js {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
}
.voting-page {
    position:absolute;
    top:calc(50% - 250px); 
    height:500px; 
}
@media only screen and (min-width: 1200px) and (max-width: 1920px){
  .voting-page {
    left:calc(50% - 500px);
    width:1000px; 
  }
}
@media only screen and (max-width: 767px) {
  .voting-page {
    left:calc(50% - 240px);
    width:480px;
  }
}
</style>

