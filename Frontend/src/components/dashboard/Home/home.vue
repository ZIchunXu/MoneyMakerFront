<template>
  <div class="HomeContainer">
    <el-form
      class="parent"
      :model="portfolioForm"
      :rules="rules"
      ref="portfolioForm"
    >
      <el-form-item
        class="div1"
        prop="fromcurrency"
      >
        <el-select
          id="fromcurrencies"
          v-model="portfolioForm.fromcurrency"
        >
          <el-option
            v-for="item in fromcurrencies"
            :key="item.currencySym"
            :label="item.currencyFullName"
            :value="item.currencySym"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item
        class="div2"
        prop="fromvalue"
      >
        <el-input
          type="number"
          v-model="portfolioForm.fromvalue"
        ></el-input>
      </el-form-item>
      <div class="div3"></div>
      <div class="div4"></div>
      <div class="div5">
        <el-button
          type="warning"
          @click="submitForm('portfolioForm')"
          round
        >Convert</el-button>
      </div>
      <div class="div6"></div>
      <div class="div7"></div>
      <el-form-item class="div8">
        <el-input
          v-model="portfolioForm.tovalue"
          disabled
        ></el-input>
      </el-form-item>
      <el-form-item
        class="div9"
        prop="tocurrency"
      >
        <el-select
          id="tocurrencies"
          v-model="portfolioForm.tocurrency"
        >
          <el-option
            v-for="item in tocurrencies"
            :key="item.currencySym"
            :label="item.currencyFullName"
            :value="item.currencySym"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div
      class="hometext"
      v-if="!converted"
    >
      Store portfolio and see a sum of your money in local currencies
      <br /><br />
      Create alert to be updated with the currency exchange rate
      <br /><br />
      See a trend of the forex in the past
    </div>
    <div
      class="chart"
      v-if="converted"
    >
      <line-chart
        :data="chardata"
        area
        zoom
      />
    </div>
  </div>
</template>
<script>
export default {
  name: "LineBase",
  data() {
    return {
      chardata: [
        {
          title: "Conversion chart",
          name: "",
          data: [],
        },
      ],
      portfolioForm: {
        fromcurrency: "",
        tocurrency: "",
        fromvalue: "",
        tovalue: "",
      },
      fromcurrencies: [],
      tocurrencies: [],
      rules: {
        fromcurrency: [
          {
            required: true,
            message: "Please Select Currency",
            trigger: "change",
          },
        ],
        fromvalue: [
          {
            required: false,
            message: "Please Enter Value",
            trigger: "blur",
          },
        ],
      },
      activealert: [],
      converted: false,
    };
  },

  methods: {
    async submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let convertUrl =
            "https://money-maker.azurewebsites.net/api/convert?from=" +
            this.portfolioForm.fromcurrency +
            "&to=" +
            this.portfolioForm.tocurrency;
          let getchartUrl =
            "https://money-maker.azurewebsites.net/api/chart?from=" +
            this.portfolioForm.fromcurrency +
            "&to=" +
            this.portfolioForm.tocurrency;
          let result = await this.$axios({
            method: "GET",
            url: convertUrl,
            headers: {},
            data: {},
          });

          let chartresult = await this.$axios({
            method: "GET",
            url: getchartUrl,
            headers: {},
            data: {},
          });

          this.portfolioForm.tovalue =
            result.data.data * this.portfolioForm.fromvalue;
          let chartData = chartresult.data;
          let chartName =
            this.portfolioForm.fromcurrency +
            " to " +
            this.portfolioForm.tocurrency +
            " Conversion ";
          this.chardata[0].name = chartName;

          let chartDisplayData = [];
          for (const key in chartData) {
            chartDisplayData.push({
              label: key,
              value: chartData[key],
            });
          }
          this.chardata[0].data = chartDisplayData;
          this.converted = true;
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
      this.fromcurrencies = result.data;
      this.tocurrencies = result.data;
    },
    async getActiveAlerts() {
      try {
        let cookie = this.$cookie.get("token");
        let token = JSON.parse(cookie);
        let result = await this.$axios({
          method: "GET",
          url:
            "https://money-maker.azurewebsites.net/api/alert/active?Token=" +
            token,
          headers: {},
          data: {},
        });
        if (result.data.code != 200) {
          this.$message.error(result.data.message);
          return;
        }
        let l = result.data.data.alerts.length;
        let notifyalert = "";
        for (var i = 0; i < l; i++) {
          this.activealert.push(result.data.data.alerts[i]);
          let isbelow = "";
          if (this.activealert[i].isBelow === true) {
            isbelow = "below ";
          } else {
            isbelow = "above ";
          }
          notifyalert +=
            this.activealert[i].fromCurrency +
            " to " +
            this.activealert[i].toCurrency +
            " now is " +
            isbelow +
            this.activealert[i].conditionValue +
            "<br>";
        }
        console.log(this.activealert);
        if (l != 0) {
          this.$notify.info({
            title: "Alerts",
            offset: 80,
            dangerouslyUseHTMLString: true,
            message: notifyalert,
          });
        }
      } catch (error) {
        this.$message.error(error);
      }
    },
  },

  mounted() {
    this.getCurrencies();
    if (this.$cookie.get("token") != null) {
      this.getActiveAlerts();
    }
  },
};
</script>
<style>
.HomeContainer {
  flex-direction: column;
}
.parent {
  margin-top: 3%;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  width: 100%;
}
.hometext {
  margin-top: 3%;
  font-size: 20pt;
  font-weight: bold;
  color: rgb(255, 255, 255);
}
.div1 {
  grid-area: 1 / 1 / 2 / 2;
}
.div2 {
  grid-area: 1 / 2 / 2 / 3;
}
.div3 {
  grid-area: 1 / 3 / 2 / 4;
}
.div4 {
  grid-area: 2 / 1 / 3 / 2;
}
.div5 {
  grid-area: 2 / 2 / 3 / 3;
  margin-bottom: 15px;
}
.div6 {
  grid-area: 2 / 3 / 3 / 4;
}
.div7 {
  grid-area: 3 / 1 / 4 / 2;
}
.div8 {
  grid-area: 3 / 2 / 4 / 3;
}
.div9 {
  grid-area: 3 / 3 / 4 / 4;
}
.parent > .div5 > .el-button {
  width: 100%;
}
.el-select {
  width: 330px;
}
.chart {
  width: 90%;
  height: 400px;
  margin-left: 4%;
  margin-top: 100px;
  background-color: aliceblue;
}
</style>