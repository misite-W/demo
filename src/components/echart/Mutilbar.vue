<template id="tem">
  <div name="el-bar-name" v-bind:class="{'chart-bar':true}"></div>
</template>

<script>
  var echarts = require('echarts');

  export default {
    props:["barId"],
    data() {
      return {

      };
    },
    methods: {
    },
    mounted:function () {
      let barArr = document.getElementsByName("el-bar-name");
      let index = this.barId.split('_')[1];
      barArr[(parseInt(index) - 1)].setAttribute("id", this.barId);
      // 基于准备好的dom，初始化echarts实例
      var echartBar = echarts.init(document.getElementById(this.barId));
      // 绘制图表
      echartBar.setOption({
        // title: { text: 'ECharts 入门示例' },
        tooltip: {},
        xAxis: {
          data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
        },
        yAxis: {},
        series: [{
          label:{
            show:true,
            position:"outside",
          },
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
          barWidth:"10px",
        }]
      });
    }
  };
</script>
<style scoped>
  .chart-bar{
    width: 400px;
    height: 200px;
  }
</style>
