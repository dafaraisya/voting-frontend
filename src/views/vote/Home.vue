<template>
  <div class="home-voting">
    <vue-particles
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
    <div class="container" style="position:absolute; top:calc(50% - 250px); left:calc(50% - 500px);width:1000px; height:500px;">
      <router-view/>
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
    min-height: 700px;
}
</style>

