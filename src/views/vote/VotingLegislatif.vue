<template>
  <div class="voting">
    <div class="container text-left">
      <img src="" alt="" />
      <h1 class="text-white tittle">PEMIRA SV UNS 2021</h1>
      <h4 class="text-white mt-1 mb-5">
        Halo {{ participant.name }}, Silakan Ketuk Pilih untuk memilih daftar
        Calon Dewan Mahasiswa dibawah ini
      </h4>
      <b-row>
        <b-col
          lg="4"
          class="mb-5 text-center"
          v-for="candidate in LegislatifCandidates"
          :key="candidate._id"
        >
          <b-container class="bg-white p-0 rounded-sm shadow">
            <img
              class="img-profile w-100"
              v-bind:src="getImage(candidate.image)"
            />
            <b-container class="mt-2 pb-2">
              <b> {{ candidate.name }} </b> <br />
              {{ candidate.number }} <br />
              <router-link
                :to="{
                  name: 'DetailCandidateVoting',
                  params: { id: candidate._id },
                }"
              >
                <b-button class="mt-2" variant="primary">
                  <i class="fas fa-info-circle text-white"></i>
                  Detail
                </b-button>
              </router-link>
              <b-button
                @click="vote(candidate._id, candidate.name)"
                class="mt-2 ml-2"
                variant="success"
              >
                <i class="fas fa-check-circle text-white"></i>
                Pilih
              </b-button>
            </b-container>
          </b-container>
        </b-col>
        <b-col class="text-center" v-if="dapil == 'Dapil 3'">
          <h2 class="text-white">
            Tidak ada Calon Dewan Mahasiswa di Dapil ini
          </h2>
          <b-button
            @click="vote('candidate._id', 'candidate.name')"
            class="mt-2 ml-2"
            variant="success"
          >
            <i class="fas fa-check-circle text-white"></i>
            Selanjutnya
          </b-button>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "VotingLegislatif",
  data() {
    return {
      participant: [],
      candidates: [],
      id_candidate_bem: "",
      dapil: "oo",
      dapil1: [
        "D-3 Keuangan dan Perbankan",
        "D-3 Keuangan Perbankan",
        "D-3 Manajemen Pemasaran",
        "D-3 Manajemen Bisnis",
        "D-3 Manajemen Perdagangan",
        "D-3 Perpajakan",
        "D-3 Desain Komunikasi Visual",
        "D-3 Bahasa Inggris",
        "D-3 Bahasa Mandarin",
        "D-3 Usaha Perjalanan Wisata",
        "D-3 Akuntansi",
        "D-3 Akuntansi PSDKU",
        /* */
        "D3 Keuangan dan Perbankan",
        "D3 Keuangan Perbankan",
        "D3 Manajemen Pemasaran",
        "D3 Manajemen Bisnis",
        "D3 Manajemen Perdagangan",
        "D3 Perpajakan",
        "D3 Desain Komunikasi Visual",
        "D3 Bahasa Inggris",
        "D3 Bahasa Mandarin",
        "D3 Usaha Perjalanan Wisata",
        "D3 Akuntansi",
        "D3 Akuntansi PSDKU",
        /* */
        "D3-Keuangan dan Perbankan",
        "D3-Keuangan Perbankan",
        "D3-Manajemen Pemasaran",
        "D3-Manajemen Bisnis",
        "D3-Manajemen Perdagangan",
        "D3-Perpajakan",
        "D3-Desain Komunikasi Visual",
        "D3-Bahasa Inggris",
        "D3-Bahasa Mandarin",
        "D3-Usaha Perjalanan Wisata",
        "D3-Akuntansi",
        "D3-Akuntansi PSDKU",
        
      ],

      dapil2: [
        "D-3 Komunikasi Terapan",
        "D-3 Manajemen Administrasi",
        "D-3 Perpustakaan",
        "D-4 Demografi dan Pencatatan Sipil",
        "D-3 Teknik Kimia",
        "D-3 Teknik Mesin",
        "D-3 Teknik Sipil",
        "D-2 Teknik Mesin",
        /* */
        "D3 Komunikasi Terapan",
        "D3 Manajemen Administrasi",
        "D3 Perpustakaan",
        "D4 Demografi dan Pencatatan Sipil",
        "D3 Teknik Kimia",
        "D3 Teknik Mesin",
        "D3 Teknik Sipil",
        "D2 Teknik Mesin",
        /* */
        "D3-Komunikasi Terapan",
        "D3-Manajemen Administrasi",
        "D3-Perpustakaan",
        "D4-Demografi dan Pencatatan Sipil",
        "D3-Teknik Kimia",
        "D3-Teknik Mesin",
        "D3-Teknik Sipil",
        "D2-Teknik Mesin",
      ],
      dapil3: [
        "D-3 Agribisnis",
        "D-3 Teknologi Hasil Pertanian",
        "D-3 Budidaya Peternakan",
        "D-3 Kebidanan",
        "D-4 Kebidanan Sarjana Terapan",
        "D-4 Keselamatan dan Kesehatan Kerja",
        "D-3 Farmasi",
        "D-3 Teknik Informatika",
        "D-3 Teknik Informatika PSDKU",
        /* */
        "D3 Agribisnis",
        "D3 Teknologi Hasil Pertanian",
        "D3 Budidaya Peternakan",
        "D3 Kebidanan",
        "D4 Kebidanan Sarjana Terapan",
        "D4 Keselamatan dan Kesehatan Kerja",
        "D3 Farmasi",
        "D3 Teknik Informatika",
        "D3 Teknik Informatika PSDKU",
        /* */
        "D3-Agribisnis",
        "D3-Teknologi Hasil Pertanian",
        "D3-Budidaya Peternakan",
        "D3-Kebidanan",
        "D4-Kebidanan Sarjana Terapan",
        "D4-Keselamatan dan Kesehatan Kerja",
        "D3-Farmasi",
        "D3-Teknik Informatika",
        "D3-Teknik Informatika PSDKU",
      ],
    };
  },
  methods: {
    vote(id_candidate_legislatif, name_candidate) {
      if (name_candidate != "candidate.name") {
        new Swal({
          title: "Anda Yakin Memilih " + name_candidate + " ?",
          showDenyButton: true,
          buttons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            let data = {
              id_participant: this.participant._id,
              id_candidate_bem: this.id_candidate_bem,
              id_candidate_legislatif: id_candidate_legislatif,
            };
            axios
              .put("http://52.152.228.107:3000/api/v1/participant/vote", data)
              .then(() => {
                new Swal({
                  icon: "success",
                  title: "Pilihan anda berhasil dikirim",
                  showConfirmButton: true,
                }).then(() => {
                  this.$store.commit("setAuthentication", false);
                  this.$router.push({
                    name: "Announcement",
                    query: { success: true },
                  });
                });
              })
              .catch((err) => console.log(err));
          }
        });
      } else {
        let data = {
          id_participant: this.participant._id,
          id_candidate_bem: this.id_candidate_bem,
          id_candidate_legislatif: id_candidate_legislatif,
        };
        axios
          .put("http://52.152.228.107:3000/api/v1/participant/vote", data)
          .then(() => {
            this.$store.commit("setAuthentication", false);
            this.$router.push({
              name: "Announcement",
              query: { success: true },
            });
          })
          .catch((err) => console.log(err));
      }
    },
    getImage(url) {
      return "../../" + url;
    },
  },
  mounted() {
    axios
      .get(
        "http://52.152.228.107:3000/api/v1/participant/" + this.$route.params.id
      )
      .then((res) => {
        this.participant = res.data.data;

        if (this.dapil1.includes(this.participant.jurusan))
          this.dapil = "Dapil 1";
        else if (this.dapil2.includes(this.participant.jurusan))
          this.dapil = "Dapil 2";
        else if (this.dapil3.includes(this.participant.jurusan))
          this.dapil = "Dapil 3";

        axios
          .get("http://52.152.228.107:3000/api/v1/candidate/all")
          .then((res) => {
            var candidates = res.data.data;
            candidates.forEach((candidate) => {
              if (candidate.jurusan == this.dapil)
                this.candidates.push(candidate);
            });
          })
          .catch((error) => console.log(error));
      })
      .catch((err) => console.log(err));
  },
  created() {
    if (this.$route.query.id_candidate_bem) {
      this.id_candidate_bem = this.$route.query.id_candidate_bem;
    }
  },
  computed: {
    LegislatifCandidates: function() {
      return this.candidates.filter(function(candidate) {
        return candidate.type == "legislatif";
      });
    },
  },
};
</script>
<style scoped>
.tittle,
h1 {
  margin-top: 50px;
  font-weight: bold;
}
.voting {
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.7) 0%,
      rgb(0, 0, 0, 0.7) 80%
    ),
    url("https://drive.google.com/uc?export=download&id=1COIP91BUDc2z0l_Bl2OFYQIFNnGXuS83");
  background-size: cover;
}
</style>
