<template>
    <div class="index-head">
        <img :src="`${ IMG_BED_API }/index_BG2.jpg`" alt="">
        <canvas id="header_canvas" width="1912" height="600" style="top: 0px; z-index: 0; position: absolute;"></canvas>
        <p>
            <span class="title">夏叶博客</span>
            <span class="type"></span>
        </p>
    </div>
</template>

<script>
import Typed from 'typed.js'
import { IMG_BED_API } from '@/config'
import { mapState } from 'vuex'
export default {
    props: ['saying'],
    data () {
        return {
            IMG_BED_API,
            options: {
                currentPage: 0,
                thresholdDistance: 100,
                thresholdTime: 3000,
                autoplay: 5000,
                loop:true,
                direction:'horizontal',
                loopedSlides:1,
                slidesToScroll:1,
                timingFunction: 'ease',
                speed: 300,
            }
        }
    },
    mounted () {
        require('@/assets/js/bubbles.js')
        var typed = new Typed('.type', {
            showCursor: this.isMobile ? false : true,
            strings: this.saying, //输入内容, 支持html标签
            typeSpeed: 100, //打字速度
            backSpeed: 50, //回退速度
            loop: true
        });
    },
    computed: {
        ...mapState({
            'isMobile': state => state.webside.isMobile
        })
    }
}
</script>

<style lang="scss" scoped>
// $height: 600px;
.index-head {
    height: 60vh;
    width: 100%;
    position: relative;
    overflow: hidden;
    canvas {
        height: 100%;
    }
    img, p {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }
    p {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        color: white;
        text-shadow: 4px 4px 8px #000;
        .title {
            font-size: 48px;
            letter-spacing: 4px;
            margin-bottom: -300px;
            width: 100%;
            text-align: center;
            display: inline-block;
        }
        .type {
            font-size: 24px;
        }
    }
}

// 移动端
@media screen and (max-width: 1024px) {
    .index-head {
        img {
            width: unset;
        }
        p {
            .type {
                font-size: 16px;
            }
        }
    }
}
</style>