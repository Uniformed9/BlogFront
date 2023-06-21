<script setup lang="ts">
  import {ref} from "vue";
  import axios from "axios";



  const title_value=ref();
  const content_value=ref();
  const category_value=ref();
  const tag_value=ref();

  const submit=async ()=>{
    await axios.post("",{})
  }
</script>

<template>
  <div class="layout animate__animated animate__fadeIn">
    <el-container>
      <el-header>
        <el-row>
          <el-col>
            <el-input placeholder="标题" v-model="title_value" class="title-class" type="text" size="large" clearable/>
          </el-col>
        </el-row>
      </el-header>
    </el-container>
    <el-container>
      <el-main>
        <el-row>
          <el-col>
            <el-input placeholder="内容" v-model="content_value" class="content-class" type="textarea" :autosize="{minRows:30}" clearable/>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
    <el-container>
      <el-footer>
        <el-row gutter="30">
          <el-col :span="12">
            <el-input placeholder="分类" v-model="category_value" class="category-class" type="text" clearable/>
          </el-col>
          <el-col :span="12">
            <el-input placeholder="标签" v-model="tag_value" class="tag-class" type="text" clearable/>
          </el-col>
        </el-row>
        <el-row justify="end">
            <el-button>返回</el-button>
            <el-button type="primary" @click="submit">发布</el-button>
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