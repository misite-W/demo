<template>
    <div>
        {{form}}
        <el-divider></el-divider>
        考试管理
        <el-divider></el-divider>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="考试名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="起始时间">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="结束时间">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date3" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-time-picker placeholder="选择时间" v-model="form.date4" style="width: 100%;"></el-time-picker>
                </el-col>
            </el-form-item >
            <el-form-item label="限考次数">
            <el-input-number v-model="num" @change="handleChange" :min="1" :max="3"  >
            </el-input-number>
            </el-form-item>
            <el-form-item label="考试说明">
            <el-input
                    type="textarea"
                    :rows="2"
                    v-model="textarea">
            </el-input>
            </el-form-item>


            <el-form-item>
                <router-link tag="button" style="margin-top: 12px;" @click="next" :to="{path:'/test1',query:{form:form,num:num,desc:textarea}}">下一步</router-link>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>

            <!--<tableList-->

        <!--:getDataWay="getDataWay"-->
        <!--:columns="columns"-->
        <!--:pagination="pagination">-->
        <!--<el-table-column label="操作" slot="opt">-->
        <!--<template v-slot="scope">-->
        <!--<el-button size="mini" @click.stop="handleEdit(scope.row)">编辑</el-button>-->
        <!--<el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>-->
        <!--</template>-->
        <!--</el-table-column>-->
        <!--</tableList>-->
    </div>

</template>

<script>
    // import tableList from '@/components/grid/TableList'
    import tableList from "../../components/grid/TableList";
    export default {
        name: "test",
        data:function(){
            return{
                active: 0,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    date3: '',
                    date4: '',

                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                num:1,
                textarea:''
                // columns:[
                //     {
                //         prop:'name',
                //         label:'姓名'
                //     },
                //     {
                //       prop:'id',
                //       label:'序号'
                //     },
                //     {
                //         prop:'opt',
                //         label:'操作',
                //         template:true
                //     }
                // ],
                // getDataWay:{dataType:"data",
                // data:[
                //     {
                //         id:1,
                //         data:111,
                //         name:"1111"
                //     }
                // ]},
                // pagination: {
                //     currentPage: 1,
                //     pageSize: 10,
                //     position: 'right',
                //     layout: 'sizes ,prev, pager, next, jumper'
                // }

            }

        },
        methods:{
            onSubmit() {
                console.log(this.form.name);
            },
            handleChange(value) {
                console.log(value);
            },

        },
       components:{
            tableList
       }

    }
</script>

<style scoped>

</style>