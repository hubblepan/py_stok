import axios from 'axios';


// 创建一个 axios 实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 5000, // 请求超时时间
});

export default service;
