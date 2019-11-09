<template xmlns="http://www.w3.org/1999/html">
    <el-container><!-- 表单输入绑定 -->
        <el-header height="100px">
            <div class="describe">表单输入绑定:用 v-model 指令在表单input、textarea 及 select 元素上创建双向数据绑定,它会根据控件类型自动选取正确的方法来更新元素</div>
            <div>数据：<br>{{this.$data}}</div>
            <el-divider></el-divider>
        </el-header>
        <el-main>
            <template v-if="true">
                <div>
                    <br>text 和 textarea 元素使用 value 属性和 input 事件；
                    <br>checkbox 和 radio 使用 checked 属性和 change 事件；
                    <br>select 字段将 value 作为 prop 并将 change 作为事件。
                    <div class="alert">value值绑定</div>
                    <br>
                    <span class="alert">单行文本</span><br>
                    <input v-model="message" placeholder="edit me">
                    <p>Message is: {{ message }}</p>

                    <br><span class="alert">多行文本</span><br>
                    <span>Multiline message is:</span>
                        <p style="white-space: pre-line;">{{ multimessage }}</p>
                    <textarea v-model="multimessage" placeholder="add multiple lines"></textarea>

                    <br>
                    <span class="alert">复选框:单个复选框，绑定到布尔值：</span><br>
                    <input type="checkbox" id="checkbox" v-model="checked">
                    <label for="checkbox">{{ checked }}</label>

                    <br>
                    <span class="alert">多个复选框，绑定到同一个数组</span><br>
                    <div>
                        <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
                        <label for="jack">Jack</label>
                        <input type="checkbox" id="john" value="John" v-model="checkedNames">
                        <label for="john">John</label>
                        <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
                        <label for="mike">Mike</label>
                        <br>
                        <span>Checked names: {{ checkedNames }}</span>
                    </div>

                    <br>
                    <div class="alert">单选按钮</div>
                    <div>
                        <input type="radio" id="one" value="One" v-model="picked">
                        <label for="one">One</label>
                        <br>
                        <input type="radio" id="two" value="Two" v-model="picked">
                        <label for="two">Two</label>
                        <br>
                        <span>Picked: {{ picked }}</span>
                    </div>

                    <div class="alert">选择框</div>
                    <div>
                        <select v-model="selected">
                            <option disabled value="">请选择</option>
                            <option value="1">A</option>
                            <option value="2">B</option>
                            <option>C</option>
                        </select>
                        <span>Selected: {{ selected }}</span>
                    </div>
                    <div style="margin-top: 20px">多选
                        <select v-model="mulselected" multiple style="width: 50px;">
                            <option value="11">A</option>
                            <option>B</option>
                            <option>C</option>
                        </select>
                        <br>
                        <span>Selected: {{ mulselected }}</span>
                    </div>

                    <div class="alert">
                        修饰符.lazy  在默认情况下，v-model 在每次 input 事件触发后将输入框的值与数据进行同步,使用lazy 修饰符，从而转变为使用 change 事件进行同步更新
                    <div>
                        <input v-model.lazy="message" ></div>
                    </div>




                </div>
            </template>


        </el-main>
    </el-container>
</template>

<script>
    export default {
        name: "FormInput",
        data(){
            return{
                message:'',
                multimessage:'',
                checked:false,
                checkedNames:[],
                picked:'',
                selected: '',
                mulselected: []
            }
        },

        methods:{
            doSomething:function(){

            }
        }
    }
</script>

<style scoped>
    .box{
        margin-top: 20px;
    }
    .describe{
        background-color: #8c939d;
        color: #fff;
    }
    .alert{
        color: red;
    }
    .canclick{
        cursor: pointer;
    }
    .parent{
        background-color: #8c939d;
        width: 200px;
        height: 50px;
    }
    .child{
        background-color: #ee9900;
        width: 100px;
        height: 20px;
        margin: 0 auto;
    }
</style>
