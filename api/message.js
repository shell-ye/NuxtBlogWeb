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

export const getMessageList = ( type, page ) => {
    // type: 1-博客留言页面
    return request({
        url: '/message/list',
        params: {
            type,
            page
        }
    })
}