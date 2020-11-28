<template>
    <article id="note-content">
        <section class="catalog">
            <nuxt-link tag="div" to="/" class="logo">
                <img src="@/assets/img/color_logo.png" alt="">
                <span>夏叶博客</span>
            </nuxt-link>
            <!-- <div v-html="title_list" class="list"></div> -->
            <ul v-if="title_list.length">
                <li v-for="item in title_list" :key="item.text">
                    <a :href="item.href" :class="item.class">{{ item.text }}</a>
                </li>
            </ul>
        </section>
        <section class="content">
            <div class="content white-card">
                <h1>{{ note.title }}</h1>
                <div class="markdown-body" v-html="note.html_content" v-if="showNote"></div>
            </div>
        </section>
    </article>
</template>

<script>
import { searchNote } from '@/api/notes'
export default {
    name: 'NoteContent',
    async asyncData ({ params }) {
        let result = await searchNote(params.id)
        if ( result.data.code == 200 ) {
            return {
                note: result.data.data
            }
        }
    },
    data () {
        return {
            showNote: false,
            title_list: []
        }
    },
    async mounted () {
        if ( !this.note.title ) {
            this.$router.push('/404')
        } else {
            // 替换代码高亮标签以及特殊字符
            this.note.html_content = this.note.html_content.replace(/<pre/g, '<pre class="line-numbers language-" data-line="1,3-5"')
			this.note.html_content = this.note.html_content.replace(/<div class="hljs">/g, '')
            this.note.html_content = this.note.html_content.replace(/\<\/code\>\<\/div>/g, '</code>')
            this.note.html_content = this.note.html_content.replace(/&amp;/g, '&')
            
            // 产生目录
            let matchArr = this.note.html_content.match(/<h\d>.+<\/h\d>/g)
            matchArr.forEach((item, index) => {
                let obj = {}
                obj['text'] = item.match(/<\/a>.+</)[0].replace('</a>', '').replace('<', '')
                obj['href'] = item.match(/id=".+"/)[0].replace('id="', '#').replace('"', '')
                if ( item.indexOf('h1') != -1 ) {
                    obj['class'] = 'title-one'
                } else if ( item.indexOf('h2') != -1 ) {
                    obj['class'] = 'title-two'
                } else if ( item.indexOf('h3') != -1 ) {
                    obj['class'] = 'title-three'
                } else if ( item.indexOf('h4') != -1 ) {
                    obj['class'] = 'title-four'
                } else if ( item.indexOf('h5') != -1 ) {
                    obj['class'] = 'title-five'
                } else if ( item.indexOf('h6') != -1 ) {
                    obj['class'] = 'title-six'
                }
                this.title_list.push(obj)
            })

            this.showNote = true
            Prism.highlightAll()
            process.browser && document.querySelectorAll("code").forEach(block => {
                Prism.highlightElement(block)
                Prism.highlightAll()
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#note-content {
    min-height: 100vh;
    display: flex;
    justify-content: flex-start;
    > section {
        min-height: 100vh;
        overflow: auto;
    }
    section.catalog {
        position: fixed;
        left: 0;
        top: 0;
        width: 300px;
        background: rgb(246, 248, 249);
        opacity: .9;
        padding: 0 10px;
        box-sizing: border-box;
        height: 100vh;
        overflow: hidden;
        div.logo {
            height: 60px;
            font-size: 24px;
            display: flex;
            justify-content: center;
            align-items: center;
            letter-spacing: 2px;
            border-bottom: 1px solid $gray;
            cursor: pointer;
            margin-bottom: 20px;
            img {
                width: 40px;
                height: 40px;
                margin-right: 20px;
                margin-left: -20px;
            }
        }
        ul {
            overflow: auto scroll;
            height: calc( 100vh - 20px - 60px );
            box-sizing: border-box;
            padding-bottom: 40px;
            li {
                height: 40px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                box-sizing: border-box;
                padding-left: 20px;
                position: relative;
                a {
                    color: black;
                    box-sizing: border-box;
                    &:hover {
                        color: $elementBlue;
                        // font-weight: bold;
                    }
                }
                .title-one {
                    font-size: 20px;
                }
                .title-two {
                    font-size: 18px;
                    padding-left: 20px;
                }
                .title-three {
                    font-size: 16px;
                    padding-left: 40px;
                }
                .title-four {
                    font-size: 14px;
                    padding-left: 60px;
                }
                .title-five {
                    font-size: 12px;
                    padding-left: 80px;
                }
                .title-six {
                    font-size: 12px;
                    padding-left: 50px;
                }
            }
        }
    }
    section.content {
        display: flex;
        justify-content: center;
        width: calc( 100% - 300px );
        position: relative;
        left: 300px;
        > div.content {
            width: 1000px;
            display: block;
            padding: 60px;
            box-sizing: border-box;
            h1 {
                font-size: 42px;
                width: 100%;
                text-align: center;
                margin-bottom: 40px;
            }
        }
    }
}

@media screen and (max-width: 1024px) {
    #note-content {
        section.catalog {
            width: 100vw;
            position: absolute;
            z-index: 999;
            opacity: 1;
        }
        section.content {
            
        }
    }
}
</style>