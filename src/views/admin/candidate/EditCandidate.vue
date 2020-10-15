<template>
    <b-container>
        <b-row>
            <b-col lg="8">
                <div class="container bg-white mt-2 p-3 text-left shadow-sm rounded">
                    <b-form-group label="Nama lengkap :" label-for="namaLengkap">
                        <b-form-input type="text" id="namaLengkap" aria-describedby="namaHelp" placeholder="Masukan Nama" v-model="dataCandidate.name"></b-form-input>
                    </b-form-group>
                    <b-form-group label="No Urut :" label-for="number">
                        <b-form-input type="text" id="number" aria-describedby="namaHelp" placeholder="Masukan No urut" v-model="dataCandidate.number"></b-form-input>
                    </b-form-group>
                    <b-form-group label="Foto :" label-for="image">
                        <img class="img-profile img-profile-circle" v-bind:src="getImage(dataCandidate.image)"/><br/><br/>
                        <input id="file" ref="file" type="file" v-on:change="handleFileUpload()"/>
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
                    <button @click="editData();" class="btn btn-primary">
                        <i class="far fa-save text-white"></i>
                        Simpan
                    </button>
                </div>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'EditCandidate',
  data() {
    return {
        dataCandidate: {
            name: '',
            number: '',
            image: '',
            description: {},
        },
    }
  },
  methods: {
        editData() {
            let formData = new FormData();

            formData.append('name', this.dataCandidate.name);
            formData.append('number', this.dataCandidate.number);
            formData.append('shortDescription', this.dataCandidate.description.short);
            formData.append('visionDescription', this.dataCandidate.description.vision);
            formData.append('missionDescription', this.dataCandidate.description.mission);
            formData.append('image', this.dataCandidate.image);

            Swal.fire({
                    title: 'Apakah anda yakin mengubah data kandidat ini?',
                    showDenyButton: true,
                    confirmButtonText: `Ya`,
                    denyButtonText: `Tidak`,
                }).then((result) => {
                    if (result.isConfirmed) {            
                        axios
                            .put("http://localhost:3000/api/v1/candidate/"+this.$route.params.id, formData,
                            {
                                headers: {
                                    'Content-Type': 'multipart/form-data'
                                }
                            })
                            .then(() => {
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Data kandidat berhasil diperbarui',
                                    showConfirmButton: true
                                }).then(()=>{
                                    this.$router.push({name: 'ListCandidate'});
                                })
                            })
                            //eslint-disable-next-line no-console
                            .catch( err => console.log(err));
                    } 
            })
        }, 
        handleFileUpload(){
            this.dataCandidate.image = this.$refs.file.files[0];
        },
        getImage(url) {
            return '../../images/'+url;
        }
    },
    mounted() {
        axios
        .get('http://localhost:3000/api/v1/candidate/'+this.$route.params.id)
        .then(res => (this.dataCandidate = res.data.data))
        .catch(error => console.log(error))
    }
}
</script>
