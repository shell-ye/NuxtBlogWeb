<template>
    <div class="head-background" :class="{
        message: type == 'message'
    }">
        <p class="animate__animated animate__fadeInUp">{{ text }}</p>
        <img :src="`${ IMG_BED_API }/${ type }_BG.jpg`" alt="">
    </div>
</template>

<script>
import { IMG_BED_API } from '@/config'
export default {
    name: 'headBackground',
    props: ['type', 'text'],
    data () {
        return {
            IMG_BED_API
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