<template>
    <div class="create-session">
        <h1 class="mt-2">Tambah Session</h1>
        <b-container fluid>
            <b-row>
                <b-col lg="3"></b-col>
                <b-col lg="6">
                    <b-form class="text-left ml-5 mt-4 mr-5">
                        <b-form-group label="Sesi ke :" label-for="session_number">
                            <b-form-input type="number" id="session_number" v-model="session.number"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Tanggal mulai :" label-for="started_date">
                            <b-form-input type="date" id="started_date" v-model="session.start.date"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Jam mulai :" label-for="started_time">
                            <b-form-input type="time" id="started_time" v-model="session.start.time"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Tanggal berakhir :" label-for="ended_date">
                            <b-form-input type="date" id="ended_date" v-model="session.end.date"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Jam berakhir :" label-for="ended_time">
                            <b-form-input type="time" id="ended_time" v-model="session.end.time"></b-form-input>
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
    name: 'CreateSession',
    data() {
        return {
            session: {
                start: {
                    date: '',
                    time: '',
                },
                end: {
                    date: '',
                    time: '',
                }
            }
        }
    },
    methods: {
        addData() {
        let data = {
            'number': this.session.number,
            'start': this.session.start.date + "T" + this.session.start.time + "Z",
            'end': this.session.end.date + "T" + this.session.end.time + "Z"
        };

        axios
            .post("http://localhost:3000/api/v1/session", data)
            .then(() => { 
                this.$router.push({name: 'ListSession'});
            })
            //eslint-disable-next-line no-console
            .catch( err => console.log(err));
        } 
    }
}
</script>
