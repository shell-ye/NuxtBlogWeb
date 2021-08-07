import { user_info } from './../api/user'
import { init } from './../api/web'

export const state = () => ({
    token: ''
})

export const mutations = {
    setToken ( state, data ) {
        state.token = data
    }
}

export const actions = {
    async nuxtServerInit ( store, {app:{$cookies}} ) {
        // 获取 token 和用户信息
        let token = $cookies.get('token') 
        if ( token ) {
            store.commit('setToken', token)
            let info = await user_info( token )
            store.commit('webside/setUserData', info.data.data)
        }

        // 获取网站的初始信息
        let initData = await init()
        if ( initData.data.code == 200 ) {
            store.commit('webside/setWebsideInfo', initData.data.data)
        }
    }
}