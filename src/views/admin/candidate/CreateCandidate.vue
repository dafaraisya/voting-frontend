<template>
    <div class="create-candidate">
        <h1 class="mt-2">Tambah Kandidat</h1>
        <b-container fluid>
            <b-row>
                <b-col lg="2"></b-col>
                <b-col lg="8">
                    <b-form class="text-left ml-5 mt-4 mr-5">
                        <b-form-group label="Nama lengkap :" label-for="namaLengkap">
                            <b-form-input type="text" id="namaLengkap" aria-describedby="namaHelp" placeholder="Masukan Nama" v-model="dataCandidate.name"></b-form-input>
                        </b-form-group>
                        <b-form-group label="No Urut :" label-for="number">
                            <b-form-input type="text" id="number" aria-describedby="namaHelp" placeholder="Masukan No urut" v-model="dataCandidate.number"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Foto :" label-for="image">
                            <b-form-input type="text" id="image" aria-describedby="namaHelp" placeholder="Masukan Foto" v-model="dataCandidate.image"></b-form-input>
                        </b-form-group>
                        <b-form-group label="Deskripsi :" label-for="short">
                            <vue-editor type="text" id="short" aria-describedby="namaHelp" placeholder="Masukan Deskripsi" v-model="dataCandidate.description.short"></vue-editor>
                        </b-form-group>
                        <b-form-group label="Visi :" label-for="vision">
                            <vue-editor type="text" id="vision" aria-describedby="namaHelp" placeholder="Masukan Visi" v-model="dataCandidate.description.vision"></vue-editor>
                        </b-form-group>
                        <b-form-group label="Misi :" label-for="mission">
                            <vue-editor type="text" id="mission" aria-describedby="namaHelp" placeholder="Masukan Misi" v-model="dataCandidate.description.mission"></vue-editor>
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
