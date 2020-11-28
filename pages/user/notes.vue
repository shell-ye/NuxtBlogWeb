<template>
    <Nuxt />
</template>

<script>
export default {
    middleware ({ route, redirect }) {
        if ( route.path == '/user/notes' ) {
            redirect('/user/notes/list')
        }
    }
}
</script>