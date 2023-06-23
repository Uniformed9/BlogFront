<template>
  <el-button @click="getFavorites()">我的收藏</el-button>

  <el-card shadow="hover">
    <div class="recent-post-item">
      <div class="post-cover">
        <a href="" title="222">
          <el-image class="blog-image"
                    src="https://challis-yin.github.io/img/404.jpg"></el-image>
        </a>
      </div>
      <div class="recent-post-info">
        <div class="article-title-date">
          <a class="article-title">222</a>
          <span class="article-date">111</span>
        </div>
        <div class="article-description">
          12312312312312312313
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import {get} from "@/components/request/request";
import {getCurrentInstance, reactive} from "vue";
import {ElMessage} from "element-plus";
import {useRouter} from "vue-router";

const {proxy} = getCurrentInstance()
const httpUrl = proxy.$key
const router = useRouter()
let favorites = reactive({
  list: []
})
let blogList = reactive({
  list: []
})

function getBlogUrlById(blogId) {
  return "http://localhost:8080/#/blog/" + blogId
}

const getFavorites = async () => {
  try {
    const {data, msg} = await get(httpUrl + "/user/" + router.currentRoute.value.params.id + "/home/favorites")
    console.log(data)
    if (data == null) {
      ElMessage({
        message: msg,
        type: 'error',
      })
    } else {
      ElMessage({
        message: '获取收藏成功',
        type: 'success',
      })
      favorites.list = favorites.list.concat(data)
      return data
    }
  } catch (err) {
    console.log(err)
    return false
  }
}


const getBlogByFavorites = async (favoritesId) => {
  console.log(favoritesId)
  try {
    const {
      data,
      msg
    } = await get(httpUrl + "/user/" + router.currentRoute.value.params.id + "/home/favorites/" + favoritesId)
    console.log(data)
    if (data == null) {
      ElMessage({
        message: msg,
        type: 'error',
      })
    } else {
      ElMessage({
        message: '获取收藏的博客成功',
        type: 'success',
      })
      blogList.list = blogList.list.concat(data)
      return data
    }
  } catch (err) {
    console.log(err)
    return false
  }
}

</script>
