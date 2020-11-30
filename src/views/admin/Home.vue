<template>
  <div style="background-color:#eee">
    <b-row>
      <b-col lg="2">
        <Sidebar />
      </b-col>
      <b-col
        lg="10"
        style="margin-top:20px;padding-left:60px;min-height:690px;"
      >
        <Header />
        <router-view class="mt-4" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
import axios from "axios";

export default {
  name: "Home",
  components: {
    Header,
    Sidebar,
  },
  created() {
    var ip = ['36.81.8.39'];
    axios
      .get("https://api.ipify.org/?format=json")
      .then((res) => {
        console.log(res.data.ip)
        if(!ip.includes(res.data.ip)) {
          this.$router.push({ path: '/' });
        }
      })
      .catch((err) => console.log(err));
  },
};
</script>
