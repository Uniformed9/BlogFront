
<template>
    <el-dialog class="login_dialog" title="请登录" v-model="loginFormVisiable" @close="resetLoginForm" width="400px" center>
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="60px" class="login_form">
            <!--        用户名-->
            <el-form-item prop="username" label="账号">
                <el-input v-model="loginForm.username"></el-input>
            </el-form-item>
            <!--        密码-->
            <el-form-item prop="password" label="密码">
                <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item style="text-align: right">
                <el-button @click="resetLoginForm">取消</el-button>
                <el-button type="primary" @click="userLogin(loginFormRef)">登录</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script setup>

import {useMapState} from "@/components/common/useMapState";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {getCurrentInstance, onMounted, reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import {post} from "@/components/request/request";
const {loginFormVisiable}=useMapState(['loginFormVisiable'])
const store =useStore()
const router=useRouter()
const loginFormRef=ref()
const {proxy}=getCurrentInstance()
const httpUrl=proxy.$key


const loginForm=reactive( {
    username: '',
    password: ''
})

            // 表单验证规则对象
const loginFormRules=reactive( {
                // 验证用户是否合法
    username: [
                    // 必填，提示消息，鼠标焦点消失时触发
        {required: true, message: "请输入用户名", trigger: "blur"},
        {min: 2, max: 10, message: "长度在2-10个字符之间"}
    ],
                    // 验证密码是否合法
    password: [
        {required: true, message: "请输入密码", trigger: "blur"},
        {min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur"}
    ]
})
//调试信息
onMounted(() => {
    // console.log(httpUrl);
});
const resetLoginForm=()=> {
    store.commit('cancelLFV')
    loginFormRef.value.resetFields();
}

//用户登录
const userLogin=async(loginFormRef)=>{
    if (!loginFormRef) return
    loginFormRef.validate(async (valid) => {
        if (valid) {

            const { data, msg } = await post(httpUrl + "/user/login", loginForm).catch(reason => {console.log(reason)})
            if (data === null) {
                console.log("fdsfsdf")
                ElMessage({
                    message: msg,
                    type: 'error',
                })
            } else {
                console.log("before")
                store.commit("constructUser",data)
                console.log("after")
                ElMessage({
                    message: '登陆成功',
                    type: 'success',
                })
                await router.push({ path: "/test" })
            }
        } else {
            ElMessage({
                message: "请填写字段",
                type: 'error',
            })
            return false
        }
    })
}


</script>

<style scoped>
.login_form {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}

.btns {
    display: flex;
    justify-content: flex-end;
}

.login_dialog{
    opacity: 1;
}

</style>