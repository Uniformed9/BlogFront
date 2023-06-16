
<template>
    <el-dialog class="dialog" title="请登录" v-model="registorFormVisiable" @close="resetForm" width="400px" center>
        <el-form ref="FormRef" :model="Form" :rules="FormRules" class="form" label-width="80px" label-position="left">
            <!--        昵称-->
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="Form.nickname"></el-input>
            </el-form-item>
            <!--        用户名-->
            <el-form-item label="用户名" prop="username">
                <el-input v-model="Form.username"></el-input>
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
            <el-form-item prop="avatar" label="头像">
                <el-upload
                        class="avatar-uploader"
                        ref="upload"
                        action="http://hikari.top:8090/upload"
                        :limit="1"
                        :show-file-list="false"
                        :on-remove="handleRemove"
                        :on-success="handleSuccess"
                        :before-upload="beforeAvatarUpload">
                    <img v-if="dialogImageUrl" :src="dialogImageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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
import {ref} from "vue";
import {ElMessage} from "element-plus";


const {registorFormVisiable}=useMapState(['registorFormVisiable'])
const dialogImageUrl=ref('')
const store =useStore()
const FormRef=ref()
const Form={
    nickname: '',
    username: '',
    password: '',
    email: ''
}
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
const userRegister=()=>{

}

</script>

<style scoped>

</style>