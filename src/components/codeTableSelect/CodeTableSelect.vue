/**
*  select-option公共组件 支持驱动联动，支持被联动 支持前后端disabled
*  @params
***
    字典项传值对应关系:

***
*  :tableName 字典码
*  :placeholder  提示语
*  :clearable  是否可清空选项
*  :multiple  是否多选
*  :collapseTags  是否合并多选
*  :disabled  是否禁用
*  :filterable  是否可搜索
*  :defaultValue  多选传递数组，单选传递字符串
*  :change 获取选择值
*    url 请求url
*    showCode 是否展示代码
*    linkageable 是否可以被联动 支持根据value联动
*    ableItems 前端able数据，默认disabled 其他选项
*/
<template>
    <div>
        <el-select v-if="!linkage"
                   v-model="value"
                   :placeholder="placeholder"
                   :clearable="clearable"
                   :multiple="multiple"
                   :collapse-tags="collapseTags"
                   :disabled="disabled"
                   :filterable="filterable"
                   @change="getValue">
            <el-option
                    v-for="(item,index) in options"
                    :key="index"
                    :label="showCode?item.dm+item.label:item.label"
                    :value="item.value"
                    :disabled="item.disabled"
            >
                <span v-if="!item.pcode">{{showCode?item.dm:""}}{{ item.label }}</span>
                <span v-else>&nbsp;&nbsp;{{showCode?item.dm:""}}{{ item.label }}</span>
            </el-option>
        </el-select>
        <el-select v-else
                   v-model="value"
                   :placeholder="placeholder"
                   :clearable="clearable"
                   :multiple="multiple"
                   :collapse-tags="collapseTags"
                   :disabled="disabled"
                   :filterable="filterable"
                   @change="getValue">
            <el-option
                    v-for="(item,index) in options"
                    :key="index"
                    :label="showCode?item.dm+item.label:item.label"
                    :value="item.value"
                    :disabled="item.disabled"
            >
                <span v-if="!item.pcode">{{showCode?item.dm:""}}{{ item.label }}</span>
                <span v-else>&nbsp;&nbsp;{{showCode?item.dm:""}}{{ item.label }}</span>
            </el-option>
        </el-select>
    </div>
</template>

<script>
    export default {
        name: "CodeTableSelect",
        components: {},
        props: {
            queryName: {
                type: String,
                default: ""
            },
            currentCode:{
                type: String,
                default: ""
            },
            placeholder: {
                type: String,
                default: "请选择"
            },
            clearable: {
                type: Boolean,
                default: false
            },
            multiple: {
                type: Boolean,
                default: false
            },
            collapseTags: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            },
            filterable: {
                type: Boolean,
                default: false
            },
            defaultValue: {
                default: ""
            },
            url: {
                default: '',
            },
            showCode: {
                default: false
            },
            linkageable: {
                default: false
            },
            ableItems:{
                type: Array,
                default:function () {
                    return []
                }
            }
        },
        data() {
            return {
                options: [],
                value: "",
                selectedOption: {},
                localUrl:this.url,
                linkage:false,
                optionsCopy: [],

            };
        },
        mounted() {
            this.value = this.defaultValue;
            this.getOptions();
        },
        watch: {
            defaultValue(newValue, oldValue) {
                this.value = newValue;
                if (this.linkageable) {
                    this.linkage = !this.linkage

                }
            },
            queryName(newValue, oldValue) {
                this.queryName = newValue;
                this.getOptions();
            },
            ableItems(newValue) {

                if (newValue.length > 0) {
                    this.optionsCopy = JSON.parse(JSON.stringify(this.options))/*暂存,深拷贝，用于切换回去*/
                    for (let item of this.options.values()) {
                        if (newValue.indexOf(item.value) > -1) {//指定able条目，其他全部disable
                            item.disabled = false
                        } else {
                            item.disabled = true
                        }
                    }

                } else {//未指定，恢复数据
                    if (this.optionsCopy.length > 0) {
                        this.options = this.optionsCopy
                        this.optionsCopy=[]
                    }
                }
                /*刷新*/
                this.linkage = !this.linkage
            }
        },
        methods: {
            getOptions: function() {
                let data = {}
                this.options = [];
                let that = this;

                this.$store.getters["codeTable/getCodeTableByKey"]({
                    key: this.queryName,
                    url: 'http://mock/data/querySelectorListMapByTableName',
                    //url:this.$api.getSelect.getListData,
                    _that:this
                }).then(function (data) {
                    if (data) {
                        let dataOptions = data
                        for (let i = 0; i < dataOptions.length; i++) {
                            if (
                                !dataOptions[i].pcode &&
                                dataOptions[i + 1] &&
                                dataOptions[i + 1].pcode === dataOptions[i].code
                            ) {
                                that.options.push({
                                    label: dataOptions[i].caption,
                                    value: dataOptions[i].code,
                                    dm:dataOptions[i].dm,
                                    disabled: true
                                });
                            } else {
                                that.options.push({
                                    label: dataOptions[i].caption,
                                    value: dataOptions[i].code,
                                    pcode: dataOptions[i].pcode,
                                    disabled: dataOptions[i].disabled,
                                    dm:dataOptions[i].dm
                                });
                            }
                        }
                    } else {
                        that.msgAlert("数据异常，请联系管理员"+data.msg);
                    }
                }).catch(function(error) {
                    that.msgAlert("数据异常，请联系管理员"+error);
                })
            },
            getValue: function () {
                this.$emit("change", this.value);
            },
            resetVal: function() {
                this.value = "";
            }
        }
    };
</script>

<style>
</style>
