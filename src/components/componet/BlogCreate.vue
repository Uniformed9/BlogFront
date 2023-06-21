<script setup>
import {getCurrentInstance, onMounted, reactive,ref} from "vue";
import axios from "@/components/request/http";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
const router=useRouter()
const store=useStore()
// 传入标题,描述,内容,标签
const param=reactive({
    title_value:'',
    content_value:'',
    tag_value:'',
    discription_value:'',

})
const form = reactive({
    name: '',
    region: '',
    date1: '',
    date2: '',
    delivery: false,
    type: [],
    resource: '',
    desc: '',
})
const id=store.state.user.id
const {proxy}=getCurrentInstance()
const httpUrl=proxy.$key

const tags = ref([])

const value1 = ref([])//传的
const back=()=>{
    router.push("/index")
}
const submit=async (param)=>{
    console.log()
    const {data,message}=await axios.post(httpUrl+"/blog"+id+"/uuu",param)

}
onMounted(()=>{
        axios({
            url: httpUrl+"/tag/getAll",
            method: 'get',
        }).then(res => {
            console.log(res)
            tags.value=res.data.data
            console.log(tags.value)
        })
})

</script>

<template>
    <div class="layout animate__animated animate__fadeIn" style="margin-top: 80px">

        <el-container>
            <el-header>
                <el-row>
                    <el-col>
                        <el-input placeholder="标题" v-model="param.title_value" class="title-class" type="text" size="large" clearable/>
                    </el-col>
                </el-row>
            </el-header>
        </el-container>

        <el-container>
            <el-header>
                <el-row>
                    <el-col>
                        <el-input placeholder="描述" v-model="param.discription_value" class="title-class" type="text" size="large" clearable/>
                    </el-col>
                </el-row>
            </el-header>
        </el-container>
        <el-container>
            <el-main>
                <el-row>
                    <el-col style="height: 250px">
                        <el-input placeholder="内容" v-model="param.content_value" class="content-class" type="textarea" :autosize="{minRows:11}" clearable/>
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
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
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

.category-class{

}

.tag-class{

}

.el-row{
    margin-bottom: 10px;
}
</style>