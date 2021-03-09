import request from './index'

// 获取token
export const getToken = email => {
    return request({
        url: '/user/token',
        params: {
            email
        }
    })
}

// 发送邮件
export const sendEmail = ( email ) => {
    return request({
        url: '/user/register/email',
        method: 'POST',
        data: {
            email
        }
    })
}

// 注册
export const user_register = ( email,emailms,password ) => {
    return request({
        url: '/user/register',
        method: 'POST',
        data: {
            email,
            emailms,
            password
        }
    })
}

// 登录
export const user_login = ( email,password ) => {
    return request({
        url: '/user/login',
        method: 'POST',
        data: {
            email,
            password
        }
    })
}

// 获取用户信息
export const user_info = token => {
    return request({
        url: '/user/info',
        params: {
            token
        }
    })
}

// 退出登录
export const log_out = () => {
    return request({
        url: '/user/logout'
    })
}

// 上传头像
export const upload_head_img = ( params, email ) => {
    return request({
        url: '/user/upload/heads?email=' + email,
        method: 'POST',
        data: params
    })
}

// 修改用户信息
export const update_user_info = ( token, user_id, name, saying, qq, git, weibo, bilibili ) => {
    return request({
        url: '/user/update',
        method: 'POST',
        data: {
            token,
            user_id,
            name,
            saying,
            qq,
            git,
            weibo,
            bilibili
        }
    })
}

// 修改留言
export const userChangeMessage = ( token, type, message_id, message ) => {
    return request({
        url: '/user/change-message',
        method: 'POST',
        data: {
            token,
            type,
            message_id,
            message
        }
    })
}

// 删除留言
export const userDeleteMessage = ( token, type, message_id ) => {
    return request({
        url: '/user/delete-message',
        method: 'POST',
        data: {
            token,
            type,
            message_id
        }
    })
}