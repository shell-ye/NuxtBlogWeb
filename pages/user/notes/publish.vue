<template>
    <section id="user-article-write">
        <UserCard :head-title="type == 'write' ? '写笔记' : '修改笔记'">
            <i class="iconfont iconbi" slot="icon"></i>
            <div class="content" slot="body">
                <div class="row">
                    <label>笔记标题：</label>
                    <el-input v-model="note.title"></el-input>
                </div>
                <div class="row">
                    <label>笔记分类：</label>
                    <el-select v-model="note.notes_class" placeholder="请选择">
                        <el-option v-for="item in notes_class" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </div>
                <no-ssr><mavon-editor :toolbars="markdownOption" v-model="note.content" @change="changeData" /></no-ssr>
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
import { getNoteList, addNote, searchNote, updateNote  } from '@/api/notes'
import { mapState } from 'vuex'
export default {
    name: 'UserNoteWrite',
    data () {
        return {
            type: 'write',
            notes_class: [],
            note: {
                title: '',
                notes_class: '',
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
        this.notes_class = this.webside.notes_class
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
            let result = await searchNote(this.$route.query.id)
            if ( result.data.code == 200 ) {
                this.note.title = result.data.data.title
                this.note.notes_class = result.data.data.notes_class
                this.note.content = result.data.data.content
                this.note.html_content = result.data.data.html_content
            }
        },
        changeData(value, render) {
            this.note.html_content = render;
        },
        clear () {
            this.note = {
                title: '',
                content: '',
                html_content: ''
            }
            this.clearDialog = false
        },
        async submit () {
            let result = this.type == 'write' ? await addNote( this.userData.id, this.note.title, this.note.notes_class, this.note.content, this.note.html_content ) : await updateNote( this.userData.id, this.$route.query.id, this.note.title, this.note.notes_class, this.note.content, this.note.html_content )
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