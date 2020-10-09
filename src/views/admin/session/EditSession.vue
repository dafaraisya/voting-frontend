<template>
    <div class="edit-session">
        <h1>Edit Sesi</h1>
        <b-container fluid>
            <b-row>
                <b-col lg="3"></b-col>
                <b-col lg="6">
                    <b-form class="text-left ml-5 mt-4 mr-5">
                        <b-form-group label="Sesi ke :" label-for="session_number">
                            <b-form-input type="number" id="session_number" v-model="dataSession.number"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Tanggal mulai :" label-for="started_date">
                            <b-form-input type="date" id="started_date" v-model="dataSession.start.date"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Jam mulai :" label-for="started_time">
                            <b-form-input type="time" id="started_time" v-model="dataSession.start.time"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Tanggal berakhir :" label-for="ended_date">
                            <b-form-input type="date" id="ended_date" v-model="dataSession.end.date"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Jam berakhir :" label-for="ended_time">
                            <b-form-input type="time" id="ended_time" v-model="dataSession.end.time"></b-form-input>
                        </b-form-group>
                        <a @click="editData();" href="#" class="btn btn-primary" type="submit">
                            Ubah Data
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
  name: 'EditSession',
  data() {
      return {
        dataSession: {
            number: 0,
            start: {
                date: '',
                time: '',
            },
            end: {
                date: '',
                time: '',
            },
            total_participant: 0,
        }
      }
  },
  methods: {
      editData() {
        let data = {
            'number': this.dataSession.number,
            'start': this.dataSession.start.date + "T" + this.dataSession.start.time + "Z",
            'end': this.dataSession.end.date + "T" + this.dataSession.end.time + "Z"
        };


        axios
            .put("http://localhost:3000/api/v1/session/"+this.$route.params.id, data)
            .then(() => this.$router.push("/admin/session"))
            //eslint-disable-next-line no-console
            .catch( err => console.log(err));
      } 
  },
  created() {
    axios
      .get('http://localhost:3000/api/v1/session/'+this.$route.params.id)
      .then((res) => {
            const session = res.data.data;
            this.dataSession.number = session.number;
            this.dataSession.start.date = session.start.slice(0,10);
            this.dataSession.start.time = session.start.slice(11,16);
            this.dataSession.end.date = session.end.slice(0,10);
            this.dataSession.end.time = session.end.slice(11,16);
            this.dataSession.total_participant = session.total_participant;
          })
      .catch(error => console.log(error))
  }
}
</script>
