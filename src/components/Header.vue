<template>
    <div class="home" id="app">
        <b-navbar toggleable="sm" type="light" variant="light">
            <div class="container">
                <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>

                <b-navbar-brand>Sistem Voting</b-navbar-brand>

                <b-collapse id="nav-text-collapse" is-nav>
                <b-navbar-nav>
                    <router-link :to="{name: 'ListSession'}">
                        <b-nav-text class="mr-2">Sesi</b-nav-text>
                    </router-link>
                    <router-link :to="{name: 'ListParticipant'}">
                        <b-nav-text class="mr-2">Partisipan</b-nav-text>
                    </router-link>
                    <router-link :to="{name: 'ListCandidate'}">
                        <b-nav-text class="mr-2">Kandidat</b-nav-text>
                    </router-link>
                </b-navbar-nav>
                </b-collapse>
            </div>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name : 'Header'
}
</script>