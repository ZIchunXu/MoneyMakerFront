<template>
  <el-container>
    <el-header>
      <div id="titleContainer">
        <h2>Edit</h2>
        <br />
        <h3>Alert</h3>
        <br />
      </div>
    </el-header>
    <el-main>
      <el-card>
        <el-form
          :model="alertForm"
          :label-position="labelPosition"
          label-width="200px"
          :rules="rules"
          ref="alertForm"
        >
          <el-form-item
            label="AlertName: "
            prop="AlertName"
          >
            <el-input v-model="alertForm.AlertName"></el-input>
          </el-form-item>
          <el-form-item
            label="From:"
            prop="fromcurrency"
          >
            <el-select
              id="FromCurrency"
              v-model="alertForm.fromcurrency"
            >
              <el-option
                v-for="item in fromcurrency"
                :key="item.currencySym"
                :label="item.currencyFullName"
                :value="item.currencySym"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="To:"
            prop="toCurrency"
          >
            <el-select
              id="toCurrency"
              v-model="alertForm.toCurrency"
            >
              <el-option
                v-for="item in toCurrency"
                :key="item.currencySym"
                :label="item.currencyFullName"
                :value="item.currencySym"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label=""
            prop="isBelow"
          >
            <el-select
              v-model="alertForm.isBelow"
              filterable
            >
              <el-option
                v-for="(item, index) in statusOptions"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="$"
            prop="ConditionValue"
          >
            <el-input
              v-model.number="alertForm.ConditionValue"
              placeholder=""
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button type="danger">Back to List</el-button>
        <el-button
          type="warning"
          @click="submitForm('alertForm')"
        >Save</el-button>

      </el-card>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      alertForm: {
        AlertName: "",
        fromcurrency: "",
        toCurrency: "",
        isBelow: true,
        ConditionValue: "",
      },
      fromcurrency: [],
      toCurrency: [],
      statusOptions: [
        {
          label: "Below",
          value: true,
        },
        {
          label: "Above",
          value: false,
        },
      ],
      rules: {
        AlertName: [
          {
            required: true,
            message: "Please Enter AlertName",
            trigger: "blur",
          },
        ],
        fromcurrency: [
          {
            required: true,
            message: "Please Choose Currency",
            trigger: "change",
          },
        ],
        toCurrency: [
          {
            required: true,
            message: "Please Choose Currency",
            trigger: "change",
          },
        ],
        ConditionValue: [
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
    async getAlert() {
      try {
        let cookie = this.$cookie.get("token");
        let token = JSON.parse(cookie);
        let result = await this.$axios({
          method: "GET",
          url: "https://money-maker.azurewebsites.net/api/alerts?Token=" + token,
          headers: {},
          data: {},
        });
        if (result.data.code != 200) {
          this.$message.error(result.data.message);
          return;
        }
         console.log(result.data.data.alert.fromcurrency);
      } catch (error) {
        this.$message.error(error);
        console.log(error);
      }
    },
    async getParams(){
    this.fromCurrency = this.$route.params.fromCurrency;
    this.toCurrency = this.$route.params.toCurrency;
    },
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let cookie = this.$cookie.get("token");
          let userid = this.$cookie.get("userid");
          let token = JSON.parse(cookie);

          let result = await this.$axios({
            method: "POST",
            url:
              "https://money-maker.azurewebsites.net/api/alerts?Token=" + token,
            headers: {},
            data: {
              userid: userid,
              fromCurrency: this.alertForm.fromcurrency,
              toCurrency: this.alertForm.toCurrency,
              alertName: this.alertForm.AlertName,
              isBelow: this.alertForm.formName,
              conditionValue: this.alertForm.ConditionValue,
            },
          });

          console.log(result);
          this.$router.push({
            name: "Alert",
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
      this.fromcurrency = result.data;
      this.toCurrency = result.data;
    },
  },

  mounted() {
    this.getCurrencies();
    this.token = JSON.parse(this.$cookie.get("token"));
    console.log(this.token);
    this.getParams();
    console.log("hahaha");
    console.log(this.toCurrency);
    this.getAlert();
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
