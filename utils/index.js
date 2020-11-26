export const getStrCount = ( scrstr, armstr ) => { //scrstr 源字符串 armstr 特殊字符
    let count=0;
    while(scrstr.indexOf( armstr ) != -1 ) {
       scrstr = scrstr.replace( armstr, "" )
       count++;    
    }
    return count;
}

export const dateFormat = (date, fmt) => {
    date = new Date(+date)
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + ''
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
        }
    }
    return fmt
}

export const timeDifference = ( type, bigTime, smallTime ) => {
    let bt = parseInt( new Date( bigTime ).getTime() )
    let st = parseInt( new Date( smallTime ).getTime() )
    let result = ''
    if ( type == 's' ) {
        result = ( bt - st ) / 1000
    } else if ( type == 'm' ) {
        result = ( bt - st ) / 1000 / 60
    } else if ( type == 'h' ) {
        result = ( bt - st ) / 1000 / 60 / 60
    } else if ( type == 'd' ) {
        result = ( bt - st ) / 1000 / 60 / 60 / 24
    }
    return Math.ceil( result )
}