<template>

    <div>
        <div class="animate__animated animate__fadeIn title" :key="key" :style="{'background-image': bgUrl}"></div>
        <el-header :style="'margin-bottom:'+ headerBottom +'px'" class="animate__animated animate__fadeIn">
            <h2 class="animate__animated animate__swing logo" :key="shade" @click="shade++">Uni</h2>
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" 0
                     style="border: none;"
                     router text-color="#fff" active-text-color="#ffd04b">
                <el-menu-item :index="'/'+item.path" v-for="item in menulist" background-color="rgba(0,0,0,0)" :key="item.id" @click="changePage(item.path,item.id)">
                    <template v-slot:title>
                        <!--                图标-->
                        <el-icon><component :is="iconsObj[item.id]"/></el-icon>

                        <!--                文本-->
                        <span>{{item.authName}}</span>
                    </template>
                </el-menu-item>
            </el-menu>
            <div v-if="menuHiddenVisiable">
                <el-menu :default-active="activeIndex" class="animate__animated animate__fadeInDown el-menu-hidden"
                         background-color="#545c64" router text-color="#fff" active-text-color="#ffd04b">
                    <el-menu-item :index="'/'+item.path" v-for="item in menulist" :key="item.id" @click="changePage(item.path,item.id)">
                        <template v-slot:title>
                            <!--                图标-->
                            <el-icon><component :is="iconsObj[item.id]"/></el-icon>

                            <!--                文本-->
                            <span>{{item.authName}}</span>
                        </template>
                    </el-menu-item>
                </el-menu>
            </div>

            <div class="menu-expend" @click="menuExpend">
                <el-icon><Menu/></el-icon>
<!--                <i class="el-icon-menu"></i>-->
            </div>
            <div class="search_input">
                <el-input
                        @focus="checkInput"
                        @blur="notSearching()"
                        class="search"
                        placeholder="请输入内容"
                        prefix-icon="search"
                        v-model="queryInfo.query"
                        size="mini">
                </el-input>
                <ul v-if="searching">
                    <li class="animate__animated animate__fadeInDown search-blog" v-for="blog in searchList" :key="blog.id"
                        @click="getBlogInfo(blog.id)">
                        <a>{{blog.title}}</a>
                    </li>
                </ul>
            </div>

            <div v-if="logined" style="margin-right: 50px">
                <el-button size="mini" effect="light" type="primary" @click="showLFV">登录</el-button>
                <el-button size="mini" effect="light" type="warning" @click="showRFV">注册</el-button>
            </div>
<!--            显示头像-->
            <div v-else class="loginInfo">
                <el-avatar  :src="user.avatarLocal"></el-avatar>
                <div class="user-option">
                    <h3 class="web-font nickname">{{user.nickName}}</h3>
                    <p class="logout" @click="createBlog">新建博客</p>
                    <p v-if="!logined" class="logout" @click="manageBlog">个人资料</p>
                    <p class="logout" @click="logout">退出登录</p>
                </div>
            </div>
<!--            显示登录注册页面-->
            <LoginPage></LoginPage>
            <RegisterPage></RegisterPage>
        </el-header>
    </div>
</template>

<script setup>
import {ref, reactive, onMounted, computed} from "vue";
import {Menu} from "@element-plus/icons-vue";
import {useStore,mapState} from "vuex";
import {useRouter} from "vue-router";
import LoginPage from "@/components/login/LoginPage.vue"
import RegisterPage from "@/components/login/RegisterPage.vue"
import {ElMessage} from "element-plus";


        let shade=ref(0);
        // let isCollapse= ref(false);
        let    menuHiddenVisiable=ref(false);
        let    headerBottom=ref(0);
        let activeIndex=ref("1");
        const searching=ref(false);
        const  scrollFlag=ref(false);
        const searchList=reactive([]);
        const store=useStore();
        console.log(store.state.loginFormVisiable)
        const router =useRouter();
        let queryInfo=reactive({
            query: '',
            timer: null
        });
        let  menulist=[{
                    id: 1,
                    authName: '首页',
                    path: 'index'
                },
                {
                    id: 2,
                    authName: '博客',
                    path: 'blog'
                },
                {
                    id: 3,
                    authName: '项目',
                    path: 'project'
                },
                {
                    id: 4,
                    authName: '留言',
                    path: 'message'
                },
                {
                    id: 5,
                    authName: '关于我',
                    path: 'about'
                },
            ];
        let iconsObj= {
            '1': 'House',
                '2': 'Reading',
                '3': 'CopyDocument',
                '4': 'ChatDotSquare',
                '5': 'User',
        };
        const user=computed(()=>{
            return store.state.user
        })

    const manageBlog=()=>{
            router.push("/about")
    }
    const createBlog=()=>{
            router.push("/BlogCreate")
    }
    const logout=()=>{

            store.commit("clearUser")
            ElMessage({
                message: '退出登录成功',
                type: 'success',
            })
            router.push("/index")
    }
        //vue3新写法
        const changePage=(name,id) =>{
            // console.log(name)
          if (id===2){
            router.push("/index");
            store.state.blogChangeIndex=1;
        }else {
            store.commit('changePage',name);
          }
        }
        //this用不了
        const checkInput=()=> {
            searching.value = queryInfo.query !== '';
        }
        const menuExpend=()=>{
            menuHiddenVisiable.value=!menuHiddenVisiable.value
            if (menuHiddenVisiable.value === true) {
                headerBottom.value = 280
            } else {
                headerBottom.value = 0
            }
        }
        const  notSearching=()=>{
                setTimeout( () => {
                    searching.value = false
                },100)

            }
        const getBlogInfo=(blogId) =>{
            store.commit('changeBlogKey')
            router.push({path: '/blogInfo', query: {id: blogId}})
        }

        //返回登录状态，computed实时计算

        const storeStsteFns = mapState(['userInfo', 'administrator'])
        const storeState = {}
        Object.keys(storeStsteFns).forEach(item => {
            // 给函数绑定this
            const fn = storeStsteFns[item].bind({ $store: store })
            //用computed包裹，在computed中获取mapstate是通过this.$store.state方式获取
            storeState[item] = computed(fn)
        })
        const showLFV=()=> {
            // this.bgUrl = "url(\"http://www.dmoe.cc/random.php\")"
           store.commit('showLFV')

        }

        const showRFV=()=> {

            store.commit('showRFV')
        }
        const handleScroll=()=> {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            if (scrollTop > 60 && scrollFlag.value === false) {
                scrollFlag.value = true
            } else if (scrollTop <= 60 && scrollFlag.value === true) {
               scrollFlag.value = false
            }
        }
        const logined=computed(()=>{
            return user.value.id === ''
        })
        //针对滚轮的函数
        onMounted(()=>{window.addEventListener('scroll', handleScroll);})
</script>

<style scoped lang="less">

.title {
    position: fixed;
    top: 0;
    width: 100%;
    height: 120vh;
    background-repeat: no-repeat;
    background-size: cover;
    border-bottom: 3px solid #fff;
}

.el-header {
    transition: .2s;
}

.el-header:hover {
    opacity: 1 !important;
}

.el-menu {
    background-color: rgba(0, 0, 0, 0) !important;
}


.el-menu ::v-slotted(::v-deep .el-menu-item) {
    background-color: rgba(0, 0, 0, 0) !important;
}
.el-menu /deep/ .el-menu-item i {
    color: rgba(255, 255, 255);
}

.el-menu /deep/ .el-menu-item:hover i {
    color: white;
}

.el-menu /deep/ .el-menu-item:hover {
    background-color: rgba(0, 0, 0, 0.5) !important;
}

.search_input {
    position: relative;
    box-sizing: border-box;
}


.search_input ul {
    position: absolute;
    top: 30px;
    width: 100%;
    border: 1px solid #e5e9ef;
    margin-top: 1px;
    background: #fff;
    z-index: 10000;
    border-radius: 2px;
    box-shadow: 0 2px 4px rgba(58, 118, 142, 0.16);
    padding: 10px 0;
    font-size: 14px;
    box-sizing: border-box;
}

.search_input ul li {
    padding: 0 16px;
    height: 32px;
    line-height: 32px;
    cursor: pointer;
    word-wrap: break-word;
    word-break: break-all;
    display: block;
    color: #222;
    position: relative;
    /*transition: .2 ease;*/
}

.search_input ul li:hover {
    background-color: #e8f3ff;
}


.search-blog {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    padding-left: 20px;
    padding-right: 20px;
}

.el-header {
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.2);
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;

    > div {
        display: flex;
        align-items: center;
    }

    img {
        height: 40px;
    }

    span {
        margin-left: 15px;
    }

    button {
        opacity: 0.8;
    }

    .el-menu {
        flex-shrink: 0;
    }

    .logo {
        color: #ffd04b;
    }

    .logo:hover {
        cursor: pointer;
    }

}

.loginInfo {
    flex-shrink: 0;
    /*background-color: #545c64;*/
    color: white;
    height: 60px;
    border: none;
    width: 160px;
    position: relative;

    .el-avatar {
        width: 36px;
        height: 36px;
        margin: 0 auto;
        z-index: 200;
    }

    .user-option {
        position: absolute;
        top: 60px;
        width: 150px;
        left: 50%;
        transform: translate(-50%, 0);
        font-size: 14px;
        text-align: center;
        line-height: 30px;
        background-color: #fff;
        visibility: hidden;
        opacity: 0;
        color: #333;
        box-shadow: 0 2px 6px 0 rgb(0 0 0 / 10%);
        border: 1px solid #eee;
        border-radius: 5px;
    }

    .logout {
        margin: 10px auto;
        padding: 0;
        width: 100%;
    }

    .logout:hover {
        background-color: #eee;
    }
}

.loginInfo:hover {
    cursor: pointer;

    .el-avatar {
        transform: translate(0, 50%) scale(1.5);
        transition: .3s;
    }

    .user-option {
        visibility: visible;
        opacity: 1;
        transition: opacity .4s;
    }
}

.zZindex {
    margin-top: 300px;
    padding-top: 100px;
}

.menu-expend {
    display: none !important;
}

.el-menu-hidden {
    /*display: none;*/
    position: absolute;
    top: 60px;
    left: 0;
    border-top: 1px solid #ccc;
    border-right: none;
    width: 100%;

    .el-menu-item {
        border-bottom: 1px solid #ccc;
    }
}

@media screen and (max-width: 1000px) {
    .search_input {
        visibility: hidden;
    }
}

@media screen and (max-width: 768px) {
    .el-menu /deep/ .el-menu-item{
        background-color: rgba(0, 0, 0, 0.3) !important;
    }

    .el-menu-demo {
        display: none;
    }

    .title {
        width: 100%;
        background-position-x: center;
    }

    .menu-expend {
        display: block !important;
        position: fixed;
        top: 18px;
        left: 150px;
    }

    .menu-expend:hover {
        color: #ffd04b;
        cursor: pointer;
    }

    .title {
        background-position-y: 0;
    }
}
</style>
