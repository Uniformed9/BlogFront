
<template>
    <el-dialog class="dialog" title="请登录" v-model="registorFormVisiable" @close="resetForm" width="400px" center>
        <el-form ref="FormRef" :model="Form" :rules="FormRules" class="form" label-width="80px" label-position="left">
            <!--        昵称-->
            <el-form-item label="昵称" prop="nickName">
                <el-input v-model="Form.nickName"></el-input>
            </el-form-item>
            <!--        用户名-->
            <el-form-item label="用户名" prop="userName">
                <el-input v-model="Form.userName"></el-input>
            </el-form-item>
            <!--        密码-->
            <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="Form.password"></el-input>
            </el-form-item>
            <!--        密码-->
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="Form.email"></el-input>
            </el-form-item>
            <!--        头像-->
            <el-form-item label="头像" style="padding:0 1em">
                <input
                    type="file"
                    class="upload_file"
                    @change="upload($event)"
                    accept=".png,.jpg"
                />
            </el-form-item>


            <el-form-item style="text-align: right">
                <el-button @click="resetForm">取消</el-button>
                <el-button type="primary" @click="userRegister">注册</el-button>
            </el-form-item>
        </el-form>

    </el-dialog>
</template>
<script setup>
import {useMapState} from "@/components/common/useMapState";
import {useStore} from "vuex";
import {reactive, ref} from "vue";
import {ElMessage} from "element-plus";
import {Upload} from "@element-plus/icons-vue";
import axios from "@/components/request/http";

const dialogFormVisible=ref(false)
const {registorFormVisiable}=useMapState(['registorFormVisiable'])
const dialogImageUrl=ref('')
const store =useStore()
const FormRef=ref()
const Form=reactive({
    nickName: '',
    userName: '',
    password: '',
    email: '',
})
let params = new FormData();
const FormRules= {
    // 验证用户是否合法
    username: [
        // 必填，提示消息，鼠标焦点消失时触发
        {required: true, message: "请输入用户名", trigger: "blur"},
        {min: 2, max: 10, message: "长度在2-10个字符之间",trigger: "blur"}
    ],
        // 验证用户是否合法
        nickname: [
        // 必填，提示消息，鼠标焦点消失时触发
        {required: true, message: "请输入昵称", trigger: "blur"},
        {min: 2, max: 10, message: "长度在2-10个字符之间",trigger: "blur"}
    ],
        // 验证密码是否合法
        password: [
        {required: true, message: "请输入密码", trigger: "blur"},
        {min: 6, max: 10, message: "长度在 6 到 10 个字符", trigger: "blur"}
    ],
}
const resetForm=()=> {
    store.commit('cancelRFV')
    FormRef.value.resetFields()
    dialogImageUrl.value = ''
}
const handleSuccess=async (res)=> {
    // console.log(res.data)
    dialogImageUrl.value = res.data
}
const upload=(e)=>{
    const file = e.target.files[0];
    console.log(file);
    params.append("file", file);
    params.append("userName",Form.userName);
    params.append("password",Form.password);
    params.append("nickName",Form.nickName);
    params.append("email",Form.email);
}
const handleRemove=()=> {
    dialogImageUrl.value = ''
}
// const handlePictureCardPreview=(file)=> {
//     this.dialogImageUrl = file.url;
// }

const beforeAvatarUpload=(file)=> {
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        ElMessage.error('上传头像图片大小不能超过 2MB!');
    }
    return isLt2M;
}
//注册功能
const userRegister=async ()=>{
    console.log(params)

    axios.post('http://localhost:8070/user/register', params, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => {

        const {data}=response.data
        console.log(data);
        ElMessage({
            type:"success",
            message:"注册成功",
        })
        store.commit("cancelRFV")
    }).catch(error => {
        console.error(error);
    });

}

</script>

<style scoped>

</style>