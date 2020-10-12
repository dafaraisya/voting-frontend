<style>
.img-profile-circle {
    height: 200px;
    width: 200px;
    border-radius: 100px;
}
</style>
<template>
    <b-container>
        <b-row>
            <b-col lg="6">
                <div class="bg-white p-3 rounded-sm shadow">
                    <h3>{{ detail.name }}</h3>
                    <img class="img-profile img-profile-circle" v-bind:src="getImage(detail.image)"/><br/><br/>
                    <b>Nomor urut </b><br/>{{ detail.number }}<br/>
                    <b>Deskripsi</b>
                    <div v-html="detail.description.short"/>
                    <b>Visi</b>
                    <div v-html="detail.description.vision"/>
                    <b>Misi</b>
                    <div v-html="detail.description.mission"/><br/>
                    <router-link :to="'edit/'+detail._id">
                        <b-button class="ml-2" href="" variant="primary">
                            <i class="far fa-edit text-white"></i>
                            Ubah
                        </b-button>
                    </router-link>
                    <b-button @click="del();" class="ml-2" href="" variant="primary">
                        <i class="far fa-trash-alt text-white"></i>
                        Hapus
                    </b-button>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import axios from 'axios'

export default {
    name: 'CandidateDetail',
    data() {
        return {
            detail: {
                description: {
                    short: '',
                    vision: '',
                    mission: ''
                }
            }
        }
    },
    methods:{
        del(){
            axios
                .delete("http://localhost:3000/api/v1/candidate/"+this.$route.params.id)
                .then(() => this.$router.push({name: "ListCandidate"}))
                .catch( err => console.log(err));
        },
        getImage(url) {
            return '../../images/'+url;
        }
    },
    created() {
        axios
            .get("http://localhost:3000/api/v1/candidate/"+this.$route.params.id)
            .then(res => (this.detail = res.data.data))
            .catch(err => console.log(err));
    }
}
</script>