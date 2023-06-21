<template>
  <div>
    <NavBar></NavBar>
  </div>
  <ImageBackground class="wife-cover">
  <div class="theBlogContent">
    <span
    ><h2>{{blog.title}}</h2> </span
    ><el-divider />
    <span><div v-html="blog.content"></div></span>
    <h4 class="authorName" :key="blog.userNickname" @click="goAuthorSpace">{{blog.userNickname}}</h4>
  </div>


  </ImageBackground>
</template>

<script setup>
import NavBar from "@/components/layout/NavBar";
import ImageBackground from "@/components/componet/ImageBackground";
import {ElMessage} from "element-plus";
import {getCurrentInstance, onMounted} from "vue";
import {useRoute} from "vue-router/dist/vue-router";
import {ref} from "vue";
import axios from "@/components/request/http";
import router from "@/components/router/router";
const {proxy} =getCurrentInstance();
const httpUrl = proxy.$key

const blog=ref({
        id:"",
        title:"default",
        content:"test content",
        userNickname:"null"
      })
const route=useRoute();
// console.log(route.query,route.params,"====");
let blogid=3
let userid=1
onMounted(()=>{
  let blogID=route.params.blogId
  let userID=route.params.userId
  blogid=blogID
  userid=userID
  getBlogDetail();
})

  const getBlogDetail=async ()=> {
    // console.log(blogid)
    // console.log(httpUrl)
    const {data,msg}=await axios.get(httpUrl+"/blog/"+blogid)
    console.log("data", data)
    console.log("msg", msg)
    if (data.data != null&&data.data.userId==userid) {
      ElMessage.success('显示成功')
      blog.value.id = data.data.id
      blog.value.content = data.data.content
      blog.value.title = data.data.title
      blog.value.userNickname=data.data.userNickname
    } else {
      ElMessage.error('显示失败')
    }
  }
const goAuthorSpace=()=>{
  router.push({path:'/index'})
  //未配置个人空间路由，暂时跳转至主页
}


</script>

<style scoped>

.wife-cover {
  display:flex;
  align-items:flex-start;
  justify-content: center;

}
.theBlogContent {
  text-align: center;
  position: absolute;
  width: 100%;
  text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
}

@media screen and (max-width: 900px) {
  .post-body {
    width: 100%;
  }

  #article-desc {
    display: none;
  }
}
@keyframes fadeInUp {
  from {
    margin-top: 50px;
    opacity: 0;
  }

  to {
    margin-top: 0;
    opacity: 1;
  }
}

</style>