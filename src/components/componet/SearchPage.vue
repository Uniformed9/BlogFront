<template class="all">
  <div class="body">
    <div class="videoContainer">
      <video class="fullscreenVideo" id="bgVid" playsinline="" autoplay="" muted="" loop="">
        <source src="@/assets/hutao.mp4" type="video/mp4">
      </video>
    </div>
    <NavBar></NavBar>
    <div class="inputBox">
      <el-input v-model="inputContent"
                class="searchinput"
                placeholder="请输入文字进行查询"
                prefix-icon="el-icon-search"
                suffix-icon="el-icon-search"
                clearable>
      </el-input>
      <el-button :icon="Search" circle @click="searchBlogList()"/>
    </div>
    <div class="searchResult" style="margin-top: 20px;">
      <el-table
          :data="bloglist.list"
          :key="tableKey.key"
          class="el-table"
          style="width: 80%">
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
        <el-table-column prop="description" label="简介" width="500"/>
        <el-table-column prop="createDate" label="创建日期" sortable/>
      </el-table>
    </div>
  </div>
</template>

<script setup>
import NavBar from "@/components/layout/NavBar.vue";
import {Search} from '@element-plus/icons-vue'
import {getCurrentInstance, reactive, ref, watch} from "vue";
import {ElMessage} from "element-plus";
import axios from "@/components/request/http";


const {proxy} = getCurrentInstance()
const httpUrl = proxy.$key

const bloglist = reactive({
  list: []
})
const tableKey = reactive({
  key: 0
})
const inputContent = ref("")

watch(inputContent, async (newContent,) => {
  await searchBlogList(newContent)
  await getBlog()
  tableKey.key = Math.random()
})

setTimeout(async () => {
  await searchBlogList(inputContent)
  tableKey.key = Math.random()
}, 10)

const getBlog = async () => {
  try {
    const {data} = await axios.get(httpUrl + "/blog/" + 20)
    console.log(data)
  } catch (err) {
    console.log(err)
  }
}

const searchBlogList = async () => {
  try {
    const {data, msg} = await axios.get(httpUrl + "/blog/search/" + inputContent.value)
    console.log("in function:" + inputContent.value)
    if (data == null) {
      ElMessage({
        message: msg,
        type: 'error',
      })
    } else {
      ElMessage({
        message: '搜索成功',
        type: 'success',
      })
      bloglist.list.splice(0)
      console.log(bloglist)
      tableKey.key = Math.random()
      bloglist.list = bloglist.list.concat(data.data)
      // that.$set(that, bloglist, data.data)
      tableKey.key = Math.random()
      console.log(bloglist)
      return bloglist
    }
  } catch (err) {
    console.log(err)
    return false
  }
}
</script>

<style scoped>
.all {
  background-color: rgba(0, 0, 0, 0%);
}

.body {
  background-color: rgba(0, 0, 0, 0%);
}

.inputBox {
  margin-right: 260px;
  /*margin-top: 200px;*/
  /*border-radius: 1px;*/
  width: 300px;
  background-color: rgba(0, 0, 0, 0%);
  /*box-shadow: inset 0 0 0 1px white;*/
  color: white;
}

:deep(.el-input__inner) {
  border-radius: 100px;
  height: 30px;
  background: rgba(0, 0, 0, 0%);
}

.searchinput {
  width: 60%;
  text-align: center;
  border-color: #c0c4cc;
}

.searchResult {
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0%);
}

.el-table {
  color:
}

.videoContainer {
  position: fixed;
  width: 100%;
  height: 100%;
  /*overflow: hidden;*/
  z-index: -100;

}


.videoContainer:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  display: block;
  z-index: -1;
  top: 0;
  left: 0;
  background: rgba(25, 29, 34, 1%);
}

.fullscreenVideo {
  width: 100%;
}

:deep (.el-table__expanded-cell) {
  background-color: transparent;
}

:deep(.el-table ) {
  background-color: transparent;
}

:deep(.el-table tr) {
  background-color: transparent;
}

/*:deep(.el-table td) {*/
/*  background-color: transparent;*/
/*}*/
html.body {
  height: 100%;
  width: 100%;
}

page {
  height: 100%;
}
</style>