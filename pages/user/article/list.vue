<template>
    <section id="user-article-list">
        <UserCard head-title="文章列表" :head-content="article_list.length + '篇'">
            <i class="iconfont iconliebiao" slot="icon"></i>
            <ul slot="body">
                <li>
                    <div><i class="iconfont iconid"></i>文章ID</div>
                    <div><i class="iconfont iconbiaoti"></i>文章标题</div>
                    <div><i class="iconfont iconfenlei-active"></i>文章分类</div>
                    <div><i class="iconfont iconzanpress"></i>点赞次数</div>
                    <div><i class="iconfont iconliulan"></i>浏览次数</div>
                    <div><i class="iconfont icontime"></i>创建时间</div>
                    <div><i class="iconfont icontime"></i>更新时间</div>
                    <div><i class="iconfont iconcaozuo"></i>操作</div>
                </li>
                <li v-for="(item,index) in article_list" :key="item.id" v-if="article_list && article_list.length">
                    <div>{{ item.id }}</div>
                    <div>{{ item.title }}</div>
                    <div>{{ item.skill_tag }}</div>
                    <div>{{ item.likes_count }}</div>
                    <div>{{ item.view_count }}</div>
                    <div>{{ item.publish_time | timeDate }}</div>
                    <div>{{ item.update_time | timeDate }}</div>
                    <div>
                        <el-button type="primary" icon="el-icon-edit" circle @click="update( item.id )"></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle @click="delDia( index )"></el-button>
                    </div>
                </li>
                <li class="page" v-if="article_list && article_list.length"><el-input-number v-model="pages" size="small" :min="1" :max="max_page" label="描述文字"></el-input-number></li>
            </ul>
        </UserCard>
        <Dialog :show="delDialog" @cancel="delDialog = false" @confirm="del" confirmBtnType="danger">
            <p style="margin: 10px auto">确定要删除这篇文章吗？</p>
        </Dialog>
    </section>
</template>

<script>
import UserCard from '@/components/User/UserCard'
import Dialog from '@/components/UI/Dialog'
import { article_list, article_delete } from '@/api/article'
import { mapState } from 'vuex'
export default {
    name: 'UserArticleList',
    data () {
        return {
            article_list: [],
            pages: 1,
            article_tags: '全部',
            max_page: 10,
            delDialog: false,
            outIndex: 0
        }
    },
    mounted () {
        this.list()
    },
    computed: {
        ...mapState({
            'userData': state => state.webside.userData
        })
    },
    watch: {
        pages () {
            this.list()
        }
    },
    components: {
        Dialog
    },
    methods: {
        async list () {
            let result = this.article_tags != '全部' ? await article_list( 2, this.pages, 10, this.article_tags ) : await article_list( 1, this.pages, 10 )
            if ( result.data.code == 200 ) {
                this.article_list = result.data.data
                this.max_page = Math.ceil( result.data.pages_info.count / 12 )
                if ( !this.article_list || !this.article_list.length ) {
                    this.pages = 1
                }
            }
        },
        update ( id ) {
            this.$router.push({path: '/user/article/publish', query: {id}})
        },
        delDia ( index ) {
            this.outIndex = index
            this.delDialog = true
        },
        async del () {
            let result = await article_delete( this.userData.id, this.article_list[this.outIndex].id )
            if ( result.data.code == 200 ) {
                this.list()
                this.$message({type: 'success', message: '删除成功'})
                this.delDialog = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#user-article-list {
    padding-top: 60px!important;
    ul {
        list-style: none;
        width: 100%;
        li {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            height: 60px;
            border-bottom: 1px solid $gray;
            div {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 12.5%;
                min-width: 100px;
                text-align: center;
                &:nth-child(2){ min-width: 300px;}
                &:last-child{ min-width: 200px;}
            }
        }
        li.page {
            justify-content: center;
            border-bottom: none;
        }
    }
}
</style>