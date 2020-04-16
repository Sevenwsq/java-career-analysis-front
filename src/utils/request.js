import axios from 'axios'
const service = axios.create({
  baseURL: '/',
  timeout: 5000,// 默认请求超时时间
})

/**
 * request 拦截器
 * 可以在请求发送前对请求进行一些处理
 * 如：统一在请求头上加上token
 * 对请求参数进行统一加密
 */
service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    
    return Promise.reject(error)
  }
)

/**
 * response 拦截器
 * 可以在接口响应之后，页面响应结果之前
 * 对响应结果统一进行处理
 * 如：对返回结果进行解密
 */
service.interceptors.response.use(
  response => {
    console.log(response);
    const res = response.data
    return res
  },
  error => {
    
  }
)

export default service