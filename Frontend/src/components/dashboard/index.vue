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
        <router-link
          id="nav1"
          to='/home'
        ><a>Home</a></router-link>
        <router-link
          id="nav2"
          to='/Alert'
          v-if="userid != null"
        ><a>Alert</a></router-link>
        <router-link
          id="nav3"
          to='/Portfolio'
          v-if="userid != null"
        ><a>Portfolio</a></router-link>
        <router-link
          id="nav4"
          to='/Login'
        >
          <a v-if="userid == null">Login</a>
          <a
            v-if="userid != null"
            @click="logout()"
          >Logout</a>
        </router-link>
        <router-link
          id="nav5"
          to='/Signup'
          v-if="userid == null"
        >
          <a>Register</a>
        </router-link>
        <div class="animation start-home"></div>
      </nav>
      <p
        id="userId"
        hidden
      >123123</p>
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
      userid: "",
    };
  },
  methods: {
    logout() {
      this.userid = "";
      console.log("ddd");
      console.log(this.userid);
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
  //Mounted is a lifecycle hook for Vue that runs any JS scripts only after the entire view has been rendered onto DOM.
  //Loads user data
  mounted() {
    this.userid = this.$route.query.userid;
    console.log(this.userid);
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
  left: 210px;
  background-color: #5bdfce;
}

#nav2:hover ~ .animation {
  width: 120px;
  left: 310px;
  background-color: #49bdc4;
}

#nav3:hover ~ .animation {
  width: 140px;
  left: 435px;
  background-color: #15abb3;
}

#nav4:hover ~ .animation {
  width: 120px;
  right: 10px;
  background-color: #eeefdf;
}
#nav5:hover ~ .animation {
  width: 135px;
  right: 120px;
  background-color: #eeefdf;
}
</style>