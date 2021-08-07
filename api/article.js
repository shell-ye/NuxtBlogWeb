// 文章接口

import request from './index'

// 添加文章
export const article_add = ( user_id, title, article_img, article_tags, skill_tag, description, content, html_content ) => {
    return request({
        url: '/article/add',
        method: 'POST',
        data: {
            user_id,
            title,
            article_img,
            article_tags,
            skill_tag,
            description,
            content,
            html_content
        }
    })
}

// 获取文章列表
export const article_list = ( type, pages, page_count, article_tags ) => {
    // type: 1-查询全部     2-按类查询  3-关键字查询
    let p = {}
    if ( type == 1 ) {
        p = { type, pages, page_count}
    } else if ( type == 2 ) {
        p = { type, pages, page_count, article_tags}
    } else if ( type == 3 ) {
        p = { type, pages }
    }
    return request({
        url: '/article/list',
        params: p
    })
}

// 删除文章
export const article_delete = ( user_id, id ) => {
    return request({
        url: '/article/del',
        params: {
            user_id,
            id
        }
    })
}

// 文章搜索
export const article_search = ( type,param ) => {
    // 1-id 2-article_tag-时间排序6条
    let params ={}
    if ( type == 1 ) {
        params = {
            type,
            id: param
        }
    } else if ( type == 2 ) {
        params = {
            type,
            article_tags: param
        }
    }
    return request({
        url: '/article/search',
        params
    })
}

// 文章修改( 更新 )
export const article_update = ( user_id, id, title, article_img, article_tags, skill_tag, description, content, html_content ) => {
    return request({
        url: '/article/update',
        method: 'POST',
        data: {
            user_id,
            id,
            title,
            article_img,
            article_tags,
            skill_tag,
            description,
            content,
            html_content
        }
    })
}

// 文章 添加/取消 喜欢
export const article_like = ( type, article_id, bool, user_id ) => {
    // type:    1-无用户id  2-有用户id
    let p = type == 1 ? { type, article_id, bool } : { type, article_id, bool, user_id }
    return request({
        url: '/article/like',
        params: p
    })
}

// 获取喜欢文章列表
export const article_user_like = ( type, user_id, article_id ) => {
    // type: 1-查询喜欢列表  2-查询单个
    let p = type == 1 ? { type, user_id } : { type, user_id, article_id }
    return request({
        url: '/article/user-like',
        params: p
    })
}