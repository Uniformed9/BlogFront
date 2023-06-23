<script setup>
import { getCurrentInstance, onMounted, reactive, ref} from "vue";
import axios from "@/components/request/http";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {ElMessage} from "element-plus";
const router=useRouter()
const store=useStore()
// 传入标题,描述,内容,标签
const param=reactive({
    title:'',
    content:'',
    description:'',
})

// const form = reactive({
//     name: '',
//     region: '',
//     date1: '',
//     date2: '',
//     delivery: false,
//     type: [],
//     resource: '',
//     desc: '',
// })
const id=ref(0)
const {proxy}=getCurrentInstance()
const httpUrl=proxy.$key
const blogId=ref(0)
//获取tags列表
const tags=ref([])
const value1 = ref([])//传的
const back=()=>{
    router.push("/index")
}

const submit=async (param)=>{
    id.value=store.state.user.id
    const {data}=await axios.post(httpUrl+"/user/"+id.value+"/home/blogs",param)

    blogId.value=data.data

    //获取userid然后传到
    let mytag=Object.values(value1.value)

    await axios.post(httpUrl+"/user/"+id.value+"/home/blogs/"+blogId.value+"/tag",mytag)
    ElMessage({
        type:"success",
        message:"创建博客成功"
    })
    await router.go(-1)
}

onMounted(()=>{
        axios({
            url: httpUrl+"/tag/getAll",
            method: 'get',
        }).then(res => {
            tags.value=res.data.data
        })
})

</script>

<template>
    <div class="layout animate__animated animate__fadeIn" style="margin-top: 80px">

        <el-container>
            <el-header>
                <el-row>
                    <el-col>
                        <el-input placeholder="标题" v-model="param.title" class="title-class" type="text" size="large" clearable/>
                    </el-col>
                </el-row>
            </el-header>
        </el-container>

        <el-container>
            <el-header>
                <el-row>
                    <el-col>
                        <el-input placeholder="描述" v-model="param.discription" class="title-class" type="text" size="large" clearable/>
                    </el-col>
                </el-row>
            </el-header>
        </el-container>
        <el-container>
            <el-main>
                <el-row>
                    <el-col style="height: 250px">
                        <el-input placeholder="内容" v-model="param.content" class="content-class" type="textarea" :autosize="{minRows:11}" clearable/>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
        <el-container>
            <el-footer>
                <el-select
                    v-model="value1"
                    multiple
                    placeholder="Select"
                    style="width: 240px"
                    v-if="tags.length>=1"
                >
                    <el-option
                        v-for="item in tags"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name"
                    />
                </el-select>
                <el-row justify="end">
                    <el-button @click="back">返回</el-button>
                    <el-button type="primary" @click="submit(param)">发布</el-button>
                </el-row>
            </el-footer>
        </el-container>
    </div>


</template>

<style scoped>
.layout{
    max-width: 1000px;
    margin: auto;
}



.title-class{
    font-size: large;
}

.content-class{

}

.el-row{
    margin-bottom: 10px;
}
</style>