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
            <el-input v-model="userForm.password"></el-input>
          </el-form-item>
          <el-form-item
            label="Confirm Password"
            prop="confirm_password"
          >
            <el-input v-model="userForm.confirm_password"></el-input>
          </el-form-item>
          
          <el-form-item>
            <el-button
              style="margin-top: 12px;"
               @click="submitForm('userForm')"
            >Submit</el-button>
          </el-form-item>
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
        email: "123456789",
        password: "123456789",
        confirm_password: "123456789",
      },
      methods: {
        register() {
          console.log("register button was clicked");
        },
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
    next(name) {
      if (this.active === 0 || this.active === 1) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.active++;
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    },
    submit() {
      if (this.active++ > 2) {
        alert("submit!");
        this.active = success;
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
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
