import request from './'

// 获取笔记列表
export const getNoteList = () => {
    return request({
        url: '/notes/list'
    })
}

// 添加笔记
export const addNote = ( user_id, title, notes_class, content, html_content ) => {
    return request({
        url: '/notes/add',
        method: 'POST',
        data: {
            user_id,
            title,
            notes_class,
            content,
            html_content
        }
    })
}

// 搜索笔记
export const searchNote = id => {
    return request({
        url: '/notes/search',
        params: {
            id
        }
    })
}

// 更新笔记
export const updateNote = ( user_id, id, title, notes_class, content, html_content ) => {
    return request({
        url: '/notes/update',
        method: 'POST',
        data: {
            user_id, 
            id, 
            title,
            notes_class,
            content, 
            html_content
        }
    })
}

// 删除笔记
export const delNote = ( user_id, id ) => {
    return request({
        url: '/notes/del',
        method: 'POST',
        data: {
            user_id, 
            id
        }
    })
}