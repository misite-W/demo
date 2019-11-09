<template>
    <div class="mychart-demo">
        <Mybar class="mychart-bar"></Mybar>
        <Mybar class="mychart-bar"></Mybar>
        <Mypie class="mychart-pie"></Mypie>
        <Myline class="mychart-line"></Myline>
        <Mybing class="mychart-line"></Mybing>
    </div>
</template>

<script>

    import Mybar from "@/components/echart/bar";
    import Mypie from "@/components/echart/pie";
    import Myline from "@/components/echart/line";
    import Mybing from "@/components/echart/bing";

    export default {
        name: "mychart",
        components: {
            Mybar,
            Mypie,
            Myline,
            Mybing
        },
        data() {
            return {
                orgId: this.$store.state.orgId,
                barData: {
                    x: [],
                    y: []
                }

            }
        },
        watch:{
          orgId(val){
              this.onOrgChange(val)
          }
        },
        methods: {
            onPageActive(){
                window.console.log("mycharts页面激活"+this.orgId)
            },
            onOrgChange(orgId){
                window.console.log("mycharts" + "组织变更为："+orgId+"，刷新当前页数据")
                this.msgAlert("mycharts" + "组织变更为："+orgId+"，刷新当前页数据")
            }
        }
    }
</script>

<style scoped>
    .mychart-bar {
        display: inline-block;
    }

    .mychart-pie {
        display: inline-block;
    }

    .mychart-line {
        display: inline-block;
    }


</style>
