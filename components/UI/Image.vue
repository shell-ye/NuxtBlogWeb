<template>
    <el-image :src="src" lazy class="ui-iamge">
        <!-- 加载中 - 加载动画 -->
        <div slot="placeholder" class="image-slot" v-if="loading">
            <div class="typing_loader">
                <p></p>
                <p></p>
                <p></p>
            </div>
        </div>

        <!-- 加载中 - 无加载动画 -->
        <div slot="placeholder" class="image-slot" v-if="!loading">
            <i class="el-icon-picture-outline"></i>
        </div>

        <!-- 加载失败 -->
        <div slot="error" class="image-slot">
            <i class="el-icon-picture-outline"></i>
        </div>
    </el-image>
</template>

<script>
export default {
    name: 'UIImage',
    // props: ['src']
    props: {
        src: {
            type: String,
            default: ''
        },
        loading: {
            type: Boolean,
            default: true
        }
    }
}
</script>

<style lang="scss">
.ui-iamge {
    background: #eee;
    .image-slot {
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .typing_loader {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        p {
            width: 20px;
            height: 20px;
            margin: 0 10px;
            border-radius: 50%;
            background-color: red;
            animation: shake 2s infinite linear;
            animation-delay: 0;
            &:nth-child(2) {
                background-color: yellow;
                animation-delay: .3s;
            }
            &:nth-child(3) {
                background-color: blue;
                animation-delay:.6s;
            }
        }
    }
}

@keyframes shake {
    0% {
        transform: translateY(0px);
    }

    25% {
        transform: translateY(10px);
    }

    50% {
        transform: translateY(0px);
    }

    75% {
        transform: translateY(-10px);
    }

    100% {
        transform: translateY(0px);
    }
}
</style>