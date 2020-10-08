<template>
    <div class="create-participant">
        <h1 class="mt-2">Tambah Participant</h1>
        <b-container fluid>
            <b-row>
                <b-col lg="3"></b-col>
                <b-col lg="6">
                    <b-form class="text-left ml-5 mt-4 mr-5">
                        <b-form-group label="Nama lengkap :" label-for="namaLengkap">
                            <b-form-input type="text" id="namaLengkap" aria-describedby="namaHelp" placeholder="Masukan Nama" v-model="dataParticipant.name"></b-form-input>
                        </b-form-group>
                        <b-form-group label="NIM :" label-for="nim">
                            <b-form-input type="text" id="nim" aria-describedby="namaHelp" placeholder="Masukan NIM" v-model="dataParticipant.nim"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Email :" label-for="email">
                            <b-form-input type="text" id="email" aria-describedby="namaHelp" placeholder="Masukan Email" v-model="dataParticipant.email"></b-form-input>
                        </b-form-group>
                        Sesi
                        <b-form-group label="Tanggal mulai :" label-for="email">
                            <b-form-input type="date" id="date1" v-model="session.min.date"></b-form-input>
                        </b-form-group>

                        <b-form-group label="Jam mulai :" label-for="email">
                            <b-form-input type="time" id="date1" v-model="session.min.time"></b-form-input>
                        </b-form-group>

                        <b-form-group label="Tanggal berakhir :" label-for="email">
                            <b-form-input type="date" id="date1" v-model="session.max.date"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Jam berakhir :" label-for="email">
                            <b-form-input type="time" id="date1" v-model="session.max.time"></b-form-input>
                        </b-form-group>
                        <a @click="addData();" href="#" class="btn btn-primary" type="submit">
                            Tambah Data
                        </a>
                    </b-form>
                </b-col>
            </b-row>
        </b-container>
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
            },
            session: {
                min: {
                    date: '',
                    time: '',
                },
                max: {
                    date: '',
                    time: '',
                }
            }
        }
    },
    methods: {
        addData() {
        let data = {
            'name': this.dataParticipant.name,
            'nim': this.dataParticipant.nim,
            'email': this.dataParticipant.email,
            'sessionMin': this.session.min.date+"T"+this.session.min.time,
            'sessionMax': this.session.max.date+"T"+this.session.max.time,
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
