// http request 拦截器
import axios from "axios";
import store from "@/components/store";
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
export default axios
