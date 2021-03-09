<template>
    <nav id="nav" :class="{nav_shadow: show_shadow}">
        <!-- PC -->
        <div class="pc" v-if="!isMobile">
            <a href="/" class="logo">
                <img src="@/assets/img/logo.png" alt=""><span>夏叶博客</span>
            </a>
            <ul>
                <li><nuxt-link to="/" tag="a"><i class="iconfont iconfangzi"></i>首页</nuxt-link></li>
                <li><nuxt-link :to="{name: 'search'}" tag="a"><i class="el-icon-search"></i>搜索</nuxt-link></li>
                <li><nuxt-link :to="{name: 'categories'}" tag="a"><i class="iconfont iconshuben"></i>文章分类</nuxt-link></li>
                <li><nuxt-link to="/notes" tag="a"><i class="iconfont iconjiaochengx"></i>学习笔记</nuxt-link></li>
                <li><nuxt-link :to="{name: 'friends'}" tag="a"><i class="iconfont iconlianjie1"></i>友情链接</nuxt-link></li>
                <li><nuxt-link to="/message" tag="a"><i class="iconfont iconbi"></i>留言</nuxt-link></li>
                <li><nuxt-link :to="{name: 'author'}" tag="a"><i class="iconfont iconzuozhe"></i>关于我</nuxt-link></li>
                <li v-if="!this.userData || !this.userData.email"><nuxt-link to="/login" tag="a"><i class="iconfont iconzuozhe-"></i>登录</nuxt-link></li>
                <li v-if="this.userData && this.userData.email" class="user">
                    <nuxt-link to="/user/info" tag="a">
                        <img :src="userData.head_img" alt="" v-if="userData.head_img">
                        <img src="@/assets/img/default_head_img.png" alt="" v-else>
                        <span>{{ userData.name }}</span>
                    </nuxt-link>
                    <a @click="logout">退出</a>
                </li>
            </ul>
        </div>

        <!-- Mobile -->
        <div class="mobile" :class="{fill: mobile_user}" v-if="isMobile">
            <i class="iconfont iconcaidan-" @click="mobile_menu = true"></i>
            <a href="/" class="logo">
                <img v-if="!mobile_user" src="@/assets/img/logo.png" alt="">
                <img v-if="mobile_user" src="@/assets/img/color_logo.png" alt="">
                <span>夏叶博客</span>
            </a>
            <nuxt-link tag="i" to="/search" class="iconfont iconfangdajing"></nuxt-link>
        </div>

        <!-- Mobile Menu -->
        <el-drawer
            title="我是标题"
            :visible.sync="mobile_menu"
            direction="ltr"
            size="60%"
            :append-to-body="true"
            :with-header="false">
            <div class="mobile-menu">
                <div class="about-blog">
                    <img src="@/assets/img/color_logo.png" alt="">
                    <div class="name">本站概况</div>
					<div class="data">
						<p>
							<span>{{ webside.article_count }}</span>
							<span>文章</span>
						</p>
						<p>
							<span>{{ webside.views_count }}</span>
							<span>浏览量</span>
						</p>
						<p>
							<span>{{ webside.article_likes_count }}</span>
							<span>点赞</span>
						</p>
					</div>
                </div>
                <!-- 主菜单 -->
                <ul class="menu" @click="mobile_menu = false" v-if="!mobile_user">
                    <nuxt-link v-if="this.userData && this.userData.email" tag="li" to="/mobile/user/center"><img :src="userData.head_img" alt=""><span>{{ userData.name }}</span></nuxt-link>
                    <nuxt-link tag="li" to="/"><i class="iconfont iconfangzi"></i>首页</nuxt-link>
                    <nuxt-link tag="li" to="/search"><i class="iconfont iconfangdajing"></i>搜索</nuxt-link>
                    <nuxt-link tag="li" to="/categories"><i class="iconfont iconshuben"></i>文章分类</nuxt-link>
                    <nuxt-link tag="li" to="/friends"><i class="iconfont iconlianjie1"></i>友情链接</nuxt-link>
                    <nuxt-link tag="li" to="/author"><i class="iconfont iconzuozhe"></i>关于我</nuxt-link>
                    <nuxt-link  v-if="!this.userData || !this.userData.email" tag="li" to="/mobile/login"><i class="iconfont iconzuozhe-"></i>登录</nuxt-link>
                    <li v-if="this.userData && this.userData.email" tag="li" @click="logout"><i class="iconfont icontuichu1"></i>退出</li>
                </ul>

                <!-- 会员中心菜单 -->
                <ul class="menu" @click="mobile_menu = false" v-if="mobile_user">
                    <nuxt-link tag="li" to="/"><i class="iconfont iconfangzi"></i>首页</nuxt-link>
                    <nuxt-link tag="li" to="/mobile/user/center"><i class="iconfont iconzuozhe-"></i>个人信息</nuxt-link>
                    <nuxt-link tag="li" to="/mobile/user/likes"><i class="iconfont iconxinaixin" style="font-size: 16px; margin-right: 4px;"></i>我点赞的</nuxt-link>
                    <li v-if="this.userData && this.userData.email" tag="li" @click="logout"><i class="iconfont icontuichu1"></i>退出</li>
                </ul>
            </div>
        </el-drawer>
    </nav>
</template>

<script>
import bus from '@/bus'
import { mapState } from 'vuex'
import { log_out } from './../api/user'
export default {
    name: 'navigation',
    data () {
        return {
            // 导航阴影
            show_shadow: false,

            // 移动端侧栏
            mobile_menu: false,

            // 移动端会员中心
            mobile_user: false
        }
    },
    mounted () {
        window.addEventListener('scroll', e => {
            // window.scrollY - Chrome
            // window.pageYOffset - IE 9 + / safari
            // document.documentElement.scrollTop - IE 6 7 8
            this.show_shadow = window.scrollY || window.pageYOffset || document.documentElement.scrollTop  ? true : false
        })
        this.mobile_user = this.$route.path.indexOf('/mobile/user') != -1
    },
    computed: {
        ...mapState({
            'userData': state => state.webside.userData,
            'isMobile': state => state.webside.isMobile,
            'webside': state => state.webside.webside
        })
    },
    methods: {
        async logout () {
            this.$store.commit( 'webside/setUserData', {} )
            this.$store.commit( 'setToken', '' )
            this.$cookies.remove('token')
            if ( window.location.href.indexOf('/user') != -1 ) { this.$router.push('/') }
        }
    }
}
</script>

<style lang="scss" scoped>
$height: 50px;
#nav{
    z-index: 3;
    position: fixed;
    top: 0;
    width: 100%;
    transition: .2s;
    div.pc {
        display: flex;
        justify-content: space-between;
        height: $height;
        padding: 0 40px;
        a.logo {
            height: $height;
            outline: none;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
                color: white;
                font-size: 30px;
                margin-left: 20px;
                margin-top: -4px;
            }
        }
        ul {
            display: flex;
            justify-content: flex-start;
            line-height: $height;
            li{
                width: 120px;
                text-align: center;
                display: flex;
                justify-content: center;
                color: white;
                position: relative;
                &:hover{
                    div.arrow{ display: block;}
                    div.list.notes{ height: calc( 4 * 40px );}
                }
                a{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    height: 100%;
                    text-align: center;
                    line-height: $height;
                    color: white;
                    outline: none;
                    transition: .2s;
                    &:hover{
                        color: black;
                        animation: shake 1s .2s ease both infinite;
                    }
                    i{ margin-right: 4px;}
                    img{
                        width: 24px;
                        height: 24px;
                        border-radius: 12px;
                        margin-right: 6px;
                    }
                }
                div.arrow{
                    width: 0;
                    height: 0;
                    border: 10px solid white;
                    border-color: transparent transparent white transparent;
                    position: absolute;
                    top: 40px;
                    display: none;
                    transition: .2s;
                }
                div.list{
                    height: 0;
                    position: absolute;
                    overflow: hidden;
                    background: white;
                    width: 100%;
                    color: black;
                    text-align: center;
                    top: 60px;
                    border-radius: 8px;
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    transition: .2s;
                    p{
                        width: 100%;
                        text-align: center;
                        height: 40px;
                        line-height: 40px;
                        transition: .2s;
                        cursor: pointer;
                        display: flex;
                        justify-content: left;
                        align-items: center;
                        padding-left: 24px;
                        &:hover{
                            background: $gray;
                        }
                        svg{
                            width: 16px;
                            height: 16px;
                            margin-right: 4px;
                            margin-left: -6px;
                        }
                    }
                }
            }
            li.user {
                width: auto;
                a {
                    &:first-child {
                        width: auto;
                        margin-right: 10px;
                    }
                }
            }
        }
    }
    div.mobile {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-sizing: border-box;
        padding: 16px;
        a.logo {
            color: white;
            display: flex;
            justify-content: center;
            font-size: 20px;
            img {
                width: 24px;
                height: 24px;
                margin-right: 10px;
            }
        }
        i {
            font-size: 24px;
            color: white;
        }
    }
    div.mobile.fill {
        // background: white;
        background: rgba(171, 171, 171, .2)!important;
        box-shadow: 0 4px 4px rgba(0,21,41,.08);
        * {
            color: black!important;
        }
    }
} 
.mobile-menu {
    div.about-blog {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        align-items: center;
        text-align: center;
        background-image: linear-gradient(to right,#0bb7fbd6 0,#0e91d0 100%);
        padding: 20px 0;
        color: white;
        img {
            width: 64px;
            height: 64px;
        }
        .name {
            font-size: 20px;
            margin: 20px 0px 20px 0px;
        }
        .data {
            width: 100%;
            display: flex;
            justify-content: center;
            p {
                display: flex;
                flex-direction: column;
                &:nth-child(2) {
                    margin: 0px 40px;
                }
                span {
                    &:first-child {
                        margin-bottom: 10px;
                        font-size: 20px;
                    }
                }
            }
        }
    }
    ul.menu {
        width: 100%;
        li {
            width: 100%;
            box-sizing: border-box;
            padding-left: 20px;
            height: 40px;
            line-height: 40px;
            i {
                margin-right: 10px;
                font-size: 20px;
                align-items: center;
            }
            img {
                width: 24px;
                height: 24px;
                border-radius: 50%;
                margin-right: 6px;
            }
        }
    }
}

#nav.nav_shadow{ 
    background: rgba(171, 171, 171, .3);
    backdrop-filter: saturate(300%) blur(10px);
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2); 
}

// IE 不支持毛玻璃效果
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
    #nav.nav_shadow{ 
        background: rgba(171, 171, 171, .9)!important;
    }
}
</style>
