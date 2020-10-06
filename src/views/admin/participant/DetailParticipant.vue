<template>
    <div>
        <div class="container">
            <div id="qrcode-card">
                <b-card
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;
                            display: block;
                            margin-left: auto;
                            margin-right: auto;"
                    class="mb-2 mt-2"
                >
                    <vue-qr :text="String(details._id)" :callback="test" qid="testid"></vue-qr>
                    <b-card-text>
                        <p>Nama : {{ details.name }}</p>
                        <p>NIM : {{ details.nim }}</p>
                        <p>Email : {{ details.email }}</p>
                    </b-card-text>
                </b-card>
            </div>
            <b-button @click="download(details.name)" class="ml-2" href="" variant="primary">Download</b-button>
            <router-link :to="'edit/'+details._id">
                <b-button class="ml-2" href="" variant="primary">Edit</b-button>
            </router-link>
            <b-button @click="del();" class="ml-2" href="" variant="primary">Delete</b-button>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import VueQr from 'vue-qr'
import htmlToImage from 'html-to-image'

export default {
    name: 'ParticipantDetails',
    components: {
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
                .then(() => this.$router.push("/admin/participant"))
                .catch( err => console.log(err));
        },
        download(cardName) {
            htmlToImage.toPng(document.getElementById('qrcode-card')) 
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = cardName;
                link.href = dataUrl;
                link.click();
            });
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