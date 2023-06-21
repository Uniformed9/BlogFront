// http request 拦截器
import axios from "axios";
import store from "@/components/store";
import {ElMessage} from "element-plus";
axios.interceptors.request.use(
    config => {
        if (store.state.user.token!=='') {
            config.headers.Authorization = `${store.state.user.token}`
        }
        return config
    },
    err => {
        return Promise.reject(err)
    },
)
//后置拦截

export default axios
