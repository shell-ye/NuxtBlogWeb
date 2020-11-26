import { article_list } from '@/api/article'

export const state = () => ({
    article_id: '',
    article_list: {
        pages_info: {
            pages: 1,
            count: 1
        }
    }
})

export const mutations = {
    changeArticleID ( state, data ) {
        state.article_id = data
    },
    setArticleList ( state, data ) {
        state.article_list = data
    }
}

export const actions = {
    async getArticleList ( store, data ) {
        let result = data.type == 1 ? await article_list( data.type, data.page, data.page_count ) : await article_list( data.type, data.page, data.page_count, data.article_tags )
        if ( result.data.code == 200 ) {
            store.commit( 'setArticleList', result.data )
        }
    }
}

export const getters = {
    article_list: state => state.article_list,
    page: state => state.article_list.pages_info.pages,
    count: state => state.article_list.pages_info.count
}
