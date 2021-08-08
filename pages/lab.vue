<template>
    <article id="lab">
        <HeadBackground type="lab" text="灵感实验室"></HeadBackground>
        <section class="white-card markdown-body container animate__animated animate__slideInUp">
            <h1>灵感实验室</h1>
            <blockquote>
                <p><i class="iconfont iconbiaoti"></i>记录一些突然新奇的想法或者看到别人优秀或者有趣的项目新生羡慕，所以可能会与他人项目有相似之处，但是点子皆会备注作者信息或者来源信息，若有侵权请联系我进行调整或删除，如需转载，请联系作者</p>
            </blockquote>
            <div v-for="(item, index) in projectList" :key="index" :class="{show: item.show}">
                <template v-if="index == 0">
                    <h2 @click="item.show = !item.show"><span>{{ item.title }}</span><i class="iconfont iconbofangqi_bofang"></i></h2>
                    <blockquote>
                        <p>毛玻璃配上好看的背景简直炫酷到爆炸，因为最近有点忙，所以只坐了一个页面，而且也没实现功能，坑先挖，一定会找时间填上的</p>
                    </blockquote>
                    <p>想法来源：</p>
                    <ul>
                        <li>苹果官网导航栏</li>
                    </ul>
                    <p>项目地址：</p>
                    <ul>
                        <li>播放器：<a :href="`${ base_url }/MusicPlayer/index.html`" target="_blank">{{ `${ base_url }/MusicPlayer/index.html` }}</a></li>
                    </ul>
                    <p>图片展示：</p>
                    <div class="image-display">
                        <img :src="base_url + '/MusicPlayer/display/MusicPlayer.png'" alt="">
                    </div>
                </template>
                <template v-if="index == 1">
                    <h2 @click="item.show = !item.show"><span>{{ item.title }}</span><i class="iconfont iconbofangqi_bofang"></i></h2>
                    <blockquote>
                        <p>在翻看别人博客时看到一个惊艳到我的拟物风博客，于是上度娘找了找这种风格的 UI 界面，发现真的很不错，就像靠自己实现一下</p>
                    </blockquote>
                    <p>想法来源：</p>
                    <ul>
                        <li>博客：<a href="https://muuzi.cn/" target="_blank">https://muuzi.cn/</a></li>
                        <li>UI社：<a href="https://www.uishe.cn/28293.html" target="_blank">https://www.uishe.cn/28293.html</a></li>
                    </ul>
                    <p>项目地址：</p>
                    <ul>
                        <li>登录页面：<a :href="`${ base_url }/zoosemy/LoginPage.html`" target="_blank">{{ `${ base_url }/zoosemy/LoginPage.html` }}</a></li>
                        <li>音乐播放器：<a :href="`${ base_url }/zoosemy/MusicPlayer.html`" target="_blank">{{ `${ base_url }/zoosemy/MusicPlayer.html` }}</a></li>
                        <li>拟物键盘：<a :href="`${ base_url }/zoosemy/KeyBoard.html`" target="_blank">{{ `${ base_url }/zoosemy/KeyBoard.html` }}</a></li>
                    </ul>
                    <p>图片展示：</p>
                    <div class="image-display">
                        <img :src="base_url + '/zoosemy/display/login.png'" alt="">
                        <img :src="base_url + '/zoosemy/display/musicplayer.png'" alt="">
                    </div>
                    <div class="image-display">
                        <img :src="base_url + '/zoosemy/display/keyboard.png'" alt="">
                    </div>
                </template>
            </div>
        </section>
    </article>
</template>

<script>
import BASE_URL from '@/api/config'
import HeadBackground from '@/components/article/HeadBackground'
export default {
    name: 'Lab',
    data () {
        return {
            base_url: BASE_URL + '/program',
            projectList: [{
                title: '项目一：毛玻璃音乐播放器',
                show: true
            }, {
                title: '项目二：拟物风 CSS 套件实现',
                show: true
            }]
        }
    },
    components: {
        HeadBackground
    },
}
</script>

<style lang="scss" scoped>
.container > * {
    width: 100%;
}
#lab {
    .container {
        margin: 0 auto;
        margin-top: 40px;
        font-size: 16px;
        line-height: 36px;
        letter-spacing: 2px;
        text-align: left;
        > div {
            height: 70px;
            overflow: hidden;
            transition: .2s;
            h2 {
                padding-top: 0.3em;
                cursor: pointer!important;
                display: flex;
                justify-content: space-between;
                align-items: center;
                transition: .2s;
                &:hover {
                    background: #f5f7fa;
                }
                i {
                    transition: .2s;
                }
            }
            i {
                font-weight: bold;
                margin-right: 4px;
            }
            p {
                a {
                    margin-right: 40px;
                }
            }
            div.image-display {
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                    margin: 20px;
                }
            }
        }
        > div.show {
            height: auto;
            h2 {
                i {
                    transform: rotate(90deg);
                }
            }
        }
    }
}
</style>