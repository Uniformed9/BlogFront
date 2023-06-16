<template>
    <div >
      <el-header id="building">
        <NavBar></NavBar>
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

        </el-header>
        <el-main class="layout">
          <el-container id="index" class="animate__animated animate__fadeInUp">
            <el-row gutter="12">
              <el-col :xs="24" :sm:="17">
                <el-card style="background-color: rgba(255,255,255,0.9)" class="recent-posts" id="recent-posts">
                    <div class="recent-post-item" @mouseenter="imageBigger">
                      <div class="post-cover">
                        <a href="" title="111">
                        <el-image class="blog-image"
                                  src="https://s2.loli.net/2022/04/26/JILkS5gp9cr24yv.jpg"></el-image>
                        </a>
                      </div>
                      <div class="recent-post-info">
                        <a href="" class="article-title" title="111">11111</a>

                      </div>
                    </div>
                </el-card>
              </el-col>
            </el-row>
          </el-container>
        </el-main>

    </div>
</template>
<script>

import NavBar from "@/components/layout/NavBar.vue"
import {ArrowDown} from "@element-plus/icons-vue";
import {nextTick} from "vue";

export default {
    name:"pageIndex",
  computed: {
  },
    components: { ArrowDown, NavBar},
  setup(){
        let intro="欢迎来到我的个人博客";
        // const startRead=async ()=>{
        //
        // };


    function startRead(){
      nextTick(()=>{
        document.getElementById("index")
            .scrollIntoView({
              behavior:'smooth',
              block:'start'
            })
      })
    }

    function imageBigger(){

    }

        return{
            intro,
            startRead,
          imageBigger
        }
    }
}
</script>
<style scoped lang="less">
#building{
    background:url("../assets/pageIndex2.png");
    width:100%;
    height:100%;
    //position: fixed;
    background-size:100% 100%;
}

body {
  width: 100%;
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
    bottom: 5px;
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
.blog-image{
  color: #999999;
  text-decoration: none;
  word-wrap: break-word;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
  overflow-wrap: break-word;
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
  margin: 0 auto;
  padding: 2rem 15px;
  max-width: 1200px;
}



@media screen and (max-width: 768px){
  #recent-posts .recent-post-item {
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    height: auto !important;
    position: relative;
  }
}

@media screen and (max-width: 768px) {
  #recent-posts > .recent-post-item {
    border-radius: 12px 12px 8px 8px;
  }
}

#recent-posts > .recent-post-item {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: horizontal;
  -moz-box-orient: horizontal;
  -webkit-flex-direction: row;
  -ms-flex-direction: row;
  flex-direction: row;
  -webkit-box-align: center;
  -moz-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  height: 20em;
  border-radius: 12px 8px 8px 12px;
  background: var(--card-bg);
  -webkit-box-shadow: var(--card-box-shadow);
  box-shadow: var(--card-box-shadow);
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  -o-transition: all 0.3s;
  -ms-transition: all 0.3s;
  transition: all 0.3s;
}



@media screen and (max-width: 768px){
  #recent-posts .recent-post-item .recent-post-info {
    -webkit-box-ordinal-group: 2 !important;
    -moz-box-ordinal-group: 2 !important;
    -ms-flex-order: 2 !important;
    order: 2 !important;
    padding: 2rem 0rem 2rem;
    width: 100%;
    position: absolute;
    bottom: 0;
    background-color: #ffffff;
  }
}
#recent-posts > .recent-post-item >.recent-post-info {
  display: inline-block;
  overflow: auto;
  padding: 40px;
  width: 100%;

}
#recent-posts > .recent-post-item >.recent-post-info > .article-title {
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

</style>