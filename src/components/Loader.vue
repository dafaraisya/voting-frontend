<template>
    <div id="preloder">
        <h3 class="title">PEMIRA HIMATIPA <br> UGM 2020</h3>
        <div class="loader"></div>
    </div>
</template>

<script>
export default {
    name : 'Loader'
}
</script>

<style scoped>
#preloder {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 999999;
    background: rgb(1, 0, 17);
}

.title {
    color: white;
    margin-top: 200px;
}

.loader {
    width: 40px;
    height: 40px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -13px;
    margin-left: -13px;
    border-radius: 60px;
    animation: loader 0.8s linear infinite;
    -webkit-animation: loader 0.8s linear infinite;
}

@keyframes loader {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
        border: 4px solid #e2e617;
        border-left-color: transparent;
    }
    50% {
        -webkit-transform: rotate(180deg);
        transform: rotate(180deg);
        border: 4px solid #e2e617;
        border-left-color: transparent;
    }
    100% {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
        border: 4px solid #e2e617;
        border-left-color: transparent;
    }
}

@-webkit-keyframes loader {
    0% {
        -webkit-transform: rotate(0deg);
        border: 4px solid #e2e617;
        border-left-color: transparent;
    }
    50% {
        -webkit-transform: rotate(180deg);
        border: 4px solid #e2e617;
        border-left-color: transparent;
    }
    100% {
        -webkit-transform: rotate(360deg);
        border: 4px solid #e2e617;
        border-left-color: transparent;
    }
}
</style>