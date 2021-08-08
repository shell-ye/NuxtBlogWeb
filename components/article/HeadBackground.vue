<template>
    <div class="head-background" :class="{
        message: type == 'message'
    }">
        <p class="animate__animated animate__fadeInUp">{{ text }}</p>
        <img :src="imgList[type + '_BG']" alt="">
    </div>
</template>

<script>
// 各种大图片
import notes_BG from '../../assets/img/notes_BG.jpg'
import categories_BG from '../../assets/img/categories_BG.jpg'
import author_BG from '../../assets/img/author_BG.jpg'
import article_BG from '../../assets/img/article_BG.jpg'
import friends_BG from '../../assets/img/friends_BG.jpg'
import message_BG from '../../assets/img/message_BG.jpg'
import lab_BG from '../../assets/img/lab_BG.png'
export default {
    name: 'headBackground',
    props: ['type', 'text'],
    data () {
        return {
            imgList: {
                notes_BG,
                categories_BG,
                author_BG,
                article_BG,
                friends_BG,
                message_BG,
                lab_BG
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.head-background {
    width: 100%;
    height: 400px;
    overflow: hidden;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
    p {
        z-index: 2;
        color: white;
        font-size: 56px;
        letter-spacing: 10px;
        text-shadow: 4px 4px 8px black;
    }
}

// 友情链接定制
.head-background.message {
    height: 500px;
    img {
        height: unset;
        transform: translateY(-240px);
    }
}

@media screen and (max-width: 1024px) {
    .head-background {
        img {
            width: unset;
        }
    }
}
</style>