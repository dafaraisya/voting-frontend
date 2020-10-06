<template>
    <div class="create-participant">
        <h1>Tambah Participant</h1>
        <form>
            <div class="form-group">
                <label for="namaLengkap">Nama lengkap</label>
                <input type="text" class="form-control" id="namaLengkap" aria-describedby="namaHelp" placeholder="Masukan Nama" v-model="dataParticipant.name">
            </div>
            <div class="form-group">
                <label for="nim">NIM</label>
                <input type="text" class="form-control" id="nim" aria-describedby="namaHelp" placeholder="Masukan NIM" v-model="dataParticipant.nim">
            </div>
            <div class="form-group">
                <label for="email">Email</label>
                <input type="text" class="form-control" id="email" aria-describedby="namaHelp" placeholder="Masukan Email" v-model="dataParticipant.email">
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
    name: 'CreateParticipant',
    data() {
        return {
        dataParticipant: {
            name: '',
            nim: '',
            email: ''
        }
        }
    },
    methods: {
        addData() {
        let data = {
            'name': this.dataParticipant.name,
            'nim': this.dataParticipant.nim,
            'email': this.dataParticipant.email
        };

        axios
            .post("http://localhost:3000/api/v1/participant", data)
            .then(() => this.$router.push({name: 'ListParticipant'}))
            //eslint-disable-next-line no-console
            .catch( err => console.log(err));
        } 
    }
}
</script>
