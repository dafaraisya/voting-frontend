<template>
    <div class="create-participant">
        <h1>Tambah Kandidat</h1>
        <form>
            <div class="form-group">
                <label for="name">Nama lengkap</label>
                <input type="text" class="form-control" id="name" placeholder="Masukan Nama" v-model="dataCandidate.name">
            </div>
            <div class="form-group">
                <label for="number">Nomor urut</label>
                <input type="text" class="form-control" id="number" placeholder="Masukan Nomor urut" v-model="dataCandidate.number">
            </div>
            <div class="form-group">
                <label for="image">Foto</label>
                <input type="text" class="form-control" id="image" placeholder="Masukan Image" v-model="dataCandidate.image">
            </div>
            <div class="form-group">
                <label for="short">Deskripsi</label>
                <vue-editor id="short" v-model="dataCandidate.description.short"> </vue-editor>
            </div>
            <div class="form-group">
                <label for="vision">Visi</label>
                <vue-editor id="vision" v-model="dataCandidate.description.vision"> </vue-editor>
            </div>
            <div class="form-group">
                <label for="mission">Misi</label>
                <vue-editor id="mission" v-model="dataCandidate.description.mission"> </vue-editor>
            </div>
            <a @click="addData();" href="#" class="proceed-btn">
                Tambah Data
            </a>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'CreateCandidate',
    data() {
        return {
            dataCandidate: {
                name: '',
                number: '',
                image: '',
                description: {},
            }
        }
    },
    methods: {
        addData() {
        let data = {
            'name': this.dataCandidate.name,
            'number': this.dataCandidate.number,
            'image': this.dataCandidate.image,
            'shortDescription': this.dataCandidate.description.short,
            'visionDescription': this.dataCandidate.description.vision,
            'missionDescription': this.dataCandidate.description.mission
        };

        axios
            .post("http://localhost:3000/api/v1/candidate", data)
            .then((res) => {
                console.log("result: "+JSON.stringify(res.data));
                //this.$router.push({name: 'ListCandidate'})
            })
            //eslint-disable-next-line no-console
            .catch( err => console.log(err));
        } 
    }
}
</script>
