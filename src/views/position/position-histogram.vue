<template>
  <div v-title data-title="图表">
    <div id="histogram"></div>
  </div>
</template>

<script>
import positionApi from "@/api/position.js";
import store from "@/store/index.js";
var echarts = require("echarts");
export default {
  data() {
    return {
      histogramData: store.getters.getHistogramAndLineData
    };
  },
  methods: {
    drawHistogram() {
      // 基于准备好的dom，初始化echarts实例
      // console.log(this.$store.getters.getHistogramAndLineData); 
      // console.log(store.getters.getHistogramAndLineData); 这两个等同
      let histogram = this.$echarts.init(document.getElementById("histogram"));
      // 绘制图表
      let jobTitles = this.histogramData.jobTitles;
      let counts = this.histogramData.counts;
      histogram.setOption({
        color: ["#3398DB"],
        title: { text: "各个岗位的招聘人数" },
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          data: jobTitles
        },
        yAxis: {},
        series: [
          {
            name: "岗位数",
            type: "bar",
            data: counts
          }
        ]
      });
    }
  },
  mounted() {
    this.drawHistogram();
  },
  created() {
  }
};
</script>

<style>
#histogram {
  margin: 10px 30px;
  width: 90%;
  height: 600px;
}
</style>