<template>
  <div v-title data-title="折线图">
    <div id="line"></div>
  </div>
</template>

<script>
import positionApi from "@/api/position.js";
import store from "@/store/index.js";
var echarts = require("echarts");
export default {
  data() {
    return {
      lineData: store.getters.getHistogramAndLineData
    };
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let line = this.$echarts.init(document.getElementById("line"));
      // 绘制图表
      let jobTitles = this.lineData.jobTitles;
      let counts = this.lineData.counts;
      line.setOption({
        color: ["#3398DB"],
        title: { text: "各个岗位的招聘人数",left: 50 },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: jobTitles
        },
        tooltip: {
          trigger: "axis"
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "岗位数",
            data: counts,
            stack: "总量",
            type: "line"
          }
        ],
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        }
      });
    }
  },
  mounted() {
    this.drawLine();
  },
  created() {}
};
</script>

<style>
#line {
  margin: 10px 0px;
  width: 100%;
  height: 600px;
}
</style>