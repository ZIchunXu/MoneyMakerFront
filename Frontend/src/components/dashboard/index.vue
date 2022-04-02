 <template>
  <el-container>
    <el-header>
    <nav
      :default-active="activeIndex"
      @select="handleSelect"
    >
      <img
        id="logo"
        src='./logo.png'
      >
      <router-link to='/home'><a index="1">Home</a></router-link>
      <router-link to='/Alert'><a index="2">Alert</a></router-link>
      <router-link to='/Portfolio'><a index="3">Portfolio</a></router-link>
      <router-link to='/Login'>
        <a index="4">Login</a>
      </router-link>
      <router-link to='/Signup'>
        <a index="5">Register</a>
      </router-link>
      <div class="animation start-home"></div>
    </nav>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  //Mounted is a lifecycle hook for Vue that runs any JS scripts only after the entire view has been rendered onto DOM.
  //Loads user data
  mounted() {
    this.loadUserData(this.user2);
  },
};
</script>
<style scoped>
/* Nav Bar CSS */
#logo {
  width: 200px;
  float: left;
  margin-top: 12px;
  margin-left: 10px;
  display: inline-block;
  position: relative;
  z-index: 1;
}
nav {
  position: relative;
  width: 100%;
  margin-left: -20px;
  height: 95px;
  position: fixed;
  background-color: #f6b673;
  text-align: center;
}
nav a {
  line-height: 80px;
  margin-top: 7px;
  height: 100%;
  font-size: 20px;
  font-weight: bold;
  display: inline-block;
  position: relative;
  z-index: 1;
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
  color: #103a31;
  cursor: pointer;
}
nav .animation {
  position: absolute;
  height: 100%;
  top: 0;
  z-index: 0;
  transition: all 0.5s ease 0s;
  border-radius: 8px;
}
nav a:nth-child(1) {
  width: 100px;
  float: left;
}
nav a:nth-child(2) {
  width: 110px;
  float: left;
}
nav a:nth-child(3) {
  width: 125px;
  float: left;
}
nav a:nth-child(4) {
  width: 160px;
  float: left;
}
nav a:nth-child(5) {
  width: 120px;
  float: right;
}
nav a:nth-child(6) {
  width: 120px;
  float: right;
}

a:nth-child(2):hover ~ .animation {
  width: 110px;
  left: 210px;
  background-color: #5bdfce;
}

a:nth-child(3):hover ~ .animation {
  width: 120px;
  left: 310px;
  background-color: #49bdc4;
}

a:nth-child(4):hover ~ .animation {
  width: 140px;
  left: 435px;
  background-color: #15abb3;
}

a:nth-child(5):hover ~ .animation {
  width: 120px;
  right: 10px;
  background-color: #eeefdf;
}
a:nth-child(6):hover ~ .animation {
  width: 135px;
  right: 120px;
  background-color: #eeefdf;
}
</style>