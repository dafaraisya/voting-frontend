<template>
  <nav v-bind:class="[scrollPosition > 50 ? 'black' : '']">
    <div class="menu-icon">
      <i class="fa fa-bars fa-2x"></i>
    </div>
    <div class="logo">
      <img class="rounded-circle" src="@/assets/logo himatipa.png" alt="" />
    </div>
    <div class="menu">
      <ul>
        <li>
          <a href="#home" v-smooth-scroll="{ duration: 1000 }">
            <i class="fas fa-home"></i>
            Home
          </a>
        </li>
        <li>
          <a href="#timeline" v-smooth-scroll="{ duration: 1000 }">
            <i class="far fa-calendar-alt"></i>
            Timeline
          </a>
        </li>
        <li>
          <a href="#announcement" v-smooth-scroll="{ duration: 1000 }">
            <i class="fas fa-bullhorn"></i>
            Pengumuman
          </a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      scrollPosition: null,
    };
  },

  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
  },

  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
};
</script>
<style scoped>
.logo {
  line-height: 60px;
  position: fixed;
  float: left;
  margin: 16px 46px;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  letter-spacing: 2px;
}

.logo img {
  width: 40px;
  height: 40px;
}

nav {
  position: fixed;
  top: 0;
  width: 100%;
  line-height: 60px;
  z-index: 99999999;
}

nav ul {
  line-height: 60px;
  list-style: none;
  background: rgba(0, 0, 0, 0);
  overflow: hidden;
  color: #fff;
  padding: 0;
  text-align: right;
  margin: 0;
  padding-right: 40px;
  transition: 1s;
}

nav.black ul {
  background: rgba(20,20,20,0.98);
}

nav ul li {
  display: inline-block;
  padding: 16px 40px;
}

nav ul li a {
  text-decoration: none;
  color: #fff;
  font-size: 16px;
}

nav ul li a:hover {
  text-decoration: none;
  color: #fff;
  font-size: 16px;
}

.menu-icon {
  line-height: 60px;
  width: 100%;
  background: #000;
  text-align: right;
  box-sizing: border-box;
  padding: 15px 24px;
  cursor: pointer;
  color: #fff;
  display: none;
}

@media (max-width: 786px) {
  .logo {
    position: fixed;
    top: 0;
    margin-top: 16px;
  }

  nav ul {
    max-height: 0px;
    background: #000;
  }

  nav.black ul {
    background: #000;
  }

  .showing {
    max-height: 34em;
  }

  nav ul li {
    box-sizing: border-box;
    width: 100%;
    padding: 24px;
    text-align: center;
  }

  .menu-icon {
    display: block;
  }
}
</style>
