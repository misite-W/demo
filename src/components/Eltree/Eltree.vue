<template>
    <div class="tree_wt">
        <div class="tree_input" v-on:click="showOrHiden">
            <div class="tree_select" v-if="treeData.multiple"><!--多选-->
                <input style="display:none;" v-model="items"> </input>
                <span class="el-tag el-tag--info el-tag--small el-tag--light tree_tag" v-for="item in items" v-if="items.length>0">
                    <span class="el-select__tags-text">{{item.label}}</span>
                    <i class="el-tag__close el-icon-close" :treeid="item.id"></i>
                </span>
            </div>
            <div class="tree_select" v-else><!--单选-->
                <span class="tree_radio tree_icon_style" v-if="items.length>0">
                    {{items[0].label}}
                <i class="el-tag__close el-icon-close"></i>
                </span>
            </div>
            <span class="tree_icon_style" v-bind:class="{terggle:showing}"></span>
        </div>
        <div class="tree_panel" v-show="showing">
            <!--多选-->
            <el-tree
                    v-if="treeData.multiple"
                    :default-expanded-keys="keys"
                    :default-checked-keys="keys"
                    @check-change="NodeCheck"
                    @node-expand="appendItem"
                    :lazy="treeData.lazy"
                    :load="loadNode"
                    :data="treeData.value"
                    show-checkbox
                    node-key="id"
                    ref="tree"
                    :props="defaultProps">
            </el-tree>
            <!--单选-->
            <el-tree
                    v-else
                    @node-click="NodeClick"
                    :data="treeData.value"
                    :highlight-current="true"
                    node-key="id"
                    ref="tree"
                    :props="defaultProps">
            </el-tree>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Eltree",
        props: ["treeData"],
        data() {
            return {
                url: "",
                multiple: "show-checkbox",
                showing: false,
                input: "",
                items: [],
                keys:[],
                defaultProps: {
                    children: 'children',
                    label: 'label',
                    isLeaf: 'leaf'
                }
            };
        },
        created: function () {
            if (this.treeData) {
                if (this.treeData.dataType === "URL") {
                    this.url = this.treeData.url;
                }
                /*不是懒加载*/
                if (!this.treeData.lazy) {
                    this.treeData.lazy = false;//不开启懒加载
                    if (this.treeData.dataType === "URL") {//url需要请求一次数据
                        this.$axios({
                            method: 'post',
                            url: this.url,
                            data: this.treeData.quarm
                        }).then(function (response) {
                            console.log(response.data);
                            return response.data;
                        }).then((data) => {
                            this.treeData.value = data.value;
                        }).catch(function (error) {
                            console.log(error);
                        });
                    }
                }
            } else {
                console.log("tree初始化失败");
            }
        },
        mounted: function () {

        },
        methods: {
            showOrHiden: function (event) {
                if (event.target.nodeName === "I") {//取消标签
                    if (this.treeData.multiple) {
                        let delId = event.target.getAttribute("treeid");
                        let items = this.items;
                        let treeArr = this.$refs.tree.getCheckedNodes();
                        console.log(treeArr)
                        let newKeys = getChildKeys(treeArr, delId);
                        for (let i = 0; i < items.length; i++) {
                            if (items[i].id.toString() === delId) {
                                items.splice(i, 1);
                            }
                        }
                        console.log("newKeys============" + newKeys);
                        /*取消选中*/
                        this.$refs.tree.setCheckedKeys(newKeys);
                        this.items = items;
                    } else {
                        this.items = [];
                    }
                    return false
                } else if (event.target.nodeName === "SPAN" && (event.target.childNodes).length > 0) {//标签span
                    return false
                } else {//隐藏||显示
                    this.showing = !this.showing;
                }
            },
            NodeClick(data) {//单选
                var obj = {
                    id: data.id,
                    label: data.label,
                }
                this.items.splice(0, this.items.length, obj);
            },
            appendItem(data, node) {
                if (node.checked && !!data.children&&!this.treeData.lazy) {
                    let newArr = this.items.concat(data.children);
                    this.items = newArr;
                }
            },
            NodeCheck(data, isChecked, isChildChecked) {//多选
                if (isChecked) {//选中
                    var obj = {
                        id: data.id,
                        label: data.label,
                    }
                    this.items.splice(this.items.length, 0, obj);
                } else {//取消
                    var items = this.items;
                    for (let i = 0; i < items.length; i++) {
                        if (items[i].id === data.id) {
                            items.splice(i, 1)
                        }
                    }
                    this.items = items;
                }
                console.log(data);
                console.log(isChecked);
                console.log(isChildChecked);
            },
            loadNode(node, resolve) {
                var curId = node.id === 0 ? node.id : node.data.id;
                if (this.treeData.dataType === "URL") {
                    this.$axios({
                        method: 'post',
                        url: this.url,
                        data: Object.assign(this.treeData.quarm, {"pid": curId})
                    }).then(function (response) {
                        if (node.id !== 0) {
                            node.data.children = response.data.value;
                        }
                        return response.data;
                    }).then((data) => {
                        if (node.checked) {
                            let value = this.items.concat(data.value);
                            this.items = value;
                        }
                        return data.value;
                    }).then((data) => {
                        return resolve(data);
                    }).catch(function (error) {
                        console.log(error);
                    });
                } else {
                    //假数据懒加载
                    // resolve(this.treeData.value);
                    if (node.id === 0) {
                        resolve(this.treeData.value);
                    } else {
                        let childArr = appendChild(this.treeData.value, curId, resolve);
                        if (node.checked) {
                            this.items = this.items.concat(childArr);
                        }
                    }
                }
            },
            getData(){
                return this.items
            },
            setData(keys){
                if(this.treeData.multiple){
                    this.$refs.tree.setCheckedKeys(keys);
                    let nodes =  this.$refs.tree.getCheckedNodes();
                    for (let node of nodes){
                        var obj = {
                            id: node.id,
                            label: node.label,
                        }
                        this.items.splice(this.items.length, 0, obj);
                    }
                }else {
                    if(keys instanceof Array &&keys.length>1){
                        this.$refs.tree.setCurrentKey(keys[0]);
                    }else {
                        this.$refs.tree.setCurrentKey(keys);
                    }
                    let data =  this.$refs.tree.getCurrentNode();
                    var obj = {
                        id: data.id,
                        label: data.label,
                    }
                    this.items.splice(this.items.length, 0, obj);
                }
                this.keys = keys;
                console.log(this.keys)
            }
        }
    };

    /*懒加载假数据递归追加子项*/
    function appendChild(value, curId, resolve) {
        let childArr = [];
        for (let va of value) {
            if (va.id === curId) {
                childArr = va.children;
                resolve(childArr);
            } else {
                if (va.hasOwnProperty("children")) {
                    childArr = appendChild(va.children, curId, resolve)
                }
            }
            if (childArr.length > 0) {
                break;
            }
        }
        return childArr;
    }

    /*懒加载通过递归实现要重新渲染的子项*/
    function getChildKeys(items, delid) {
        let dataArr = [];
        let delArr = [];
        for (let item of items) {
            if (item.id.toString() === delid) {//删除父项
                delArr = distinct(delArr, [item.id]);
                if (item.hasOwnProperty("children")) {
                    let delItem = item.children;
                    let deldata = getChildKeys(delItem, delid);
                    delArr = distinct(delArr, deldata);
                }
                console.log("delArr=================" + delArr);
            } else {
                if (item.hasOwnProperty("children")) {
                    let newItem = item.children;
                    let newdata = getChildKeys(newItem, delid);
                    dataArr = distinct(dataArr, newdata);
                } else {
                    dataArr = distinct(dataArr, [item.id]);
                }
                console.log("dataArr=================" + dataArr);
            }
            /*if(item.hasOwnProperty("children")){
              if(item.id.toString()===delid){//删除父项
                let delItem = item.children;
                let deldata = getChildKeys(delItem,delid);
                delArr=distinct(delArr,deldata);
                console.log("delArr+++++++++++"+delArr);
              }else {
                let newItem = item.children;
                let newdata = getChildKeys(newItem,delid);
                dataArr = distinct(dataArr,newdata);
                console.log("dataArr+++++++++++"+dataArr);
              }
            }else {
              if(item.id.toString()!==delid){
                 dataArr = distinct(dataArr, [item.id]);
              }
            }*/
        }
        /*去除要干掉的子项*/
        for (let i = 0; i < dataArr.length; i++) {
            for (let j of delArr) {
                if (dataArr[i] === j) {
                    dataArr.splice(i, 1);
                }
            }
        }
        return dataArr;
    }

    /*懒加载函数去重*/
    function distinct(a, b) {
        let arr = a.concat(b);
        return arr.filter((item, index) => {
            return arr.indexOf(item) === index
        })
    }
</script>


<style scoped lang="less">
    .tree_wt {
        position: relative;
        width: 100%;
    }

    .tree_input {
        position: relative;
        -webkit-appearance: none;
        background-color: #FFF;
        border-radius: 4px;
        border: 1px solid #DCDFE6;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #606266;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: 0;
        padding: 0 15px;
        -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
        width: 100%;
    }

    .tree_select {
        /*z-index: 10;*/
        /*padding-right: 2.3em;*/
        position: absolute;
        left: 2px;
        top: -2px;
        width: 100%;
        height: 40px;
    }

    .tree_select > span.tree_radio {
        /*z-index: 10;*/
        font-size: 14px;
        margin-left: 10px;
    }

    .tree_select > span.tree_radio > i {
        color: @themeColor;
        margin-right: 3em;
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
        position: absolute;
        right:0;
        top: 1em;
    }

    .tree_select > span.tree_radio > i:hover {
        background-color: @themeColor;
        color: #fff;
        border: 1px solid @themeColor;
        border-radius: 50%;
    }

    .tree_tag {
        margin: 1px 2px;
    }

    .tree_icon_style {
        font-family: element-icons !important;
        speak: none;
        font-style: normal;
        font-weight: 400;
        font-variant: normal;
        text-transform: none;
    }

    .tree_input > span {
        color: #c0c4cc;
        font-size: 14px;
        cursor: pointer;
        transition: transform .3s;
        transform: rotate(180deg);
        line-height: 1;
        vertical-align: baseline;
        display: inline-block;
        -webkit-font-smoothing: antialiased;
        position: absolute;
        right: 10px;
        top: 12px;
    }

    .tree_input > span:after {
        content: "\e6e1";
    }

    .tree_input > span.terggle {
        transform: rotate(0deg);
    }

    .tree_panel {
        position: absolute;
        left: 0;
        top: 40px;
        z-index: 1000;
        width: 100%;
        background-color: #fff;
    }

</style>
