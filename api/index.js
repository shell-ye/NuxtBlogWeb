// 封装 ajax 请求

import axios from 'axios'
import { Message } from 'element-ui'

const instance = axios.create({
    baseURL: process.env.AXIOS_URL,
    withCredentials: true,
    timeout: 3000
})

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 拦截器
instance.interceptors.request.use(config => {
	return config
},error => {
  	return Promise.reject(error);
})

instance.interceptors.response.use(response => {
	return response
},error => {
  	return Promise.reject(error)
})

const request = ({
    url,
    method = 'GET',
    params,
    data,
    headers,
    withCredentials = true,
    token
}) => {
    let result = new Promise((resolve, reject) => {
        switch ( method ) {
            case 'POST':
                instance.post(url, data, {
                    withCredentials, 
                    headers
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
                break

            default:
                instance.get(url, {
                    method,
                    params,
                    withCredentials,
                    headers
                }).then(res => {
                    resolve(res)
                }).catch(err => {
                    reject(err)
                })
                break
        }
    })
    result.then(res => {
        let ignoreList = [
            'http://myip.ipip.net'
        ]
        if ( ignoreList.indexOf(res.config.url) == -1 && res.data.code != 200 ) {
            Message({
				type: 'error',
				message: res.data.msg,
				showClose: true,
				duration: 1500
            })
            if ( res.data.code == '000013' ) {
				// store.commit('webside/logout')
				// let result = await getToken()
				// if ( result.data.code == 200 ) {
				// 	store.commit('setToken', result.data.data)
				// 	setCookie('token', result.data.data)
				// 	if ( !store.state.webside.isMobile ) {
				// 		window.location.href = '/#/login'
				// 	} else {
				// 		window.location.href = '/#/mobile/login'
				// 	}
				// }
			}
        }
    }).catch(err => {
        Message({
			type: 'error',
			message: err,
			showClose: true,
			duration: 1500
		})
    })

    return result
}

export default request