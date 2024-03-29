import axios from 'axios'
import { Message } from 'element-ui'
import router from './router'

const http = axios.create({
  baseURL: 'http://localhost:3000/admin/api'
  //baseURL: process.env.VUE_APP_API_URL || '/admin/api'
})

http.interceptors.request.use(config => {
  if(localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token
  }
  return config
})

http.interceptors.response.use(
  res => {
    return res
  }, err => {
    if (err.response.data.message) {
      Message({
        type: 'error',
        message: err.response.data.message
      })
      console.log(err.response)
      if (err.response.status === 401) {
        router.push('/login')
      }
    }
  return Promise.reject(err)
})

export default http