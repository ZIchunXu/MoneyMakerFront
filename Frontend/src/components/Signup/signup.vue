<template>

  <el-container>
    <el-main class="main">
      <el-card
        class="box-card"
        align-center
      >
        <el-form
          label-width="150px"
          :model="userForm"
          :rules="rules"
          ref="userForm"
        >
          <el-form-item
            label="E-mail"
            prop="email"
          >
            <el-input v-model="userForm.email"></el-input>
          </el-form-item>
          <el-form-item
            label="Password"
            prop="password"
          >
            <el-input type="password" v-model="userForm.password"></el-input>
          </el-form-item>
          <el-form-item
            label="Confirm Password"
            prop="confirm_password"
          >
            <el-input type="password" v-model="userForm.confirm_password"></el-input>
          </el-form-item>

          <el-button
            type="danger"
            style="width: 48%;  margin-bottom: 3%" @click="back()"
          >Back to Home</el-button>
          <el-button
            type="warning"
            style="width: 48%;  margin-bottom: 3%"
            @click="submitForm('userForm')"
          >Submit</el-button>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    var validatePass = (rules, value, callback) => {
      if (value === "") {
        callback(new Error("Please Enter Your Password"));
      } else {
        if (this.userForm.confirm_password !== "") {
          this.$refs.userForm.validateField("confirm_password");
        }
        callback();
      }
    };
    var validatePass2 = (rules, value, callback) => {
      if (value === "") {
        callback(new Error("Please Confirm Your Password"));
      } else if (value !== this.userForm.password) {
        callback(new Error("Two passwords don't match!"));
      } else {
        callback();
      }
    };
    return {
      userForm: {
        email:"",
        password:"",
      },
      rules: {
        email: [
          {
            required: true,
            message: "Please Enter Your Email",
            trigger: "change",
          },
        ],
        password: [
          {
            required: true,
            message: "Please Enter Your Password",
            trigger: "blur",
          },
          {
            min: 6,
            max: 20,
            message: "Length should be 6 to 20",
            trigger: "blur",
          },
          { validator: validatePass, trigger: "blur" },
        ],
        confirm_password: [
          {
            required: true,
            message: "Please Confirm Your Password",
            trigger: "blur",
          },
          {
            min: 6,
            max: 20,
            message: "Length should be 6 to 20",
            trigger: "blur",
          },
          { validator: validatePass2, trigger: "blur" },
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
    async register() {
      try {
        let result = await this.$axios({
          method: "POST",
          url: "https://money-maker.azurewebsites.net/api/register",
          data: { 
            email: this.userForm.email, 
            password: this.userForm.password },
        });
        //a@a.a
        //Pa$$w0rd
        if (result.data.code != 200) {
          this.$message.error(result.data.data.message);
          return;
        }
        console.log(this.$cookie.get("token"));
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
          this.register();
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
.header {
  margin: 3%;
}

.box-card {
  width: 50%;
  margin-left: 24%;
  margin-right: 24%;
  margin-top: 300px;
}
</style>
