<template>
    <section id="user-article-write">
        <UserCard :head-title="type == 'write' ? '写文章' : '修改文章'">
            <i class="iconfont iconbi" slot="icon"></i>
            <div class="content" slot="body">
                <div class="row">
                    <label>文章标题：</label>
                    <el-input v-model="article.title"></el-input>
                </div>
                <div class="row">
                    <label>文章图片：</label>
                    <el-select v-model="article.article_img" placeholder="请选择">
                        <el-option v-for="item in article_info.article_tags" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </div>
                <div class="row">
                    <label>技能标签：</label>
                    <el-select v-model="article.skill_tag" placeholder="请选择">
                        <el-option v-for="item in article_info.skill_tags" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </div>
                <div class="row categories">
                    <label>文章分类：</label>
                    <el-checkbox v-for="item in article_info.article_tags" :key="item" v-model="article.article_tags" :label="item" border size="medium"></el-checkbox>
                </div>
                <div class="row description">
                    <label>描述信息：</label>
                    <el-input type="textarea" v-model="article.description"></el-input>
                </div>
                <no-ssr><mavon-editor :toolbars="markdownOption" v-model="article.content" @change="changeData" /></no-ssr>
                <div class="btn-lsit">
                    <el-button type="primary" @click="submit">发布</el-button>
                    <el-button @click="clearDialog = true">清空</el-button>
                </div>
            </div>
        </UserCard>
        <Dialog :show="clearDialog" @cancel="clearDialog = false" @confirm="clear" confirmBtnType="danger">
            <p style="margin: 10px auto">确定要清空所有内容吗？</p>
        </Dialog>
    </section>
</template>

<script>
import { mavonEditor } from "mavon-editor"
import "mavon-editor/dist/css/index.css"
import Dialog from '@/components/UI/Dialog'
import UserCard from '@/components/User/UserCard'
import { article_add, article_update, article_search } from '@/api/article'
import { mapState } from 'vuex'
export default {
    name: 'UserArticleWrite',
    data () {
        return {
            type: 'write',
            article_info: {
                article_tags: [],
                skill_tags: []
            },
            article: {
                title: '',
                article_img: '',
                skill_tag: '',
                article_tags: [],
                description: '',
                content: '',
                html_content: ''
            },
            clearDialog: false,

            // markdown-editor
            markdownOption: {
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                underline: true, // 下划线
                strikethrough: true, // 中划线
                mark: true, // 标记
                superscript: true, // 上角标
                subscript: true, // 下角标
                quote: true, // 引用
                ol: true, // 有序列表
                ul: true, // 无序列表
                link: true, // 链接
                imagelink: true, // 图片链接
                code: true, // code
                table: true, // 表格
                fullscreen: true, // 全屏编辑
                readmodel: true, // 沉浸式阅读
                htmlcode: true, // 展示html源码
                help: true, // 帮助
                /* 1.3.5 */
                undo: true, // 上一步
                redo: true, // 下一步
                trash: true, // 清空
                save: true, // 保存（触发events中的save事件）
                /* 1.4.2 */
                navigation: true, // 导航目录
                /* 2.1.8 */
                alignleft: true, // 左对齐
                aligncenter: true, // 居中
                alignright: true, // 右对齐
                /* 2.2.1 */
                subfield: true, // 单双栏模式
                preview: true, // 预览
            } 
        }
    },
    mounted () {
        for ( let prop in JSON.parse(this.webside.article_tags) ) {
            this.article_info.article_tags.push(JSON.parse(this.webside.article_tags)[prop])
        }
        for ( let prop in JSON.parse(this.webside.skill_tags) ) {
            this.article_info.skill_tags.push(JSON.parse(this.webside.skill_tags)[prop])
        }
        if ( this.$route.query.id ) {
            this.type = 'change'
            this.search()
        } else {
            this.type = 'write'
        }
    },
    computed: {
        ...mapState({
            'userData': state => state.webside.userData,
            'webside': state => state.webside.webside
        })
    },
    components: {
        mavonEditor
    },
    methods: {
        async search () {
            let result = await article_search( 1, this.$route.query.id )
            if ( result.data.code == 200 ) {
                this.article.title = result.data.data.title
                this.article.article_img = result.data.data.article_img
                this.article.skill_tag = result.data.data.skill_tag
                this.article.content = result.data.data.content
                this.article.html_content = result.data.data.html_content
                this.article.description = result.data.data.description

                let arr = []
                for ( let prop in JSON.parse( result.data.data.article_tags ) ) {
                    arr.push(JSON.parse( result.data.data.article_tags )[prop])
                }
                this.article.article_tags = arr
            }
        },
        changeData(value, render) {
            this.article.html_content = render;
        },
        clear () {
            this.article = {
                title: '',
                article_img: '',
                skill_tag: '',
                article_tags: [],
                description: '',
                content: '',
                html_content: ''
            }
            this.clearDialog = false
        },
        async submit () {
            let obj = {}
            for ( let prop in this.article.article_tags ) {
                obj[prop] = this.article.article_tags[prop]
            }
            let result = this.type == 'write' ? await article_add( this.userData.id, this.article.title, this.article.article_img,JSON.stringify( obj ), this.article.skill_tag, this.article.description, this.article.content, this.article.html_content ) : await article_update( this.userData.id, this.$route.query.id, this.article.title, this.article.article_img,JSON.stringify( obj ), this.article.skill_tag, this.article.description, this.article.content, this.article.html_content )
            if ( result.data.code == 200 ) { this.$message({message: '添加成功'}) }
        }
    }
}
</script>

<style lang="scss" scoped>
#user-article-write {
    padding-top: 60px!important;
    div.content {
        padding-top: 20px;
        div.row {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-bottom: 20px;
            label {
                &:first-child {
                    width: 120px;
                    font-size: 16px;
                }
            }
            > div {
                width: 200px;
            }
        }
        div.row.description {
            > div {
                width: 100%;
            }
        }
        div.btn-lsit {
            margin-top: 20px;
            display: flex;
            justify-content: flex-end;
        }
    }
}
</style>