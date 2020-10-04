<template>
    <div>
        <Header/>
        <div class="container">
            <vue-qr :text="String(details._id)" :callback="test" qid="testid"></vue-qr>
            <p>Nama : {{ details.name }}</p>
            <p>NIM : {{ details.nim }}</p>
            <p>Email : {{ details.email }}</p>
            <router-link :to="'../edit/'+details._id">
                <b-button class="ml-2" href="" variant="primary">Edit</b-button>
            </router-link>
            <b-button @click="del();" class="ml-2" href="" variant="primary">Delete</b-button>
        </div>
    </div>
</template>
<script>
import Header from '@/components/Header.vue'

import axios from 'axios'
import VueQr from 'vue-qr'

export default {
    name: 'DetailParticipant',
    components: {
        Header,
        VueQr
    },
    data() {
        return {
            details: []
        }
    },
    methods:{
        test(dataUrl,id){
            console.log(dataUrl, id)
        },
        del(){
            axios
                .delete("http://localhost:3000/api/v1/participant/"+this.$route.params.id)
                .then(() => this.$router.push("/listcandidate"))
                .catch( err => console.log(err));
        }
    },
    mounted() {
        axios
            .get("http://localhost:3000/api/v1/participant/"+this.$route.params.id)
            .then(res => (this.details = res.data.data))
            .catch(err => console.log(err));
    }
}
</script>