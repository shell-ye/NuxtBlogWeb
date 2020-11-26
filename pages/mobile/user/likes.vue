<template>
    <article id="mobile-user-likes">
        <ImgCard v-for="(item, index) in article_list" :key="index" :article="item" shape="square"></ImgCard>
    </article>
</template>

<script>
import ImgCard from '@/components/article/ImgCard'
import { article_user_like } from '@/api/article'
export default {
    name: 'MobileUserLikes',
    async asyncData ({ store }) {
        let result = await article_user_like( 1, store.state.webside.userData.id )
        if ( result.data.code == 200 ) {
            result.data.data.forEach(item => {
                item.id = item.article_id
            })
            return {
                article_list: result.data.data
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#mobile-user-likes {
    padding-top: 60px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}
</style>