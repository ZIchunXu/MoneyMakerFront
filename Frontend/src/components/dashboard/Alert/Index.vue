<template>
  <div>

    <!-- Title -->
    <div id="titleContainer">
      <h2><b>My Alerts</b></h2>
      <el-row>
        <router-link to="/createAlert">
          <el-button type="warning">Create Alert</el-button>
        </router-link>
      </el-row>
    </div>

    <!-- Alert Table -->
    <el-table
      :data="alert"
      border
      max-height="400"
    >

      <!-- AlertName Column -->
      <el-table-column
        label="AlertName"
        prop="alertName"
      >
      </el-table-column>
      <el-table-column
        label="Created On"
        prop="createDate"
      >
      </el-table-column>
      <el-table-column
        label="FromCurrency"
        prop="fromCurrency"
      >
      </el-table-column>
      <el-table-column
        label="ToCurrency"
        prop="toCurrency"
      >
      </el-table-column>
      <el-table-column
        label="Below/Above"
        prop="isBelow"
      ><template slot-scope="scope">
          {{scope.row.isBelow ? "Below":"Above"}}
        </template>
      </el-table-column>
      <el-table-column
        label="ConditionValue"
        prop="conditionValue"
      ></el-table-column>
      <el-table-column
        label="Action"
        width="200px"
      ><template slot-scope="scope">
          <router-link :to="{
                name: 'editAlert',
                query: {
                  fromCurrency: scope.row.fromCurrency,
                  toCurrency: scope.row.toCurrency,
        },
              }">
            <el-button type="warning">Edit</el-button>
          </router-link>
          <el-button
            type="warning"
            @click="deleteAlert(scope.$index, scope.row)"
          >Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-card
      class="box-card"
      shadow="always"
    >
      <h1 v-html="notifyalert"></h1>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      alert: [],
      notifyalert:"",
      activealert: [],
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
            "https://money-maker.azurewebsites.net/api/alerts?Token=" + token,
          headers: {},
          data: {},
        });
        if (result.data.code != 200) {
          this.$message.error(result.data.message);
          return;
        }
        this.alert = result.data.data.alert;
      } catch (error) {
        this.$message.error(error);
        console.log(error);
      }
    },
    async deleteAlert(index, row) {
      try {
        let cookie = this.$cookie.get("token");
        let userid = this.$cookie.get("userid");
        let token = JSON.parse(cookie);

        let result = await this.$axios({
          method: "DELETE",
          url: "https://money-maker.azurewebsites.net/api/alert?Token=" + token,
          headers: {},
          data: {
            userid: userid,
            fromCurrency: row.fromCurrency,
            toCurrency: row.toCurrency,
            alertName: row.alertName,
            isBelow: row.isBelow,
            conditionValue: row.ConditionValue,
          },
        });
        this.alert.splice(index, 1);
        console.log(index.alertName);
        if (result.data.code != 200) {
          this.$message.error(result.data.message);
          return;
        }
      } catch (error) {
        this.$message.error(error);
        console.log(error);
      }
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
        for (var i = 0; i < l; i++) {
          this.activealert.push(result.data.data.alerts[i]);
          let isbelow = "";
          if(this.activealert[i].isBelow === true){
            isbelow ="below ";
          } else {
            isbelow ="above ";
          }
          this.notifyalert +=
            this.activealert[i].fromCurrency +
            " to " +
            this.activealert[i].toCurrency + 
            " now is " + isbelow + this.activealert[i].conditionValue + '<br>';
        }
      } catch (error) {
        this.$message.error(error);
      }
    },
  },
  mounted() {
    this.getAlert(); 
    this.getActiveAlerts();
  },
};
</script>

<style scoped>
.el-table {
  margin-top: 50px;
  width: 80%;
  margin-left: 10%;
}
.el-col {
  min-height: 1px;
}

#titleContainer {
  margin-top: 50px;
  height: 75px;
  text-align: left;
}

#titleContainer > h2 {
  font-size: 30pt;
  font-weight: bold;
  color: aliceblue;
  margin-left: 10%;
}
#titleContainer > .el-row {
  margin-left: 10%;
  height: 73px;
}
h1 {
  color:black;
}
.box-card {
  width: 80%;
  margin-top: 20px;
  margin-left: 10%;
}
</style>