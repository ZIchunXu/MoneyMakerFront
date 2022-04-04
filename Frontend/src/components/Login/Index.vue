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
      <router-link to="/home">
          <el-button type="danger" style="width: 48%;  margin-bottom: 3%">Back to Home</el-button>
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
      userid: "",
      token:"",
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
        this.userid = result.data.data.userid;
        this.token = result.data.data.token;
        console.log(result.data.data.userid);
        console.log(this.userid);
        this.$router.push({
          name: "DashBoard",
          query: { userid: this.userid,  token: this.token },
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
  display: inline-block;
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
