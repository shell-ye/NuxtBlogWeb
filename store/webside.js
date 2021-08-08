import { init, friendLinks } from './../api/web'
import BASE_URL from '@/api/config'

export const state = () => ({
    token: '',
    userData: {},
    isMobile: false,
    webside: {
        article_count: 0,
        article_likes_count: 0,
        views_count: 0,
        tell: '暂无公告',
        create_time: '',
        tags_count: {
            'HTML+CSS': 0,
            Javascript: 0,
            Scss: 0,
            Node: 0,
            Vue: 0,
            Axios: 0,
            Git: 0,
            Windows: 0
        }
    },
    friend_links: []
})

export const mutations = {
    setToken ( state, data ) {
        state.token = data
    },
    logout ( state ) {
        state.token = ''
        state.userData = {}
    },
    setUserData ( state, data ) {        
        if ( data && data.head_img ) { data.head_img = BASE_URL + '/images/userHeadImg/' + data.head_img }
        state.userData = data
    },
    setWebsideInfo ( state, data ) {
        state.webside = data
    },
    changeIsMobile ( state, data ) {
        state.isMobile = data
    },
    setFriendLinks ( state, data ) {
        state.friend_links = data
    }
}

export const getters = {
    // 网站创建时间
    create_time: state => state.webside.create_time,
    // 标签数目
    tags_count: state => state.webside.tags_count
}

export const actions = {
    async getWebsideInfo ( store ) {
        let result = await init()
        if ( result.data.code == 200 ) {
            store.commit( 'setWebsideInfo', result.data.data )
        }
    },
    async getFriendLinks ( store ) {
        let result = await friendLinks()
        if ( result.data.code == 200 ) {
            store.commit( 'setFriendLinks', result.data.data )
        }
    }
}
