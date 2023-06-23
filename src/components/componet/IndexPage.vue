<script setup>
import {onMounted, nextTick, getCurrentInstance, ref} from "vue";
import axios from "@/components/request/http"
import router from "@/components/router/router";
import {ElMessage} from "element-plus";
// import {useStore} from "vuex";
let intro="欢迎来到我的个人博客";
// const store=useStore()
const {proxy}=getCurrentInstance()
const httpUrl=proxy.$key
const blogs=ref([])
const hotBlogs=ref([]);
function startRead() {
    nextTick(() => {
        document.getElementById("index")
            .scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            })
    })
}
const changeToInfo=(userId,id)=>{
    console.log(userId,id)
    router.push("/blogs/"+userId+"/"+id)
}
const changeToUser=(userId)=>{
    router.push("/user/"+userId)
}
onMounted(()=>{
    axios({
        url: httpUrl+"/blog/getAll",
        method: 'get',
    }).then(res => {
        blogs.value=res.data.data
        console.log(blogs.value)
    }).catch((err)=>{console.log(err)})
    // 获取全部博客
    // const data=axios.get(httpUrl+"/blog/getAll").then(response =>{
    //     console.log("----------------")
    //     console.log(data)
    //    blogs.value=data.data
    //
    // }).catch((error)=>{
    //     console.log(error)
    // })
  gethotBlogs();
})
const gethotBlogs=async () => {
  const {data, msg} = await axios.get(httpUrl + "/homepage/hotBlogs")
  console.log("data", data)
  console.log("msg", msg)
  console.log("hotBlogs", hotBlogs)
  if (data.data != null) {
    hotBlogs.value = data.data
  } else {
    ElMessage.info("不存在已经发表的博客哦┭┮﹏┭┮")
  }
}
</script>

<template>
    <el-main>
        <el-row style="height: 95vh">
            <el-col :span="24" style="height: 100%">
                <el-card shadow="none" class="welcome">
                    <h1 class="tit">
                        Uniのblog
                        <div class="border"></div>

                    </h1>

                    <h2 class="intro">{{intro}}</h2>
                    <div class="bounce down" @click="startRead">
                        <el-icon :size="20" style="color: white;">
                            <ArrowDown/>
                        </el-icon>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </el-main>
    <el-container class="layout">
        <el-main id="index" class="animate__animated animate__fadeInUp" >
            <el-row>


                <el-col :sm="18">
                    <div class="recent-posts" id="recent-posts">
                        <el-card shadow="hover" v-for="item in hotBlogs">
                            <div class="recent-post-item">
                                <div class="post-cover">
                                    <a href="" title="item.title">
                                        <el-image class="blog-image"
                                                  src="https://s2.loli.net/2022/04/26/JILkS5gp9cr24yv.jpg"></el-image>
                                    </a>
                                </div>
                                <div class="recent-post-info" >
                                    <div class="article-title-date">
                                        <a class="article-title hover-effect" title="item.title"   @click="changeToInfo(item.userId,item.id)">{{item.title}}</a>
                                    </div>
                                    <div class="article-description" >
                                     {{item.description}}
                                    </div>
                                    <div style="margin-top: 10px;font-size: xx-small;text-align: left" >
                                        作者:<a @click="changeToUser(item.userId)" class="hover-effect">{{item.userNickname}}</a>
                                    </div>
                                  <div style="margin-top: 10px;font-size: xx-small;text-align: right" >
                                    浏览量:<a class="hover-effect">{{item.views}}</a>
                                  </div>
                                </div>

                            </div>
                        </el-card>

                    </div>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</template>

<style scoped lang="less">

body {
  width: 100%;
}
.hover-effect:hover {
    color: red;
    cursor:pointer;
    /* 在这里添加其他样式 */
}
.welcome {
  background-color: rgba(0, 0, 0, 0.1);
  border: none;
  height: 90%;
  position: relative;

  .border {
    width: 812px;
    height: 112px;
    position: absolute;
    top: -6px;
    left: -6px;
    border: 3px solid white;
    box-sizing: border-box;
    animation: clipMe 5s linear infinite;
  }

  .tit {
    box-sizing: border-box;
    position: relative;
    width: 800px;
    height: 100px;
    line-height: 100px;
    box-shadow: inset 0 0 0 1px white;
    margin: 40px auto;
    margin-top: 80px;
    color: white;
    text-align: center;
    font-size: 50px;
    font-weight: normal;
    letter-spacing: 10px;
  }

  .intro {
    letter-spacing: 5px;
    line-height: 50px;
    width: 80%;

    margin: 0 auto;
    text-align: center;
    font-weight: normal;
    color: white;
  }

  .down {
    animation: bounce 2s infinite;
    animation-duration: 3s;

    font-size: 25px;
    position: absolute;
    bottom: 7px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid #fff;
  }

  .down:hover {
    animation: none;
    cursor: pointer;
    box-shadow: 0 0 20px 0 white;
    transition: all .2s;
  }
}

@keyframes clipMe {

  0%,
  100% {
    clip: rect(0px, 806px, 6px, 0px);
  }

  25% {
    clip: rect(0px, 6px, 112px, 0px);
  }

  50% {
    clip: rect(112px, 812px, 112px, 0px);
  }

  75% {
    clip: rect(0px, 812px, 112px, 806px);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translate(-50%, 0);
  }
  40% {
    transform: translate(-50%, -30px);
  }
  60% {
    transform: translate(-50%, -15px);
  }
}


ul {
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 0;
  border-radius: 5px;
}

.el-pagination {
  padding-bottom: 20px;
}


.el-card /deep/ .el-card__body {
  padding: 0;
}


.right-item {
  margin-bottom: 20px;

  li:first-child {
    border-top: 1px solid rgba(179, 216, 255, 0.5);
  }

  li {
    border-bottom: 1px solid rgba(179, 216, 255, 0.5);
  }

  .more {
    text-align: center;
    color: #3a8ee6;
    padding: 8px;
  }

  .more:hover {
    cursor: pointer;
    color: #3a8ee6;
  }

  .blog-type:hover, .activeType {
    background-color: rgba(58, 142, 230, 0.3);
    cursor: pointer;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 15px 13px 0;
    border-bottom: 1px solid rgba(179, 216, 255, 0.5);

  }

  .tag-item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-left: 5px;
    margin-right: 5px;
    margin-bottom: 10px;
    box-sizing: border-box;
    .tag {
      background-color: #ecf5ff;
      box-sizing: border-box;
      display: inline-block;
      height: 22px;
      padding: 0 10px;
      line-height: 22px;
      font-size: 10px;
      color: #409eff;
      border-radius: 4px;
      white-space: nowrap;
      border: 1px solid #409eff;
      transition: .2s;
    }

    .sjx-outer {
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-right: 6px solid #409eff;
      position: relative;
      transition: .2s;
    }

    .sjx-inner {
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-right: 6px solid #ecf5ff;
      top: -6px;
      left: 1px;
      position: absolute;
      transition: .2s;
    }
  }



  .tag-item:hover, .activeTag {
    box-sizing: border-box;
    .tag {
      color: white;
      background-color: #409eff;
      cursor: pointer;
    }

    .sjx-inner {
      border-right: 6px solid #409eff;
    }
  }

}


.blog-type {
  display: flex;
  justify-content: space-between;
  align-items: center;
  line-height: 40px;
}

.recommend-blog {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  padding-left: 20px;
  padding-right: 20px;

  a {
    border-bottom: 1px solid rgba(34, 36, 38, .15);
    line-height: 40px;
    display: block;
    text-decoration: none;
    color: black;
  }

  a:hover {
    color: #3a8ee6;
  }
}

.total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: larger;
  font-weight: bold;

  .title {
    display: flex;
    align-items: center;

    .el-icon-back {
      font-weight: bolder;
      color: #3a8ee6;
      margin-right: 10px;
    }

    .el-icon-back:hover {
      cursor: pointer;
    }
  }
}

.blog-content:hover {
  /*border-left: 5px solid #3a8ee6;*/
  /*border-right: 5px solid #3a8ee6;*/
  background-color: rgba(58, 142, 230, 0.3);
  cursor: pointer;

  .el-tag {
    color: white;
    background-color: #3a8ee6;
  }
}

.blog-content {
  padding: 10px;
  height: auto;
  border-bottom: 1px solid rgb(199, 163, 92);
  /*border-bottom: 1px solid rgba(34, 36, 38, .15);*/
  transition: .3s;


  .el-image {
    border-radius: 5px;
    box-sizing: border-box;
    flex-shrink: 0;
  }

  .blog-info {
    display: flex;
    align-items: center;
    color: rgba(0, 0, 0, .4);
    font-size: 10px;

    .user-info {
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-right: 15px;

      .el-avatar {
        margin-right: 5px;
        width: 22px;
        height: 22px;
      }

      .header {
        text-decoration: none;
        color: #3a8ee6;
        font-weight: bold;
      }
    }

    .blog-date {
      margin-right: 15px;
    }

    .blog-type {
      margin-left: auto;
    }
  }
}

.description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  font: 300 1em/1.8 PingFang SC, Lantinghei SC, Microsoft Yahei, Hiragino Sans GB, Microsoft Sans Serif, WenQuanYi Micro Hei, sans-serif;
}

@media screen and (max-width: 768px) {
  .blog-date {
    display: none;
  }

  .welcome {
    width: 100%;

    .border {
      display: none;
    }

    .tit {
      font-size: 2rem;
      width: 100%;
      line-height: 50px;
      letter-spacing: 2px;
      height: auto;
    }

    .intro {
      font-size: 1rem;
      line-height: 30px;
    }
  }

  .el-pagination {
    width: 100%;
  }
}

@media screen and (max-width: 768px) {
    .blog-date {
        display: none;
    }

    .welcome {
        width: 100%;

        .border {
            display: none;
        }

        .tit {
            font-size: 2rem;
            width: 100%;
            line-height: 50px;
            letter-spacing: 2px;
            height: auto;
        }

        .intro {
            font-size: 1rem;
            line-height: 30px;
        }
    }

    .el-pagination {
        width: 100%;
    }
}

.blog-information{
    .left-item{
        width: 40%;
    }
    .middle-item{
        width: 30%;
    }
    .right-item{
        width: 30%;
    }
}

.total {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: larger;
    font-weight: bold;

    .title {
        display: flex;
        align-items: center;

        .el-icon-back {
            font-weight: bolder;
            color: #3a8ee6;
            margin-right: 10px;
        }

        .el-icon-back:hover {
            cursor: pointer;
        }
    }
}

@media screen and (max-width: 768px){
    .recent-post-item .post_cover {
        -webkit-box-ordinal-group: 1 !important;
        -moz-box-ordinal-group: 1 !important;
        -ms-flex-order: 1 !important;
        order: 1 !important;
        width: 100%;
        border-radius: 8px 8px 0 0;
    }
}


.recent-post-item .post-cover{
    overflow: hidden;
    width: 50%;
}


.blog-image {
    width: 100%;
    height: 100%;
    -webkit-transition: all 0.6s;
    -moz-transition: all 0.6s;
    -o-transition: all 0.6s;
    -ms-transition: all 0.6s;
    transition: all 0.6s;
    object-fit: cover;
    overflow-clip-margin:content-box;
    overflow: clip;
    border-style: none;
}
.blog-image:hover{
    transform: scale(1.1);
    transition: all 0.3s;
}

el-image {
    max-width: 100%;
    -webkit-transition: all 0.2s;
    -moz-transition: all 0.2s;
    -o-transition: all 0.2s;
    -ms-transition: all 0.2s;
    transition: all 0.2s;
}


@media screen and (max-width: 768px){
    .layout {
        padding: 1rem 5px;
    }
}
@media screen and (max-width: 900px){
    .layout {
        -webkit-box-orient: vertical;
        -moz-box-orient: vertical;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
    }
}

.layout {
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    margin: auto;
    padding: 2rem 15px;
    max-width: 1200px;
}

@media screen and (min-width: 900px){
    .recent-posts {
        -webkit-box-ordinal-group: 2;
        -moz-box-ordinal-group: 2;
        -ms-flex-order: 2;
        order: 2;
    }
}

@media screen and (max-width: 900px){
    .recent-posts{

    }
}

.recent-posts {

    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -o-transition: all 0.3s;
    -ms-transition: all 0.3s;
    transition: all 0.3s;

}

.el-card{
    margin-bottom: 20px;
}

@media screen and (max-width: 768px){
    .recent-post-item {
        -webkit-box-orient: vertical;
        -moz-box-orient: vertical;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        height: auto !important;
        //position: relative;
    }
}

@media screen and (max-width: 768px) {
    .recent-post-item {
        border-radius: 12px 12px 8px 8px;
    }
}

.recent-post-item {
    display: -webkit-box;
    display: -moz-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    //-webkit-box-orient: horizontal;
    //-moz-box-orient: horizontal;
    //-webkit-flex-direction: row;
    //-ms-flex-direction: row;
    //flex-direction: row;
    -webkit-box-align: center;
    -moz-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    height: 16em;
    //border-radius: 12px 8px 8px 12px;
    //background: var(--card-bg);
    //-webkit-box-shadow: var(--card-box-shadow);
    //box-shadow: var(--card-box-shadow);
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -o-transition: all 0.3s;
    -ms-transition: all 0.3s;
    transition: all 0.3s;
}




@media screen and (max-width: 768px){
    .recent-post-item .recent-post-info {
        -webkit-box-ordinal-group: 2 !important;
        -moz-box-ordinal-group: 2 !important;
        -ms-flex-order: 2 !important;
        order: 2 !important;
        padding: 1rem 1rem 1.5rem 1rem;
        width: 100%;
        //position: absolute;
        //bottom: 0;
        background-color:#ffffff;
    }
}
@media screen and (min-width: 768px){
    .recent-post-item >.recent-post-info {
        overflow: hidden;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        background-color:#ffffff;
        //position: relative;
    }
}

.recent-post-item> .recent-post-info{
    display: inline-block;
    overflow: hidden;
    padding: 0 40px;
    width: 50%;
}

.article-title-date{
    padding: 10px 10px 10px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.article-title {
    margin-bottom: 0.3rem;
    color: var(--text-highlight-color);
    font-size: 1.72em;
    line-height: 1.4;
    -webkit-transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    -ms-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    -webkit-line-clamp: 2;
}

.article-date{
    margin-bottom: 0.3rem;
    color: var(--text-highlight-color);
    font-size: 1.3em;
    line-height: 1.4;
    -webkit-transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
    -ms-transition: all 0.2s ease-in-out;
    transition: all 0.2s ease-in-out;
    -webkit-line-clamp: 2;
}

@media screen and (max-width: 768px){
    .article-description{
        display: flex;
        height: auto;
    }
}

.article-description{
    padding: 10px 10px 0 10px;
    margin-top: 0.3rem;
    -webkit-line-clamp: 2;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    align-items: center;
    font-size: 18px;
    word-break: break-word;
    text-align: start;
}



.card-title{
    font-size: 1.5em;
    font-weight: 500;
    display: flex;
}

.card-list{
    display: flex;
    padding-left: 15px;
    font-size: 1rem;
    margin: 10px 0 10px 0;
}

.card-widget {
    //position: relative;
    overflow: hidden;
    margin-top: 1rem;
    padding: 1rem 1.2rem;
    //background: var(--card-bg);
    //-webkit-box-shadow: var(--card-box-shadow);
    //box-shadow: var(--card-box-shadow);
    -webkit-transition: box-shadow 0.3s;
    -moz-transition: box-shadow 0.3s;
    -o-transition: box-shadow 0.3s;
    -ms-transition: box-shadow 0.3s;
    transition: box-shadow 0.3s;
}
</style>