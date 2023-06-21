<script setup lang="ts">
import {reactive, ref} from "vue";

const favoriteName=ref("");

const input=reactive({
  display:"none"
})

const favoriteNameShow=reactive({
  display:"content"
})
const EditFavoriteName = () => {
  input.display="content"
  favoriteNameShow.display="none"
}

const CancelEditFavoriteName = () => {
  input.display="none"
  favoriteNameShow.display="content"
}


</script>

<template>
  <el-container>
  <el-header>
    <el-row>
      <el-col>
        <div>
          <el-card>
            <div class="favorite-name">
              <span>收藏夹名称:
                <span class="favorite-name-show">{{favoriteName}}</span>
                <el-input placeholder="" type="text"
                          class="favorite-name-input" v-model="favoriteName"/>
              </span>
              <el-button @click="EditFavoriteName" class="favorite-name-show">编辑</el-button>
              <el-button @click="CancelEditFavoriteName" class="favorite-name-input">退出编辑</el-button>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>

  </el-header>
  <el-main>
    <el-row>
      <el-col>
        <div>
          <el-card class="favorite-content">
            <el-header style="border-bottom: #aaaaaa 1px solid">
              123
            </el-header>
            <el-main>
              123
            </el-main>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </el-main>
</el-container>
</template>

<style scoped lang="less">
  .el-card{
    max-width: 1000px;
    margin: auto;
  }
  .favorite-name{

  }
  .favorite-name-input{
    display: v-bind("input.display");
    margin-right: 3rem;
  }
  .favorite-name-show{
    display: v-bind("favoriteNameShow.display");
    margin-right: 3rem;
  }
  .favorite-content{
    //padding:10rem 0 12rem 0 ;
    height: 20rem;
  }
</style>