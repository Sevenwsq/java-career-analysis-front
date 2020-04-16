<template>
  <div v-title data-title="极坐标图">
    <div id="pie"></div>
  </div>
</template>

<script>
import positionApi from "@/api/position.js";
import store from "@/store/index.js";
var echarts = require("echarts");
export default {
  data() {
    return {
      cities: store.getters.getAllCity,
      analysisSalary: store.getters.getAnalysisSalary
    };
  },
  methods: {
    drawPie() {
      let pie = this.$echarts.init(document.getElementById("pie"));
      let analysisSalary = this.analysisSalary;
      let cities = this.cities;
      const barHeight = 0.5;
      pie.setOption({
        color: ["#3398DB", "#EDC034"],
        title: {
          text: "各个城市的薪资水平",
          left: 50
          // subtext: '市中心一室月租费（数据来源：https://www.numbeo.com）'
        },
        legend: {
          show: true,
          data: ["薪资水平", "均值"]
        },
        grid: {
          top: 100
        },
        angleAxis: {
          type: "category",
          data: cities
        },
        tooltip: {
          show: true,
          formatter: function(params) {
            var id = params.dataIndex;
            return (
              cities[id] +
              "<br>最低：" +
              analysisSalary[id][0] +
              "<br>最高：" +
              analysisSalary[id][1] +
              "<br>平均：" +
              analysisSalary[id][2]
            );
          }
        },
        radiusAxis: {},
        polar: {
          center: ['50%', '50%'],
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        series: [
          {
            type: "bar",
            itemStyle: {
              color: "transparent"
            },
            data: analysisSalary.map(function(d) {
              return d[0];
            }),
            coordinateSystem: "polar",
            stack: "最大最小值",
            silent: true
          },
          {
            type: "bar",
            data: analysisSalary.map(function(d) {
              return d[1] - d[0];
            }),
            coordinateSystem: "polar",
            name: "薪资水平",
            stack: "最大最小值"
          },
          {
            type: "bar",
            itemStyle: {
              color: "transparent"
            },
            data: analysisSalary.map(function(d) {
              return d[2] - barHeight;
            }),
            coordinateSystem: "polar",
            stack: "均值",
            silent: true,
            z: 10
          },
          {
            type: "bar",
            data: analysisSalary.map(function(d) {
              return barHeight * 2;
            }),
            coordinateSystem: "polar",
            name: "均值",
            stack: "均值",
            barGap: "-100%",
            z: 10
          }
        ]
      });
    },
    getAllCity() {
      if (this.cities === undefined || this.cities.length === 0) {
        positionApi.getAllCity().then(res => {
          this.cities = res;
          store.commit("SET_ALL_CITY", res);
        });
      }
    },
    getAnalysisSalary() {
      if (
        this.analysisSalary === undefined ||
        this.analysisSalary.length === 0
      ) {
        positionApi.getAnalysisSalary().then(res => {
          this.analysisSalary = res;
          store.commit("SET_ANALYSIS_SALARY", res);
          this.drawPie();
        });
      }
    }
  },
  mounted() {
    this.drawPie();
  },
  created() {
    this.getAllCity();
    this.getAnalysisSalary();
  }
};
</script>

<style>
#pie {
  margin: 10px 0px;
  width: 100%;
  height: 620px;
}
</style>