<template>
    <div>
        <div class="container">
            <p>Nama : {{ detail.name }}</p>
            <p>Nomor urut : {{ detail.number }}</p>
            <p>Image : {{ detail.image }}</p>
            <p>Deskripsi</p>
            <div v-html="detail.description.short"/>
            <p>Visi</p>
            <div v-html="detail.description.vision"/>
            <p>Misi</p>
            <div v-html="detail.description.mission"/>
            <router-link :to="'edit/'+detail._id">
                <b-button class="ml-2" href="" variant="primary">Edit</b-button>
            </router-link>
            <b-button @click="del();" class="ml-2" href="" variant="primary">Delete</b-button>
        </div>
    </div>
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