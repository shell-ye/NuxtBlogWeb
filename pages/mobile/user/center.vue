<template>
    <article id="mobile-user-center">
        <h2>个人信息</h2>
        <div class="row head">
            <label>头像</label>
            <img :src="userData.head_img" alt="" v-if="userData.head_img">
            <img src="@/assets/img/default_head_img.png" alt="" v-else>
            <span>支持 .jpg .jpeg .png .gif 格式 500kb 以内的图片</span>
            <label class="head"><input type="file" @change="change($event)"></label>
        </div>
        <div class="row">
            <label>昵称</label>
            <input type="text" placeholder="尊姓大名" v-model="user.name">
        </div>
        <div class="row">
            <label>签名</label>
            <input type="text" placeholder="说点啥" v-model="user.saying">
        </div>
        <div class="row">
            <label>QQ</label>
            <input type="text" placeholder="企鹅账号" v-model="user.qq">
        </div>
        <div class="row">
            <label>Github</label>
            <input type="text" placeholder="大佬的 github" v-model="user.git">
        </div>
        <div class="row">
            <label>微博</label>
            <input type="text" placeholder="微博观天下" v-model="user.weibo">
        </div>
        <div class="row">
            <label>Bilibili</label>
            <input type="text" placeholder="小破站空间" v-model="user.bilibili">
        </div>
        <div class="row btn-list">
            <el-button type="primary" @click="submit">保存</el-button>
            <el-button type="danger" @click="reset">重置</el-button>
        </div>
    </article>
</template>

<script>
import { mapState } from 'vuex'
import { upload_head_img, update_user_info } from '@/api/user'
export default {
    data () {
        return {
            user: {
                name: '',
                saying: '',
                qq: '',
                git: '',
                weibo: '',
                bilibili: '',
            },
        }
    },
    mounted () {
        this.user.name = this.userData.name
        this.user.saying = this.userData.saying
        this.user.qq = this.userData.qq
        this.user.git = this.userData.git
        this.user.weibo = this.userData.weibo
        this.user.bilibili = this.userData.bilibili
    },
    computed: {
        ...mapState({
            'userData': state => state.webside.userData
        })
    },
    methods: {
        reset () {
            this.user = {
                name: '',
                saying: '',
                qq: '',
                git: '',
                weibo: '',
                bilibili: '',
            }
        },
        async submit () {
            let result = await update_user_info(this.$store.state.webside.token, this.userData.id, this.user.name, this.user.saying, this.user.qq, this.user.git, this.user.weibo, this.user.bilibili)
            if ( result.data.code == 200 ) {
                this.$store.commit('webside/setUserData', result.data.data)
                this.$message({ message: '更换成功'})
            }
        },
        async change ( e ) {
            let params = new FormData()
            params.append( 'head_img', e.target.files[0] )
            params.append( 'token', this.$store.state.webside.token )
            let result = await upload_head_img( params, this.userData.email )
            if ( result.data.code == 200 ) {
                this.$store.commit('webside/setUserData', result.data.data)
                this.$message({ message: '更换成功'})
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#mobile-user-center {
    background: white;
    padding-top: 60px;
    > * {
        width: 90%;
        margin: 0 auto;
    }
    h2 {
        font-size: 26px;
        line-height: 60px;
        border-bottom: 1px solid $gray;
    }
    div.row {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        position: relative;
        padding: 20px 0;
        border-bottom: 1px solid $gray;
        label {
            width: 60px;
        }
        input {
            height: 40px;
            width: 100%;
            border: none;
            padding-left: 20px;
            &::placeholder {
                color: $gray;
            }
        }
    }
    div.btn-list {
        justify-content: space-between;
    }
    div.head {
        img {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            margin: 0 10px;
        }
        > span {
            font-size: 12px;
            color: $gray;
        }
        label.head {
            height: 26px;
            width: 100px;
            background-image: url(~@/assets/img/select_img.png) ;
            background-repeat: no-repeat;
            background-size: cover;
            input {
                opacity: 0;
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>