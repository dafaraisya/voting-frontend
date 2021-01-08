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
    var ip = [
  "36.81.8.10",
  "36.81.8.106",
  "103.23.224.177",
  "114.125.125.183",
  "125.166.133.76",
  "139.194.193.99",
  "198.16.66.155",
  "139.194.193.99",
  "139.194.193.99",
  "120.188.86.33",
  "36.68.14.146",
  "114.142.169.43"
];
    axios
      .get("https://api.ipify.org/?format=json")
      .then((res) => {
        console.log(res.data.ip);
        if (!ip.includes(res.data.ip)) {
          window.location.href = "/login";
        } 
      })
      .catch((err) => console.log(err));
  },
};
</script>
