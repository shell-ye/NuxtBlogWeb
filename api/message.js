import request from './index'

export const submitMessage = ( type, user_id, username, identification, identification_color, message, base_id, to_user_id, to_username, to_head_img, to_identification, to_identification_color ) => {
    return request({
        url: '/message/submit',
        method: 'POST',
        data: type == 1 ? {
            type,
            user_id,
            username,
            identification,
            identification_color,
            message
        } : {
            type,
            user_id,
            username,
            identification,
            identification_color,
            message,
            base_id,
            to_user_id, 
            to_username, 
            to_head_img, 
            to_identification, 
            to_identification_color
        }
    })
}

export const getMessageList = ( type, page, pageSize, token ) => {
    // type 1-网站留言  2-网站留言+回复 3-用户网站留言  4-用户回复的  5-回复用户的
    let params = type == 3 || type == 4 || type == 5 ? {
        type,
        page,
        pageSize,
        token
    } : {
        type,
        page,
        pageSize,
    }
    return request({
        url: '/message/list',
        params
    })
}