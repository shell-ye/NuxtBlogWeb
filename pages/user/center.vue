<template>
    <Nuxt />
</template>

<script>
export default {
    middleware ({ route, redirect }) {
        if ( route.path == '/user/center' ) {
            redirect('/user/center/info')
        }
    }
}
</script>