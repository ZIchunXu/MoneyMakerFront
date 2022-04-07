<template>
  <el-container class="HomeContainer">
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
        <el-input v-model.number="portfolioForm.fromvalue"></el-input>
      </el-form-item>
      <div class="div3"></div>
      <div class="div4"></div>
      <el-button
        class="div5"
        type="warning"
        @click="submitForm('portfolioForm')"
        round
      >Convert</el-button>
      <div class="div6"></div>
      <div class="div7"></div>
      <el-form-item class="div8">
        <el-input v-model="portfolioForm.tovalue" disabled></el-input>
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
      class="chart div10"
      v-if="converted"
    >
      <line-chart
        :data="chardata"
        area
        zoom
      />
    </div>
  </el-container>
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
        tocurrency: [
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
          { type: "number", message: "Must be number" },
        ],
      },
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
  },

  mounted() {
    this.getCurrencies();
  },
};
</script>
<style>
.HomeContainer {
  flex-direction: column;
}
.div5 {
  margin-bottom: 15px;
}
.parent {
  margin-top: 3%;
  display: grid;
  width: 100%;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
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
.el-form {
  width: 100%;
}
.div10 {
  margin-top: 100px;
}
.chart {
  width: 90%;
  height: 400px;
  margin-left: 4%;
  background-color: aliceblue;
}
</style>