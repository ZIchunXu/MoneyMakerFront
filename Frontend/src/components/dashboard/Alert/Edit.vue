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
            prop="tocurrency"
          >
            <el-select
              id="ToCurrency"
              v-model="alertForm.tocurrency"
            >
              <el-option
                v-for="item in tocurrency"
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
        tocurrency: "",
        isBelow: true,
        ConditionValue: "",
      },
      fromcurrency: [],
      tocurrency: [],
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
        tocurrency: [
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
      this.fromcurrency = result.data;
      this.tocurrency = result.data;
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
