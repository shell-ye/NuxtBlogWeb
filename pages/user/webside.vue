<template>
    <Nuxt />
</template>

<script>
export default {
    middleware ({ route, redirect }) {
        if ( route.path == '/user/webside' ) {
            redirect('/user/webside/charts')
        }
    }
}
</script>