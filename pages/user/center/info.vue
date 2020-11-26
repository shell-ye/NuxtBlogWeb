<template>
    <section id="user-center">
        <div class="head-info">
            <UserCard size="small" head-title="已注册" :head-content="registerDays + '天'">
                <i class="iconfont iconshiwuzhongxin_zhuce" slot="icon"></i>
                <div slot="info">注册时间： {{ userData.register_time.substr(0, 10) }}</div>
            </UserCard>
            <UserCard size="small" head-title="点赞" :head-content="likesList.length + '次'">
                <i class="iconfont iconzanpress" slot="icon"></i>
                <div slot="info">总文章数： {{ webside.article_count }} 篇</div>
            </UserCard>
            <UserCard size="small" head-title="浏览" :head-content="userData.looked + '次'">
                <i class="iconfont iconliulan" slot="icon"></i>
                <div slot="info">总浏览量： {{ webside.views_count }} 次</div>
            </UserCard>
            <UserCard size="small" head-title="打赏金额" :head-content="0 + '元'">
                <i class="iconfont iconqian" slot="icon"></i>
                <div slot="info">功能开发中，敬请期待...</div>
            </UserCard>
        </div>
        <UserCard head-title="点赞文章列表" :head-content="likesList.length + '篇'" class="article-list">
            <i class="iconfont iconbiaoti" slot="icon"></i>
            <ul slot="body">
                <li>
                    <div><i class="iconfont iconmark"></i>序号</div>
                    <div><i class="iconfont iconbiaoti"></i>文章标题</div>
                    <div><i class="iconfont icontime"></i>点赞时间</div>
                    <div><i class="iconfont iconcaozuo"></i>操作</div>
                </li>
                <li v-for="(item, index) in likesList" :key="index" v-if="likesList.length">
                    <div>{{ index }}</div>
                    <div>{{ item.title }}</div>
                    <div>{{ item.time.substr(0, 10) }}</div>
                    <div>
                        <el-button type="primary" circle @click="$router.push('/article/' + item.article_id)">
                            <i class="iconfont iconliulan"></i>
                        </el-button>
                        <el-button type="danger" icon="el-icon-delete" circle @click="dislike(item.article_id)"></el-button>
                    </div>
                </li>
                <li v-if="!likesList.length" class="no-data">
                    <img src="@/assets/img/no-data.jpg" alt="">
                    <el-button type="primary" @click="$router.push('/categories')">去长知识</el-button>
                </li>
            </ul>
        </UserCard>
    </section>
</template>

<script>
import { mapState } from'vuex'
import { timeDifference } from '@/utils'
import { article_user_like, article_like } from '@/api/article'
import UserCard from '@/components/User/UserCard'
export default {
    name: 'user-center',
    async asyncData ({ store }) {
        let likes = await article_user_like( 1, store.state.webside.userData.id )
        if ( likes.data.code == 200 ) {
            return {
                likesList: likes.data.data
            }
        }
    },
    data () {
        return {
            likesList: []
        }
    },
    mounted () {
        
    },
    computed: {
        ...mapState({
            'userData': state => state.webside.userData,
            'webside': state => state.webside.webside
        }),
        registerDays () {
            return timeDifference( 'd', new Date(), this.userData.register_time )
        }
    },
    components: {
        UserCard
    },
    methods: {
        async dislike ( id ) {
            let result = await article_like( 2, id, false, this.userData.id )
            if ( result.data.code == 200 ) {
                this.getUserLikes()
            }
        },
        async getUserLikes () {
            let result = await article_user_like( 1, this.userData.id )
            if ( result.data.code == 200 ) {
                this.likesList = result.data.data
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#user-center {
    .head-info {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 60px;
        > div {
            width: 22%;
        }
    }
    .article-list {
        margin-top: 100px;
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