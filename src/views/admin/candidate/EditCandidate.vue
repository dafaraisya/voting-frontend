<template>
    <div class="edit-participant">
        <h1>Edit Participant</h1>
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
                <label for="image">Foto</label><br/>
                <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>

                <input type="text" class="form-control" id="image" placeholder="Masukan Image">
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
            <a @click="editData();" href="#" class="proceed-btn">
                Ubah Data
            </a>
        </form>
    </div>
</template>

<script>
import axios from 'axios'

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
            formData.append('image', this.dataCandidate.image);
            formData.append('shortDescription', this.dataCandidate.shortDescription);
            formData.append('visionDescription', this.dataCandidate.visionDescription);
            formData.append('missionDescription', this.dataCandidate.missionDescription);

            axios.put("http://localhost:3000/api/v1/candidate/"+this.$route.params.id, formData,
                {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
                }
            ).then(function(){
                console.log('SUCCESS!!');
            })
            .catch(function(){
                console.log('FAILURE!!');
            });

            

            /*let data = {
                'name': this.dataCandidate.name,
                'number': this.dataCandidate.number,
                'image': this.dataCandidate.image,
                'shortDescription': this.dataCandidate.description.short,
                'visionDescription': this.dataCandidate.description.vision,
                'missionDescription': this.dataCandidate.description.mission
            };

            axios
                .put("http://localhost:3000/api/v1/candidate/"+this.$route.params.id, data)
                .then((res) => {
                    //this.$router.push({name: 'ListCandidate'})
                    console.log('res :  '+JSON.stringify(res.data))
                })
                //eslint-disable-next-line no-console
                .catch( err => console.log(err));*/
        }, 
        handleFileUpload(){
            this.dataCandidate.image = this.$refs.file.files[0];
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
