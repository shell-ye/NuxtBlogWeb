<template>
    <div class="down-line-input">
        <input type="text" :placeholder="placeholder" :value="value" @input="$emit('input', $event.target.value)">
        <span class="line"></span>
        <span class="gray"></span>
    </div>
</template>

<script>
export default {
    name: 'DownLineInput',
    props: {
        placeholder: {
            default: '请输入内容'
        },
        value: {}
    }
}
</script>

<style lang="scss" scoped>
.down-line-input {
    display: flex;
    flex-direction: column;
    position: relative;
    input {
        border: none;
        padding: 6px 12px;
        &:focus {
            + span.line {
                z-index: 2;
                width: 100%;
            }
        }
        &::placeholder {
            color: $gray;
            font-size: 14px;
        }
    }
    span {
        transition: .2s ease-in;
        height: 2px;
        background: $elementBlue;
        width: 0%;
    }
    span.gray {
        position: absolute;
        width: 100%;
        left: 0;
        bottom: 0;
        background: #DDD;
    }
}
</style>