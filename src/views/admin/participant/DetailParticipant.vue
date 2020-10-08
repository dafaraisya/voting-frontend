<template>
    <div>
        <div class="container">
            <vue-qr text="detail.nim" qid="testid"></vue-qr>
            <p>Nama : {{ detail.name }}</p>
            <p>NIM : {{ detail.nim }}</p>
            <p>Email : {{ detail.email }}</p>
            <p>Sesi : {{ detail.session.number }}</p>
            <router-link :to="{name:'EditParticipant', params:{id:detail._id}}">
                <b-button class="ml-2" href="" variant="primary">Edit</b-button>
            </router-link>
            <b-button @click="del();" class="ml-2" href="" variant="primary">Delete</b-button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import VueQr from 'vue-qr'

export default {
    name: 'ParticipantDetail',
    components: {
        VueQr
    },
    data() {
        return {
            detail: {
                session: {
                    number: 0,
                }
            },
        }
    },
    methods:{
        del(){
            axios
                .delete("http://localhost:3000/api/v1/participant/"+this.$route.params.id)
                .then(() => this.$router.push({name:'ListParticipant'}))
                .catch( err => console.log(err));
        }
    },
    mounted() {
        axios
            .get("http://localhost:3000/api/v1/participant/"+this.$route.params.id)
            .then(res => (this.detail = res.data.data))
            .catch(err => console.log(err));
    }
}
</script>