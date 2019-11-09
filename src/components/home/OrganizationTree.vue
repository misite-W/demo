<template>
    <el-container class="org_main_container">
        <el-aside width="280px">
            <el-container class="org_container">
                <el-header height="auto">
                    <div class="tree_title"><i class="iconfont iconzuzhi1"></i><span>组织树</span></div>
                    <el-input class="search_input"
                              v-model="searchText"
                              placeholder="请输入内容"
                              prefix-icon="el-icon-search"
                              @keydown.native.enter="handleFilterNode"></el-input>
                </el-header>
                <el-main height="200px">
                    <el-tree :class="options.class"
                             :ref="options.ref"
                             :data="orgTree"
                             :props="defaultProps"
                             :indent="options.indent"
                             :node-key="options.nodeKey"
                             :expand-on-click-node="options.expandOnClickNode"
                             :check-on-click-node="options.checkOnClickNode"
                             :highlight-current="options.highlightCurrent"
                             :icon-class="options.iconClass"
                             :current-node-key="options.currrentNodeKey"
                             :default-expanded-keys="options.defaultExpandedKeys"
                             :filter-node-method="filterNode"
                             @current-change="currentChange"
                             @node-click="handleNodeClick">
                        <span class="org_tree_node" slot-scope="{ node, data }">
                            <i :class="[node.icon?node.icon:'el-icon-notebook-2', 'org_tree_node_icon']"></i>
                            <span>{{node.label}}</span>
                        </span>
                    </el-tree>
                </el-main>
            </el-container>
        </el-aside>
        <el-main>
            <span class="tree_toggle" @click="toggleTree"><i
                    :class="{'el-icon-arrow-left' : !leftFold, 'el-icon-arrow-right' : leftFold}"/></span>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "OrganizationTree",
        data() {
            return {
                orgTree: [{
                    id: "001",
                    icon: "",
                    label: '中共深圳市委',
                    children: [{
                        id: "001001",
                        icon: "",
                        label: '中共深圳市直工委',
                        children: [{
                            id: "001001001",
                            icon: "",
                            label: '中共深圳市民政党委'
                        }]
                    }, {
                        id: "001002",
                        icon: "",
                        label: '中共龙桦区委',
                        children: [{
                            id: "001002001",
                            icon: "",
                            label: '中共大朗街道党委'
                        }]
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                searchText: ""
            }
        },
        computed: {
            leftFold() {
                return this.$store.state.leftFold
            },
            options() {
                return {
                    class: "org_tree",
                    ref: "org_tree",
                    indent: 12,
                    nodeKey: "id",
                    expandOnClickNode: false,
                    checkOnClickNode: true,
                    highlightCurrent: true,
                    iconClass: "el-icon-arrow-right",
                    currrentNodeKey: this.orgTree[0].id,
                    defaultExpandedKeys: [this.orgTree[0].id]
                }
            }
        },
        methods: {
            handleNodeClick() {

            },
            toggleTree() {
                this.$emit("toggleLeft")
            },
            handleFilterNode() {
                let treeEl = this.$refs[this.options.ref]
                treeEl.filter(this.searchText)
                if (!this.searchText) {
                    this.foldTree(treeEl)
                    let currNode = treeEl.store.currentNode
                    this.expandParentNode(currNode)
                }
            },
            foldTree(treeEl) {
                let nodes = treeEl.store.nodesMap
                for (let key in nodes) {
                    nodes[key].expanded = false
                }
            },
            expandParentNode(node) {
                if (node.parent) {
                    node.parent.expanded = true
                    this.expandParentNode(node.parent)
                }
            },
            filterNode(value, data, node) {
                return data.label.indexOf(value) > -1 || node.isCurrent
            },
            currentChange(data, node) {
                this.$store.state.orgId = data.id
            }
        },
        created() {
            this.$store.state.orgId = this.orgTree[0].id
        },
        mounted() {
        }
    }
</script>

<style lang="less" scoped>
    .org_main_container {
        height: 100%;
    }

    .org_main_container > .el-aside {
        box-shadow: 0 1px 6px 0 rgba(0, 0, 0, .12);
    }

    .org_container {
        background-color: @bgWhite;
        height: 100%;
        overflow: hidden;
    }

    .org_container > .el-main {
        height: 200px;
        padding: 0px;
        padding-left: 14px;
        overflow-y: scroll;
        margin-right: -17px;
        padding-right: 17px;
    }

    .org_tree {
    }

    .org_tree_node_icon {
        color: @themeColor;
        margin-right: 5px;
    }

    /*深度选择器"/deep/"*/
    .org_tree /deep/ .el-tree-node__content:hover {
        background-color: transparent;
        color: @themeColor;
    }

    .org_tree /deep/ .el-tree-node:focus > .el-tree-node__content {
        background-color: transparent;
    }

    .org_tree.el-tree--highlight-current /deep/ .el-tree-node.is-current > .el-tree-node__content {
        background-color: transparent;
    }

    .org_tree .org_tree_node > span {
        padding: 3px 8px;
    }

    .org_tree.el-tree--highlight-current /deep/ .el-tree-node.is-current > .el-tree-node__content > .org_tree_node > span {
        background-color: @themeColor;
        color: @bgWhite;
    }

    .tree_title {
        font-size: 14px;
        color: @textColor2;
        line-height: 32px;
        margin-top: 20px;
    }

    .tree_title > i {
        font-size: 21px;
        margin-right: 5px;
        vertical-align: middle;
    }

    /deep/ .search_input {
        margin: 20px 0px;
    }

    /deep/ .search_input .el-input__inner {
        height: 32px;
        line-height: 32px;
    }

    /deep/ .search_input .el-input__icon {
        line-height: 32px;
    }

    .org_main_container > .el-main {
        padding: 0px;
        width: 20px;
        display: flex;
        align-items: center;
    }

    .tree_toggle {
        width: 16px;
        height: 60px;
        background: #B5B5B5;
        border-radius: 0 100px 100px 0;
        cursor: pointer;
        font-size: 16px;
        line-height: 60px;
        color: @bgWhite;
    }

</style>