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
        <div
          id="nav1"
          @click="toHome()"
        ><a>Home</a></div>
        <div
          id="nav2"
          v-if="token != null"
          @click="toAlert()"
        ><a>Alert</a></div>
        <div
          id="nav3"
          v-if="token != null"
          @click="toPortfolio()"
        ><a>Portfolio</a></div>
        <div id="nav4">
          <a
            v-if="token == null"
            @click="login()"
          >Login</a>
          <a
            v-if="token != null"
            @click="logout()"
          >Logout</a>
        </div>
        <div
          id="nav5"
          v-if="token == null"
        >
          <a @click="register()">Register</a>
        </div>
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
      token:"",
    };
  },
  methods: {
    async toHome() {
      this.$router.push({
        name: "Home",
      });
    },
    async toAlert() {
      this.$router.push({
        name: "Alert",
      });
    },
    async toPortfolio() {
      this.$router.push({
        name: "Portfolio",
      });
    },
    async login() {
      this.$router.push({
        name: "Login",
      });
    },
    async register() {
      this.$router.push({
        name: "Signup",
      });
    },
    async logout() {
      this.token = null;
      this.$router.push({
        name: "DashBoard",
      });
      this.$cookie.delete("token");
      this.$cookie.delete("userid");
      console.log("cleared token & userid");
      console.log(JSON.parse(this.$cookie.get("userid")));
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  //Mounted is a lifecycle hook for Vue that runs any JS scripts only after the entire view has been rendered onto DOM.
  //Loads user data
  mounted() {
    this.token = JSON.parse(this.$cookie.get("userid"));
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
#nav1 {
  width: 110px;
  float: left;
}
#nav2 {
  width: 125px;
  float: left;
}
#nav3 {
  width: 160px;
  float: left;
}
#nav4 {
  width: 120px;
  float: right;
}
#nav5 {
  width: 120px;
  float: right;
}

#nav1:hover ~ .animation {
  width: 110px;
  left: 215px;
  background-color: #5bdfce;
}

#nav2:hover ~ .animation {
  width: 120px;
  left: 325px;
  background-color: #49bdc4;
}

#nav3:hover ~ .animation {
  width: 140px;
  left: 455px;
  background-color: #15abb3;
}

#nav4:hover ~ .animation {
  width: 120px;
  right: 0px;
  background-color: #eeefdf;
}
#nav5:hover ~ .animation {
  width: 135px;
  right: 110px;
  background-color: #eeefdf;
}
</style>