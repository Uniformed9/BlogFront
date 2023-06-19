// http request 拦截器
import axios from "axios";
import {useStore} from "vuex";
import store from "@/components/store";


export function request(config){
    const blog=axios.create({
        baseURL:"http://localhost:8070",
        timeout:3000
    })

    return blog(config)
}

axios.interceptors.request.use(
    config => {
        if (store.state.user.token!=='') {
            config.headers.Authorization = `${store.state.user.token}`
        }
        return config
    },
    err => {
        console.log("dfs")
        return Promise.reject(err)
    },
)
// 后置拦截
// axios.interceptors.response.use(
//     response=>{
//     let res=response.data;
//     console.log(res)
//     console.log(111)
//         if (res.code===200){
//             return response
//         }else {
//             Element.Message.error("error",{duration:3*1000})
//
//             return Promise.reject(response.data.msg)
//         }
// },
//     error => {
//         console.log(error)
//
//         if (error.response.status===401){
//             store.commit("REMOVE_INFO")
//         }
//     })
export default axios
