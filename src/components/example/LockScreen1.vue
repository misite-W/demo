<template>
    <div>
        <el-dialog
           title="锁屏"
           :visible="lockVisible"
           width="30%"
           :close-on-press-escape="false"
           :close-on-click-modal="false"
        >
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
                <el-form-item label="锁屏密码" prop="password">
                    <el-input clearable type="password" v-model="ruleForm.password" placeholder="请输入锁屏密码"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="login">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "LockScreen1",
        props:{
            lockVisible:{
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                ruleForm:{
                    password:""
                },
                rules: {
                    password: [
                    { required: true, message: '锁屏密码不能为空', trigger: 'blur' }
                ]
            }
            }
        },
        methods: {
            login(){
                if (this.ruleForm.password == ""){
                    this.$message.warning('密码不能为空!')
                    return
                }
                this.$emit('update:lockVisible', false);
                this.visible = false
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>