<template>
    <article id="error">
        <section>
            <div class="title">404</div>
        </section>
    </article>
</template>

<script>
export default {
    name: 'error',
    props: ['error'],
    mounted () {
        console.log(this.error)
        if ( this.error.statusCode == 404 ) {
            this.$router.push('/404')
        }
    }
}
</script>

<style lang="scss" scoped>
#error {
    section {
        div.title {
            font-size: 40px;
        }
    }
}
</style>