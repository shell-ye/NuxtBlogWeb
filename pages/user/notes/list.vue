<template>
    <section id="user-article-list">
        <UserCard head-title="文章列表" :head-content="notes_list.length + '篇'">
            <i class="iconfont iconliebiao" slot="icon"></i>
            <ul slot="body">
                <li>
                    <div><i class="iconfont iconid"></i>文章ID</div>
                    <div><i class="iconfont iconbiaoti"></i>文章标题</div>
                    <div><i class="iconfont icontime"></i>创建时间</div>
                    <div><i class="iconfont icontime"></i>更新时间</div>
                    <div><i class="iconfont iconcaozuo"></i>操作</div>
                </li>
                <li v-for="(item,index) in notes_list" :key="item.id" v-if="notes_list && notes_list.length">
                    <div>{{ item.id }}</div>
                    <div>{{ item.title }}</div>
                    <div>{{ item.publish_time | timeDate }}</div>
                    <div>{{ item.update_time | timeDate }}</div>
                    <div>
                        <el-button type="primary" icon="el-icon-edit" circle @click="update( item.id )"></el-button>
                        <el-button type="danger" icon="el-icon-delete" circle @click="delDia( index )"></el-button>
                    </div>
                </li>
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
import { getNoteList, delNote } from '@/api/notes'
import { mapState } from 'vuex'
export default {
    name: 'UserNoteList',
    data () {
        return {
            notes_list: [],
            article_tags: '全部',
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
    components: {
        Dialog
    },
    methods: {
        async list () {
            let result = await getNoteList()
            if ( result.data.code == 200 ) {
                this.notes_list = result.data.data
            }
        },
        update ( id ) {
            this.$router.push({path: '/user/notes/publish', query: {id}})
        },
        delDia ( index ) {
            this.outIndex = index
            this.delDialog = true
        },
        async del () {
            let result = await delNote( this.userData.id, this.notes_list[this.outIndex].id )
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
                flex: 1;
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