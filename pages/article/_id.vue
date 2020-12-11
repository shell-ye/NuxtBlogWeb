<template>
	<article id="article" ref="article">
		<HeadBackground text="文章阅读" type="article"></HeadBackground>
		<section class="container note-content white-card">
			<div class="head" v-if="article && article.title">
				<p v-if="tags && tags.length">
					<router-link v-for="(item, index) in tags" :key="index" tag="span" :to="{ path: '/categories', query: { class: item} }" class="tags-3">{{ item | articleTag }}</router-link>
				</p>
				<p class="class"><i class="iconfont iconmark"></i>{{ article.skill_tag }}</p>
			</div>
			<div class="time" v-if="article && article.title">
				<p class="start"><i class="iconfont iconriqi"></i>发布时间：{{ article.publish_time | timeDate }}</p>
				<p class="new"><i class="iconfont iconriqi"></i>更新时间：{{ article.update_time | timeDate }}</p>
				<p class="likes">
					<i class="iconfont iconLike-selected" :class="{liked: !likedBool}" @click="likedHandler"></i>
					<i class="iconfont iconxinaixin" :class="{liked: likedBool}" @click="likedHandler"></i>
					点赞次数 : {{ article.likes_count }}
				</p>
			</div>
			<div class="content" @click="contentClick($event)">
				<h2 class="title" v-if="article && article.title">{{ article.title }}</h2>
				<div class="markdown-body" ref="note_content" id="note_content" v-show="article && article.html_content" v-html="article.html_content"></div>
			</div>
			<Reward></Reward>
		</section>
		<ImgDialog></ImgDialog>
	</article>
</template>

<script>
import bus from '@/bus'
import { mapState } from 'vuex'
import { getStrCount } from '@/utils/index'
import { article_search, article_like, article_user_like } from '@/api/article'
import HeadBackground from '@/components/article/HeadBackground'
import ImgDialog from '@/components/article/ImgDialog'
import Reward from '@/components/Reward'
export default {
	data () {
		return {
			article_show: false,
			catalog: {},
			likedBool: false
		}
	},
	async asyncData ({ params }) {
		let result = await article_search( 1, params.id )
		let tags = []
		for ( let prop in JSON.parse(result.data.data.article_tags) ) {
			tags.push(JSON.parse(result.data.data.article_tags)[prop])
		}
		return {
			article: result.data.data,
			tags
		}
	},
	head () {
		let vm = this
		return {
			title: '夏叶的技术博客-' + vm.article.title,
			meta: [
				{ hid: 'description-article', name: 'description', content: '夏叶，夏叶博客，夏叶的技术博客，作者，文章查看' },
				{ hid: 'description-article-description', name: 'description', content: vm.article.description }
			]
		}
	},
	async mounted () {
		this.changeHTMLStr()
		Prism.highlightAll()
		process.browser && document.querySelectorAll("code").forEach(block => {
			Prism.highlightElement(block)
			Prism.highlightAll()
		})

		if ( this.$store.state.webside.userData.id ) {
			let result = await article_user_like( 2, this.$store.state.webside.userData.id, this.article.id )
			this.likedBool = result.data.code == 200 && result.data.data.length == 1 || false
			bus.$emit('articleLiked', this.likedBool)
		}

		bus.$on('articleLike', () => {
			this.likedHandler()
		})
	},
	computed: {
		...mapState({
            'userData': state => state.webside.userData
        })
	},
	watch: {
		$route () {
			this.article_show = false
		},
		likedBool () {
			bus.$emit('articleLiked', this.likedBool)
		}
	},
	components: {
		HeadBackground, Reward, ImgDialog
	},
	methods: {
		async search ( id ) {
			let result = id ? await article_search( 1,id ) : await article_search( 1,this.$route.params.id )
			this.tags = []
			if ( result.data.code == 200 ) {
				this.article = result.data.data
				for ( let prop in JSON.parse( this.article.article_tags ) ) {
					this.tags.push(JSON.parse( this.article.article_tags )[prop])
				}
				this.changeHTMLStr()
			}
			this.checkUserLike()
		},
		async likedHandler () {
			let result = {}
			if ( this.userData && this.userData.id ) {
				result = await article_like( 2, this.article.id, !this.likedBool, this.userData.id )
			} else {
				result = await article_like( 1, this.article.id, !this.likedBool )
			}
			if ( result.data.code == 200 ) {
				if ( !this.likedBool ) {
					this.$message({message: '成功添加喜欢'})
				}
				this.article.likes_count = result.data.data
				this.likedBool = !this.likedBool
			}
		},
		async checkUserLike () {
			if ( this.userData && this.userData.id ) {
				let result = await article_user_like( 2,this.userData.id,this.article.id )
				if ( result.data.code == 200 ) {
					if ( result.data.data.length ) { 
						this.likedBool = true 
					} else {
						this.likedBool = false 
					}
				}
			}
		},
		async changeHTMLStr () {
			this.article.html_content = this.article.html_content.replace(/<pre/g, '<pre class="line-numbers language-" data-line="1,3-5"')
			this.article.html_content = this.article.html_content.replace(/<div class="hljs">/g, '')
			this.article.html_content = this.article.html_content.replace(/\<\/code\>\<\/div>/g, '</code>')
			await this.$refs.note_content
			console.log(Prism, this.$refs.note_content)
			Prism.highlightAll()
			let timer = setTimeout(() => {
				Prism.highlightAll()
				clearTimeout( timer )
			}, 1000)
		},
		contentClick ( e ) {
			if ( e.target.nodeName == 'IMG' ) {
				bus.$emit('showImgDialog', e.target.src)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
#article{
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	align-items: flex-start;
	margin-bottom: 60px;
	position: relative;
	section{ 
		z-index: 2;
	}
	section.note-content {
		background: white;
		margin-top: -80px;
		.head{
			border-bottom: none;
			p {
				line-height: 24px;
				span {
					margin-right: 10px;
				}
			}
			p.class {
				display: flex;
				align-items: center;
			}
		}
		.time {
			width: 100%;
		}
		.content {
			h2 {
				margin-bottom: 40px;
				font-weight: bold;
			}
		}
	}
}
@media screen and (max-width: 1024px) {
    section.note-content {
		margin: 20px 0 20px 0!important;
		padding: 10px!important;
		.time {
			flex-wrap: wrap;
			p {
				margin-bottom: 10px;
			}
		}
	}
}
</style>