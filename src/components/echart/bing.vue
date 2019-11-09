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
      var echartBing = echarts.init(document.getElementById(id));
      // 绘制图表
      echartBing.setOption({
        title : {
          text: '某站点用户访问来源',
          subtext: '纯属虚构',
          x:'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
        },
        series : [
          {
            name: '访问来源',
            type: 'pie',
            radius : '45%',
            center: ['50%', '60%'],
            data:[
              {value:335, name:'直接访问'},
              {value:310, name:'邮件营销'},
              {value:234, name:'联盟广告'},
              {value:135, name:'视频广告'},
              {value:1548, name:'搜索引擎'}
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
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
