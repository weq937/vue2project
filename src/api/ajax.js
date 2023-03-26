//封装下axios库(先直接拿过来用,大体给你解释下,后续我们会亲自写)
/*ajax 请求函数模块
 */
//axios库在使用的时候 一般会结合谁？ 请求拦截器和响应拦截器(vue3项目里加)
//导入axios
import axios from 'axios'
//暴露一个方法  ajax====axios
//url=》通过axios请求的后端接口的地址
//data=>通过axios请求的后端接口的时候附加的参数
//type=>axios请求类型 get  post 
export default function ajax(url = '', data = {}, type = 'GET') {
  return new Promise(function (resolve, reject) {
    let promise
    if (type === 'GET') {
        // http://localhost:8000/admins?name=李海&pass=123456
      // 准备 url query 参数数据
      let dataStr = '' // 数据拼接字符串
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }
      // 发送 get 请求
      promise = axios.get(url)
    } else {
      // 发送 post 请求
      promise = axios.post(url, data)
    }
    promise.then(response => {
        resolve(response.data) //返回后端数据
      })
      .catch(error => {
        reject(error) //后端没有成功返回响应数据 暴露一些错误
      })
  })
}
