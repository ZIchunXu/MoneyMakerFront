<template>
  <el-container>
    <div class="parent">
      <div class="div1">
        <el-select
          id="FromCurrency"
          v-model="value"
          placeholder=""
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="div2">
        <el-input
          v-model="input"
          placeholder=""
        ></el-input>
      </div>
      <div class="div3"> </div>
      <div class="div4"> </div>
      <div class="div5">
        <el-button type="warning">Convert</el-button>
      </div>
      <div class="div6"> </div>
      <div class="div7"> </div>
      <div class="div8">
        <el-input
          v-model="input"
          placeholder=""
        ></el-input>
      </div>
      <div class="div9">
        <el-select
          id="FromCurrency"
          v-model="value"
          placeholder=""
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="div10">
        <div class="hometext">Store portfolio and see a sum of your money in local currencies
          <br />
          Create alert to be updated with the currency exchange rate
          <br />
          See a trend of the forex in the past
        </div>
      </div>
      <div class="chart div10">
        <line-chart
          :data="data"
          area
        />
      </div>
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
       options: [
        {
          value: "USD",
          label: "USD",
        },
        {
          value: "CAD",
          label: "CAD",
        },
        {
          value: "EURO",
          label: "EURO",
        },
        {
          value: "RMB",
          label: "RMB",
        },
      ],
    };
  },

  methods:{
    async getCurrencies() {
      let result = await this.$axios({
      method: "GET",
      url: $apiUrl+"api/currencies",
      headers: {},
      data: {},
      });

      console.log(result);
    }
  },

  mounted(){
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
  grid-template-rows: repeat(7, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 10px;
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
.div10 {
  grid-area: 4 / 1 / 8 / 4;
}
.chart {
  width: 90%;
  height: 400px;
  margin-left: 4%;
  background-color: aliceblue;
}
</style>