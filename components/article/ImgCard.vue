<template>
    <div 
        :class="{
            long_img_card: shape == 'long',
            square_img_card: shape == 'square'
        }" 
        :style="{
            flexDirection: shape == 'long' && index % 2 == 1 ? 'row' : 'row-reverse'
        }"
    >
        <nuxt-link tag="div" :to="{path: `/article/${ article.id }`}" class="img">
            <UIImage :src="imgUrl"></UIImage>
        </nuxt-link>
        <div class="context">
            <nuxt-link tag="p" :to="{path: `/article/${ article.id }`}" class="title">{{ article.title }}</nuxt-link>
            <p class="details">
                <span class="time" v-if="article.update_time">
                    <i class="iconfont icontime"></i>
                    {{ article.update_time.substr(0,10) }}
                </span>
                <span class="tag">
                    <i class="iconfont iconmark"></i>
                    {{ article.skill_tag }}
                </span>
            </p>
            <p class="describe">{{ article.description }}</p>
        </div>
    </div>
</template>

<script>
import BASE_URL from '@/api/config'
import UIImage from '@/components/UI/Image'
export default {
    props: ['article', 'index', 'shape'],
    computed: {
        imgUrl () {
            if ( this.article.article_img ) {
                if ( this.article.article_img == 'HTML+CSS' ) {
                    return `${ BASE_URL }/images/webImgCard/html.jpg`
                } else if ( this.article.article_img == '代理爬虫' ) {
                    return `${ BASE_URL }/images/webImgCard/big-data.jpg`
                } else {
                    let img = this.article.article_img.toLowerCase()
                    return `${ BASE_URL }/images/webImgCard/${ img }.jpg`
                }
            }
        }
    },
    components: {
        UIImage
    }
}
</script>

<style lang="scss" scoped>
$height: 270px;
.long_img_card {
    width: 900px;
    height: $height;
    margin: 40px;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    justify-content: flex-start;
    background: white;
    box-shadow: 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07);
    transition: .4s;
    &:hover{
        box-shadow: 0 4px 12px 12px rgba(7,17,27,0.15);
        .img img {
            transform: scale(1.1);
        }
    }
    .img {
        height: $height;
        width: 400px;
        cursor: pointer;
        overflow: hidden;
        .el-image {
            width: 100%;
            height: 100%;
            transition: .4s;
        }
    }
    div.context {
        padding: 40px 20px;
        box-sizing: border-box;
        width: 500px;
        .title {
            font-size: 24px;
            font-weight: bold;
            letter-spacing: 2px;
            cursor: pointer;
        }
        .details {
            margin: 40px 0px 20px 0;
            > * {
                margin-right: 10px;
                i {
                    margin-right: 2px;
                }
            }
        }
        .describe {
            line-height: 26px;
            height: 80px;
            width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-top: 40px;
        }
    }
}

.square_img_card {
    width: 350px;
    height: 320px;
    background: white;
    font-size: 16px;
    border-radius: 8px;
    overflow: hidden;
    margin: 25px;
    transition: .4s;
    box-shadow: 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07);
    &:hover{
        box-shadow: 0 4px 12px 12px rgba(7,17,27,0.15);
        .img img {
            transform: scale(1.1);
        }
    }
    > div{ overflow: hidden;}
    .el-image{
        width: 100%;
        height: 218px;
        cursor: pointer;
        transition: .5s;
        &:hover{ transform: scale(1.2);}
    }
    .context{
        height: 102px;
        font-size: 16px;
        line-height: 42px;
        box-sizing: border-box;
        padding: 10px 20px;
        position: relative;
        align-items: center;
        .title{
            font-size: 16px!important;
            font-weight: bold;
            cursor: pointer;
        }
        .details{
            display: flex;
            justify-content: space-between;
            position: relative;
            p{
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
}

@media screen and (max-width: 1024px) {
    .square_img_card {
        margin: 25px 0!important;
    }
}
</style>