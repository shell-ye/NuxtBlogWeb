<template>
    <section id="friend-links-manage" ref="friendLink">
        <UserCard class="friend-add">
            <i class="iconfont iconlianjie1" slot="icon" style="margin-left: 10px;"></i>
            <div slot="body" class="manage">
                <div class="title">添加友情链接</div>
                <div class="row">
                    <p>链接分类</p>
                    <el-select v-model="friend_link.select_classes" placeholder="请选择">
                        <el-option v-for="item in friend_link.classes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </div>
                <div class="row">
                    <p>网站名称</p>
                    <el-input v-model="friend_link.name" placeholder="网站名称"></el-input>
                </div>
                <div class="row">                    
                    <p>短句介绍</p>
                    <el-input v-model="friend_link.remarks" placeholder="短句介绍"></el-input>
                </div>
                <div class="row">                    
                    <p>网站地址</p>
                    <el-input v-model="friend_link.href" placeholder="网站地址"></el-input>
                </div>
                <div class="row upload-head">
                    <p>选择头像</p>
                    <label><input type="file" id="friend-head"></label>
                    <span>头像为 65px * 65px 大小的图片,文件名只能含有一个点（'.'）</span>
                </div>
                <div class="btn-list">
                    <el-button type="primary" @click="friendLinkHandler('add')">添加</el-button>
                    <el-button type="primary" @click="friendLinkHandler('reset')">重置</el-button>
                </div>
            </div>
        </UserCard>
        <UserCard head-title="友情链接" :head-content="friendLinks.length + '条'">
            <i class="iconfont iconlianjie1" slot="icon" style="margin-left: 10px;"></i>
            <div slot="body" class="manage">
                <div class="title">管理友情链接</div>
                <ul>
                    <li>
                        <div>ID</div>
                        <div>头像</div>
                        <div>名称</div>
                        <div>操作</div>
                    </li>
                    <li v-for="(item, index) in friendLinks" :key="index">
                        <div>{{ item.id }}</div>
                        <div><img :src="`${ baseUrl }/images/friendLinkImg/${ item.head_img }`" alt=""></div>
                        <div>{{ item.name }}</div>
                        <div>
                            <el-button type="primary" icon="el-icon-edit" circle></el-button>
                            <el-button type="danger" icon="el-icon-delete" circle @click="del(item.id)"></el-button>
                        </div>
                    </li>
                </ul>
            </div>
        </UserCard>
    </section>
</template>

<script>
import { mapState } from 'vuex'
import UserCard from '@/components/User/UserCard'
import { uploadFriendLink, uploadFriendHead, friendLinks, delFriendLink } from '@/api/web'
export default {
    name: 'friend-links-manage',
    data () {
        return {
            friend_link: {
                classes: [
                    { label: '漂亮的', value: 'beautiful' },
                    { label: '技术类', value: 'technology' },
                    { label: '朋友类', value: 'friend' },
                    { label: '工具类', value: 'tool' }
                ],
                select_classes: '',
                name: '',
                remarks: '',
                href: ''
            },
            baseUrl: ''
        }
    },
    mounted () {
        this.baseUrl = process.env.AXIOS_URL
        this.$store.dispatch('webside/getFriendLinks')
    },
    computed: {
        ...mapState({
            'userData': state => state.webside.userData,
            'friendLinks': state => state.webside.friend_links,
        }),
    },
    methods: {
        async friendLinkHandler ( type ) {
            let file = document.querySelector('#friend-head')
            if ( type == 'reset' ) {
                this.friend_link = {
                    classes: [
                        { label: '漂亮的', value: 'beautiful' },
                        { label: '技术类', value: 'technology' },
                        { label: '朋友类', value: 'friend' },
                        { label: '工具类', value: 'tool' }
                    ],
                    select_classes: '',
                    name: '',
                    remarks: '',
                    href: ''
                }
                file.FileList = {}
            } else if ( type == 'add' ) {
                // 信息
                let upload = this.$refs.friendLink.querySelector('#friend-head')
                if ( !upload.files[0] ) { return this.$message({ type: 'error', message: '您还未选择图片'})}
                let params = new FormData()
                params.append( 'head_img',upload.files[0] )
                params.append( 'token',this.$store.state.token )
                let file = await await uploadFriendHead( params )
                if ( file.data.code == 200 ) {
                    let result = await uploadFriendLink( this.userData.id, this.friend_link.select_classes, this.friend_link.name, this.friend_link.remarks, this.friend_link.href, file.data.headFileName )
                    if ( result.data.code == 200 ) {
                        await this.$store.dispatch('webside/getFriendLinks')
                        this.$message({
                            type: 'success',
                            message: '上传成功'
                        })
                    }
                }
            }
        },
        async del ( id ) {
            let result = await delFriendLink( this.userData.id, id )
            if ( result.data.code == 200 ) {
                this.$store.dispatch('webside/getFriendLinks')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#friend-links-manage {
    padding-top: 60px!important;
    div.friend-add {
        margin-bottom: 60px;
    }
    div.manage {
        padding-left: 20px;
        div.title {
            border-left: 5px solid $elementBlue;
            padding-left: 10px;
            margin: 20px 0;
        }
        div.row {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 20px;
            box-sizing: border-box;
            p {
                width: 100px;
            }
            > div {
                max-width: 400px;
            }
        }
        div.row.upload-head {
            span {
                color: #999;
                margin-left: 20px;
            }
            label{
                align-self: center;
                width: 88px;
                height: 36px;
                cursor: pointer;
                background: url(~@/assets/img/select_img.png);
                input{
                    width: 1px;
                    height: 1px;
                    opacity: 0;
                }
            }
        }
        .btn-list {
            width: 100%;
            display: flex;
            justify-content: flex-end;
        }
        ul {
            list-style: none;
            li {
                display: flex;
                justify-content: flex-start;
                height: 60px;
                line-height: 60px;
                border-bottom: 1px solid #ddd;
                box-sizing: border-box;
                padding: 0 10px;
                div {
                    flex: 1;
                    img {
                        width: 40px;
                        height: 40px;
                        border-radius: 50%;
                    }
                    button {
                        i {
                            margin: 0;
                        }
                    }
                }
            }
            li.no-data {
                height: 300px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                img {
                    width: 320px;
                    height: 214px;
                }
            }
        }
    }
}
</style>