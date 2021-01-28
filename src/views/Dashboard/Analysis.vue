<template>
  <div>
    {{ $t("message")["app.dashboard.analysis.timeLabel"] }} :
    <a-date-picker></a-date-picker>
    <!-- 组件和参数剥离,从父组件传入 -->
    <Chart :option="chartOption" style="height:300px" />
  </div>
</template>

<script>
import Chart from "../../components/Charts";
import request from "../../utils/request";
// import axios from "axios";
// import random from "lodash/random";
export default {
  data() {
    return {
      chartOption: {}
    };
  },
  mounted() {
    this.getChartData();
    // this.interval = setInterval(() => {
    this.getChartData();
    // this.chartOption.series[0].data = this.chartOption.series[0].data.map(() => random(100));
    // this.chartOption = { ...this.chartOption };
    // }, 3000);
  },
  methods: {
    getChartData() {
      request({
        url: "/api/dashboard/chart",
        method: "get",
        params: { id: 123 }
      }).then(response => {
        this.chartOption = {
          title: {
            text: "物品销量"
          },
          tooltip: {},
          xAxis: {
            data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
          },
          yAxis: {},
          series: [
            {
              name: "销量",
              type: "bar",
              data: response.data
            }
          ]
        };
      });
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  components: {
    Chart
  }
};
</script>

<style></style>
