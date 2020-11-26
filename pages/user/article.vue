<template>
    <Nuxt />
</template>

<script>
export default {
    middleware ({ route, redirect }) {
        if ( route.path == '/user/article' ) {
            redirect('/user/article/list')
        }
    }
}
</script>