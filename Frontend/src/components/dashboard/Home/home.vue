<template>
  <el-container>
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
      <div class="div3"> </div>
      <div class="div4"> </div>
      <el-button
        class="div5"
        type="warning"
        @click="submitForm('portfolioForm')"
      >Convert</el-button>
      <div class="div6"> </div>
      <div class="div7"> </div>
      <el-form-item
        class="div8"
        prop="tovalue"
      >
        <el-input v-model.number="portfolioForm.tovalue"></el-input>
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
    <div class="hometext">Store portfolio and see a sum of your money in local currencies
      <br />
      Create alert to be updated with the currency exchange rate
      <br />
      See a trend of the forex in the past
    </div>
    <div class="chart div10">
      <line-chart
        :data="data"
        area
      />
    </div>

  </el-container>
</template>
<script>
export default {
  name: "LineBase",
  data() {
    return {
      data: [
        {
          name: "CAD to USD Conversion",
          data: [
            {
              label: "2016",
              value: 84000,
            },
            {
              label: "2017",
              value: 90000,
            },
            {
              label: "2018",
              value: 80000,
            },
            {
              label: "2019",
              value: 100000,
            },
          ],
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
            required: true,
            message: "Please Enter Value",
            trigger: "blur",
          },
          { type: "number", message: "Must be number" },
        ],
        tovalue: [
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
      this.fromcurrencies = result.data;
      this.tocurrencies = result.data;
      console.log(result.data);
    },
  },

  mounted() {
    this.getCurrencies();
  },
};
</script>
<style>
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
.chart {
  width: 90%;
  height: 400px;
  margin-left: 4%;
  background-color: aliceblue;
}
</style>