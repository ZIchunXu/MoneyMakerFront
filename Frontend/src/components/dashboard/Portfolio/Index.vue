<template>
  <div>

    <!-- Title -->
    <div id="titleContainer">
      <h2><b>My Portfolio Entries</b></h2>
      <el-row>
        <router-link to="/createPortfolio">
          <el-button type="warning">Create Portfolio Entry</el-button>
        </router-link>
      </el-row>
    </div>

    <!-- Portfolio Table -->
    <el-table
      :data="portfolio"
      max-height="400"
      border
    >

      <!-- Portfolio Column -->
      <el-table-column
        label="Currency"
        prop="entryCurrencySym"
      >
      </el-table-column>
      <el-table-column
        label="Amount"
        prop="entryValue"
      >
      </el-table-column>
      <el-table-column
        label="Action"
        width="200px"
      ><template slot-scope="scope">
          <router-link :to="{
          name:'editPortfolio',
          query: {
            entryCurrencySym: scope.row.entryCurrencySym,
          }
        }">
            <el-button type="warning">Edit</el-button>
          </router-link>
          <el-button
            type="warning"
            @click="deletePortfolio(scope.$index, scope.row)"
          >Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-card
      class="box-card"
      shadow="always"
    >
      <h1>Total CAD: {{sum}}</h1>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      portfolio: [],
      sum:"",
    };
  },
  methods: {
    async getPortfolio() {
      try {
        let cookie = this.$cookie.get("token");
        let token = JSON.parse(cookie);
        let result = await this.$axios({
          method: "GET",
          url:
            "https://money-maker.azurewebsites.net/api/portfolios?Token=" +
            token,
          headers: {},
          data: {},
        });
        if (result.data.code != 200) {
          this.$message.error(result.data.message);
          return;
        }
        console.log(result.data.data.portfolio);
        this.portfolio = result.data.data.portfolio;
      } catch (error) {
        this.$message.error(error);
        console.log(error);
      }
    },
    async getSum() {
      try {
        let cookie = this.$cookie.get("token");
        let token = JSON.parse(cookie);
        let result = await this.$axios({
          method: "GET",
          url:
            "https://money-maker.azurewebsites.net/api/portfolio/sum?Token=" +
            token,
          headers: {},
          data: {},
        });
        if (result.data.code != 200) {
          this.$message.error(result.data.message);
          return;
        }
        console.log(result.data.data.sum);
        this.sum = result.data.data.sum;
      } catch (error) {
        this.$message.error(error);
        console.log(error);
      }
    },
    async deletePortfolio(index, row) {
      try {
        let cookie = this.$cookie.get("token");
        let userid = this.$cookie.get("userid");
        let token = JSON.parse(cookie);

        let result = await this.$axios({
          method: "DELETE",
          url:
            "https://money-maker.azurewebsites.net/api/portfolio?Token=" +
            token,
          headers: {},
          data: {
            userid: userid,
            entryCurrencySym: row.entryCurrencySym,
            entryValue: row.entryValue,
          },
        });
        this.portfolio.splice(index, 1);
        if (result.data.code != 200) {
          this.$message.error(result.data.message);
          return;
        }
      } catch (error) {
        this.$message.error(error);
        console.log(error);
      }
    },
  },
  mounted() {
    this.getPortfolio();
    this.getSum();
  },
};
</script>

<style scoped>
.el-table {
  width: 80%;
  margin-top: 50px;
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

.box-card {
  width: 80%;
  margin-top: 20px;
  margin-left: 10%;
}
</style>