<template>
  <div>

    <!-- Title -->
    <div id="titleContainer">
      <h2><b>Alert</b></h2>
      <el-row>
        <router-link to="/createAlert">
          <el-button type="warning">Create New</el-button>
        </router-link>
      </el-row>
    </div>

    <!-- Alert Table -->
    <el-table
      :data="alert"
      :row-class-name="tableRowClassName"
      border
    >

      <!-- AlertName Column -->
      <el-table-column
        label="AlertName"
        prop="AlertName"
      >
      </el-table-column>
      <el-table-column
        label="Created On"
        prop="date"
      >
      </el-table-column>
      <el-table-column
        label="FromCurrency"
        prop="FromCurrency"
      >
      </el-table-column>
      <el-table-column
        label="ToCurrency"
        prop="ToCurrency"
      >
      </el-table-column>
      <el-table-column
        label="Below/Above"
        prop="ConditionValue"
      >
      </el-table-column>
      <el-table-column
        align="right"
        fixed="right"
      >
        <template slot="header">
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="Action"
      >
        <template slot-scope="scope">
          <router-link :to="{
                name: 'Edit',
                params: { UserId: scope.row.UserId },
              }">
            <el-button type="warning">Edit</el-button>
          </router-link>
          <router-link :to="{
                name: 'Delete',
                params: { UserId: scope.row.UserId },
              }">
            <el-button type="warning">Delete</el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  //=========================================// SAMPLE DATA //=======================================================//
  data() {
    return {
      token: "",
      alert: [
        {
        },
      ],

      //b) TEST DATA: Current User Entity
      currentUser: {},
    };
  },
  //=========================================// END OF SAMPLE DATA //=======================================================//
  methods: {
    async getAlert() {
      try {
        let result = await this.$axios({
          method: "GET",
          url:
            "https://money-maker.azurewebsites.net/api/alert?Token=" +
            this.token,
          headers: {},
          data: {},
        });
         if (result.data.code != 200) {
          this.$message.error(result.data.message);
          return;
        }
       this.alert = result.data.data.list;
        console.log(result.data.data.list);
      } catch (error) {
        this.$message.error(error);
        console.log(error);
      }
    },
  },
  mounted() {
    console.log("1111");
    this.getAlert();
  },
};
</script>

<style scoped>
.el-table {
  margin-top: 50px;
  width: 80%;
  margin-right: 10%;
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
  margin-left: 10%;
}
#titleContainer > .el-row {
  margin-left: 10%;
  height: 73px;
}
</style>