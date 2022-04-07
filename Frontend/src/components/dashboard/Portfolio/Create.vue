<template>
  <el-container>
    <el-header>
      <div id="titleContainer">
        <h2>Make new Portfolio entry</h2>
        <br />
        <h3>Entry to your portfolio</h3>
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
            <el-select v-model="portfolioForm.entryCurrencySym">
              <el-option
                v-for="item in currencies"
                :key="item.currencySym"
                :label="item.currencyFullName"
                :value="item.currencySym"
              ></el-option>
            </el-select>
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
        >Create</el-button>

      </el-card>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      portfolioForm: {
      },

      currencies: [],
      rules: {
        entryCurrencySym: [
          {
            required: true,
            message: "Please Select Currency",
            trigger: "change",
          },
        ],
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
        async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let cookie = this.$cookie.get("token");
          let userid = this.$cookie.get("userid");
          let token = JSON.parse(cookie);

          let result = await this.$axios({
            method: "POST",
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
    async getCurrencies() {
      let result = await this.$axios({
        method: "GET",
        url: "https://money-maker.azurewebsites.net/api/currencies",
        headers: {},
        data: {},
      });
      this.currencies = result.data;
      console.log(result.data);
    },
  },

  mounted() {
    this.getCurrencies();
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
  color: aliceblue;
  margin-left: 10%;
}
#titleContainer > h3 {
  font-size: 20pt;
  font-weight: bold;
  color: aliceblue;
  margin-left: 10%;
  margin-top: -30px;
}
</style>
