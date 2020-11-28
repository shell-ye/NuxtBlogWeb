<template>
    <article id="notes">
        <HeadBackground text="笔记手册" type="notes"></HeadBackground>
        <section class="white-card container statement animate__animated animate__slideInUp"><span><i class="iconfont iconbiaoti"></i>郑重声明：此笔记手册内容为作者翻阅文档或在日常使用中根据实际使用情况编写，若有错误的地方可以联系作者进行修订，也可能与官方文档有大多数相同的地方，敬请谅解</span></section>
        <section class="list container animate__animated animate__slideInUp">
            <NoteCard v-for="(item, index) in notes_list" :key="index" :note="item" shape="NoteCard"></NoteCard>
        </section>
    </article>
</template>

<script>
import { getNoteList } from '@/api/notes'
import HeadBackground from '@/components/article/HeadBackground'
import NoteCard from '@/components/article/NoteCard'
export default {
    name: 'Notes',
    async asyncData () {
        let result = await getNoteList()
        if ( result.data.code == 200 ) {
            return {
                notes_list: result.data.data
            }
        }
    },
    head () {
		return {
			title: '夏叶的技术博客-笔记手册',
			meta: [
				{ hid: 'description-notes', name: 'description', content: '夏叶，夏叶博客，夏叶的技术博客, 笔记，手册' },
				{ hid: 'description-statement', name: 'description', content: '郑重声明：此笔记手册内容为作者翻阅文档或在日常使用中根据实际使用情况编写，若有错误的地方可以联系作者进行修订，也可能与官方文档有大多数相同的地方，敬请谅解' }
			]
		}
	},
    data () {
        return {

        }
    },
    components: {
        HeadBackground, NoteCard
    }
}
</script>

<style lang="scss" scoped>
#notes {
    .statement {
        margin: 0 auto;
        margin-top: 40px;
        font-size: 16px;
        line-height: 36px;
        letter-spacing: 2px;
        i {
            font-weight: bold;
        }
    }
    .list {
        margin-top: 20px;
        display: flex;
        flex-wrap: wrap;
    }
}
</style>