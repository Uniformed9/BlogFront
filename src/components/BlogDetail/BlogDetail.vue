<template>
  <div>
    <NavBar></NavBar>
  </div>
  <div class="wife-cover">
  <div class="theBlogContent">
    <el-card>
      <div class="title">
        <h2><span>{{blog.title}}</span> </h2>
      </div>
      <div class="card-info">
        <div class="user-info">
          <span class="not-author-name">昵称:</span>
          <span class="authorName" :key="blog.userNickname" @click="goAuthorSpace">{{blog.userNickname}}</span>
        </div>
        <div class="tag-info">
          <span class="not-tag-name">文章标签:</span>
          <span class="tag-name">标签</span>
        </div>
      </div>
      <div class="content">
      <div><span v-html="blog.content"></span></div>
    </div>
    </el-card>
  </div>
</div>
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
  align-items:flex-start;
  justify-content: center;
  background:url("https://img1.imgtp.com/2023/06/21/MUzggJOL.png") no-repeat center fixed;
  width: -webkit-fill-available;
  height: 768px;
  display: flex;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
.theBlogContent {
  text-align: center;
  position: absolute;
  width: 80%;
  //text-shadow: 0 3px 6px rgba(0, 0, 0, 0.3);
  background-color: #fff;
  margin-top: 30px;
}

.title{
  font-size: 28px;
  color: #222226;
  font-weight: 600;
  display: flex;
}

.card-info{
  background-color: #f8f8f8;
  border-radius: 10px;
  padding: 10px 20px;
  color: #999aaa;
}

.user-info{
  display: flex;
}

.not-author-name{
  font-size: 16px;

}

.authorName{
  color: #555556;
  font-size: 20px;
  margin-left: 20px;
}

.tag-info{
  margin-top: 10px;
  display: flex;
}

.not-tag-name{
  font-size: 14px;
  align-items: center;
  display: flex;
}

.tag-name{
  background-color: #fff;
  color: #5094d5;
  border: 1px solid #eaeaef;
  padding: 3px 6px;
  font-size: 14px;
  margin-left: 10px;
  align-items: center;
  display: flex;
}

.content{
  margin-top: 30px;
  color: #4d4d4d;
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