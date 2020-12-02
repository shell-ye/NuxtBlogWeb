<template>
    <section id="user-webside-info">
        <!-- 公告 -->
        <UserCard>
            <i class="iconfont iconyingyongzhongxin" slot="icon" style="margin-left: 4px;"></i>
            <div slot="body" class="content">
                <div class="title">编辑网站公告</div>
                <div class="row notice">
                    <label>公告内容</label>
                    <el-input v-model="notice" type="textarea"></el-input>
                    <el-button type="primary" @click="changeNotice">提交</el-button>
                </div>
            </div>
        </UserCard>
        <!-- 打字效果 -->
        <UserCard>
            <i class="iconfont iconshiwuzhongxin_zhuce" slot="icon" style="margin-left: 4px;"></i>
            <div slot="body" class="content">
                <div class="title">打字效果文字</div>
                <div class="row sentence">
                    <label>添加语句</label>
                    <el-input v-model="sentence"></el-input>
                    <el-button type="primary" icon="el-icon-plus" circle @click="sentences.push(sentence)"></el-button>
                    <el-button type="primary" icon="el-icon-s-promotion" circle @click="changeTags('sentence')"></el-button>
                </div>
                <ul>
                    <li>
                        <div>序号</div>
                        <div>内容</div>
                        <div>操作</div>
                    </li>
                    <li v-for="(item, index) in sentences" :key="index">
                        <div>{{ index }}</div>
                        <div>{{ item }}</div>
                        <div><el-button type="danger" icon="el-icon-delete" circle @click="sentences.splice(index, 1)"></el-button></div>
                    </li>
                </ul>
            </div>
        </UserCard>
        <!-- 文章标签 -->
        <UserCard>
            <i class="iconfont iconmark" slot="icon" style="margin-left: 4px;"></i>
            <div slot="body" class="content">
                <div class="title">文章标签管理</div>
                <div class="row sentence">
                    <label>添加文章标签</label>
                    <el-input v-model="tag"></el-input>
                    <el-button type="primary" icon="el-icon-plus" circle @click="tags.push(tag)"></el-button>
                    <el-button type="primary" icon="el-icon-s-promotion" circle @click="changeTags('article')"></el-button>
                </div>
                <ul>
                    <li>
                        <div>序号</div>
                        <div>内容</div>
                        <div>操作</div>
                    </li>
                    <li v-for="(item, index) in tags" :key="index">
                        <div>{{ index }}</div>
                        <div>{{ item }}</div>
                        <div><el-button type="danger" icon="el-icon-delete" circle @click="tags.splice(index, 1)"></el-button></div>
                    </li>
                </ul>
            </div>
        </UserCard>
        <!-- 笔记分类 -->
        <UserCard>
            <i class="iconfont iconjiaochengx" slot="icon" style="margin-left: 4px;"></i>
            <div slot="body" class="content">
                <div class="title">笔记分类</div>
                <div class="row sentence">
                    <label>添加分类</label>
                    <el-input v-model="notes"></el-input>
                    <el-button type="primary" icon="el-icon-plus" circle @click="notes_class.push(notes)"></el-button>
                    <el-button type="primary" icon="el-icon-s-promotion" circle @click="changeTags('notes')"></el-button>
                </div>
                <ul>
                    <li>
                        <div>序号</div>
                        <div>内容</div>
                        <div>操作</div>
                    </li>
                    <li v-for="(item, index) in notes_class" :key="index">
                        <div>{{ index }}</div>
                        <div>{{ item }}</div>
                        <div><el-button type="danger" icon="el-icon-delete" circle @click="notes_class.splice(index, 1)"></el-button></div>
                    </li>
                </ul>
            </div>
        </UserCard>
        <!-- 技能标签 -->
        <UserCard>
            <i class="iconfont iconyingyongzhongxin" slot="icon" style="margin-left: 4px;"></i>
            <div slot="body" class="content">
                <div class="title">技能标签管理</div>
                <div class="row tag">
                    <label>添加技能标签</label>
                    <el-input v-model="skill"></el-input>
                    <el-button type="primary" icon="el-icon-plus" circle @click="skill_tags.push(skill)"></el-button>
                    <el-button type="primary" icon="el-icon-s-promotion" circle @click="changeTags('skill')"></el-button>
                </div>
                <ul>
                    <li>
                        <div>序号</div>
                        <div>内容</div>
                        <div>操作</div>
                    </li>
                    <li v-for="(item, index) in skill_tags" :key="index">
                        <div>{{ index }}</div>
                        <div>{{ item }}</div>
                        <div><el-button type="danger" icon="el-icon-delete" circle @click="skill_tags.splice(index, 1)"></el-button></div>
                    </li>
                </ul>
            </div>
        </UserCard>
    </section>
</template>

<script>
import { submitNotice, webInit, submitTags } from '@/api/web'
import UserCard from '@/components/User/UserCard'
import { mapState } from 'vuex'
export default {
    name: 'UserWebsideInfo',
    data () {
        return {
            notice: '',
            sentence: '',
            sentences: [],
            tag: '',
            tags: [], 
            skill: '',
            skill_tags: [],
            notes: '',
            notes_class: []
        }
    },
    mounted () {
        this.init()
    },
    computed: {
        ...mapState({'userData': state => state.webside.userData})
    },
    methods: {
        async init () {
            let result = await webInit( this.userData.id )
            if ( result.data.code == 200 ) {
                this.notice = result.data.data.tell
                this.sentences = []
                for ( let prop in JSON.parse(result.data.data.sentences) ) {
                    this.sentences.push(JSON.parse(result.data.data.sentences)[prop])
                }
                this.tags = []
                for ( let prop in JSON.parse(result.data.data.article_tags) ) {
                    this.tags.push(JSON.parse(result.data.data.article_tags)[prop])
                }
                this.skill_tags = []
                for ( let prop in JSON.parse(result.data.data.skill_tags) ) {
                    this.skill_tags.push(JSON.parse(result.data.data.skill_tags)[prop])
                }
                this.notes_class = []
                for ( let prop in JSON.parse(result.data.data.notes_class) ) {
                    this.notes_class.push(JSON.parse(result.data.data.notes_class)[prop])
                }
            }
        },
        async changeNotice () {
            let result = await submitNotice( this.userData.id, this.notice )
            if ( result.data.code == 200 ) {
                this.init()
                this.$message({type: 'success', message: '修改公告成功'})
            }
        },
        async changeTags ( type ) {
            let tags = {}
            let arr = type == 'skill' ? this.skill_tags : type == 'article' ? this.tags : type == 'notes' ? this.notes_class : this.sentences
            for ( let prop in arr ) {
                tags[prop] = arr[prop]
            }
            let result = await submitTags( this.userData.id, type, tags )
            if ( result.data.code == 200 ) {
                this.init()
                this.$message({type: 'success', message: '提交成功'})
            }
        }
    }
} 
</script>

<style lang="scss" scoped>
#user-webside-info {
    padding-top: 60px!important;
    > div {
        margin-bottom: 100px;
    }
    div.content {
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
            label {
                width: 100px;
            }
            > div {
                max-width: 400px;
            }
        }
        div.row.notice, div.row.sentence, div.row.tag {
            > div {
                margin-right: 20px;
            }
        }
        div.row.list {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-wrap: wrap;
            p {
                padding-left: 100px;
                width: 100%;
                margin-bottom: 10px;
                span {
                    margin-right: 10px;
                    min-width: 410px;
                    display: inline-block;
                }
            }
        }
        ul {
            list-style: none;
            li {
                height: 60px;
                border-bottom: 1px solid $gray;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                padding: 0 10px;
                > div {
                    flex: 1;
                }
            }
        }
    }
}
</style>