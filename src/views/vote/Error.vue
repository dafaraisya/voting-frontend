<template>
	<div class="error">
		<b-card class="card">
			<b-card-text class="text-white">
			<h2 class="mb-4">Oppps :(</h2>
			<h5 v-if=" this.$route.params.error == 'failed-not-found'">
			Maaf data tidak QR Code tidak ditemukan
			</h5>
			<h5 v-if=" this.$route.params.error == 'failed-already-vote'">
			Maaf anda sudah melakukan pemilihan, setiap peserta hanya diperbolehkan memilih satu kali
			</h5>
			<h5 v-if=" this.$route.params.error == 'failed-not-your-session'">
			Maaf saat ini bukan sesi anda, untuk mengetahui kapan sesi anda, lihat informasi didalam kartu PERMIRA
			</h5> 
			</b-card-text>
			
			<b-button @click="back=true" class="btn" variant="danger">Kembali</b-button>
			<router-link v-if="back" :to="this.$router.go(-1)">
			</router-link>
		</b-card>
	</div>
</template>
<script>
export default {
	name: 'Error',
	data() {
		return {
			back :false
		}
	}

}
</script>
<style scoped>
	.error{
		max-width: 500px;
		margin: auto;
		margin-top: 180px;
	}
	.tanda-silang{
		max-width: 120px;
	}
	.btn{
		padding: 10px 30px;
		background-color: rgba(0,0,0,0);
		border-color: rgb(255,255,255);
	}
	.card{
		padding: 10px 30px;
		background-color: rgba(0,0,0,0);
		border-color: rgb(255,255,255);
	}
</style>