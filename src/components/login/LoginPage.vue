
<template>

    <el-dialog class="login_dialog" title="请登录" v-model="loginFormVisiable" @close="resetLoginForm" width="400px" center>
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="60px" class="login_form">
            <!--        用户名-->
            <el-form-item prop="userName" label="账号">
                <el-input v-model="loginForm.userName"></el-input>
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
import {computed, getCurrentInstance, onMounted, reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import {post} from "@/components/request/request";
import axios from"@/components/request/http"
const {loginFormVisiable}=useMapState(['loginFormVisiable'])
const store =useStore()
const router=useRouter()
const loginFormRef=ref()
const {proxy}=getCurrentInstance()
const httpUrl=proxy.$key

const loginForm=reactive( {
    userName: '',
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
const user=computed(()=>{
    return store.state.user
})

const download=async (row) => {
    axios({
        url: httpUrl+"/file/download",
        method: 'get',
        responseType: 'arraybuffer',
        params:{
            location: row
        }
    }).then(res => {
        const blob = new Blob([res.data]);
        const url=URL.createObjectURL(blob)
        store.commit("setAvatarLocal",url)
    })
}
//用户登录
const userLogin=async(loginFormRef)=>{
    if (!loginFormRef) return
    loginFormRef.validate(async (valid) => {
        if (valid) {
            // console.log(loginForm)
            try{

                const { data, msg } = await post(httpUrl + "/user/login", loginForm)

                if (data === null) {

                    ElMessage({
                        message: msg,
                        type: 'error',
                    })
                } else {
                    console.log(data)
                    store.commit("constructUser",data)
                    //调用
                    console.log(store.state.user.userName)
                    ElMessage({
                        message: '登陆成功',
                        type: 'success',
                    })
                    store.commit("cancelLFV")
                   await download(user.value.avatar)

                   await router.push({ path: "/" })
                    //关闭页面

                }
            }catch(err){
                console.log(err)
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