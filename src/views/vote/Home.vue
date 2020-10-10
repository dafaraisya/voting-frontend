<template>
  <div class="home-voting">
    <router-view/>
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
    background-image: url('./../../assets/background-ugm.jpg');
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    min-height: 700px;
}
</style>

