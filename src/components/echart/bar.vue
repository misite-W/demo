<template >
    <div v-bind:class="{'chart-bar':true}"></div>
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
    beforeMount:function(){
      console.log(this.$el);
    },
    mounted:function () {
      // 基于准备好的dom，初始化echarts实例
      let id = "echartBar"+Math.random()*1000;
      this.$el.setAttribute("id",id);
      var echartBar = echarts.init(document.getElementById(id));
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
