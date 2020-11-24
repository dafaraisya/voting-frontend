<template>
  <div class="upload page pt-4">
    <img src="" alt="" />
    <h1 class="text-white tittle">Unggah kartu</h1>
    <div class="scanner-card mt-5">
      <b-row>
        <b-col lg="3" />
        <b-col lg="6">
          <b-container class="bg-white p-3 rounded-sm shadow-sm" style="max-width: 400px;">
            <input id="image" ref="image" type="file" v-on:change="decode()" />
          </b-container>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import QrcodeDecoder from "qrcode-decoder";

export default {
  name: "Scan",
  components: {},
  data() {
    return {
      dataParticipant: {
        name: "",
        nim: "",
        email: "",
      },
      id: "",
    };
  },
  methods: {
    decode() {
      var file = this.$refs.image.files[0];
      var reader = new FileReader();
      var that = this;
      reader.onload = async function(e) {
        const qr = new QrcodeDecoder();
        that.id = await qr.decodeFromImage(e.target.result);
        alert(that.id);
        axios
          .get("http://52.152.228.107:3000/api/v1/participant/" + that.id)
          .then((res) => {
            that.dataParticipant = res.data.data;
            that.check();
          })
          .catch((err) => {
            console.log(err);
          });
      };
      reader.readAsDataURL(file);
    },
    check() {
      // cek data partisipan ada enggak
      if (this.dataParticipant == null) {
        this.$router.push({
          name: "Error",
          params: { error: "failed-not-found" },
        });
      } else {
        // cek apakah sudah vote apa belum
        var dataParticipantString = JSON.parse(
          JSON.stringify(this.dataParticipant)
        );
        if (
          Object.prototype.hasOwnProperty.call(dataParticipantString, "voting")
        ) {
          this.$router.push({
            name: "Error",
            params: { error: "failed-already-vote" },
          });
        } else {
          // cek apakah sedang sesinya atau enggak
          var today = new Date();
          var start = new Date(this.dataParticipant.session.min);
          start.setHours(start.getHours() - 7);
          var end = new Date(this.dataParticipant.session.max);
          end.setHours(end.getHours() - 7);
          if (start < today && end > today) {
            Swal.fire({
              icon: "success",
              title: "Autentikasi berhasil",
              text: "Selamat datang " + this.dataParticipant.name,
              showConfirmButton: true,
            }).then(() => {
              this.$store.commit("setAuthentication", true);
              this.$router.replace({
                name: "Voting",
                params: { id: this.dataParticipant._id },
                query: { success: true },
              });
            });
          } else {
            this.$router.push({
              name: "Error",
              params: { error: "failed-not-your-session" },
            });
          }
        }
      }
    },
  },
  mounted() {
    axios
      .get("http://52.152.228.107:3000/api/v1/participant/all")
      .then((res) => (this.dataParticipants = res.data.data))
      .catch((error) => console.log(error));
    /*var base64 = "";

    var Uint8ClampedArray = require("typedarray").Uint8ClampedArray;
    const Buffer = require("buffer").Buffer;
    global.Buffer = Buffer; // very important
    const jpeg = require("jpeg-js");

    const jpegData = Buffer.from(base64, "base64");
    //var rawImageData = jpeg.decode(jpegData);
    console.log(jpegData)

    //var clampedArray = new Uint8ClampedArray(rawImageData.data.length);
    //console.log(clampedArray)
    // manually fill Uint8ClampedArray, cause Uint8ClampedArray.from function is not available in react-native
    /*var i;
    for (i = 0; i < rawImageData.data.length; i++) {
      clampedArray[i] = rawImageData.data[i];
    }*/

    //qrcode.decode("data:image/png;base64,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")
    /*qrcode
      .scan("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAN1klEQVR4Xu2d4Znktg1A6QqcDu5SgeMKLq7k7ArsVOCkAscVxK7kkgqcVJBLB04FyYcdnTV3Mys8aiBqtPP0fftrMSAI4hGkIEqftdb+17zCA/9orf2xyBWh5x3Q9VVr7e9AjoiEnjeJIO0j0UVsOrzMZwLy2xjS4CGDLiDESweQEZB5kARk9oUZZPKFgAjItXlcQATkIi7MIGaQi6Awg5hBzCALeyEBERABERB0u8Qllkssl1gLqAiIgKwGJIKnqqCFpvNioa9ba6+KimhEVyxdyfVTa+19Ivi6tfYWKCNtRlvRZnaRu1j/gbqytvb6f9SqssJqo3uQv7TW/rxXTwraJQNOM0ilLtK1oxcdSR/3kIl4/j5rWED6N+kCcvIZnVCyGNzr/wJy5vnKoK7URYLDDEK81C8jIALSHzXTL0ZPAqsNveGHAiIgq8NHQCbXuQdxD3KNIgERkIu4oJvO0cHjHmR1Ilz8oUssl1irI2v0JLDa0Bt+KCACsjp8BGSjJdbo47u0gDl6wPdYFq2m4coPK/2FZupK41t7KoBnF7KrepMuIKdhEZA5PFEgZtHc+X8BmRxmBumMHChuBnGJtfouFokxM4gZ5GqcuMRyifVpYLjEOvOIgAiIgCysMQREQAREQNJtiHsQ9yDuQRYwERABeVhA7vXI7c/g+G6a+iYBb/N6m3f1bd7K4CEBu0c2quyjd7Ee7C5WZfAICPFAv4yV9B0r6QJycj49HmAGMYOsXq6RudElFvHSxzJmEDPIRdTc68d4zCBmEDPIwiQvIAIiIALC3qz4CI+auEl3k34xH9BzFwLSFzxk++kmnXjJTfpVL1FwR8/6dEiJXVQXkaO3ZoldVJd7kAfbg5BApDIkEKkuIkeDmthFdQmIgJDYvCpDAnG18is/pEFN7KK6BERAVscwCcTVygVk0XUIXN9qMvuQzoiVASsgld6cdVlJn3zhJr0vwOgkQMClutBM3deNVFpABCQNkmsCNKgFZPKeSyyXWNdAEhABuYgLOruumrqf+REJxMr2aB+JXVSXS6yzERz9oc8YyPjLrsoBp0duyVMF34Cv79KvyRK7aFBX+iueBIi/kReJQwRu9RJrpBN62qoccKKrx7ZMdo+gJn2kdmX92+v/AnLm+coBJ7oqB50GIrFrD12VvqjUJSACsnqfVQlbZVBX6hIQARGQBaIEREAEREBY0q1cMhBdzComtce+gfSR2sV6OV7KDGIGMYOYQdjMUzkjEl3MKiZFZ2pi1x66WC/HS5lBzCBmkFEZJKq5/x4PedoiLXR+2Vr7PNFWObv+q7X2XWp9a39trX0x0K7KPv63tfYL6CMdI6Dq6eu15AkFouv34CmG0gaJUfcsUxk8j6DrnseyzLZKIsuM2knRIwR1ZR93GqaxzQrI7O/K4HkEXWMjdafWBERAroUeuSO2U8iObVZABERAFpgTEAEREAFBafkR9g2VfUROPbqQGcQMYgZJMgg5snr0iYDY/8+O4t4fEoVUF9kMR9HxW9CBHwuLjlHAzPoITDq+CHl/0PF7eb89IIBUWk+XWJVtHlqXgOw7fAKyr//T1gUkddGmAgKyqXtvVy4gt/vwFg0Ccov3BvxWQAY4eaEJAdnX/2nrApK6aFMBAdnUvbcrF5DbfXiLBgG5xXsDfisgA5zsEmtfJ9/SuoDc4r3bf2sGud2Hm2oIQN6BFiofSanU9XNr7SdgPznaSu0ickQmzA773wP7iQjpIz0m+6fWWjwNsHRFpf0HYBgdIxKHw3XRgQR+2EWk8gtTe3TgK/h2emJbZTYidtHvt9MxImfNh+sSEBJ628mQQKStC8jsqTLYBISG3zZyArJBUMM3n6BsJCDbBD7VKiACQmNllRyaBaZ1/ptVLWz7IwERkE0jTEBm97oH2QA2l1ib8psqN4NsENTuQWanmkHMINdmodK7WOTI7WvyHtN0vjwJxHt+SXGM7BmicPQ30G58TTb6sHT9DhxZjd/HEdhfQZtEJIqc2TuPo7iXFe2iLbLEorrivcJZm9V1EBKHIUMKijFxZhfSRR81Qa+Kzyya/k9nfTILwCYbWcrQASe6qF0kqOkx2UpdxH7qLzrepE0ahySukS6iKAxHykgPW2vUYQJycqiAzIFF45DENdJFFAnIx+SbQU7+MIOcxQWizQwCPTCLVS6LKnWRjgiIgFyNEzOIGeQiMMwgs0sEREAEZGGNISACIiACkm5D3IO4B3EPsoCJgKwAJJYf2RVVdFJJjwHIrq9ba28zoakqnFW/o8JPju9GhTnTBUx6Eoljq1HBX7riCQDSR3J8l+oiR27DbvKC6xhH8lQE8Rn6Mi08pRn1pbR6X10HofqIM4hM5c0DWpAjdlXK0Jma7I0qddE+Vo4RbZPIoYI1DWjaSaqPdIDIULuILgGZvURgIz4Nmcoxom0SOQEhXjqTERABuQgZOuPTWYDq64zdZ8WpXaQ9AREQAVkgRUAEREAEBJ2ncA8yBQpdEtGlDNVHljxEhtpFdJlBzCBmEDOIGWSKAXwXixRx4sgqKVaR4l7liyKoXeSYLP0ybRTHPicpqUgmimNREM0uckw2bI93+GYX0UWPKNMxymzq+X+sBrIrisJpYbgyWDOD9vx/5ZqanLuo7OvRl36VvqC6ypb6AkJdPssJyMkXtCrf7+HbfyEgnT40g3Q6DIgLCHDSUUQEpH6kBKTep7tpFJB61wtIvU930ygg9a4XkHqf7qZRQOpdLyD1Pt1No4DUu15A6n26m0YBqXf9wwBCqt/UveTFwlQXkaNfPY1K9KtEIa0JfVlYSSdHWyuPydIv0xK76JFbeiyaHNcmMREy6VHa6emE9OmQsoLKZHnl+3SJM9DzNPDN56S9ahmS2ehMPVoX9QV9oLQ6FjP7kF3VRglINiwf/390UFfCRnuKArG1Vh2LmX3IrmqjBCQbFgF5zkPVsZiNhICceWj081PZ4Hz4vxlk9pSA0KjpkHMPMjtrNGx0mNBM7RKLurNPTkAEpC9iZmkEbnVacw/SN1yjZ3036QJyNULdg5zcIiA7A0IKNH1z7LI0OjY5HTMl75EltlUeua3MIFHc+yXpQBQ5fwCdJLroF3OjUEiODH8P7KJfSAaq2Bsfq5dYxLCjy1Rmo0pARvu1+igwWZ7TPSfxxS57EGLY0WUE5DSCAnL0SN7IfgERkI1C62WoFRABeRmRvFEvBERANgqtl6FWQATkZUTyRr0QEAHZKLRehloBEZCXEckb9UJAHgwQckyWHkfdKCafVUvtInLxgut4aXN2jQaEHm2Nl1J/kRhP+0h0RSU9q9yHOfRYNDn6XfnFXPyVW1LBzILmJfyfFr5GA0J9S+zao4/Dq9/QYcguMrPC9g4vtkfwkEdNqGMFhHrqJCcgff7Cj06QQKRNCwj11EkOPT8FVQoIdNQHMTPI7LDKSQAFIhwrAYGO2kJMQATkIq7cg8wuERABEZCF1CMgAiIgAvJ07Da73INMHqJLrMqjjtngbPF/ckyWZpAoomXHd+kXYMnXZOkY/QgLhd8CBxNd9MgtPRZd+bXl4V+5rbwTAcanXITMiBQQYhx9OQLRda8ylf6KPlYWrMuOktPZSUD6wlRA+vwlIP3+Kv2FGaTUnU/KzCBnPjWD9AWYGaTPX2aQfn+V/sIMUupOM8in7jSD9AWYGaTPX2aQfn+V/sIMUupOM4gZ5LaAMoP0+8/bvP0+K/uFGaTMlb8p8i7WirtY5AXEtPZChhQdm4Qf8aQDTr+YS+wnuuIphqhGZ1elrqytD/8nsz4do3iUveoqs4sGK92kE8OqnBB6qF2VGeQRdJExostIOkakTSpD4hDZJSCzy2kGEZCTzwRkxRKLkEtnASKHZoHiJZaACMhFbNJAFJCT646ejcjkZAYxg1yNEzOIGcQMsjCFCoiACIiApKssl1gusVxiLWAiIAIiIALCjjp6F2uOFLIHSdcnk8C9vlmR2F+dQcgdUBqHxH4kY6FwdlPlrVnk/NaagMyeEhAaNR1ydEYhs76AdDh+g0q6gPT5H0kLSN/Sj04CxPkusdykr96kkwALGZdYLrForKySM4OYQVYFDv2Rm3Q36TRWPpVzieUSyyXWwDqIm/S1U9XC71xiucTaIKxmlS6xtlli0WOy0Xo2c9Ixou+jzdoLm+LLtO+TyHvdWotjvuQibZIjt3RCJDYhGep8ahhxBDIMClG7RtdB6O1UYhd0BbojRvcNlXfXhn82jTqMyAnINhlEQGa/CsgZiWaQkzMERECuJigBEZBPA8MMYga5mCzMIGYQM8jCJk9ABERABITcB2ousVxiucRaQEVABERABKQ9pcqjXqQgd6/7hnv1OS06UvvJkwA0GxFdyK7qQiFqdAchAal3uoCc+ZQ+0lE/DDUaBaTGj+daBERArkYVgY2GY+UzT7TNKjkBERABWaBJQAREQAQkP48QPnIPMkeKS6yTL8wgZhAziBnEDPIhBqyD9G3fzSBn/orgedfnv2elae2FNEd1fdNae5UorASEHrmNr9eSo61vgTPoMdlKXeTIbYD0BthPinu0UEiK2ujruzTAQP8OL1IJCNVFnEZnanLLuFIXsT1kaFBXAkJsQ/tqAZldSYOabNKpLjKQlUFdqYvYLiDUSweQo0EtIH2DaQbp89fdSgvIPDRkuUYHUkCop+5cTkAE5CJE3YO4B7k2b5lBJq8IiIAIyMLSRkAEREAEBO1+3IO4B7kIlP8DkktPIpfBnOUAAAAASUVORK5CYII=")
      .then((result) => {
        console.log(result.data);
      })
      .catch((error) => {
        console.error(JSON.stringify(error));
      });*/
  },
};
</script>
<style scoped>
.tittle,
h1 {
  margin-top: 20px;
  font-weight: bold;
}

.page {
  margin-top: 100px;
}

.scanner-card {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 1000px;
}
.alert {
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 500px;
}

@media only screen and (min-width: 1200px) and (max-width: 1920px) {
  .scanner-card-body {
    margin-top: 100px;
  }
}
@media only screen and (max-width: 767px) {
  .scanner-card-body {
    margin-top: 10px;
  }
  .scanner-card {
    margin-bottom: 20px;
  }
}
</style>
