<template>
    <el-row type="flex" justify="space-between" class="screen-filter-wrap" ref="searchForm">
        <el-col class="search-part1">
            <slot name="slot_one"></slot>
        </el-col>
        <el-col class="search-part2">
            <slot name="slot_two">
                <!--                <el-input class="search-name" size="small" placeholder="请输入标题名称" prefix-icon="el-icon-search" @input="searchBtn">-->
                <!--                </el-input>-->
            </slot>
            <slot name="slot_three">
                <el-popover
                        placement="bottom-end"
                        width="368"
                        v-model="popVisible"
                        popper-class="search-popper"
                        trigger="click">
                    <div class="screenFilter" :style="{'min-height': '100px', 'max-height': popHeight}">
                        <el-form label-position="top" label-width="180px" size="small">
                            <slot name="slot_search"></slot>
                            <el-form-item class="move-right">
                                <el-button plain @click="resetSearch">重置</el-button>
                                <el-button @click="searchBtn" type="primary">查询</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <el-button icon="el-icon-d-arrow-right" size="small"
                               :class="['advance_search',{'open-tooltip': this.popVisible}]" slot="reference">筛选过滤
                    </el-button>
                </el-popover>
            </slot>
        </el-col>
    </el-row>
</template>

<script>
    export default {
        name: "screenFilter",
        props: ['searchParams'],
        data() {
            return {
                popVisible: false,
                isMounted: false,
                defaultValue:{}
            };
        },
        computed: {
            popHeight() {
                let top = 145
                if (this.isMounted) {
                    top = this.$el.getBoundingClientRect().top
                }
                let popHeight = this.$store.state.screenHeight - top - 75
                if (popHeight < 100) {
                    popHeight = 100
                }
                return popHeight + "px"
            }
        },
        mounted: function () {
            this.defaultValue= JSON.parse( JSON.stringify(this.searchParams))
            this.isMounted = true
        },
        methods: {
            resetSearch: function () {
                var _this = this
                for (var item in this.searchParams) {
                    _this.searchParams[item] = _this.defaultValue[item];
                }
                _this.getLoadData();
            },
            searchBtn: function () {
                // this.screenOut=false;
                this.getLoadData(); // 根据搜索参数加载
            },
            getLoadData: function () {
                var _this = this
                _this.$parent.$children.forEach(item => {
                    if (item.$refs.hasOwnProperty('ListTable')) {
                        item.loadData(_this.searchParams) // 重新加载数据
                    }
                })
            }
        },
        beforeDestroy: function () {
            $(".screenFilter").off("scroll");
        }
    }
</script>

<style lang="less" scoped>
    .screenFilter {
        overflow-y: auto;
    }

    .screen-filter-wrap {
        margin: @padding24 0;
    }

    .advance_search, .advance_search:focus, .advance_search:hover {
        background: @bgGray;
        border: 1px solid rgba(0, 0, 0, 0.15);
        color: @textColor2;
        width: 120px;
        /*position: relative;*/
    }

    .advance_search /deep/ .el-icon-d-arrow-right {
        transform: rotate(90deg);
    }

    .open-tooltip /deep/ .el-icon-d-arrow-right {
        transform: rotate(-90deg);
    }

    /*.move-right {*/
    /*    float: right;*/
    /*}*/
    .search-part1 {
        flex: 1;
    }

    .search-part2 {
        text-align: right;
        width: 350px;
    }

    .search-part2 /deep/ .search-name {
        width: 210px;
        margin-right: 10px;
    }

    .screenFilter /deep/ .date-picker-155.el-date-editor.el-input, .screenFilter /deep/ .date-picker-155.el-date-editor.el-input__inner {
        width: 162px;
    }

    .screenFilter /deep/ .range {
        display: inline-block;
        width: 44px;
        text-align: center;
    }

    .screenFilter /deep/ .el-date-editor.el-input, .screenFilter /deep/ .el-select {
        width: 100%;
    }
</style>
