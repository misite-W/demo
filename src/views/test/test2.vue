<template>
    <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
        <el-form-item label="选择组织">
            <el-select v-model="value" placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="选择职务">
            <el-select v-model="value" placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="人员类别">
            <el-select v-model="value" placeholder="请选择">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="年龄段">
            <el-input-number size="mini" v-model="num4"></el-input-number>
            <el-input-number size="mini" v-model="num5"></el-input-number>
        </el-form-item>
        <el-form-item>
            <router-link to="/test1">上一步</router-link>
            <!--<router-link to="/test2">下一步</router-link>-->
            <el-button @click="show">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "test2",
        data() {
            return {
                num4:'',
                num5:'',
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: ''
            }
        },
        methods:{
            show:function(){
                console.log(this.$route)
                console.log(this.num4)
                console.log(this.num5)
            }

        }
    }
</script>

<style scoped>

</style>