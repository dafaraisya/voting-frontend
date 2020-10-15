<template>
  <div class="container">
    <notification v-if="$route.query.success === true" messageType="success" :key="$route.query.time">
      {{ notification() }}
    </notification>
    <div class="row">
      <div class="col">
        <h1 class="text-center text-white">Pengumuman Hasil Voting PEMIRA 2020</h1>
      </div>
    </div>
    <!-- bar chart -->
    <div v-if="timesUp">
      <b-row>
          <b-col lg=1></b-col>
          <b-col lg=10>
              <b-card title="Grafik Perolehan Suara PEMIRA 2020">
                  <b-row class="h2">
                      <b-col>
                        <div class="row" v-if="arrCandidate.length > 0">
                          <div class="col">
                            <bar-chart
                              :chartData="arrCandidate"
                              :options="chartOptions"
                              :chartColors="positiveChartColors"
                              label="Jumlah Suara Tiap Calon"
                            />
                          </div>
                        </div>
                      </b-col>
                  </b-row>
              </b-card>
          </b-col>
      </b-row>
    </div>

    <!-- countdown -->
    <div v-else class="row mt-5">
      <div class="col">
        <Countdown
          :year="2020"
          :month="10"
          :date="15"
          :hour="16"
          :minute="6"
        />
      </div>
    </div>

  </div>
</template>

<script>
import axios from "axios";
// import moment from "moment";
import BarChart from "@/components/BarChart";
import Countdown from "@/components/Countdown";
import swal from 'sweetalert';

export default {
  components: {
    Countdown,
    BarChart
  },
  data() {
    return {
      timesUp: false,
      announcement : [],
      arrCandidate: [],
      positiveChartColors: {
        backgroundColor: "#20bf0b"
      },
      chartOptions: {
        scales: {
					yAxes: [{
						ticks: {
							beginAtZero: true
						},
						gridLines: {
							display: true
						}
					}],
					xAxes: [{
						ticks: {
							beginAtZero: true
						},
						gridLines: {
							display: false
						}
					}]
				},
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  methods: {
    notification() {
      swal("Terimakasih", "Pilihan anda berhasil dikirim", "success");
    }
  },
  async created() {
    const { data } = await axios.get("http://localhost:3000/api/v1/candidate/all");
    data.data.forEach(d => {
      const {
        name,
        total_vote
      } = d;
      this.arrCandidate.push({ name, total: total_vote });

      console.log(this.arrCandidate);
    });
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/v1/announcement")
      .then(res => (this.announcement = res.data))
      .catch(err => (console.log(err)));
  }
};
</script>
