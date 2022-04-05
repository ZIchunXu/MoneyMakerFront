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
            prop="fromCurrency"
          >
            <el-input
              v-model="alertForm.fromCurrency"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item
            label="To:"
            prop="toCurrency"
          >
            <el-input
              v-model="alertForm.toCurrency"
              disabled
            ></el-input>
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
        <el-button
          type="danger"
          @click=" back()"
        >Back to List</el-button>
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
        fromCurrency: "",
        toCurrency: "",
        isBelow: true,
        ConditionValue: "",
      },
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
          url:
            "https://money-maker.azurewebsites.net/api/alert?Token=" +
            token +
            "&FromCurrency=" +
            this.alertForm.fromCurrency +
            "&ToCurrency=" +
            this.alertForm.toCurrency,
          headers: {},
          data: {},
        });
        this.alertForm.AlertName = result.data.data.alert.alertName;
        this.alertForm.isBelow = result.data.data.alert.isBelow;
        this.alertForm.ConditionValue = result.data.data.alert.conditionValue;

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
      this.alertForm.fromCurrency = this.$route.query.fromCurrency;
      this.alertForm.toCurrency = this.$route.query.toCurrency;
    },
    async back() {
      this.$router.push({
        name: "Alert",
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
              "https://money-maker.azurewebsites.net/api/alert?Token=" + token,
            headers: {},
            data: {
              userid: userid,
              fromCurrency: this.alertForm.fromCurrency,
              toCurrency: this.alertForm.toCurrency,
              alertName: this.alertForm.AlertName,
              isBelow: this.alertForm.isBelow,
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
  },

  mounted() {
    this.getParams();
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
