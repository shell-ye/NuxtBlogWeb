<template>
    <div class="user-card" :class="{small: size == 'small'}">
        <div class="head">
            <div class="icon">
                <slot name="icon"></slot>
            </div>
            <div class="title">
                <p class="title">{{ headTitle }}</p>
                <p class="content">{{ headContent }}</p>
            </div>
        </div>
        <slot name="info"></slot>
        <slot name="body"></slot>
    </div>
</template>

<script>
export default {
    name: 'user-card',
    props: {
        type: {
            type: String,
            default: 'icon'
        },
        size: {
            type: String,
            default: ''
        },
        headTitle: {
            type: String
        },
        headContent: {
            type: String
        }
    }
}
</script>

<style lang="scss" scoped>
.user-card {
    box-sizing: border-box;
    padding: 16px;
    border-radius: 4px;
    background: white;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
    .head {
        display: flex;
        justify-content: space-between;
        height: 64px;
        .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 86px;
            width: 86px;
            box-shadow: $gray;
            padding: 16px;
            box-sizing: border-box;
            border-radius: 4px;
            background: linear-gradient(60deg, #ffa726, #fb8c00);
            box-shadow: 0 4px 20px 0 rgba(0, 0, 0,.14), 0 7px 10px -5px rgba(255, 152, 0,.4);
            transform: translateY(-40px);
            img {
                width: 50px;
                height: 50px;
            }
            i {
                color: white;
                font-size: 42px;
            }
        }
        .title {
            p {
                border: none;
                display: flex;
                justify-content: flex-end;
                &:first-child {
                    color: $gray;
                    font-size: 14px;
                    letter-spacing: 2px;
                    margin-bottom: 4px;
                }
                &:last-child {
                    color: #3C4858;
                    font-size: 20px;
                }
            }
        }
    }
}
.user-card.small {
    > div {
        &:nth-child(2) {
            border-top: 1px solid #ccc;
            color: #ccc;
            padding-top: 6px;
            font-size: 14px;
        }
    }
}
</style>