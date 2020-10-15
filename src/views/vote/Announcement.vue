<template>
  <div class="container">
    <notification v-if="$route.query.success === true" messageType="success" :key="$route.query.time">
      {{ notification() }}
    </notification>
    <div class="row">
      <div class="col">
        <h1 style="margin-top: -20px;margin-bottom: 30px;" class="text-center text-white">Pengumuman Hasil Voting PEMIRA 2020</h1>
      </div>
    </div>
    <!-- bar chart -->
    <div v-if="timeUp">
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
          :year="year"
          :month="month"
          :date="date"
          :hour="hour"
          :minute="minute"
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
      timeUp: '',
      participants : [],
      announcement : [],
      year: 0,
      month : 0,
      date : 0,
      hour : 0,
      minute : 0,
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
    },
    checkEndTime() {
      const end = new Date(
          this.year,
          this.month - 1, 
          this.date,
          this.hour,
          this.minute
      );
      const now = new Date();
      const distance = end.getTime() - now.getTime();
      if(distance < 0) {
        this.timeUp = true;
      } 
    },
    formatter() {
      const format = this.announcement.split("-");
      this.year = parseInt(format[0]);
      this.month = parseInt(format[1]);
      const time = format[2].split("T");
      this.date = parseInt(time[0]);
      const clock = time[1].split(":");
      this.hour = parseInt(clock[0]);
      this.minute = parseInt(clock[1]); 
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
    });
  },
  mounted() {
    axios
      .get("http://localhost:3000/api/v1/announcement")
      .then(res => {
        this.announcement = res.data.data;
        this.formatter();
        this.checkEndTime();
      })
      .catch(err => (console.log(err)));

  }
};
</script>
