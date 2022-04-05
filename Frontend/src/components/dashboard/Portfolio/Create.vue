<template>
  <el-container>
    <el-header>
      <div id="titleContainer">
        <h2>Make new Portfolio entries</h2>
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
            prop="currency"
          >
            <el-select v-model="portfolioForm.currency">
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
            prop="EntryValue"
          >
            <el-input v-model.number="portfolioForm.EntryValue"></el-input>
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
        currency: "",
        EntryValue: "",
      },

      currencies: [],
      rules: {
        currency: [
          {
            required: true,
            message: "Please Select Currency",
            trigger: "change",
          },
        ],
        EntryValue: [
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
  margin-left: 10%;
}
#titleContainer > h3 {
  font-size: 20pt;
  font-weight: bold;
  margin-left: 10%;
  margin-top: -30px;
}
</style>
