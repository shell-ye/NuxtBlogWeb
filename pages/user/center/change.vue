<template>
    <section class="user-center-change" ref="changeUserInfo">
        <UserCard>
            <i class="iconfont iconjurassic_role" slot="icon"></i>
            <div slot="body" class="info">
                <div class="title">修改信息</div>
                <div class="row heads">
                    <label>头像:</label>
                    <img src="@/assets/img/default_head_img.png" alt="" class="head-img" ref="head_img" v-if="!userData.head_img">
                    <img :src="userData.head_img" alt="" class="head-img" ref="head_img" v-if="userData.head_img">
                    <label class="head"><input type="file" ref="file" @input="selectHead($event)"></label>
                    <label class="head upload" @click="upLoadUserHead">上传</label>
                </div>
                <div class="row">
                    <label>昵称:</label>
                    <DownLineInput v-model="user.name" placeholder="元芳，你叫啥"></DownLineInput>
                </div>
                <div class="row">
                    <label>签名:</label>
                    <DownLineInput v-model="user.saying" placeholder="说点啥"></DownLineInput>
                </div>
                <div class="row">
                    <label>QQ:</label>
                    <DownLineInput v-model="user.qq" placeholder="企鹅账号"></DownLineInput>
                </div>
                <div class="row">
                    <label>Git:</label>
                    <DownLineInput v-model="user.git"  placeholder="大佬的github"></DownLineInput>
                </div>
                <div class="row">
                    <label>微博:</label>
                    <DownLineInput v-model="user.weibo" placeholder="微博观天下"></DownLineInput>
                </div>
                <div class="row">
                    <label>B站空间:</label>
                    <DownLineInput v-model="user.bilibili" placeholder="小破站空间"></DownLineInput>
                </div>
                <div class="btn-list">
                    <el-button type="primary" @click="submitHandler('submit')">提交</el-button>
                    <el-button type="primary" @click="submitHandler('reset')">重置</el-button>
                </div>
            </div>
        </UserCard>
    </section>
</template>

<script>
import UserCard from '@/components/User/UserCard'
import DownLineInput from '@/components/Form/DownLineInput'
import { upload_head_img, update_user_info } from '@/api/user'
import { mapState } from 'vuex'
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
            }
        }
    },
    components: {
        UserCard, DownLineInput
    },
    computed: {
        ...mapState({
            'userData': state => state.webside.userData
        })
    },
    mounted () {
        this.user.name = this.userData.name
        this.user.saying = this.userData.saying
        this.user.qq = this.userData.qq
        this.user.git = this.userData.git
        this.user.weibo = this.userData.weibo
        this.user.bilibili = this.userData.bilibili
    },
    methods: {
        selectHead ( e ) {
            if ( e.target.files[0] ) {
                if ( e.target.files[0].name.match(/\./g).length != 1 ) {
                    this.$message({
                        type: 'error',
                        message: '文件名不符合要求'
                    })
                    e.target.value = ''
                    return
                } else if ( ['jpg','jpeg','png','gif'].indexOf(e.target.files[0].name.split('.')[1]) == -1 ) {
                    this.$message({
                        type: 'error',
                        message: '文件格式不对'
                    })
                    e.target.value = ''
                    return
                } else {
                    this.$refs.head_img.onload = () => {
                        let rect = this.clacImgZoomParam(100, 100, this.$refs.head_img.offsetWidth, this.$refs.head_img.offsetHeight)
                        this.$refs.head_img.width = rect.width
                        this.$refs.head_img.height = rect.height
                        this.$refs.head_img.style.marginTop = rect.top + 'px'
                    }
                    let reader = new FileReader()
                    reader.onload = e => {
                        this.$refs.head_img.src = e.target.result
                    }
                    reader.readAsDataURL(this.$refs.file.files[0])
                }
            }
        },
        async upLoadUserHead () { 
            if ( !this.$refs.file.files[0] ) { return this.$message({ type: 'error', message: '您还未选择图片'})}
            let params = new FormData()
            params.append( 'head_img', this.$refs.file.files[0] )
            let result = await upload_head_img( params, this.userData.email )
            if ( result.data.code == 200 ) {
                this.$store.commit('webside/setUserData', result.data.data)
                this.$message({ message: '更换成功'})
                window.location.reload()
            }
        },
        async submitHandler ( type ) {
            if ( type == 'reset' ) {
                this.user = {
                    name: '',
                    saying: '',
                    qq: '',
                    git: '',
                    weibo: '',
                    bilibili: '',
                }
            } else if ( type == 'submit' ) {
                let result = await update_user_info(this.$store.state.token, this.userData.id, this.user.name, this.user.saying, this.user.qq, this.user.git, this.user.weibo, this.user.bilibili)
                if ( result.data.code == 200 ) {
                    this.$store.commit('webside/setUserData', result.data.data)
                    this.$message({ message: '更换成功'})
                }
            }
        },

        // 改变图片尺寸
        clacImgZoomParam ( maxWidth, maxHeight, width, height ) {
            let param = { top: 0, left: 0, width: width, height: height }
            if ( width > maxWidth || height > maxHeight ) {
                let rateWidth = width / maxWidth
                let rateHeight = height / maxHeight

                if ( rateWidth > rateHeight ) {
                    param.width = maxWidth
                    param.height = Math.round( height / rateWidth )
                } else {
                    param.width = Math.round( width / rateHeight )
                    param.height = maxHeight
                }
            }
            param.left = Math.round((maxWidth - param.width) / 2)
            param.top = Math.round((maxHeight - param.height) / 2)
            return param
        }
    }
}
</script>

<style lang="scss" scoped>
.user-center-change {
    > div {
        &:first-child {
            margin-top: 60px;
        }
        div.info {
            padding-left: 20px;
            div.title {
                border-left: 5px solid $elementBlue;
                padding-left: 10px;
                margin: 20px 0;
            }
            div.row {
                font-size: 18px;
                margin-bottom: 10px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                label{
                    width: 100px;
                }
                label.head {
                    background: url(~@/assets/img/select_img.png);
                    width: 88px;
                    height: 36px;
                    cursor: pointer;
                    margin-right: 20px;
                    input {
                        width: 1px;
                        height: 1px;
                        opacity: 0;
                    }
                }
                label.upload {
                    color: white;
                    font-size: 14px;
                    width: 88px;
                    height: 36px;
                    line-height: 36px;
                    text-align: center;
                    background: #409fff;
                    border-radius: 4px;
                    display: inline-block;
                }
                span {
                    margin-right: 100px;
                }
                div {
                    width: 700px;
                }
                img {
                    width: 100px;
                    height: 100px;
                    border-radius: 4px;
                    border: 1px dashed #999;
                    margin-right: 10px;
                }
            }
            div.row.heads {
                align-items: flex-end!important;
            }
            div.btn-list {
                width: 100%;
                display: flex;
                justify-content: flex-end;
            }
        }
    }
}
</style>