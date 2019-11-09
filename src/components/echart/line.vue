<template>
  <div v-bind:class="{'chart-bar':true}"></div>
</template>

<script>
  var echarts = require('echarts');

  export default {
    data() {
      return {
      };
    },
    methods: {
    },
    mounted:function () {
      // 基于准备好的dom，初始化echarts实例
      let id = "echartBar"+Math.random()*1000;
      this.$el.setAttribute("id",id);
      var echartLine = echarts.init(document.getElementById(id));
      // 绘制图表
      echartLine.setOption({
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 432, 901, 334, 1290, 330, 1320],
          type: 'line',
          label:{
            show:true
          }
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
