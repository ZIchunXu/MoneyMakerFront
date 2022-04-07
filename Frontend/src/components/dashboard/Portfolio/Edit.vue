<template>
  <el-container>
    <el-header>
      <div id="titleContainer">
        <h2>Change {{this.portfolioForm.entryCurrencySym}}</h2>
        <br />
        <h3>Portfolio entry</h3>
        <br />
      </div>
    </el-header>
    <el-main>
      <el-card>
        <el-form
          :model="portfolioForm"
          label-width="200px"
          :rules="rules"
          ref="portfolioForm"
        >
          <el-form-item
            label="Portfolio Entry Currency:"
            prop="entryCurrencySym"
          >
            <el-input
              v-model="portfolioForm.entryCurrencySym"
              disabled
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="Portfolio Entry Value:"
            prop="entryValue"
          >
            <el-input v-model.number="portfolioForm.entryValue"></el-input>
          </el-form-item>
        </el-form>
        <router-link to="/Portfolio">
          <el-button type="danger">Back to List</el-button>
        </router-link>
        <el-button
          type="warning"
          @click="submitForm('portfolioForm')"
        >Save</el-button>

      </el-card>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      portfolioForm: {
        entryCurrencySym:"",
        entryValue:"",
      },
      rules: {
        entryValue: [
          {
            required: true,
            message: "Please Enter Value",
            trigger: "blur",
          },
          { type: "number", message: "Must be number" },
        ],
      },
    };
  },

  methods: {
    async getPortfolio() {
      try {
        let cookie = this.$cookie.get("token");
        let token = JSON.parse(cookie);
        let result = await this.$axios({
          method: "GET",
          url:
            "https://money-maker.azurewebsites.net/api/portfolio?Token=" +
            token +
            "&CurrencySym=" +
            this.portfolioForm.entryCurrencySym,
          headers: {},
          data: {},
        });
        
        this.portfolioForm.entryCurrencySym = result.data.data.portfolio.entryCurrencySym;
        this.portfolioForm.entryValue = result.data.data.portfolio.entryValue;

        if (result.data.code != 200) {
          this.$message.error(result.data.message);
          return;
        }
      } catch (error) {
        this.$message.error(error);
        console.log(error);
      }
    },
    async getParams() {
      this.portfolioForm.entryCurrencySym = this.$route.query.entryCurrencySym;
    },
    async back() {
      this.$router.push({
        name: "Portfolio",
      });
    },
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let cookie = this.$cookie.get("token");
          let userid = this.$cookie.get("userid");
          let token = JSON.parse(cookie);

          let result = await this.$axios({
            method: "PUT",
            url:
              "https://money-maker.azurewebsites.net/api/portfolio?Token=" + token,
            headers: {},
            data: {
              userid: userid,
              entryCurrencySym: this.portfolioForm.entryCurrencySym,
              entryValue: this.portfolioForm.entryValue,
            },
          });

          console.log(result);
          this.$router.push({
            name: "Portfolio",
          });
          if (result.data.code != 200) {
            this.$message.error(result.data.data.message);
            return;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  mounted() {
    this.getParams();
    this.getPortfolio();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#titleContainer {
  margin-top: 50px;
  height: 75px;
  text-align: left;
}
.el-main {
  margin-top: 100px;
  margin-left: 10%;
  width: 600px;
}
.el-select {
  width: 100%;
}
#titleContainer > h2 {
  font-size: 30pt;
  font-weight: bold;
  margin-left: 10%;
}
#titleContainer > h3 {
  font-size: 20pt;
  font-weight: bold;
  margin-left: 10%;
  margin-top: -30px;
}
</style>
