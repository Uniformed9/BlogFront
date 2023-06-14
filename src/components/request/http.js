// http request 拦截器
import axios from "axios";
import {useStore} from "vuex";
axios.interceptors.request.use(
    config => {
        if (useStore().state.user.token!=='') {
            config.headers.Authorization = `${useStore().state.user.token}`
        }
        return config
    },
    err => {
        console.log("dfs")
        return Promise.reject(err)
    },
)
export default axios
