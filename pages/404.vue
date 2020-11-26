<template>
    <article id="not-found">
        <img src="@/assets/img/404-bg.png" alt="">
        <div>
            <span>4</span>
            <span>4</span>
            <p class="animate__animated animate__pluse animate__infinite">你好像走错地方了喔~</p>
            <nuxt-link tag="a" to="/" class="animate__animated animate__backInUp">返回首页</nuxt-link>
        </div>
    </article>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" scoped>
#not-found {
    background: #0f1431;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    img {
        height: 100vh;
        width: auto;
        animation: shake linear 5s infinite;
        animation-delay: 4s;
    }
    > div {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
            font-family: "SF Pro SC","SF Pro Text","SF Pro Icons","PingFang SC","Helvetica Neue","Helvetica","Arial",sans-serif;
            font-size: 20rem;
            text-align: center;
            margin: 0 7rem;
            animation: shake linear 5s infinite;
            animation-delay: 1s;
            &:nth-child(2) {
                animation-delay: 2s;
            }
        }
        p {
            font-family: "SF Pro SC","SF Pro Text","SF Pro Icons","PingFang SC","Helvetica Neue","Helvetica","Arial",sans-serif;
            position: absolute;
            left: 0;
            top: 72%;
            font-size: 1.6rem;
            padding-left: 1rem;
            box-sizing: border-box;
            letter-spacing: 1rem;
            width: 100%;
            text-align: center;
            animation: shake linear 5s infinite;
        }
        a {
            font-family: "SF Pro SC","SF Pro Text","SF Pro Icons","PingFang SC","Helvetica Neue","Helvetica","Arial",sans-serif;
            position: absolute;
            top: 80%;
            color: white;
            height: 40px;
            width: 140px;
            border-radius: 20px;
            border: 1px solid white;
            text-align: center;
            line-height: 40px;
            transition: .5s;
            animation: shake linear 5s infinite;
            animation-delay: 3s;
            &:hover {
                background: red;
                border-color: red;
                top: 82%;
            }
        }
    }
}

@keyframes shake {
    0% {
        transform: translateY(0);
    }
    25% {
        transform: translateY(-10px);
    }
    50% {
        transform: translateY(0px);
    }
    75% {
        transform: translateY(10px);
    }
    100% {
        transform: translateY(0px);
    }
}
</style>