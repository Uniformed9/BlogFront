import axios from './http'

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param params [请求时携带的参数]
 * @param headers
 */
export function get(url, params){
    return new Promise((resolve, reject) =>{
        axios.get(url, {
            params:params,
        }).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param headers
 */
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params).then(res => {
            console.log(url)
            console.log(params)
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}

export function postWithConfig(url, params,config) {
    return new Promise((resolve, reject) => {
        axios.post(url, params,config).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err.data)
        })
    });
}
