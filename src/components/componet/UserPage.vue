<script setup>
import {getCurrentInstance, reactive, ref} from "vue";
import avatar from "@/assets/pageIndex.jpg"
import {get} from "@/components/request/request.js"
import {ElMessage} from "element-plus";
import axios from "@/components/request/http.js";
// import {useRouter} from "vue-router/dist/vue-router";

const {proxy} = getCurrentInstance()
const httpUrl = proxy.$key
const showSectionId = ref('#info')
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
    title: '爱好',
    name: '#hobbys',
    icon: 'iconfont icon-xingquaihao'
  },
  {
    id: 4,
    title: '评价',
    name: '#summary',
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
const userId = 1
const createFavoritesDialog = reactive({
  visible: false
})
const getFavorites = async () => {
  try {
    const {data, msg} = await get(httpUrl + "/user/" + 1 + "/home/favorites")
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
    // console.log(blogId)
    // console.log(data)
    // console.log(msg)
    return data
  } catch (err) {
    // console.log(err)
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

const hobbyList = [
  {
    id: 0,
    name: '网球',
    pic_url: 'http://hikari.top/images/ab058900-9c31-4818-9f51-61a60f64f63c.jpeg',
    desp: '网球是从大一开始学的一项运动，也是大学坚持最久的运动之一，技术一般般，但水平不高的比赛还是可以上场的，希望工作之后还有时间继续打球'
  },
  {
    id: 1,
    name: '跑步',
    pic_url: 'http://hikari.top/images/a7e5f1a4-bd29-4e80-aa9f-793342014120.jpeg',
    desp: '跑步是从大一那年的冬天开始的，最长的记录是19年跑完了半程马拉松的21.0975km，这是一项不管我年龄多大都想坚持下去的运动'
  },
  {
    id: 2,
    name: '二次元',
    pic_url: 'http://hikari.top/images/10985f8b-91aa-429a-a515-5b1e9a5db40f.jpeg',
    desp: '海贼，火影，网球王子，柯南，妖尾，进击的巨人......，从初中开始，基本上把长篇都看遍啦，二次元给我的生活天机了不少乐趣'
  },
  {
    id: 3,
    name: '日语',
    pic_url: 'http://hikari.top/images/8429f6ed-7094-453e-96ab-b574cdfa2514.jpeg',
    desp: '喜欢看动漫和听日语歌，所以就自然开始喜欢日语了，现在还只会基础，希望之后能有时间好好学学过N2吧'
  },
  {
    id: 4,
    name: '听音乐',
    pic_url: 'http://hikari.top/images/1b9c534a-f097-4281-a15f-17727f364c27.jpeg',
    desp: '这个不用多说，各种各样的音乐我都喜欢，而且喜欢边学习边听，哈哈'
  },
  {
    id: 5,
    name: '看电影',
    pic_url: 'http://hikari.top/images/33705908-8614-4a9d-a6f6-39fe406a2c1b.jpeg',
    desp: '比较喜欢科幻片，虽然因为没钱，没在电影院没看过几部，但这也算一个爱好吧'
  },
  {
    id: 6,
    name: '骑车',
    pic_url: 'http://hikari.top/images/b05702ea-673b-46ff-8f03-17db351c3845.jpeg',
    desp: '虽然我大学才雪会骑车，但看着别人出去远距离骑行也是挺羡慕的，希望有时间可以去试试'
  },
  {
    id: 7,
    name: '旅游',
    pic_url: 'http://hikari.top/images/420f8f32-eff3-4062-85d0-92d8b68f62eb.jpeg',
    desp: '这只能算一个美好的愿望，等我有钱了，要去各种各样的地方玩，体验不一样的生活'
  },
]
const showSection = (name) => {
  showSectionId.value = name
}

setTimeout(async () => {
  await getMyBlogs()
  await getFavorites()
  await getBlogByFavorites()
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
        <img :src="avatar" title="Hikari">
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
              <p><i class="iconfont icon-name" style="margin-right: 5px"></i>姓名：Hikari</p>
              <p><i class="iconfont icon-sex" style="margin-right: 5px"></i>性别：女</p>
              <p><i class="iconfont icon-nianling" style="margin-right: 5px"></i>年龄：22</p>
              <p><i class="iconfont icon-xueli" style="margin-right: 5px"></i>学历：本科</p>
              <p><i class="iconfont icon-qq1" style="margin-right: 5px"></i>QQ：2569757226</p>
              <p><i class="iconfont icon-shengao" style="margin-right: 5px"></i>身高：168cm</p>
              <p><i class="iconfont icon-icon1" style="margin-right: 5px"></i>体重：52kg</p>
              <p><i class="iconfont icon-shouye" style="margin-right: 5px"></i>血型：O型</p>
            </el-col>
            <el-col :sm="16" :xs="24" class="col-l-4">
              <p><i class="iconfont icon-chushengriqi" style="margin-right: 5px"></i>出生日期：1999-03-20</p>
              <p><i class="iconfont icon-xuexiao1" style="margin-right: 5px"></i>学校：XXXX大学</p>
              <p><i class="iconfont icon-zhuanye1" style="margin-right: 5px"></i>专业：计算机科学与技术</p>
              <p><i class="iconfont icon-xuefen" style="margin-right: 5px"></i>绩点：3.84 / 4</p>
              <p><i class="iconfont icon-yingyu" style="margin-right: 5px"></i>英语水平：六级</p>
              <p><i class="iconfont icon-gitee-fill-round" style="margin-right: 5px"></i>码云仓库：<a
                  href="https://github.com">https://gitee.com/tyoubin_admin</a></p>
              <p><i class="iconfont icon-csdn1" style="margin-right: 5px"></i>CSDN博客：<a
                  href="https://blog.csdn.net/weixin_44996854">https://blog.csdn.net/weixin_44996854</a></p>
              <p><i class="iconfont icon-email" style="margin-right: 5px"></i>邮箱：<a href="mailto:2569757226@qq.com">2569757226@qq.com</a>
              </p>
            </el-col>
          </el-row>
        </div>
      </section>
      <section class="animate__animated animate__fadeInRight" v-show="showSectionId === '#myblogs'" id="myblogs">
        <div class="wrap">
          <div style="display: flex;align-items: center;">
            <h2 class="title"><i class="iconfont icon-zhuanye"></i>我的博客&emsp;&emsp;</h2>
            <el-link :to="'/blogwrite'">
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
      <section class="animate__animated animate__fadeInRight" v-show="showSectionId === '#hobbys'" id="hobbys">
        <h2 class="title"><i class="iconfont icon-xingquaihao"></i>我的爱好</h2>
        <div class="row">
          <el-carousel :interval="2000" :type="cardOpen? 'card':''" height="350px">
            <el-carousel-item v-for="hobby in hobbyList" :key="hobby.id">
              <el-card class="hobby">
                <el-image style="width: 100%" :src="hobby.pic_url"></el-image>
                <h3 class="tit">{{ hobby.name }}</h3>
                <p>{{ hobby.desp }}</p>
              </el-card>
            </el-carousel-item>
          </el-carousel>
        </div>
      </section>
      <section class="animate__animated animate__fadeInRight" v-show="showSectionId === '#summary'" id="summary">
        <div class="wrap">
          <h2 class="title"><i class="iconfont icon-ziwopingjia"></i>自我评价</h2>
          <div class="row">
            <ul>
              <li>一个对一切未知的事物都会抱有好奇心的人</li>
              <li>一个希望用自己所有的精力将事情做到最尽可能完美的人</li>
              <li>一个喜欢拥抱不确定性，爱折腾，去见不同的人，感受不同的环境，不喜欢一成不变的人</li>
            </ul>
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