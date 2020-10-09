<template>
    <div>
        
        <div class="container">
            <p>Sesi ke : <br/> {{ detail.number }}</p>
            <p>Mulai : <br/> {{ detail.start }}</p>
            <p>Berakhir : <br/> {{ detail.end }}</p>
            <router-link :to="{name:'EditSession', params:{id:detail._id}}">
                <b-button class="ml-2" href="" variant="primary">Edit</b-button>
            </router-link>
            <b-button @click="del();" class="ml-2" href="" variant="primary">Delete</b-button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name: 'SessionDetail',
    data() {
        return {
            detail: []
        }
    },
    methods:{
        del(){
            axios
                .delete("http://localhost:3000/api/v1/session/"+this.$route.params.id)
                .then(() => this.$router.push({name: 'ListSession'}))
                .catch( err => console.log(err));
        }
    },
    mounted() {
        axios
            .get("http://localhost:3000/api/v1/session/"+this.$route.params.id)
            .then(res => (this.detail = res.data.data))
            .catch(err => console.log(err));
    }
}
</script>