<template>
  <el-card class="box-card">
    <el-form
      :label-position="labelPosition"
      label-width="100px"
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
    >
      <el-form-item
        label="Email"
        prop="email"
      >
        <el-input
          v-model="ruleForm.email"
          placeholder="Please Input Your UserName"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="Password"
        prop="password"
      >
        <el-input
          v-model="ruleForm.password"
          type="password"
          placeholder="Please Input Your Password"
          show-password
        ></el-input>
      </el-form-item>
      <router-link to="Home">
        <el-button
          type="danger"
          style="width: 48%;  margin-bottom: 3%"
          @click="back()"
        >Back to Home</el-button>
      </router-link>
      <el-button
        type="warning"
        @click="submitForm('ruleForm')"
        style="width: 48%;  margin-bottom: 3%"
        pa
      >Log in</el-button>
    </el-form>

    <a>Not signed up yet?</a>
    <router-link
      to='/Signup'
      style="text-decoration: none"
    >
      <el-link type="primary">Create Account</el-link>
    </router-link>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: "right",
      ruleForm: {
        email: "",
        password: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "Please Input Your UserName",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Please Input Your Password",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async back() {
      console.log(this.$cookie.get("token"));
      this.$router.push({
        name: "DashBoard",
      });
    },
    async login() {
      try {
        let result = await this.$axios({
          method: "POST",
          url: "https://money-maker.azurewebsites.net/api/login",
          data: this.ruleForm,
        });
        //a@a.a
        //Pa$$w0rd
        if (result.data.code != 200) {
          this.$message.error(result.data.data.message);
          return;
        }
        this.$cookie.set("token", JSON.stringify(result.data.data.token), {
          expires: "30d",
        });
        this.$cookie.set("userid", JSON.stringify(result.data.data.userid), {
          expires: "30d",
        });
        this.$router.push({
          name: "DashBoard",
        });
      } catch (error) {
        console.log(error);
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.login();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  }, mounted() {
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 0 10px;
}
a {
  color: #000000;
}
.box-card {
  margin-top: 350px;
  width: 40%;
  margin-left: 29%;
  margin-right: 29%;
}
</style>
