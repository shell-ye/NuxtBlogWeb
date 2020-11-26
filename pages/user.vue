<template>
    <article id="user">
        <aside>
            <div class="bar">
                <nuxt-link tag="div" to="/" class="head">
                    <img src="@/assets/img/color_logo.png" alt="">
                    <span>夏叶博客</span>
                </nuxt-link>
                <ul>
                    <nuxt-link to="/user/center" tag="li" class="head" @click.native="userInfoDropdown = !userInfoDropdown" :class="{open: userInfoDropdown}">
                        <img :src="userData.head_img" alt="" v-if="userData.head_img">
                        <img src="@/assets/img/default_head_img.png" alt="" v-else>
                        <span>{{ userData.name }}</span>
                        <i class="el-icon-caret-bottom"></i>
                    </nuxt-link>
                    <div class="webside-panel" :class="{close: !userInfoDropdown}">
                        <nuxt-link tag="li" to="/user/center/info"><i class="iconfont iconyingyongzhongxin"></i>账号中心</nuxt-link>
                        <nuxt-link tag="li" to="/user/center/change"><i class="iconfont iconlianjie1" v-if="userData.admin == 1"></i>修改信息</nuxt-link>
                    </div>
                    <nuxt-link tag="li" to="/user/article" @click.native="articleDropdown = !articleDropdown" :class="{open: articleDropdown}">
                        <i class="iconfont iconshuben" v-if="userData.admin == 1"></i>
                        文章管理
                        <i class="el-icon-caret-bottom"></i>
                    </nuxt-link>
                    <div class="webside-panel" :class="{close: !articleDropdown}">
                        <nuxt-link tag="li" to="/user/article/list"><i class="iconfont iconliebiao" v-if="userData.admin == 1"></i>文章列表</nuxt-link>
                        <nuxt-link tag="li" to="/user/article/publish"><i class="iconfont iconbi" v-if="userData.admin == 1"></i>发布文章</nuxt-link>
                    </div>
                    <nuxt-link tag="li" to="/user/webside" @click.native="websideDropdowm = !websideDropdowm" :class="{open: websideDropdowm}">
                        <i class="iconfont iconwangzhan" v-if="userData.admin == 1"></i>
                        网站管理
                        <i class="el-icon-caret-bottom"></i>
                    </nuxt-link>
                    <div class="webside-panel" :class="{close: !websideDropdowm}">
                        <nuxt-link tag="li" to="/user/webside/info"><i class="iconfont iconyingyongzhongxin" v-if="userData.admin == 1"></i>网站信息</nuxt-link>
                        <nuxt-link tag="li" to="/user/webside/friends"><i class="iconfont iconlianjie1" v-if="userData.admin == 1"></i>友情链接</nuxt-link>
                    </div>
                </ul>
            </div>
            <div class="switch"></div>
        </aside>
        <nuxt />
    </article>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'user',
    data () {
        return {
            userInfoDropdown: false,
            websideDropdowm: false,
            articleDropdown: false
        }
    },
    mounted () {
        if ( JSON.stringify(this.$store.state.webside.userData) == '{}' ) {
            this.$message({
                type: 'error',
                message: '请先登录'
            })
            this.$router.push('/login')
        }
    },
    watch: {
        userInfoDropdown () {
            if ( this.userInfoDropdown ) {
                this.websideDropdowm = false
                this.articleDropdown = false
            }
        },
        websideDropdowm () {
            if ( this.websideDropdowm ) {
                this.userInfoDropdown = false
                this.articleDropdown = false
            }
        },
        articleDropdown () {
            if ( this.articleDropdown ) {
                this.userInfoDropdown = false
                this.websideDropdowm = false
            }
        }
    },
    computed: {
        ...mapState({
            'userData': state => state.webside.userData
        })
    }
}
</script>

<style lang="scss" scoped>
#user {
    position: relative;
    display: flex;
    justify-content: flex-start;
    aside {
        height: 100vh;
        width: 260px;
        position: fixed;
        background-image: url(~@/assets/img/user_side.jpg);
        background-size: cover;
        box-shadow: 0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
        .bar {
            width: 100%;
            height: 100%;
            background: rgba($color: #000000, $alpha: 0.8);
            box-sizing: border-box;
            padding: 0 20px;
            div.head {
                height: 60px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                font-size: 24px;
                color: white;
                letter-spacing: 4px;
                cursor: pointer;
                border-bottom: 1px solid $gray;
                padding-bottom: 8px;
                img {
                    width: 40px;
                    height: 40px;
                    margin-right: 20px;
                }
            }
            ul {
                list-style: none;
                li {
                    width: 100%;
                    position: relative;
                    text-align: left;
                    color: white;
                    cursor: pointer;
                    font-size: 16px;
                    height: 50px;
                    margin-top: 20px;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    font-weight: normal;
                    padding: 10px;
                    box-sizing: border-box;
                    border-radius: 4px;
                    transition: .2s;
                    img {
                        width: 24px;
                        height: 24px;
                        margin-right: 10px;
                        border-radius: 50%;
                    }
                    i {
                        font-size: 24px;
                        margin-right: 10px;
                    }
                    i.el-icon-caret-bottom {
                        position: absolute;
                        right: 22px;
                        font-size: 18px;
                        transition: .2s ease-in;
                    }
                }
                li.nuxt-link-active {
                    background: rgba(200, 200, 200, 0.2)!important;
                }
                li.nuxt-link-exact-active {
                    background: #ff9800!important;
                }
                li.head {
                    background: none;
                }
                li.open {
                    i {
                        &:last-child {
                            transform: rotateZ(180deg) translateY(-2px);
                        }
                    }
                }
                div.webside-panel {
                    max-height: 200px;
                    overflow: hidden;
                    transition: .2s ease-in;
                    li.nuxt-link-active {
                        background: #ff9800!important;
                    }
                }
                div.webside-panel.close {
                    max-height: 0;
                }
            }
        }
        .switch {

        }
    }
    section {
        width: calc( 100% - 260px );
        height: 100%;
        min-height: 100vh;
        background: #eee;
        position: relative;
        left: 260px;
        box-sizing: border-box;
        padding: 20px;
    }
}
</style>