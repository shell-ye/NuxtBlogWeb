<template>
    <aside id="side-bar">
        <ul>
            <!-- 打赏 点赞 -->
            <li v-show="$route.name == 'article-id' && !articleLiked" @click="like"><i class="iconfont iconzanpress"></i></li>
            <li v-show="$route.name == 'article-id'" @click="reward"><i style="font-size: 18px;">赏</i></li>

            <!-- 快捷留言 -->
            <li @click="messageBool = !messageBool">
                <i class="iconfont iconbi"></i>
            </li>

            <!-- 文章搜索 -->
            <li @click="searchBool = !searchBool">
                <i class="el-icon-search"></i>
            </li>
        </ul>
		<el-backtop></el-backtop>

        <!-- 搜索 -->
        <input type="text" class="input" v-model="searchKey" :class="{show: searchBool}" @click="searchBool = true" @blur="searchBool = false" @keyup.enter="search">

        <!-- 留言 -->
        <input type="text" class="input input-message" v-model="message.content" :class="{show: messageBool}" @click="messageBool = true" @keyup.enter="submitMessage">
        <el-tooltip placement="bottom" effect="light" popper-class="side-bar-message-color">
            <span class="message-color" :class="{[message.color]: true, show: messageBool}"></span>
            <div slot="content">
                <span class="message-color blue" @click="message.color = 'blue'"></span>
                <span class="message-color red" @click="message.color = 'red'"></span>
                <span class="message-color pink" @click="message.color = 'pink'"></span>
            </div>
        </el-tooltip>
    </aside>
</template>

<script>
import bus from '@/bus'
import { mapState } from 'vuex'
import { submitMessage } from '@/api/message'
export default {
    name: 'SideBar',
    data () {
        return {
            // 搜索
            searchBool: false,
            searchKey: '',

            // 文章点赞
            articleLiked: false,

            // 快捷留言
            messageBool: false,
            message: {
                content: '',
                color: 'blue'
            }
        }
    },
    mounted () {
        bus.$on('articleLiked', data => {
            this.articleLiked = data
        })
    },
    computed: {
        ...mapState({
            'userData': state => state.webside.userData
        })
    },
    methods: {
        search () {
            if ( this.searchKey ) {
                this.$router.push({path: '/search', query: {key: this.searchKey}})
            }
        },
        reward () {
            bus.$emit('reward')
        },
        like () {
            bus.$emit('articleLike')
        },
        async submitMessage () {
            if ( !this.message.content ) {
                this.$message({type: 'error', message: '请输入留言内容'})
            } else {
                let result = await submitMessage( 1, this.userData.id || 'none', this.userData.name || 'visitor', this.userData.admin && this.userData.admin == 1 ? '博主' : '游客', this.userData.admin && this.userData.admin == 1 ? 'yellow' : this.message.color, this.message.content )
                if ( result.data.code == 200 ) {
                    this.$message({type: 'success', message: '感谢你的留言'})
                    this.message.content = ''
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#side-bar {
    z-index: 9;
    position: fixed;
    bottom: 90px;
    right: 40px;
    ul {
        list-style: none;
        li {
            background-color: #FFF;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            box-shadow: 0 0 6px rgba(0,0,0,.12);
            cursor: pointer;
            margin-top: 10px;
            z-index: 3;
            i {
                color: #409EFF;
                margin: 0;
            }
        }
    }
    input.input {
        background: white;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.12);
        height: 36px;
        width: 0;
        border-radius: 19px;
        position: absolute;
        right: 10px;
        bottom: 2px;
        padding: 0;
        border: none;
        padding: 0 20px;
        z-index: 1;
        opacity: 0;
        transition: .2s ease-in;
        cursor: pointer;
    }
    input.input.show {
        width: 200px;
        right: 54px;
        opacity: 1;
        cursor: text;
    }

    input.input.input-message {
        bottom: 52px;
        padding-right: 36px;
    }

    span.message-color {
        display: block;
        width: 0;
        height: 0;
        position: absolute;
        border-radius: 50%;
        right: 76px;
        bottom: 70px;
        cursor: pointer;
        transition: .4s;
        z-index: -1;
    }
    span.message-color.show {
        width: 16px;
        height: 16px;
        z-index: 2;
        right: 68px;
        bottom: 62px;
    }
    span.message-color.blue {
        background: $elementBlue;
    }
    span.message-color.red {
        background: $MessageRed;
    }
    span.message-color.pink {
        background: $MessagePink;
    }
}
</style>

<style lang="scss">
#side-bar {
    i {
        margin: 0;
    }
}

.side-bar-message-color {
    div {
        &:first-child {
            display: flex;
            justify-content: center;
            span {
                width: 16px;
                height: 16px;
                display: block;
                margin: 0 4px;
                border-radius: 50%;
                cursor: pointer;
            }
            span.message-color.blue {
                background: $elementBlue;
            }
            span.message-color.red {
                background: $MessageRed;
            }
            span.message-color.pink {
                background: $MessagePink;
            }
        }
    }
}
</style>