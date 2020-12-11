<template>
    <aside id="side-bar">
        <ul>
            <!-- 打赏 点赞 -->
            <li v-show="$route.name == 'article-id' && !articleLiked" @click="like"><i class="iconfont iconzanpress"></i></li>
            <li v-show="$route.name == 'article-id'" @click="reward"><i style="transform: translateY(-2px); font-size: 18px;">赏</i></li>

            <!-- 文章搜索 -->
            <li v-show="$route.path != '/search'" @click="searchBool = !searchBool"><i class="el-icon-search"></i></li>
        </ul>
		<el-backtop></el-backtop>
        <input type="text" class="search" v-model="key" :class="{show: searchBool}" @click="searchBool = true" @blur="searchBool = false" @keyup.enter="search">
    </aside>
</template>

<script>
import bus from '@/bus'
export default {
    name: 'SideBar',
    data () {
        return {
            searchBool: false,
            key: '',
            articleLiked: false
        }
    },
    mounted () {
        bus.$on('articleLiked', data => {
            this.articleLiked = data
        })
    },
    methods: {
        search () {
            if ( this.key ) {
                this.$router.push({path: '/search', query: {key: this.key}})
            }
        },
        reward () {
            bus.$emit('reward')
        },
        like () {
            bus.$emit('articleLike')
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
                z-index: 2;
            i {
                color: #409EFF;
                margin: 0;
            }
        }
    }
    input.search {
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
        padding-left: 20px;
        z-index: 1;
        opacity: 0;
        transition: .2s ease-in;
        cursor: pointer;
    }
    input.search.show {
        width: 200px;
        right: 54px;
        opacity: 1;
        cursor: text;
    }
}
</style>