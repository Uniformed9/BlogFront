// http request 拦截器
import axios from "axios";
import {useStore} from "vuex";
import store from "@/components/store";
axios.interceptors.request.use(
    config => {
        if (store.state.user.token!=='') {
            config.headers.Authorization = `${useStore().state.user.token}`
        }
        return config
    },
    err => {
        return Promise.reject(err)
    },
)
export default axios
