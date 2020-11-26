Skip to content
Search or jump to…

Pull requests
Issues
Marketplace
Explore
 
@shell-ye 
shell-ye
/
blog
1
🔖 Custom notification settings
Looking for a little more control? Now you can choose which types of activity you’d like to be notified about per repository.

00
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
Settings
blog/blog/src/views/Mobile/Login/index.vue
@shell-ye
shell-ye 移动端登录
Latest commit 312e328 on 12 Oct
 History
 1 contributor
124 lines (122 sloc)  3.4 KB
  
<template>
    <article id="mobile-login">
        <section class="body">
            <div class="title">登录</div>
            <div class="input">
                <i class="iconfont iconzuozhe-"></i>
                <input type="text" placeholder="请输入邮箱" v-model="user">
            </div>
            <div class="input">
                <i class="iconfont iconsuo"></i>
                <input type="password" placeholder="请输入密码" v-model="password">
            </div>
            <div class="operation">
                没有账号？<router-link tag="a" to="/mobile/register">立即注册</router-link>
            </div>
            <button @click="login">登录</button>
        </section>
        <section class="balck"></section>
    </article>
</template>

<script>
import { user_login } from '@/api/user'
export default {
    name: 'MobileLogin',
    data () {
        return {
            user: '',
            password: ''
        }
    },
    methods: {
        async login () {
            if ( !this.user || !this.password ) {
                this.$message({
                    type: 'error',
                    messgae: '请将信息输入完整'
                })
            } else {
                let result = await user_login( this.user, this.password )
                if ( result.data.code == 200 ) {
                    this.$message({
                        type: 'success',
                        message: '登录成功'
                    })
                    this.$store.commit( 'webside/setUserData', result.data.data )
                    this.$router.go(-1)
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#mobile-login {
    div, button, input, a {
        font-family: "Microsoft Yahei"!important;
    }
    color: white;
    width: 100%;
    height: 100vh;
    background-image: url(~@/assets/img/mobile_login.jpg);
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    section.body {
        z-index: 2;
        width: 100%;
        height: 60%;
        margin-top: 60px;
        > * {
            width: 90%;
            margin: 20px auto;
        }
        div.title {
            text-align: center;
            margin-bottom: 40px;
            font-size: 18px;
        }
        div.input {
            height: 40px;
            display: flex;
            justify-content: center;
            position: relative;
            input {
                color: white;
                width: 100%;
                background: transparent;
                border-color: transparent transparent white transparent;
                padding-left: 30px;
                // &:focus {
                //     border-color: transparent transparent rgb(73, 125, 254) transparent;
                // }
            }
            i {
                position: absolute;
                left: 0;
                transform: translateY(10px);
                font-size: 22px;
            }
        }
        button {
            height: 40px;
            border-radius: 20px;
            background: white;
            color: black;
            box-shadow: 0 0 10px gray;
            margin-left: 5%;
            border: none;
        }
    }
    section.balck {
        z-index: 1;
        width: 100%;
        height: 100vh;
        position: absolute;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, .2);
    }
}
</style>
© 2020 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
Pricing
API
Training
Blog
About
