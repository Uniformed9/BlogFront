import { createStore } from 'vuex'
import {reactive} from "vue";
export default createStore({
    state: {
        userInfo: JSON.parse(window.sessionStorage.getItem('user')),
        token: JSON.parse(window.sessionStorage.getItem('token')),
        administrator:JSON.parse(window.sessionStorage.getItem('user'))!==null&&JSON.parse(window.sessionStorage.getItem('user')).type==='1',
        blogInfo:JSON.parse(window.sessionStorage.getItem("blog")),
        loginFormVisiable:false,
        registorFormVisiable:false,
        haveUser:false,
        pageName:'index',
        user: {
            id:'',
            userName:'',
            password:'',
            status:'',
            nickName:'',
            token:'',
            avatar:''
        }
            token:''
        }),
        blog:reactive({
            id:"",
            commentabled:"",
            creatTime:"",
            content:"",
            description:"",
            published:"",
            title:"",
            updateDate:"",
            updateTime:"",
            views:"",
            userId:"",
            userNickName:"",
        })
    },
    mutations: {
        // 改变页面
        changePage(state,name){
            state.pageName = name
        },
        // 获取用户信息
        getUserInfo(state){
            state.userInfo = JSON.parse(window.sessionStorage.getItem('user'))
            state.token = JSON.parse(window.sessionStorage.getItem('token'))
            if (state.userInfo !== null && state.userInfo.type === '1') {
                state.administrator = true
            } else {
                state.administrator = false
            }
        },
        constructUser(state,data){
           state.user={
               id:data.id,
               userName:data.userName,
               password:data.password,
               status:data.status,
               nickName:data.nickName,
               avatar:data.avatar,
               token:data.token,
           }
        },
        clearUser(state){
            state.user.userName=""
            state.user.avatar=""
            state.user.id=""
            state.user.token=""
            state.user.nickName=""
            state.user.password=""
            state.haveUser=false
            state.registorFormVisiable=false
            state.loginFormVisiable=false

        },
        showUser(state){
            state.haveUser = true
        },
        cancelUser(state){
            state.haveUser=false
        },
        hotBlogsListed(state,data){
            state.blog=data
        },
        showLFV(state){
            state.loginFormVisiable = true
        },
        showRFV(state){
            state.registorFormVisiable = true
        },
        cancelLFV(state){
            state.loginFormVisiable = false
        },
        cancelRFV(state){
            state.registorFormVisiable = false
        },
        logout(state){
            state.userInfo = null
            state.administrator = false
        }
    },
    actions: {
    },
    modules: {
    }
})
