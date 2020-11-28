<template>
    <div class="note-card">
        <nuxt-link tag="div" :to="{path: `/notes/${ note.id }`}" class="img">
            <img src="@/assets/img/nuxt.jpg" alt="" v-if="note.title == 'Nuxt'">
        </nuxt-link>
        <div class="content">
            <nuxt-link tag="p" :to="{path: `/notes/${ note.id }`}" class="title">{{ note.title }}</nuxt-link>
            <p class="details">
            <span class="time" v-if="note.update_time">
                <i class="iconfont icontime"></i>
                {{ note.update_time.substr(0,10) }}
            </span>
        </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NoteCard',
    props: ['note']
}
</script>

<style lang="scss" scoped>
.note-card {
    width: 350px;
    height: 320px;
    background: white;
    font-size: 16px;
    border-radius: 8px;
    overflow: hidden;
    margin: 25px;
    transition: .4s;
    box-shadow: 0 15px 35px rgba(50,50,93,.1), 0 5px 15px rgba(0,0,0,.07);
    &:hover{
        box-shadow: 0 4px 12px 12px rgba(7,17,27,0.15);
        .img img {
            transform: scale(1.1);
        }
    }
    > div{ overflow: hidden;}
    img{
        width: 100%;
        height: 218px;
        cursor: pointer;
        transition: .5s;
        &:hover{ transform: scale(1.2);}
    }
    .content{
        height: 102px;
        font-size: 16px;
        line-height: 42px;
        box-sizing: border-box;
        padding: 10px 20px;
        position: relative;
        align-items: center;
        .title{
            font-size: 20px!important;
            font-weight: bold;
            cursor: pointer;
        }
        .details{
            display: flex;
            justify-content: space-between;
            position: relative;
            p{
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
}

@media screen and (max-width: 1024px) {
    .note-card {
        margin: 25px 0 !important;
    }
}
</style>