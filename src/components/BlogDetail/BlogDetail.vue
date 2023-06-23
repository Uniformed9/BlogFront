<template>
  <div>
    <NavBar></NavBar>
  </div>
  <ImageBackground class="wife-cover">
  <div class="theBlogContent">
    <el-card>
      <div class="title">
        <h2><span>{{blog.title}} </span> </h2>
      </div>
      <div class="card-info">
        <div style="display: flex;align-items: center;">
        <div class="user-info">
          <el-text type="info" class="not-author-name">作者:</el-text>
          <el-text type="info" class="authorName" :key="blog.userNickname" @click="goAuthorSpace">{{blog.userNickname}}&emsp;</el-text>
        </div>
        <div class="views-info">
          <el-text type="info" class="not-views-name">浏览量:</el-text>
          <el-text class="views-name">{{blog.views}}</el-text>
        </div>
        </div>
        <div v-show="tagsOfBlog.list!=null" class="tag-info">
          <span class="not-tag-name">标签:&emsp;</span>
          <span v-for="tag in tagsOfBlog.list" :key="tag">
              <span v-if="tag.id==0">无标签</span>
              <span v-else><el-tag>{{ tag.name }}</el-tag></span>
            </span>
        </div>
      </div>
      <div class="content">
      <div><span v-html="blog.content"></span></div>
    </div>
      <div class="love-button">
        <el-button class="button" text @click="getFavoriteList();dialogTableVisible = true">
          收藏本文章
        </el-button>
      </div>
    </el-card>



    <el-dialog v-model="dialogTableVisible" title="收藏夹列表">
      <el-button :type="'primary'" text size="large" @click="createFavoritesDialog.visible = true">
        新建收藏夹
      </el-button>
      <el-table :data="favoriteData">

        <el-table-column
            :prop="index"
            :label="item"
            v-for="(item, index) in favoritesHeader"
            :key="index"
        >
        </el-table-column>

        <el-table-column fixed="right" label="操作" width="150">
          <template v-slot="scope">
          <el-button text @click="addFavoriteBlogto(scope.row.id);getFavoriteList()">添加</el-button>
          </template>
        </el-table-column>

      </el-table>
    </el-dialog>

    <el-dialog
        v-model="createFavoritesDialog.visible"
        title="新建收藏夹"
        width="30%"
        :before-close="handleClose">
              <span>
                <el-text class="mx-1" style="padding-right: 300px">标题</el-text>
                <el-input v-model="newFavoritesName.name" placeholder="请输入标题"/>
              </span>
      <template #footer>
                <span class="dialog-footer">
<!--                  <el-button @click="createFavoritesDialog.visible = false">算了</el-button>-->
                  <el-button type="primary" @click="createNewFavorites(newFavoritesName.name)">添加</el-button>
                </span>
      </template>
    </el-dialog>

  </div>


  </ImageBackground>
</template>

<script setup>
import NavBar from "@/components/layout/NavBar";
import ImageBackground from "@/components/componet/ImageBackground";
import {ElMessage} from "element-plus";
import {getCurrentInstance, onMounted, reactive} from "vue";
import {useRoute} from "vue-router/dist/vue-router";
import {ref} from "vue";
import axios from "@/components/request/http";
import router from "@/components/router/router";
import store from "@/components/store";
const {proxy} =getCurrentInstance();
const httpUrl = proxy.$key

const tagsOfBlog = reactive({
  list:[]
})

const getTagsByBlogId = async function (blogId) {
  console.log("in")
  try {
    const {data} = await axios.get(httpUrl + "/blog/" + blogId + "/tags")
    console.log(data)
    return data.data
  } catch (err) {
    console.log(err)
  }
}

const createFavoritesDialog=reactive({
  visible:false
})

const newFavoritesName = reactive({
  name: ""
})

const createNewFavorites = async (name) => {
  console.log(name)
  if (name === "") {
    ElMessage({
      message: "标题不能为空😡😡",
      type: 'error',
    })
    return
  }
  await axios.post(httpUrl + "/user/" + myid + "" + "/home/favorites/" + name)
  // await getFavorites()
  // await getBlogByFavorites()
  createFavoritesDialog.visible = false
  getFavoriteList()
}


const blog=ref({
        id:"",
        title:"default",
        content:"test content",
        userNickname:null,
        views:null

      })
const favorites=ref([])
const favoritesHeader=ref({
  name:"收藏夹名称",
  id:"收藏夹id"
})

const route=useRoute();
// console.log(route.query,route.params,"====");
let blogid=3
let userid=1
let myid=1
onMounted(()=>{
  let blogID=route.params.blogId
  let userID=route.params.userId
  // let myID=store.state.user.id
  blogid=blogID
  userid=userID
  // myid=myID
  getBlogDetail();
  addviewcounts();

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
      blog.value.views = data.data.views
      blog.value.userNickname=data.data.userNickname
      tagsOfBlog.list = await getTagsByBlogId(data.data.id)
      console.log(tagsOfBlog.list)
    } else {
      ElMessage.error('显示失败')
    }
  }
  const addviewcounts=async () => {
    await axios.post(httpUrl+"/blog/view/"+blogid)
  }
const goAuthorSpace=()=>{
  router.push({path:'/index'})
  //路由尚未配置
}
const dialogTableVisible = ref(false)
const getFavoriteList=async () => {
  const {data, msg} = await axios.get(httpUrl+"/user/"+myid+"/home/favorites")
  console.log("data", data)
  console.log("msg", msg)
  if(data.data!=null){
    favorites.value=data.data
  }
  else{
    ElMessage.error('不存在收藏夹')
  }
}
const favoriteData = favorites;
const addFavoriteBlogto=async id => {
  const {data, msg} =await axios.get(httpUrl+"/user/"+myid+"/home/favorites/"+id)
  console.log("data", data)
  console.log("msg", msg)
  console.log("favorites_id",id)
  let isexist=false;
  if(data.data!=null&&data!=null){
    for(var i=0;i<data.data.length;i++) {
      if (blogid == data.data[i].id) {
        isexist = true;
        break;
      } else {
        continue;
      }
    }
  }
  if(data==null){
    ElMessage.error("没有这个收藏夹哦")
  }
  else if(isexist==true){
    ElMessage.error("已经在里面了捏o(*￣︶￣*)o")
  }
  else{
    await axios.post(httpUrl + "/user/" + myid + "/home/favorites/"+id+"/"+blogid)
    ElMessage.success("添加成功惹~(*╹▽╹*)")
  }

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
  border-radius: 5px;
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
  font-size: 14px;

}
.views-info{
  display: flex;
}

.not-views-name{
  font-size: 14px;

}

.authorName{
  color: #555556;
  font-size: 18px;
  margin-left: 5px;
  margin-right: 5px;
}

.views-name{
  font-size: 15px;
  margin-left: 5px;
  margin-right: 5px;
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
  display: flex;
  margin-top: 30px;
  color: #4d4d4d;
}

.love-button{
  display: flex;
  margin-top: 30px;
  justify-content: end;
  align-items: center;
}

.button{
  background-color: #e5e9ef;
}

.button:hover{
  background-color: #b3b2b8;
  color:#3a8ee6;
  border: 1px solid #eeeee6;
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