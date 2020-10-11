<template>
  <div class="scan">   
      <h1 class="text-white" style="padding-top:150px;">
        Selamat datang di<br/>PEMIRA HIMATIPA UGM 2020
      </h1>
      <router-link :to="{name:'Method'}">
        <b-button class="btn mt-5">Masuk</b-button>
      </router-link>
  </div>
</template>

<script>

export default {
  name: 'Welcome',
}
</script>
<style scoped>
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";

* {
    font-family: 'Poppins', sans-serif;
}

h1 {
  font-size: 50px;
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
</style>
