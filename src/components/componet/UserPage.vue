<script setup>
import {getCurrentInstance, onMounted, reactive, ref} from "vue";
import avatar from "@/assets/pageIndex.jpg"
import {get} from "@/components/request/request.js"
import {ElMessage} from "element-plus";
import axios from "@/components/request/http.js";
import {useRouter} from "vue-router/dist/vue-router";
import {useRoute} from "vue-router";
import {IceCream} from "@element-plus/icons-vue";
const route=useRoute()
const userId=route.params.userId
const router=useRouter()
const {proxy} = getCurrentInstance()
const httpUrl = proxy.$key
const showSectionId = ref('#info')
const user=ref({})
const avatarUrl=ref("")
const newFavoritesName = reactive({
  name: ""
})
const isopen = reactive({
  map: {}
})

// const router = useRouter()
const introduceList = [
  {
    id: 0,
    title: '资料',
    name: '#info',
    icon: 'iconfont icon-zhuanye1'
  },
  {
    id: 1,
    title: '我的博客',
    name: '#myblogs',
    icon: 'iconfont icon-jinengliang-xian'
  },
  {
    id: 2,
    title: '收藏夹',
    name: '#favorites',
    icon: 'iconfont icon-zuopin'
  },
  {
    id: 3,
    title: '我的关注',
    name: '#myfollows',
    icon: 'iconfont icon-xingquaihao'
  },
  {
    id: 4,
    title: '我的粉丝',
    name: '#followers',
    icon: 'iconfont icon-ziwopingjia'
  },
]
const myBlogs = reactive({
  list: []
})
const tagsOfMyBlogs = reactive({
  map: {}
})
const favoritesList = reactive({
  list: []
})
const favoritesBlogMap = reactive({
  map: {}
})
const tagsOfFavorites = reactive({
  map: {}
})

const createFavoritesDialog = reactive({
  visible: false
})
const followerList = reactive({
  list: {}
})
const myFollowsList = reactive({
  list: {}
})

const getMyFollows = async () => {
  const {data} = await axios.get(httpUrl + "/follow/myfollows/" + userId)
  console.log(data)
  myFollowsList.list = data.data
  console.log(myFollowsList.list)
}

const getFollower = async () => {
  const {data} = await axios.get(httpUrl + "/follow/followers/" + userId)
  console.log(data)
  followerList.list = data.data
}

const getFavorites = async () => {
  try {
    const {data, msg} = await get(httpUrl + "/user/" + userId + "/home/favorites")
    console.log(data)
    // console.log(msg)
    if (data == null) {
      ElMessage({
        message: msg,
        type: 'error',
      })
    } else {
      favoritesList.list = []
      favoritesList.list = favoritesList.list.concat(data)
      return data
    }
  } catch (err) {
    console.log(err)
    return false
  }
}

const removeBlogFromFavorites = async (favoritesId, blogId) => {
  await axios.delete(httpUrl + "/user/" + userId + "/home/favorites/" + favoritesId + "/" + blogId)
  await getFavorites()
  await getBlogByFavorites()
}

const getTagsByBlogId = async function (blogId) {
  try {
    const {data} = await get(httpUrl + "/blog/" + blogId + "/tags")
    return data
  } catch (err) {
    console.log(err)
  }
}

const getBlogByFavorites = async () => {
  try {
    const {data, msg} = await get(httpUrl + "/user/" + userId + "/home/favorites/allblog")
    // console.log(data)
    if (data == null) {
      ElMessage({
        message: msg,
        type: 'error',
      })
    } else {
      /**
       * data是收藏夹id与收藏列表的键值对
       * key是收藏夹id
       */
      for (const key in data) {
        favoritesBlogMap.map[key] = data[key]
        isopen.map[key] = false
        tagsOfFavorites.map[key] = reactive({
          tagMap: {}
        })
        await getTagsByBlogId(1)
        if (favoritesBlogMap.map[key] != null) {

          for (const blog of favoritesBlogMap.map[key]) {
            const temp = await getTagsByBlogId(blog['id'])
            tagsOfFavorites.map[key].tagMap[blog['id']] = temp == null ? [{"id": 0}] : temp
            // console.log(tagsOfFavorites.map[key].tagMap[blog['id']])
          }
        }
      }
      // console.log(favoritesBlogMap.map)
      // console.log(tagsOfFavorites)
      return data
    }
  } catch
      (err) {
    console.log(err)
    return false
  }
}
const download=async (row) => {
    axios({
        url: "http://localhost:8070/file/download",
        method: 'get',
        responseType: 'arraybuffer',
        params:{
            location: row
        }
    }).then(res => {
        const blob = new Blob([res.data]);
        const url=URL.createObjectURL(blob)
        avatarUrl.value=url
    })
}
onMounted(()=>{
    console.log(userId)

    axios({
        url:"http://localhost:8070/user/getById",
        method:"get",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded;charset=utf-8"
        },
        params:{
            id:userId
        }
    }).then((res)=>{
        console.log("------")
        user.value=res.data.data
        console.log(user.value)
        download(user.value.avatar)
    })
})
const deleteFavorites = async (favoritesId) => {
  await axios.delete(httpUrl + "/user/" + userId + "/home/favorites/" + favoritesId)
  await getFavorites()
  await getBlogByFavorites()
}

const deleteBlog = async (blogId) => {
  await axios.delete(httpUrl + "/user/" + userId + "/home/blogs/" + blogId)
  await getMyBlogs()
}

const createNewFavorites = async (name) => {
  console.log(name)
  if (name === "") {
    ElMessage({
      message: "标题不能为空😡😡",
      type: 'error',
    })
    return
  }
  await axios.post(httpUrl + "/user/" + userId + "" + "/home/favorites/" + name)
  await getFavorites()
  await getBlogByFavorites()
  createFavoritesDialog.visible = false
}

const getMyBlogs = async () => {
  try {
    const {data, msg} = await get(httpUrl + "/user/" + userId + "/home/blogs")
    console.log(data)
    console.log(msg)
    myBlogs.list = data
    console.log(myBlogs.list)
    for (const blog of myBlogs.list) {
      console.log(blog)
      const temp = await getTagsByBlogId(blog['id'])
      tagsOfMyBlogs.map[blog['id']] = temp == null ? [{"id": 0}] : temp
    }
  } catch
      (err) {
    console.log(err)
    return false
  }
}

const showSection = (name) => {
  showSectionId.value = name
}
const writeBlog=()=>{
    console.log("-----")
    router.push("/BlogCreate")
}
setTimeout(async () => {
  await getMyBlogs()
  await getFavorites()
  await getBlogByFavorites()
  await getMyFollows()
  await getFollower()
}, 10)
</script>

<template>
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
  <div class="box">
    <aside class="animate__animated animate__bounceInLeft sidebar">
      <div class="avatar">
          <img :src="avatarUrl" title="Hikari">
      </div>
      <nav class="nav">
        <a v-for="intro in introduceList" @click="showSection(intro.name)" :key="intro.id">{{ intro.title }}</a>
        <!--          <i :class="intro.icon" style="margin-right: 10px"></i>-->
      </nav>
    </aside>

    <main>
      <section class="animate__animated animate__fadeInRight" v-if="showSectionId === '#info'" id="info">
        <div class="wrap">
          <h2 class="title"><i class="iconfont icon-gerenzhongxin1"></i> 个人资料</h2>
          <el-row :gutter="20" class="row">
            <el-col :sm="8" :xs="24" class="col-l-4">
              <p><i class="iconfont icon-name" style="margin-right: 5px"></i>姓名：{{user.nickName}}</p>
            </el-col>
            <el-col :sm="16" :xs="24" class="col-l-4">
              <p><i v-show="user.email!=null" class="email" style="margin-right: 5px">邮箱：{{user.email}}</i></p>
            </el-col>
          </el-row>
        </div>
      </section>
      <section class="animate__animated animate__fadeInRight" v-show="showSectionId === '#myblogs'" id="myblogs">
        <div class="wrap">
          <div style="display: flex;align-items: center;">
            <h2 class="title"><i class="iconfont icon-zhuanye"></i>我的博客&emsp;&emsp;</h2>
            <el-link :to="'/BlogCreate'" @click="writeBlog">
              写一篇博客
            </el-link>
          </div>
          <div class="blog-item">
            <el-card class="blog-card">
              <el-table
                  :data="myBlogs.list"
                  class="el-table"
                  style="width: 100%">
                <el-table-column prop="title" label="标题" width="180">
                  <template #default="scope">
                    <el-link :to="'/blog/'+scope.row.id">
                      {{ scope.row.title }}
                    </el-link>
                  </template>
                </el-table-column>
                <el-table-column prop="userNickname" label="作者" width="180">
                  <template #default="scope">
                    <el-link :to="'/home/'+scope.row.userId">
                      {{ scope.row.userNickname }}
                    </el-link>
                  </template>
                </el-table-column>
                <el-table-column prop="description" label="简介" width="300"/>
                <el-table-column label="标签" width="200">
                  <template #default="scope">
                          <span v-for="tag in tagsOfMyBlogs.map[scope.row.id]" :key="tag">
                              <span v-if="tag.id==0"></span>
                            <span v-else><el-tag>{{ tag.name }}</el-tag></span>
                          </span>
                  </template>
                </el-table-column>
                <el-table-column prop="createDate" label="创建日期" sortable/>
                <el-table-column label="操作">
                  <template #default="scope">
                    <el-popconfirm
                        width="220"
                        confirm-button-text="删了😡"
                        cancel-button-text="算了 留你一命🤤"
                        :icon="InfoFilled"
                        icon-color="#626AEF"
                        title="真的要删了我吗？"
                        @confirm="deleteBlog(scope.row.id)">
                      <template #reference>
                        <el-button>删除博客</el-button>
                      </template>
                    </el-popconfirm>
                  </template>
                </el-table-column>
              </el-table>
            </el-card>
          </div>
        </div>
      </section>
      <section class="animate__animated animate__fadeInRight" v-show="showSectionId === '#favorites'" id="favorites">
        <div class="wrap">
          <div style="display: flex;align-items: center;">
            <h2 class="title"><i class="iconfont icon-zuopin1"></i>我的收藏&emsp;&emsp;</h2>
            <el-button :type="'primary'" text size="large" @click="createFavoritesDialog.visible = true">
              新建收藏夹
            </el-button>
          </div>
          <el-row :gutter="30">
            <el-col :span="24" v-for="favorites in favoritesList.list" :key="favorites.id">
              <div class="favorites-item">
                <el-card class="favorites-card">
                  <div class="card-header"
                       style="justify-content: space-between;display: flex;align-items: center">
                    <span>{{ favorites.name }}</span>
                    <div class="buttons">
                      <el-button class="deletefavoritesbutton" @click="deleteFavorites(favorites['id'])">删除</el-button>
                      <el-switch v-model="isopen[favorites['id']]"></el-switch>
                      <span>{{ isopen[favorites['id']] == true ? "折叠" : "展开" }}</span>
                    </div>
                  </div>
                  <p v-if="favoritesBlogMap.map[favorites['id']]!=null" v-show="isopen[favorites['id']]">
                    <el-table
                        :data="favoritesBlogMap.map[favorites['id']]"
                        class="el-table"
                        style="width: 100%">
                      <el-table-column prop="title" label="标题" width="180">
                        <template #default="scope">
                          <el-link :to="'/blog/'+scope.row.id">
                            {{ scope.row.title }}
                          </el-link>
                        </template>

                      </el-table-column>
                      <el-table-column prop="userNickname" label="作者" width="180">
                        <template #default="scope">
                          <el-link :to="'/home/'+scope.row.userId">
                            {{ scope.row.userNickname }}
                          </el-link>
                        </template>
                      </el-table-column>
                      <el-table-column prop="description" label="简介" width="300"/>
                      <el-table-column label="标签" width="200">
                        <template #default="scope">
                          <span v-for="tag in tagsOfFavorites.map[favorites['id']].tagMap[scope.row.id]" :key="tag">
                              <span v-if="tag.id==0"></span>
                            <span v-else><el-tag>{{ tag.name }}</el-tag></span>
                          </span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="createDate" label="创建日期" sortable/>
                      <el-table-column label="操作">
                        <template #default="scope">
                          <el-popconfirm
                              width="220"
                              confirm-button-text="取消😡"
                              cancel-button-text="算了 再看看🤤"
                              :icon="InfoFilled"
                              icon-color="#626AEF"
                              title="确定取消收藏吗？"
                              @confirm="removeBlogFromFavorites(favorites['id'],scope.row.id)">
                            <template #reference>
                              <el-button>取消收藏</el-button>
                            </template>
                          </el-popconfirm>
                        </template>
                      </el-table-column>
                    </el-table>
                  </p>
                  <p v-else v-show="isopen[favorites['id']]">
                    <el-text class="mx-1" type="info">该收藏夹为空 速速添加收藏</el-text>
                  </p>
                </el-card>
              </div>
            </el-col>
          </el-row>
        </div>
      </section>
      <section class="animate__animated animate__fadeInRight" v-show="showSectionId === '#myfollows'" id="myfollows">
        <h2 class="title"><i class="iconfont icon-xingquaihao"></i>我的关注</h2>
        <div class="follows">
          <div v-for="user in myFollowsList.list" :key="user.id">
            <span style="display: flex;align-items: center;">
<!--              <a :href="'/#/home/1'">ok</a>-->
              <a :herf="'/#/home/'+user.id" :underline="false">
                <el-avatar :size="50" :src="user.avatar"/>
              </a>
              <el-link :to="'/home/'+user.id" :underline="false">
                <el-tag>{{ user.userName }}</el-tag>
              </el-link>
            </span>
          </div>
        </div>
      </section>
      <section class="animate__animated animate__fadeInRight" v-show="showSectionId === '#followers'" id="followers">
        <div class="wrap">
          <h2 class="title"><i class="iconfont icon-ziwopingjia"></i>我的粉丝</h2>
          <div v-for="user in followerList.list" :key="user.id">
            <p style="display: flex;align-items: center;">
              <el-avatar :size="50" :src="user.avatar"/>
              <el-tag>{{ user.userName }}</el-tag>
            </p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>


<style scoped lang="less">
body {
  height: 100vh;
  overflow: hidden;
}

.box {
  width: 100%;
  height: 100vh;
  position: relative;
}

.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  color: #fff;
  width: 250px;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  background: rgba(75, 75, 75, 0.9);

  nav {
    margin: 0;
    display: flex;
    list-style: none;
    flex-direction: column;

    a {
      font: 16px/1.5 'Microsoft Yahei', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
      list-style: none;
      box-sizing: border-box;
      text-decoration: none;
      color: #fff;
      padding: 1em;
      display: block;
      text-align: center;
      transition: background .3s, box-shadow .3s;
    }

    a:hover {
      background: rgba(60, 60, 60, 1);
    }
  }

  .avatar {
    width: 140px;
    height: 140px;
    margin: 1em auto;
    margin-top: 5em;
    background: #fff;
    border-radius: 100%;
    border: #fff 5px solid;
    transition: transform 0.5s;

    img {
      width: 100%;
      border-radius: 50%;
      /*transition: .6s;*/
    }

    img:hover {
      transform: rotate(360deg);
      transition: all 1.5s;
    }
  }
}

main {
  color: #353535;
  font: 16px/1.5 'Microsoft Yahei', 'PingFang SC', 'Hiragino Sans GB', sans-serif;
  box-sizing: border-box;
  margin-left: 250px;

  section {
    top: 50%;
    transform: translateY(-50%);
    position: relative;
    background-color: rgba(255, 255, 255, 0.8);
    border: 3px dashed rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    padding: 20px;

    .title {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      i {
        font-size: larger;
        margin-right: 10px;
      }
    }

    a {
      text-decoration: none;
    }
  }

  section:before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-right: 20px solid rgba(0, 0, 0, 0.3);
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    top: 50%;
    transform: translateY(-50%);
    left: -20px;
  }

  #info {
    .warp {
      .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }

  #skills {
    .center-fixed {
      text-align: center;
      display: flex;
      flex-direction: column;

      .skills-icon {
        width: 100px;
        height: 100px;
        margin: 0 auto;
        background: #fff;
        border-radius: 100%;
        box-shadow: 0 5px rgba(0, 0, 0, 0.3);

        i {
          font-size: 50px;
          line-height: 100px;
          transition: all 1s;
        }

        .fa-html5 {
          content: "\f13b";
        }
      }

      .skills-icon:hover {
        i {
          transform: rotate(180deg);
          transition: all 1s;
        }
      }

    }

  }

  #works {
    .el-card /deep/ .el-card__body {
      padding: 0;
    }

    .works-item {
      margin-bottom: 20px;
      position: relative;

      .works-item-front, .works-item-back {
        background-color: white;
        text-align: center;
        border-radius: 5px;
        box-shadow: 0 0 5px 0 #ccc;
        border: 1px solid #5d5d5d;
        transition: all 1s;
        backface-visibility: hidden;
        width: 100%;
        height: 100%;
      }

      .works-item-front {
        .el-image {
          max-width: 100%;
          max-height: 180px;
          border-radius: 5px 5px 0 0;
        }

        p {
          margin-top: 2px;
          margin-bottom: 2px;
          color: #303133;
        }
      }

      .works-item-back {
        box-sizing: border-box;
        padding: 20px;
        position: absolute;
        top: 0;
        background: rgba(255, 255, 255, 0.8);
        transform: rotateY(180deg);
      }
    }

    .works-item:hover {
      .works-item-back {
        transform: rotateY(0deg);
      }

      .works-item-front {
        transform: rotateY(180deg);
      }
    }
  }

  #hobbys {
    .el-card /deep/ .el-card__body {
      padding: 0;
      height: 350px;
    }

    .hobby {
      opacity: 0.9;
      background-color: rgba(255, 255, 255, 0.9);
      box-shadow: none;
      margin-bottom: 20px;
      border-radius: 20px;

      .el-image {
        width: 100%;
        max-height: 200px;
      }

      .tit {
        margin: 0 auto;
        line-height: 20px;
        text-align: center;
      }

      p {
        margin: 0;
        padding: 20px;
        font-size: medium;
      }
    }
  }

  #summary {
    ul {
      li {
        line-height: 50px;
        border-bottom: 2px dashed #63a35c;
        background-color: rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
        border-radius: 9999px;
        list-style-type: circle;
      }
    }
  }
}


@media screen and (max-width: 768px) {
  .sidebar {
    position: relative;
    top: 0;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;

    .avatar {
      margin: 1rem auto;
      width: 100px;
      height: 100px;
    }

    nav {
      background-color: rgba(255, 255, 255, 0.1);
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
    }
  }

  main {
    margin: 0 auto;
    width: 100%;
    text-align: center;

    section {
      border-radius: 0;
      border: none;
    }

    #summary {
      ul {
        li {
          border-radius: 0;
          border-bottom: none;
          background-color: transparent;
          text-align: left;
        }
      }
    }
  }
}

</style>