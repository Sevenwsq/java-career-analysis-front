<template>
  <div v-title data-title="列表">
    <el-form :inline="true" :model="positionVo" class="demo-form-inline" style="text-align:center;">
      <el-form-item label="公司">
        <el-input v-model="positionVo.company" placeholder="公司关键字" clearable></el-input>
      </el-form-item>
      <el-form-item label="职位名称">
        <el-select v-model="positionVo.jobTitle" filterable placeholder="请选择" clearable>
          <el-option
            placeholder="职位名称"
            v-for="item in jobTitles"
            :key="item.value"
            :label="item.value"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- <el-autocomplete
          class="inline-input"
          :validate-event="false"
          clearable
          v-model="positionVo.jobTitle"
          :fetch-suggestions="querySearch"
          :debounce=0
          :trigger-on-focus="true"
          placeholder="职位名称"
          @change="handleSelectJobTitle"
        ></el-autocomplete>-->
      </el-form-item>
      <el-form-item label="薪水">
        <el-select v-model="positionVo.salary" clearable placeholder="请选择">
          <el-option v-for="(item,i) in salaries" :key="i" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市">
        <el-select v-model="positionVo.city" clearable placeholder="请选择" @change="handleSelectCity">
          <el-option v-for="(item,i) in cities" :key="i" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="行政区">
        <el-select v-model="positionVo.district" clearable placeholder="请选择">
          <el-option v-for="(item,i) in districts" :key="i" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="getAllByPage" id="searchBtn">查询</el-button>
      </el-form-item>
    </el-form>
    <div class="toolBar" style="margin-left:40px;">
      <el-tooltip class="item" effect="dark" content="导出全部数据" placement="bottom-start">
        <el-button type="primary" icon="el-icon-download" circle @click="exPortAll"></el-button>
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="导出本页数据" placement="bottom-start">
        <el-button
          type="primary"
          icon="el-icon-video-camera"
          circle
          @click="exPortPage"
          style="margin-left:20px;"
        ></el-button>
      </el-tooltip>
    </div>
    <div class="table-div">
      <el-table
        :data="positionVo.list"
        style="width: 100%"
        @sort-change="sortChange"
        header-align="center"
      >
        <el-table-column type="expand">
          <template slot-scope="position">
            <el-form label-position="left" inline class="position-table-expand">
              <el-form-item label="职位名称:">
                <span>{{ position.row.jobTitle }}</span>
              </el-form-item>
              <el-form-item label="薪水:">
                <span>{{ position.row.salary }}</span>
              </el-form-item>
              <el-form-item label="城市:">
                <span>{{ position.row.city }}</span>
              </el-form-item>
              <el-form-item label="行政区:">
                <span>{{ position.row.district }}</span>
              </el-form-item>
              <el-form-item label="工作经验:">
                <span>{{ position.row.exRequired | handlerExRequired }}</span>
              </el-form-item>
              <el-form-item label="学历:">
                <span>{{ position.row.education }}</span>
              </el-form-item>
              <el-form-item label="公司:">
                <el-avatar
                  :size="30"
                  :src="position.row.companyLogo"
                  style="vertical-align: middle;"
                ></el-avatar>&emsp;
                <el-link
                  type="success"
                  target="_blank"
                  :href="position.row.companyLink"
                >{{ position.row.company }}</el-link>
              </el-form-item>
              <el-form-item label="招聘标签:">
                <span
                  v-for="(tag,i) in handlerTags(position.row.tags)"
                  :key="i"
                  style="display:inline-block;margin:3px"
                >
                  <el-tag>{{ tag }}</el-tag>
                </span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="编号" sortable="custom" width="100px"></el-table-column>
        <el-table-column prop="jobTitle" label="职位名称" width="200px"></el-table-column>
        <el-table-column prop="salary" label="薪水"></el-table-column>
        <el-table-column prop="city" label="城市" sortable="custom"></el-table-column>
        <el-table-column prop="district" label="行政区"></el-table-column>
        <el-table-column prop="exRequired" label="工作经验">
          <template slot-scope="scope">
            <span>{{ scope.row.exRequired | handlerExRequired }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="education" label="学历"></el-table-column>
        <el-table-column prop="company" label="公司" width="260px">
          <template slot-scope="scope">
            <el-avatar :size="30" :src="scope.row.companyLogo" style="vertical-align: middle;"></el-avatar>&emsp;
            <el-link
              type="success"
              target="_blank"
              :href="scope.row.companyLink"
            >{{ scope.row.company }}</el-link>
          </template>
        </el-table-column>

        <el-table-column prop="tags" label="招聘标签" width="220px">
          <template slot-scope="scope">
            <span
              v-for="(tag,i) in handlerTags(scope.row.tags)"
              :key="i"
              style="display:inline-block;margin:3px"
            >
              <el-tag>{{ tag }}</el-tag>
            </span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-component">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="positionVo.current"
        :page-sizes="[1,2,5,12,15,20,30,40,50]"
        :page-size.sync="positionVo.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="positionVo.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import positionApi from "@/api/position.js";
import store from "@/store/index.js";
import { Message } from "element-ui";
export default {
  data() {
    return {
      positionVo: {
        current: 1,
        size: 12,
        total: 0,
        list: [],
        city: "",
        district: "",
        jobTitle: "",
        company: "",
        salary: "",
        sortColumn: "",
        sortMethod: ""
      },
      districts: [],
      salaries: store.getters.getSalary,
      cities: store.getters.getAllCity,
      jobTitles: store.getters.getJobTitle
      //   departmentList: this.$store.getters.getDepartmentList,
    };
  },
  methods: {
    handleSizeChange(val) {
      //pageSize 改变时会触发
      //console.log(`每页 ${val} 条`)
      this.positionVo.size = val;
      this.getAllByPage();
    },
    handleCurrentChange(val) {
      //currentPage 改变时会触发
      //console.log(`当前页: ${val}`)
      this.positionVo.current = val;
      this.getAllByPage();
    },
    sortChange(custom) {
      // 处理排序
      //console.log(custom)
      this.positionVo.sortColumn = custom.prop;
      if (custom.order === "ascending") {
        this.positionVo.sortMethod = "asc";
      }
      if (custom.order === "descending") {
        this.positionVo.sortMethod = "desc";
      }
      this.getAllByPage();
    },
    getJobTitle() {
      console.log(this.jobTitles);
      if (this.jobTitles === undefined || this.jobTitles.length === 0) {
        positionApi.getJobTitle(this.positionVo.jobTitle).then(res => {
          this.jobTitles = res;
          store.commit("SET_JOBTITLE", res);
        });
      }
    },
    // handleSelectJobTitle(item) {
    //   this.positionVo.jobTitle = item.value;
    // },
    getAllCity() {
      if (this.cities === undefined || this.cities.length === 0) {
        positionApi.getAllCity().then(res => {
          this.cities = res;
          store.commit("SET_ALL_CITY", res);
        });
      }
    },
    getSalary() {
      if (this.salaries === undefined || this.salaries.length === 0) {
        positionApi.getSalary().then(res => {
          this.salaries = res;
          store.commit("SET_SALARY", res);
        });
      }
    },
    getAllByPage() {
      positionApi.getAllByPage(this.positionVo).then(res => {
        // console.log(res);
        this.positionVo.list = res.data.list;
        this.positionVo.total = res.data.total;
        // this.$refs.searchBtn.blur();
        document.getElementById("searchBtn").blur();
      });
    },
    handlerTags(tags) {
      tags = tags.substring(0, tags.length - 1);
      let newTags = tags.split(",");
      return newTags;
    },
    handleSelectCity() {
      positionApi.getDistrictByCity(this.positionVo.city).then(res => {
        this.districts = res;
        this.positionVo.district = "";
      });
    },
    // 导出全部数据请求
    exPortAll() {
      positionApi.exPortAll().then(res => {
        // console.log(res);
        let b = new Blob([res], { type: "application/vnd.ms-excel" });
        let url = URL.createObjectURL(b);
        let link = document.createElement("a");
        link.download = "全部招聘信息.xlsx";
        link.href = url;
        link.click();
        window.URL.revokeObjectURL(url);
      });
    },
    //导出本页数据
    exPortPage() {
      positionApi.exPortPage(this.positionVo.list).then(res => {
        let b = new Blob([res], { type: "application/vnd.ms-excel" });
        let url = URL.createObjectURL(b);
        let link = document.createElement("a");
        link.download = "招聘信息第"+this.positionVo.current+"页["+this.positionVo.size+"条数据每页"+"].xlsx";
        link.href = url;
        link.click();
        window.URL.revokeObjectURL(url);
      });
    }
  },
  filters: {
    handlerExRequired(exRequired) {
      return exRequired.slice(2);
    }
  },
  created() {
    this.getAllCity();
    this.getSalary();
    this.getAllByPage();
    this.getJobTitle();
  }
};
</script>

<style scoped>
.page-component {
  margin-top: 15px;
}
.position-table-expand {
  font-size: 0;
}
.position-table-expand label {
  width: 400px;
  color: #99a9bf;
}
.position-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>