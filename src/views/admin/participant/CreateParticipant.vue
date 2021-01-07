<template>
  <b-container>
    <b-row>
      <b-col lg="8">
        <b-container class="bg-white p-3 mt-3 shadow-sm rounded">
          <h1 class="mt-2">Tambah Peserta</h1>
          <b-form class="text-left ml-5 mt-4 mr-5">
            <b-form-group label="Nama lengkap :" label-for="namaLengkap">
              <b-form-input
                type="text"
                id="namaLengkap"
                aria-describedby="namaHelp"
                placeholder="Masukan Nama"
                v-model="dataParticipant.name"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="NIM :" label-for="nim">
              <b-form-input
                type="text"
                id="nim"
                aria-describedby="namaHelp"
                placeholder="Masukan NIM"
                v-model="dataParticipant.nim"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Email :" label-for="email">
              <b-form-input
                type="text"
                id="email"
                aria-describedby="namaHelp"
                placeholder="Masukan Email"
                v-model="dataParticipant.email"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Jurusan :" label-for="jurusan">
              <div
                v-for="(jurusan, index) in listJurusan"
                :key="'jurusan' + index"
              >
                <input
                  type="radio"
                  v-bind:id="'jurusan' + index"
                  v-bind:value="jurusan"
                  v-model="dataParticipant.jurusan"
                />
                <label class="ml-2" v-bind:for="'jurusan' + index">{{
                  jurusan
                }}</label>
              </div>
            </b-form-group>
            <b-form-group
              label="Sesi :"
              label-for="session"
              :v-if="sessions == 0"
            >
              <div v-for="(session, index) in sessions" :key="index">
                <input
                  type="radio"
                  v-bind:id="index + 1"
                  v-bind:value="index + 1"
                  v-model="dataParticipant.session"
                />
                <label class="ml-2" v-bind:for="index + 1">{{
                  index + 1
                }}</label>
              </div>
            </b-form-group>
            <a @click="addData()" class="btn btn-primary" type="submit">
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
  name: "CreateParticipant",
  data() {
    return {
      dataParticipant: {
        name: "",
        nim: "",
        email: "",
        jurusan: "",
        session: 1,
      },
      sessions: [],
      listJurusan: [
        "D3-Akuntansi",
        "D3-Keuangan dan Perbankan",
        "D3-Manajemen Pemasaran",
        "D3-Manajemen Bisnis",
        "D3-Manajemen Perdagangan",
        "D3-Perpajakan",
        "D3-Desain Komunikasi Visual",
        "D3-Bahasa Inggris",
        "D3-Bahasa Mandarin",
        "D3-Usaha Perjalanan Wisata",
        "D3-Komunikasi Terapan",
        "D3-Manajemen Administrasi",
        "D3-Perpustakaan",
        "D4 Demografi dan Pencatatan Sipil",
        "D3-Teknik Kimia",
        "D3-Teknik Mesin",
        "D3-Teknik Sipil",
        "D2-Teknik Mesin",
        "D3-Agribisnis",
        "D3-Teknologi Hasil Pertanian",
        "D3-Budidaya Peternakan",
        "D3-Kebidanan",
        "D4-Kebidanan Sarjana Terapan",
        "D4-Keselamatan dan Kesehatan Kerja",
        "D3-Farmasi",
        "D3-Teknik Informatika",
      ],
    };
  },
  methods: {
    addData() {
      let data = {
        name: this.dataParticipant.name,
        nim: this.dataParticipant.nim,
        email: this.dataParticipant.email,
        jurusan: this.dataParticipant.jurusan,
        sessionId: this.sessions[this.dataParticipant.session - 1]._id,
        sessionNumber: this.dataParticipant.session,
        sessionMin: this.sessions[this.dataParticipant.session - 1].start,
        sessionMax: this.sessions[this.dataParticipant.session - 1].end,
      };

      axios
        .post("http://52.152.228.107:3000/api/v1/participant", data)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Peserta berhasil ditambahkan",
            showConfirmButton: true,
          }).then(() => {
            this.$router.push({ name: "ListParticipant", params: { page: 1 } });
          });
        })
        //eslint-disable-next-line no-console
        .catch((err) => console.log(err));
    },
  },
  created() {
    axios
      .get("http://52.152.228.107:3000/api/v1/session/all")
      .then((res) => (this.sessions = res.data.data))
      .catch((error) => console.log(error));
  },
};
</script>
