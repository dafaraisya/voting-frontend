<template>
  <b-container>
    <b-row>
      <b-col lg="12">
        <b-container class="bg-white p-3 mt-3 shadow-sm rounded">
          <h1 class="mt-2">Tambah Kandidat</h1>
          <b-form class="text-left ml-5 mt-4 mr-5">
            <b-form-group label="Tipe Kandidat :" label-for="type">
              <b-form-select
                class="form-control"
                name="type"
                id="type"
                v-model="dataCandidate.type"
              >
                <option value="">Pilih Tipe Kandidat</option>
                <option value="bem">Ketua BEM</option>
                <option value="legislatif">Dewan Mahasiswa</option>
              </b-form-select>
            </b-form-group>
            <b-form-group
              label="Dapil :"
              label-for="jurusan"
              v-if="dataCandidate.type == 'legislatif'"
            >
              <div
                v-for="(jurusan, index) in listJurusan"
                :key="'jurusan' + index"
              >
                <input
                  type="radio"
                  v-bind:id="'jurusan' + index"
                  v-bind:value="jurusan"
                  v-model="dataCandidate.jurusan"
                />
                <label class="ml-2" v-bind:for="'jurusan' + index">{{
                  jurusan
                }}</label>
              </div>
            </b-form-group>
            <b-form-group label="Nama lengkap :" label-for="namaLengkap">
              <b-form-input
                type="text"
                id="namaLengkap"
                aria-describedby="namaHelp"
                placeholder="Masukan Nama"
                v-model="dataCandidate.name"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="No Urut :" label-for="number">
              <b-form-input
                type="text"
                id="number"
                aria-describedby="namaHelp"
                placeholder="Masukan No urut"
                v-model="dataCandidate.number"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Deskripsi :" label-for="short">
              <vue-editor
                type="text"
                id="short"
                aria-describedby="namaHelp"
                placeholder="Masukan Deskripsi"
                v-model="dataCandidate.description.short"
              ></vue-editor>
            </b-form-group>
            <b-form-group label="Visi :" label-for="vision">
              <vue-editor
                type="text"
                id="vision"
                aria-describedby="namaHelp"
                placeholder="Masukan Visi"
                v-model="dataCandidate.description.vision"
              ></vue-editor>
            </b-form-group>
            <b-form-group label="Misi :" label-for="mission">
              <vue-editor
                type="text"
                id="mission"
                aria-describedby="namaHelp"
                placeholder="Masukan Misi"
                v-model="dataCandidate.description.mission"
              ></vue-editor>
            </b-form-group>
            <a
              @click="addData()"
              href="#"
              class="btn btn-primary"
              type="submit"
            >
              <i class="far fa-save text-white"></i>
              Simpan
            </a>
          </b-form>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "CreateCandidate",
  data() {
    return {
      dataCandidate: {
        type: "",
        name: "",
        number: "",
        image: "",
        description: {},
      },
      listJurusan: [
        "Dapil 1",
        "Dapil 2",
        "Dapil 3"
      ],
    };
  },
  methods: {
    addData() {
      let data = {
        type: this.dataCandidate.type,
        name: this.dataCandidate.name,
        number: this.dataCandidate.number,
        jurusan: this.dataCandidate.jurusan,
        image: this.dataCandidate.image,
        shortDescription: this.dataCandidate.description.short,
        visionDescription: this.dataCandidate.description.vision,
        missionDescription: this.dataCandidate.description.mission,
      };

      axios
        .post("http://52.152.228.107:3000/api/v1/candidate", data)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Kandidat berhasil ditambahkan",
            showConfirmButton: true,
          }).then(() => {
            this.$router.push({ name: "ListCandidate" });
          });
        })
        //eslint-disable-next-line no-console
        .catch((err) => console.log(err));
    },
  },
};
</script>
