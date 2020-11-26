import request from './index'

// 初始数据
export const init = () => {
    return request({
        url: '/init'
    })
}

// 获取友链
export const friendLinks = () => {
    return request({
        url: '/friend/links'
    })
}

// 添加友链
export const uploadFriendLink = ( user_id, classes, name, remarks, href, filename ) => {
    return request({
        url: '/manage/friend-add',
        method: 'POST',
        data: {
            user_id,
            classes, 
            name, 
            remarks, 
            href,
            filename
        }
    })
}

// 友链头像
export const uploadFriendHead = ( params ) => {
    return request({
        url: '/manage/friend-add-head',
        method: 'POST',
        data: params
    })
}

// 删除友链
export const delFriendLink = ( user_id, id ) => {
    return request({
        url: '/manage/friend-del',
        params: {
            user_id,
            id
        }
    })
}

// 修改友链
export const changeFriendLink = ( classes, name, remarks, href ) => {
    return request({
        url: '/friend/change',
        method: 'POST',
        data: {
            classes, 
            name, 
            remarks, 
            href
        }
    })
}

// 网站管理初始信息
export const webInit = user_id => {
    return request({
        url: '/manage/webinit',
        method: 'GET',
        params: {
            user_id
        }
    })
}

// 更新公告
export const submitNotice = ( user_id, notice ) => {
    return request({
        url: '/manage/notice',
        mathod: 'GET',
        params: {
            user_id,
            notice
        }
    })
}

// 更新技能标签
export const submitTags = ( user_id, type, tags ) => {
    return request({
        url: '/manage/tags',
        method: 'GET',
        params: {
            user_id,
            type,
            tags
        }
    })
}