<template>
    <div class="detail page">
        <b-container>
            <img src="" alt="">
            <transition name="slide-fade">
            <div v-if="show">
            <h1 class="text-white mb-3 tittle">Detail Kandidat</h1>
            <b-row>
                <b-col lg="1"></b-col>
                <b-col lg="10">
                    <div class="bg-white p-3 rounded-sm shadow mb-5">
                        <h3>{{ detail.name }}</h3>
                        <img class="img-profile img-profile-circle" v-bind:src="getImage(detail.image)"/><br/><br/>
                        <b>Nomor urut </b><br/>{{ detail.number }}<br/>
                        <b>Deskripsi</b>
                        <div v-html="detail.description.short"/>
                        <b>Visi</b>
                        <div v-html="detail.description.vision"/>
                        <b>Misi</b>
                        <div v-html="detail.description.mission"/><br/>
                            <b-button @click="klik=true" class="ml-2" href="" variant="primary">
                                <i class="fas fa-arrow-left text-white"></i>
                                Kembali
                            </b-button>
                        <router-link v-if="klik" :to="this.$router.go(-1)">
                        </router-link>
                    </div>
                </b-col>
            </b-row>
            </div>
            </transition>
        </b-container>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name: 'DetailCandidateVoting',
    data() {
        return {
            klik: false,
            detail: {
                description: {
                    short: '',
                    vision: '',
                    mission: ''
                }
            },
            show: false
        }
    },
    methods:{
        getImage(url) {
            return '../../' + url.split('/')[6]+'/' + url.split('/')[7]
        }
    },
    created() {
        axios
            .get("http://localhost:3000/api/v1/candidate/"+this.$route.params.id)
            .then(res => (this.detail = res.data.data))
            .catch(err => console.log(err));
    }, 
    mounted() {
        this.show = true;
    }
}
</script>
<style>
.tittle, h1 {
    margin-top: -70px;
    font-weight: bold;
}
.img-profile-circle {
    height: 200px;
    width: 200px;
    border-radius: 100px;
}
.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all .8s ease;
  animation-delay: .8s;
}
.slide-fade-enter {
  transform: translateY(100%);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>