// 开发环境
const DEV_API = 'http://127.0.0.1:3002'

// 生产环境
const PROD_API = 'https://www.xiaye.cloud'

// 根据不同环境导出不同的 API
const BASE_URL = process.env.NODE_ENV === 'production' ? PROD_API : DEV_API

export default BASE_URL