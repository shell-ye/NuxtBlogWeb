<template>
    <article id="friends">
        <HeadBackground type="friends" text="友情链接"></HeadBackground>
        <section class="white-card container content">
            <div class="head">
                <span>欢迎交换友情链接 </span><router-link tag="a" to="/author">快来联系我</router-link>
            </div>
            <div class="links" v-for="(classes, index) in links" :key="index">
                <div class="head">{{ classes.name }}</div>
                <div class="link">
                    <Links v-for="item in classes.data" :data="item" :key="item.id"></Links>
                </div>
            </div>
        </section>
    </article>
</template>

<script>
import Links from '@/components/Links'
import HeadBackground from '@/components/article/HeadBackground'
import { mapState } from 'vuex'
export default {
    name: 'Friends',
    head () {
		return {
			title: '夏叶的技术博客-友情链接',
			meta: [
				{ hid: 'description-friends', name: 'description', content: '夏叶，夏叶博客，夏叶的技术博客, 友情链接，朋友，链接，使用网站，实用教程' }
			]
		}
	},
    data () {
        return {
            links: {
                // technology: {name: '技术博客', data: [{ href: '###', name: 'xiaye', remarks: 'today is a nice day', head_img: '' }]},
                // friend: {name: '朋友的博客', data: [{ href: '###', name: 'xiaye', remarks: 'today is a nice day', head_img: '' }]},
                // beautiful: {name: '漂亮的博客', data: [{ href: '###', name: 'xiaye', remarks: 'today is a nice day', head_img: '' }]},
                // tool: {name: '工具类', data: [{ href: '###', name: 'xiaye', remarks: 'today is a nice day', head_img: '' }]}
            }
        }
    },
    async fetch({ store }) {
        await store.dispatch('webside/getFriendLinks')
    },
    async mounted () {
        if ( this.friend_links.length ) {
            this.links = {
                technology: {name: '技术博客', data: []},
                friend: {name: '朋友的博客', data: []},
                beautiful: {name: '漂亮的博客', data: []},
                tool: {name: '工具类', data: []}
            }
            this.friend_links.forEach(item => {
                if ( item.class == 'technology' ) {
                    this.links.technology.data.push( item )
                } else if ( item.class == 'friend' ) {
                    this.links.friend.data.push( item )
                } else if ( item.class == 'beautiful' ) {
                    this.links.beautiful.data.push( item )
                } else if ( item.class == 'tool' ) {
                    this.links.tool.data.push( item )
                }
            })
        }
    },
    components: {
        HeadBackground, Links
    },
    computed: {
        ...mapState({
            'friend_links': state => state.webside.friend_links
        })
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/theme.scss';
#friends {
    .content {
        padding: 40px;
        box-sizing: border-box;
        margin: 20px auto;
        .head {
            span {
                font-size: 24px;
            }
        }
        .links {
            width: 100%;
            .head {
                border-left: 5px solid $elementBlue;
                padding-bottom: 0;
                line-height: 26px;
                padding-left: 10px;
                border-bottom: none;
                margin: 40px 0;
            }
            .link {
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                > div {
                    margin: 0 20px 40px 0;
                }
            }
        }
    }
}
@media screen and (max-width: 1024px) {
    #friends {
        .content {
            .head {
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                span {
                    margin-bottom: 10px;
                }
            }
            .links {
                .link {
                    > div {
                        width: 100%;
                        margin: 0 0 40px 0;
                    }
                }
            }
        }
    }
}
</style>