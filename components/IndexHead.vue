<template>
    <div class="index-head">
        <img :src="`${ IMG_BED_API }/index_BG2.jpg`" alt="">
        <canvas id="header_canvas" width="1912" height="600" style="top: 0px; z-index: 0; position: absolute;"></canvas>
        <div>
            <span class="title">夏叶博客</span>
            <p>
                <span class="type"></span>
            </p>
        </div>
        <i class="el-icon-arrow-down" @click="iconClick"></i>
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
            timer: '',
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
    },
    methods: {
        // 点击向下图标进入内容
        iconClick () {
            this.timer = setInterval(() => {
                if ( document.documentElement.scrollTop < document.documentElement.clientHeight ) {
                    document.documentElement.scrollTop += 100
                } else {
                    clearInterval(this.timer)
                }
            }, 16)
        }
    }
}
</script>

<style lang="scss" scoped>
.index-head {
    height: 100vh;
    width: 100%;
    position: relative;
    overflow: hidden;
    canvas {
        height: 100%;
    }
    img {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
    }
    div {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        flex-direction: column;
        color: white;
        text-shadow: 4px 4px 8px #000;
        height: 100%;
        .title {
            font-size: 48px;
            letter-spacing: 4px;
            margin-bottom: 20px;
            width: 100%;
            text-align: center;
            display: inline-block;
        }
        p {
            justify-content: center;
            align-items: center;
            .type {
                font-size: 24px;
                display: flex;
                display: inline-block;
            }
            .typed-cursor {
                display: inline-block;
                transform: translate(2px, -4px);
            }
        }
    }
    .el-icon-arrow-down {
        position: absolute;
        bottom: 20px;
        left: 50%;
        display: inline-block;
        transform: translateX(-50%);
        color: white;
        font-size: 24px;
        font-weight: bold;
        cursor: pointer;
        animation: up_down_shake 1s linear infinite;
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

<style>
.index-head .typed-cursor {
    display: inline-block;
    transform: translate(2px, -4px);
}
</style>