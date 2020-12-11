import request from './index'

export const getToken = email => {
    return request({
        url: '/user/token',
        params: {
            email
        }
    })
}

export const sendEmail = ( email ) => {
    return request({
        url: '/user/register/email',
        method: 'POST',
        data: {
            email
        }
    })
}

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

export const user_info = token => {
    return request({
        url: '/user/info',
        params: {
            token
        }
    })
}

export const log_out = () => {
    return request({
        url: '/user/logout'
    })
}

export const upload_head_img = ( params, email ) => {
    return request({
        url: '/user/upload/heads?email=' + email,
        method: 'POST',
        data: params
    })
}

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