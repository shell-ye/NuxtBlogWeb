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
        let token = $cookies.get('token') 
        if ( token ) {
            store.commit('setToken', token)
            let info = await user_info( token )
            store.commit('webside/setUserData', info.data.data)
        }
        let inits = await init()
        if ( inits.data.code == 200 ) {
            store.commit('webside/setWebsideInfo', inits.data.data)
        }
    }
}