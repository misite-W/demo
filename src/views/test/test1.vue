<template>
    <el-form ref="form" :model="sizeForm" label-width="80px" size="mini">
        {{$route.query.form}}
        <el-button type="danger" plain>添加题目</el-button>
        <el-button type="info" plain>批量删除</el-button>
        <tableList
        :getDataWay="getDataWay"
        :columns="columns"
        :pagination="pagination">
        <el-table-column label="操作" slot="opt">
        <template v-slot="scope">
        <el-button size="mini" @click.stop="handleEdit(scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
        </el-table-column>
        </tableList>
        <el-form-item label="考试总分">
            <el-input-number v-model="score" @change="handleChange" :min="0" :max="100"  >
            </el-input-number>
            及格分数
            <el-input-number v-model="okscore" @change="handleChange" :min="0" :max="100"  >
            </el-input-number>
        </el-form-item>
        <el-form-item label="单选题数">
            <el-input-number v-model="danxuan" :disabled="true"></el-input-number>
            单选分值
            <el-input-number v-model="danxuanscore" @change="handleChange" :min="0" :max="100"  >
            </el-input-number>
        </el-form-item>
        <el-form-item label="多选题数">
            <el-input-number v-model="duoxuan" :disabled="true"></el-input-number>
            多选分值
            <el-input-number v-model="duoxuanscore" @change="handleChange" :min="0" :max="100"  >
            </el-input-number>
        </el-form-item>
        <el-form-item label="判断题数">
            <el-input-number v-model="panduan" @change="handleChange" :min="0" :max="100"  >
            </el-input-number>
            判断分值
            <el-input-number v-model="panduanscore" @change="handleChange" :min="0" :max="100"  >
            </el-input-number>
        </el-form-item>
        <el-form-item>
            <router-link to="test/:moduleName">上一步</router-link>
            <router-link :to="{path:'/test2' , query:{test:this.$route,radioNum:danxuan,checkNum:duoxuan,judgeNum:panduan}}">下一步</router-link>
            <el-button @click="show">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import tableList from "../../components/grid/TableList";
    export default {
        name: "test1",
        data:function() {
            return{

                score:100,
                okscore:60,
                danxuan:0,
                danxuanscore:0,
                duoxuan:0,
                duoxuanscore:0,
                panduan:0,
                panduanscore:0,
                columns:[
                    {
                        prop:'id',
                        label:'序号'
                    },
                    {
                        prop:'name',
                        label:'题目名称'
                    },
                    {
                        prop:'name1',
                        label:'题库名称'
                    },
                    {
                        prop:'type',
                        label:'类型'
                    },
                    {
                        prop:'opt',
                        label:'操作',
                        template:true
                    }
                ],
                getDataWay:{dataType:"data",
                data:[
                    {
                        id:1,
                        data:111,
                        name:"1111",
                        name1:"dsadasd",
                        type:"leixing",

                    }
                ]},
                pagination: {
                    currentPage: 1,
                    pageSize: 10,
                    position: 'right',
                    layout: 'sizes ,prev, pager, next, jumper'
                }
            }
        },
        components:{
            tableList
        },
        methods:{
           show:function(){
               console.log(this.$route)

           }
        }
    }
</script>

<style scoped>

</style>